import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Typography } from './Typography';
import { Avatar } from './Avatar';

export interface HeaderProps {
	name: string;
}

export function Header({ 
	name 
}: HeaderProps) {

	return (
		<View style={styles.header}>
			<View style={styles.leftSide}>
				<Typography size='title' numberOfLines={1}>
					Olá, {name}
				</Typography>
				<Typography >Suas tarefas</Typography>
			</View>

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
}));