"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { getFirebaseAuth, googleProvider } from "../firebase";
import type { AuthContextValue } from "../types";

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  idToken: null,
  signInWithGoogle: async () => {},
  signInWithEmailPassword: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState<string | null>(null);

  useEffect(() => {
    const auth = getFirebaseAuth();
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setIdToken(u ? await u.getIdToken() : null);
      setLoading(false);
    });
  }, []);

  // Firebase ID トークンは1時間で失効するため55分ごとに強制リフレッシュ
  useEffect(() => {
    if (!user) return;
    const timer = setInterval(async () => {
      setIdToken(await user.getIdToken(true));
    }, 55 * 60 * 1000);
    return () => clearInterval(timer);
  }, [user]);

  const signInWithGoogle = async () => {
    await signInWithPopup(getFirebaseAuth(), googleProvider);
  };

  const signInWithEmailPassword = async (email: string, password: string) => {
    await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  };

  const signOut = async () => {
    await firebaseSignOut(getFirebaseAuth());
  };

  return (
    <AuthContext.Provider value={{ user, loading, idToken, signInWithGoogle, signInWithEmailPassword, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
