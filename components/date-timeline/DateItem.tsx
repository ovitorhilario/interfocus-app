import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Typography } from '../Typography';
import { useCallback } from 'react';

export type IDate = {
	date: Date;
	hasTasks: boolean;
}

export interface DateItemProps {
	date: IDate;
	onDatePress: (date: Date) => void;
}

export function DateItem({ 
	date,
	onDatePress
}: DateItemProps) {
	styles.useVariants({
		isHighlighted: date.hasTasks,
		isToday: date.hasTasks && date.date.toDateString() === new Date().toDateString(),
	});

	const formatter = new Intl.DateTimeFormat('pt-BR', {
		weekday: 'short',
	});

	const capitalize = useCallback((str: string) => {
		const trimmed = str.trim().substring(0, 3).toLowerCase();
		return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
	}, []);

	return (
		<TouchableOpacity 
			style={styles.item}
			onPress={() => onDatePress(date.date)}
		>
			<Typography size='mini' style={styles.weekdayText}>
				{capitalize(formatter.format(date.date))}
			</Typography>

			<View style={styles.dayCircle}>
				<Typography size='label' style={styles.dayText}>
					{date.date.getDate()}
				</Typography>
			</View>

			<View style={styles.dayHighlight} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create((theme) => ({
	item: {
		alignItems: 'center',
	},
	weekdayText: {
		alignSelf: 'stretch',
		textAlign: 'center',
	},
	dayCircle: {
		height: 36,
		width: 36,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 18,
		marginTop: 3,
		variants: {
			isToday: {
				true: {
					backgroundColor: theme.colors.onBackground,
				},
			}
		}
	},
	dayText: {
		alignSelf: 'stretch',
		textAlign: 'center',
		variants: {
			isToday: {
				true: {
					color: theme.colors.background,
				},
				default: {
					color: theme.colors.onBackground,
				}
			}
		}
	},
	dayHighlight: {
		marginTop: theme.gap(1) / 2,
		width: 6,
		height: 6,
		borderRadius: 3,
		overflow: 'hidden',
		variants: {
			isHighlighted: {
				true: {
					backgroundColor: theme.colors.primary,
				}
			}
		}
	}
}));