import { useFonts } from 'expo-font';

export function useResources() {

	const [loaded, error] = useFonts({
    'Rubik-Light': require('@/assets/fonts/Rubik-Light.ttf'),
    'Rubik-Regular': require('@/assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Medium': require('@/assets/fonts/Rubik-Medium.ttf'),
    'Rubik-SemiBold': require('@/assets/fonts/Rubik-SemiBold.ttf'),
    'Rubik-Bold': require('@/assets/fonts/Rubik-Bold.ttf'),
  });

	return [loaded, error] as const;
}