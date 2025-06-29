type AuthState = {
	session?: string | null;
	isLoading: boolean;
	isLoggedIn: boolean;
	OAuthReady: boolean;
}

type AuthActions = {
	signIn: () => void;
	signOut: () => void;
}

export type AuthContextType = 
	AuthState & AuthActions;