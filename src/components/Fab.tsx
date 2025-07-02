import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export interface FabProps {
	onPress?: () => void;
	disabled?: boolean;
}

export function Fab({
	onPress = () => {},
	disabled = false,
}: FabProps) {
	return (
		<TouchableOpacity 
			style={styles.fab}
			onPress={onPress}
			disabled={disabled}
		>
			<MaterialCommunityIcons name="pencil" size={24} color="white" />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create((theme, rt) => ({
	fab: {
		position: 'absolute',
		bottom: theme.gap(2) + rt.insets.bottom,
		right: theme.gap(2) + rt.insets.right,
		width: 56,
		height: 56,
		borderRadius: 20,
		backgroundColor: theme.colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 4,
	},
}));