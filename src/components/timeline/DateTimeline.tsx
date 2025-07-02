import { FlatList, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { DateItem, type IDate } from './DateItem';
import { isSameDay } from 'date-fns';

export interface DateTimelineProps {
	dates: IDate[];
	selectedDate: Date;
	onDatePress: (date: Date) => void;
}

export function DateTimeline({
	dates,
	selectedDate,
	onDatePress
}: DateTimelineProps) {

	return (
		<View>
			<FlatList
				data={dates}
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