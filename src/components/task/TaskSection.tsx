import useTaskStore from '@/stores/useTaskStore';
import { FlatList, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { TaskCard } from './TaskCard';
import { Typography } from '../Typography';
import { TaskFilter } from '@/types/task';
import { isSameDay } from 'date-fns';

export interface TaskSectionProps {
	filter: TaskFilter;
	selectedDate: Date;
	multiSelectTasks: string[];
	onLongPress: (taskId: string) => void;
	onPress: (taskId: string) => void;
}

export function TaskSection({
	filter,
	selectedDate,
	multiSelectTasks,
	onLongPress,
	onPress
}: TaskSectionProps) {
	const getSortedTasks = useTaskStore(s => s.getSortedTasks);

	const filteredTasks = getSortedTasks('asc').filter(task => {
		if (selectedDate && task.scheduledAt !== null) {
			// If a date is selected, filter tasks by scheduledAt
			if (!isSameDay(task.scheduledAt, selectedDate)) {
				return false;
			}
		}
		if (filter === 'all') {
			return true;
		}
		if (filter === 'pending') {
			return !task.completedAt;
		}
		if (filter === 'completed') {
			return !!task.completedAt;
		}
		return false;
	});

	return (
		<View style={styles.section}>
			<FlatList 
				data={filteredTasks}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TaskCard 
						task={item} 
						isSelected={multiSelectTasks.includes(item.id) || false}
						mutiSelect={multiSelectTasks.length > 0}
						onPress={onPress}
						onLongPress={onLongPress}
					/>
				)}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ gap: 8 }}
				ListEmptyComponent={() => (
					<View style={styles.emptyContainer}>
						<Typography size='sm'>Nenhuma tarefa encontrada.</Typography>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create((theme) => ({
	section: {
		marginTop: theme.gap(2),
		paddingVertical: theme.gap(3),
		paddingHorizontal: theme.gap(2),
		gap: theme.gap(1),
	},
	emptyContainer: {
		padding: theme.gap(2),
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.colors.muted,
		borderRadius: 16,
		marginTop: theme.gap(2),
	}
}));