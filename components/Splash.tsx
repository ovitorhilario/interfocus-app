import { SplashScreen } from 'expo-router';
import { useSession } from '@/context/auth';

export function SplashScreenController() {
	const { isLoading: isAuthLoading } = useSession();

	if (!isAuthLoading) {
		SplashScreen.hideAsync();
	}

	return null;
}