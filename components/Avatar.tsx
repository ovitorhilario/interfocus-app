import { StyleSheet } from 'react-native-unistyles';
import { Image } from 'expo-image';

export interface AvatarProps {
	resource?: string;
}

export function Avatar({ resource }: AvatarProps) {
	return (
		<Image 
			style={styles.avatar}
			source={resource}
		/>
	);
}

const styles = StyleSheet.create((theme) => ({
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
		objectFit: 'cover',
		overflow: 'hidden',
	},
}));