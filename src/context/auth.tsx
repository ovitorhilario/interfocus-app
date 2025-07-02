import { Alert, ToastAndroid } from 'react-native';
import { use, createContext, type PropsWithChildren, useEffect } from 'react';
import { AuthSessionResult, useAuthRequest } from 'expo-auth-session';
import { useStorageState } from '@/hooks/useStorageState';
import { getOAuthConfig } from '@/services/oauth/config';
import { getOAuthToken } from '@/services/api/token';
import useProfileStore from '@/stores/useProfileStore';
import type { AuthContextType } from './types';

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
  const setProfile = useProfileStore(s => s.setProfile);
  const [config, discovery] = getOAuthConfig();
	const isLoggedIn = !!session;
	
  // Prepara de forma Assíncrona o OAuth Request
  const [request, response, promptAsync] = useAuthRequest(config, discovery);
 
	const signIn = () => {
    promptAsync();
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
      setProfile({
        login: response.login || '',
        userId: response.usuarioId || 0,
        name: response.usuarioNome || ''
      })

      ToastAndroid.show('Login realizado com sucesso!', ToastAndroid.SHORT)

    } catch (error) {
      Alert.alert(
        'Erro de Autenticação',
        'Não foi possível completar o login. Por favor, tente novamente.',
      );
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