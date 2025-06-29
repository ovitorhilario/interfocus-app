import { makeRedirectUri, ResponseType } from 'expo-auth-session';
import type { AuthRequestConfig, DiscoveryDocument } from 'expo-auth-session';
import * as Constants from 'expo-constants';

type OAuthConfig = [AuthRequestConfig, DiscoveryDocument];

export function getOAuthConfig(): OAuthConfig {

	const defaultScheme = Constants.default.expoConfig?.scheme;
	const scheme = typeof defaultScheme === 'string' 
		? defaultScheme : 'interfocus-todolist';

	const discovery: DiscoveryDocument = {
		authorizationEndpoint: process.env.EXPO_PUBLIC_AUTHORIZE_URL || '',
	}

	const config: AuthRequestConfig = {
		clientId: process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID || '',
		responseType: ResponseType.Code,
		redirectUri: makeRedirectUri({
			scheme,
		}),
	}

	return [config, discovery];
}