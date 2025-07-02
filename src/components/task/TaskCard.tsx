import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Typography } from '../Typography';
import { Ionicons } from '@expo/vector-icons';
import type { Task } from '@/types/task';
import Constants from '@/utils/constants';
import { format } from 'date-fns';
import { Row } from '../Row';

export interface TaskProps {
	task: Task;
	isSelected: boolean;
	mutiSelect: boolean;
	onLongPress: (id: string) => void;
	onPress: (id: string) => void;
}

export function TaskCard({
	task,
	isSelected,
	mutiSelect,
	onLongPress,
	onPress
}: TaskProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const pickedColor = Constants.postItColors.find(c => c.id === task.colorId);
	const { theme } = useUnistyles();
	const background = theme.hexToRgba('#ffffff', 0.2);

	const handleCollapse = () => {
		if (isSelected || mutiSelect) {
			onPress(task.id);
			// If the task is selected, we don't toggle the expansion
			return;
		}
		setIsExpanded(e => !e);
	}

	useEffect(() => {
		setIsExpanded(false);
	}, [isSelected]);

	return (
		<TouchableOpacity 
			style={[styles.task]}
			onPress={handleCollapse}
			onLongPress={() => onLongPress(task.id)}
		>
			{/* Left Side */}
			<View 
				style={[
					styles.leftIcon, 
					{ backgroundColor: isSelected ? theme.colors.onBackground : pickedColor?.color || background }
				]}>
				{isSelected ? (
					<Ionicons 
						name='checkmark-sharp' 
						size={20} 
						color={theme.colors.background} 
					/>
				) : task.completedAt !== null ? (
					<Ionicons 
						name='checkmark-done-sharp' 
						size={20} 
						color={theme.colors.onBackground} 
					/>	
				) : (
					<Ionicons 
						name='bookmark' 
						size={20} 
						color={theme.colors.onBackground} 
					/>
				)}
			</View>

			{/*  */}
			<View style={styles.article}>
				<Typography weight='medium' numberOfLines={1}>
					{task.title}
				</Typography>
				{/* <Typography size='sm' numberOfLines={1} style={{ color: theme.colors.onBackground }}>
					{task.scheduledAt ? format(task.scheduledAt, 'dd/MM/yyyy') : 'Sem data agendada'}
				</Typography> */}
				
				{isExpanded ? (
					<>
						<Typography numberOfLines={2} style={{marginTop: theme.gap(2) }}>
							{task.description}
						</Typography>
						
						
						<Row style={{ marginTop: theme.gap(2) }}>
							<Ionicons 
								name='calendar-outline' 
								size={16} 
								color={theme.colors.onBackground} 
							/>
							<Typography>
								Data de criação
							</Typography>
						</Row>
						<Typography size='sm'>
							{format(task.createdAt, 'dd/MM/yyyy HH:mm')}
						</Typography>
					</>
				) : null}
			</View>
			<View style={styles.rightSide}>
				<Ionicons name='calendar-outline' size={24} color={theme.colors.onBackground} />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create((theme, rt) => ({
	task: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.gap(2),
		backgroundColor: theme.colors.muted,
		paddingHorizontal: theme.gap(2),
		paddingVertical: theme.gap(2),
		borderRadius: theme.radius(4),
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
		backgroundColor: rt.colorScheme === 'dark' 
			? theme.hexToRgba("#ffffff", 0.2) : "#ffffff",
		overflow: 'hidden',
		alignSelf: 'flex-start',
	},
	rightSide: {
		width: 40,
		height: 40,
		marginLeft: 'auto',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'flex-start',
	}
}));
