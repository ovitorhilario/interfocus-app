import { TouchableOpacity, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Typography } from './Typography';
import { Avatar } from './Avatar';
import { Ionicons } from '@expo/vector-icons';

export interface HeaderProps {
	name: string;
	onOpenProfile: () => void;
}

export function Header({ 
	name,
	onOpenProfile
}: HeaderProps) {
	const { theme } = useUnistyles();

	return (
		<View style={styles.header}>
			<View style={styles.leftSide}>
				<Typography size="xl" weight="bold" numberOfLines={1}>
					Olá, {name}
				</Typography>
				<Typography >Suas tarefas</Typography>
			</View>

			<TouchableOpacity 
				style={styles.settingsButton}
				onPress={onOpenProfile}
			>
				<Ionicons 
					name="person-circle-outline"
					size={24} 
					color={theme.colors.onBackground}
				/>
			</TouchableOpacity>
			<Avatar
				resource={require('@/assets/images/avatar.jpg')}
			/>
		</View>
	);
}

const styles = StyleSheet.create((theme, rt) => ({
	header: {
		paddingTop: rt.insets.top + theme.gap(2),
		paddingBottom: theme.gap(3),
		paddingHorizontal: theme.gap(2),
		alignItems: 'center',
		flexDirection: 'row',
		gap: theme.gap(2)
	},
	leftSide: {
		flex: 1
	},
	settingsButton: {
		width: 40,
		height: 40,
		borderRadius: 24,
		backgroundColor: theme.colors.muted,
		alignItems: 'center',
		justifyContent: 'center'
	}
}));