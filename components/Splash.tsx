import { SplashScreen } from 'expo-router';
import { useSession } from '@/context/auth';
import { useResources } from '@/hooks/useResources';
import { useEffect } from 'react';

export function SplashScreenController() {
	const { isLoading: isAuthLoading } = useSession();
	const [loaded, error] = useResources();

	useEffect(() => {
		if (!isAuthLoading && (loaded || error)) {
			SplashScreen.hideAsync();
		}
	}, [error, loaded, isAuthLoading]);

	return null;
}