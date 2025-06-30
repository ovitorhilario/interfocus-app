import { View } from 'react-native';
import { Typography } from '../Typography';
import { StyleSheet } from 'react-native-unistyles';
import { Chip } from '../Chip';

export interface FilterProps {

}

export function Filter({}: FilterProps) {
	return (
		<View style={styles.filter}>
			<Chip title='Aberto' />
			<Chip title='Pendente' isSelected />
			<Chip title='Todos' />


		</View>
	);
}

const styles = StyleSheet.create((theme) => ({
	filter: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: theme.gap(1),
		marginTop: theme.gap(3),
		paddingHorizontal: theme.gap(2),
	},
}));