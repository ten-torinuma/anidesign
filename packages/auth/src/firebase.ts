"use client";

import { getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
}

let _auth: ReturnType<typeof getAuth> | null = null;

export function initFirebase(config: FirebaseConfig) {
  const app = getApps().length === 0 ? initializeApp(config) : getApps()[0]!;
  _auth = getAuth(app);
  return _auth;
}

export function getFirebaseAuth() {
  if (!_auth) throw new Error("[eni/auth] Firebase が初期化されていません。initFirebase() を先に呼んでください。");
  return _auth;
}

export const googleProvider = new GoogleAuthProvider();
