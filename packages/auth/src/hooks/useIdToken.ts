import { useAuthContext } from "../providers/AuthProvider";

/** 現在の Firebase ID トークンを返す。API リクエストの Bearer トークンとして使用する。 */
export function useIdToken(): string | null {
  return useAuthContext().idToken;
}
