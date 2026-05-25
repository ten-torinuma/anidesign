import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export interface EniDbClientOptions {
  /** EniDB のベース URL（末尾スラッシュなし） 例: https://api.eniservice.example.com */
  baseUrl: string;
  /** テナント ID */
  tenantId: string;
  /** Firebase ID トークンを返す関数 */
  getIdToken: () => Promise<string | null> | string | null;
}

export function createEniDbClient({ baseUrl, tenantId, getIdToken }: EniDbClientOptions) {
  const httpLink = createHttpLink({
    uri: `${baseUrl}/${tenantId}/system/graphql`,
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getIdToken();
    return {
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  });

  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });
}
