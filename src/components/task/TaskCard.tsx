import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Typography } from '../Typography';
import { Ionicons } from '@expo/vector-icons';
import type { Task } from '@/types/task';
import Constants from '@/utils/constants';

export interface TaskProps {
	task: Task;
}

export function TaskCard({
	task,
}: TaskProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const pickedColor = Constants.postItColors.find(c => c.id === task.colorId);
	const { theme } = useUnistyles();
	const background = theme.hexToRgba('#ffffff', 0.2);

	const handleCollapse = () => {
		setIsExpanded(e => !e);
	}

	return (
		<TouchableOpacity 
			style={[styles.task, { paddingBottom: isExpanded ? theme.gap(4) : theme.gap(2) }]}
			onPress={handleCollapse}
		>
			<View style={styles.leftIcon}>
				<Ionicons name='bookmark' size={20} color={pickedColor?.color || theme.colors.onBackground} />
			</View>
			<View style={styles.article}>
				<Typography weight='medium' numberOfLines={1}>
					{task.title}
				</Typography>
				
				{isExpanded ? (
					<Typography numberOfLines={2} size='sm'>
						{task.description}
					</Typography>
				) : null}
			</View>
			<View style={styles.rightSide}>
				<Ionicons name='calendar-outline' size={24} color={theme.colors.onBackground} />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create((theme) => ({
	task: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.gap(2),
		backgroundColor: theme.colors.muted,
		paddingHorizontal: theme.gap(2),
		paddingVertical: theme.gap(2),
		borderRadius: 24,
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
	leftIcon: {
		width: 40,
		height: 40,
		borderRadius: theme.radius(2),
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.hexToRgba("#ffffff", 0.2),
		overflow: 'hidden',
		alignSelf: 'flex-start',
	},
	rightSide: {
		marginLeft: 'auto',
		alignItems: 'center',
		justifyContent: 'center',
	}
}));
