import { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { DateItem, type IDate } from './DateItem';
import { getTaskTimeline } from '@/utils/date';
import useTaskStore from '@/stores/useTaskStore';
import { isSameDay } from 'date-fns';

export interface DateTimelineProps {
	selectedDate: Date;
	onDatePress: (date: Date) => void;
}

export function DateTimeline({
	selectedDate,
	onDatePress
}: DateTimelineProps) {
	const hasTasksInDate = useTaskStore(s => s.hasTasksInDate);

	const getDates = useCallback(() => {
		const dates: IDate[] = getTaskTimeline().map(date => ({
			date,
			hasTasks: hasTasksInDate(date),
		}));
		return dates;
	}, []);

	return (
		<View>
			<FlatList
				data={getDates()}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.list}
				keyExtractor={(item) => item.date.toISOString()}
				renderItem={({ item }) => (
					<DateItem
						key={item.date.toISOString()}
						date={item}
						isSelected={isSameDay(item.date, selectedDate)}
						onDatePress={onDatePress}
					/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create((theme) => ({
	list: {
		gap: theme.gap(2) / 2,
		paddingHorizontal: theme.gap(2),
	}
}));