import { TouchableOpacity } from 'react-native';
import { StyleSheet, UnistylesVariants } from 'react-native-unistyles';
import { Typography } from './Typography';

type ChipProps = UnistylesVariants<typeof styles> & {
	title: string;
	icon?: React.ReactNode;
	onClick: () => void;
}

export function Chip({
	title,
	icon,
	onClick,
	isSelected,
}: ChipProps) {
	styles.useVariants({
		isSelected: isSelected
	});

	return (
		<TouchableOpacity 
			style={styles.chip}
			onPress={() => onClick()}
		>
			{icon}
			<Typography style={styles.chipText}>
				{title}
			</Typography>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create((theme) => ({
	chip: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: theme.gap(0.8),
		borderRadius: 24,
		paddingHorizontal: theme.gap(1.6),
		gap: theme.gap(1),
		variants: {
			isSelected: {
				true: {
					backgroundColor: theme.colors.muted,
				},
				default: {
					backgroundColor: 'transparent',
				}
			}
		}
	},
	chipText: {
		variants: {
			isSelected: {
				true: {
					color: theme.colors.onBackground,
				},
				default: {
					color: '#495057',
				}
			}
		}
	}
}));