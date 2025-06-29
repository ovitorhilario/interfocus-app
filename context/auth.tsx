import { use, createContext, type PropsWithChildren, useEffect } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { getOAuthConfig } from '@/services/oauth/config';
import { AuthSessionResult, useAuthRequest } from 'expo-auth-session';
import type { AuthContextType } from './types';
import { getOAuthToken } from '@/services/api/token';
import { ToastAndroid } from 'react-native';

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
	isLoggedIn: false,
  OAuthReady: false
});

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [config, discovery] = getOAuthConfig();
	const isLoggedIn = !!session;
	
  // Prepara de forma Assíncrona o OAuth Request
  const [request, response, promptAsync] = useAuthRequest(config, discovery);
 
	const signIn = () => {
    promptAsync();
    setSession('xxx');
	}

	const signOut = () => {
    setSession(null);
	}

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await getOAuthToken(code);
      if (!response) {
        throw new Error('Token inválido ou não encontrado na resposta.');
      }
      // Armazena o token no expo-secure-store
      setSession(response.access_token || response.token);
      ToastAndroid.show('Login realizado com sucesso!', ToastAndroid.SHORT)

    } catch (error) {
      ToastAndroid.show('Erro ao realizar login', ToastAndroid.SHORT);
    }
  }

  const handleOAuthResponse = (result: AuthSessionResult | null) => {
    if (result?.type === 'success') {
      const { code } = result.params;
      code && exchangeCodeForToken(code);
    }
  }
  
  useEffect(() => {
    handleOAuthResponse(response);
  }, [response]);

  return (
    <AuthContext
      value={{
        signIn,
        signOut,
        session,
        isLoading,
				isLoggedIn,
        OAuthReady: !request
      }}>
      {children}
    </AuthContext>
  );
}

export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}