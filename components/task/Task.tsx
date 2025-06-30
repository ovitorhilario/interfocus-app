import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Typography } from "../Typography";
import { Feather } from "@expo/vector-icons";

export interface TaskProps {
	title: string;
	description?: string;
}

export function Task({
	title = "Tarefa",
	description = "",
}: TaskProps) {
	return (
		<TouchableOpacity style={styles.task}>
			<View style={styles.icon}>
				{/* <Feather name="check-circle" size={20} color="black" /> */}
			</View>
			<View style={styles.article}>
				<Typography size="subtitle" numberOfLines={1}>
					{title}
				</Typography>
				<Typography numberOfLines={2}>
					<Feather name="info" size={16} color="black" />
					{description}
				</Typography>
			</View>
			<View style={styles.rightSide}>
				<Feather name="chevron-right" size={24} color="black" />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create((theme) => ({
	task: {
		flexDirection: 'row',
		gap: theme.gap(2),
		alignItems: 'center',
		backgroundColor: theme.colors.muted,
		paddingHorizontal: theme.gap(3),
		paddingVertical: theme.gap(3),
		borderRadius: 24,
		marginHorizontal: theme.gap(2),
		marginTop: theme.gap(1.5),
	},
	icon: {
		width: 28,
		height: 28,
		borderWidth: 2,
		borderColor: theme.colors.accent,
		borderRadius: 10,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
	article: {
		alignItems: 'flex-start',
	},
	rightSide: {
		marginLeft: 'auto',
		alignItems: 'center',
		justifyContent: 'center',
	}
}));
