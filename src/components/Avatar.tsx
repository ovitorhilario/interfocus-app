import { StyleSheet, UnistylesVariants } from 'react-native-unistyles';
import { Image } from 'expo-image';

export type AvatarVariants = UnistylesVariants<typeof styles>;

export type AvatarProps = AvatarVariants & {
	resource?: string;
}

export function Avatar({ size, resource }: AvatarProps) {
	styles.useVariants({ size });

	return (
		<Image 
			style={styles.avatar}
			source={resource}
		/>
	);
}

const styles = StyleSheet.create((theme) => ({
	avatar: {
		objectFit: 'cover',
		overflow: 'hidden',
		variants: {
			size: {
				profile: {
					width: 100,
					height: 100,
					borderRadius: 500,
				},
				default: {
					width: 48,
					height: 48,
					borderRadius: 24,
				}
			}
		}
	},
}));