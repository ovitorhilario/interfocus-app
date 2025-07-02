import type { OAuthTokenResponse } from './types';

/**
 * Solicita um token de acesso ao servidor de autenticação da Interfocus.
 * @param {string} authorizationCode O código de autorização recebido no redirect.
 * @returns {Promise<OAuthTokenResponse | null>} Uma promessa que resolve com os dados do token (ex: access_token).
 */
export async function getOAuthToken(
	authorizationCode: string
): Promise<OAuthTokenResponse | null> {
  const url = process.env.EXPO_PUBLIC_TOKEN_URL || '';
  
  const clientId = process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID || '';
  const clientSecret = process.env.EXPO_PUBLIC_OAUTH_CLIENT_SECRET || '';

  // Preparando o corpo (Body) como 'application/x-www-form-urlencoded'
	const data: Record<string, string> = {
		'grant_type': 'authorization_code',
		'code': authorizationCode,
	}
	const formBody = Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');

  // Preparando o cabeçalho de autorização 'Basic Auth'
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = btoa(credentials);
  const authorizationHeader = `Basic ${encodedCredentials}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': authorizationHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro ${response.status}: ${errorData.message || response.statusText}`);
    } 

    const tokenData = await response.json() as OAuthTokenResponse;
		if (
			!tokenData || 
			(tokenData?.token === undefined && tokenData?.access_token === undefined)
		) {
			throw new Error('Token inválido ou não encontrado na resposta.');
		}

    return tokenData;

  } catch (error) {
    console.error('Falha na requisição do token:', error);
    throw error;
  }
}