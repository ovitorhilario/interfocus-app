import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Feather } from '@expo/vector-icons';
import type { TaskFilter } from '@/types/task';
import { Chip } from '../Chip';

export interface FilterProps {
	onFilterChange: (filter: TaskFilter) => void;
	selectedFilter: TaskFilter;
}

export function FilterSection({
	onFilterChange,
	selectedFilter
}: FilterProps) {
	const { theme } = useUnistyles();

	return (
		<View style={styles.filter}>
			<Chip 
				title='Tudo' 
				onClick={() => onFilterChange('all')}
				isSelected={selectedFilter === 'all'}
				icon={<Feather name='filter' size={12} color={theme.colors.onBackground} />}
			/>

			{/* Divider */}
			<View style={styles.divider} />

			<Chip 
				title='Aberto' 
				onClick={() => onFilterChange('pending')}
				icon={<Feather name='flag' size={12} color={theme.colors.onBackground} />}
				isSelected={selectedFilter === 'pending'}
			/>
			<Chip 
				title='Concluído' 
				onClick={() => onFilterChange('completed')}
				icon={<Feather name='check-circle' size={12} color={theme.colors.onBackground} />}
				isSelected={selectedFilter === 'completed'}
			/>
		</View>
	);
}

const styles = StyleSheet.create((theme) => ({
	filter: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: theme.gap(0.2),
		marginTop: theme.gap(3),
		paddingHorizontal: theme.gap(2),
	},
	divider: {
		width: 1,
		height: 20,
		backgroundColor: '#495057',
		marginLeft: theme.gap(1),
		marginRight: theme.gap(1),
	}
}));