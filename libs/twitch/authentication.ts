import { BaseAuthProvider, ClientCredentialsAuthProvider } from '@twurple/auth';

export const authProvider = (clientId: string, clientSecret: string): BaseAuthProvider => {
  return new ClientCredentialsAuthProvider(clientId, clientSecret);
}