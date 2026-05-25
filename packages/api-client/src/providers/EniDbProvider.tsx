"use client";

import React, { useMemo } from "react";
import { ApolloProvider } from "@apollo/client";
import { createEniDbClient, type EniDbClientOptions } from "../client";

interface EniDbProviderProps extends EniDbClientOptions {
  children: React.ReactNode;
}

/**
 * EniDB への Apollo Client を提供するプロバイダー。
 * AuthProvider の内側に配置し、getIdToken に useIdToken を渡す。
 *
 * @example
 * <AuthProvider>
 *   <EniDbProvider baseUrl={...} tenantId={...} getIdToken={() => idToken}>
 *     <App />
 *   </EniDbProvider>
 * </AuthProvider>
 */
export function EniDbProvider({ children, baseUrl, tenantId, getIdToken }: EniDbProviderProps) {
  const client = useMemo(
    () => createEniDbClient({ baseUrl, tenantId, getIdToken }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [baseUrl, tenantId],
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
