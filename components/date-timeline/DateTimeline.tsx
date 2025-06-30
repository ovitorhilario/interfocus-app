import { FlatList, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { DateItem, type IDate } from './DateItem';

export interface DateTimelineProps {
	dates: IDate[];
	onDatePress: (date: Date) => void;
}

export function DateTimeline({
	dates,
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