import { TouchableOpacity, View } from "react-native";
import { Typography } from "./Typography";
import { StyleSheet, UnistylesVariants } from "react-native-unistyles";

type ChipProps = UnistylesVariants<typeof styles> & {
	title: string;
}

export function Chip({
	title = "Chip",
	...props
}: ChipProps) {
	styles.useVariants({
		isSelected: props.isSelected
	});

	return (
		<TouchableOpacity style={styles.chip}>
			<Typography size="label">
				{title}
			</Typography>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create((theme) => ({
	chip: {
		paddingHorizontal: theme.gap(2),
		paddingVertical: theme.gap(0.8),
		borderRadius: 24,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
		variants: {
			isSelected: {
				true: {
					backgroundColor: theme.colors.muted,
					borderColor: theme.colors.accent,
				},
				default: {
					backgroundColor: 'transparent',
					borderColor: theme.colors.accent,
				}
			}
		}
	}
}));