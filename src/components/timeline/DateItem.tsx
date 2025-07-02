import { memo, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Typography } from '../Typography';

export type IDate = {
	date: Date;
	hasTasks: boolean;
}

export interface DateItemProps {
	date: IDate;
	isSelected: boolean;
	onDatePress: (date: Date) => void;
}

const DateItemComponent = ({ 
	date,
	isSelected,
	onDatePress
}: DateItemProps) => {
	styles.useVariants({
		isHighlighted: date.hasTasks,
		isSelected: isSelected,
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
			<Typography size='sm' style={styles.weekdayText}>
				{capitalize(formatter.format(date.date))}
			</Typography>

			<View style={styles.dayCircle}>
				<Typography size='sm' style={styles.dayText}>
					{date.date.getDate()}
				</Typography>
			</View>

			<View style={styles.dayHighlight} />
		</TouchableOpacity>
	);
}

export const DateItem = memo(DateItemComponent);

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
		overflow: 'hidden',
		marginTop: 3,
		variants: {
			isSelected: {
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
			isSelected: {
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