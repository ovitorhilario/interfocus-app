import { useEffect, useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { TextInput, Modal, ScrollView, TouchableOpacity, View, Switch } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { ColorPicker } from '../picker/ColorPicker';
import useTaskStore from '@/stores/useTaskStore';
import { Typography } from '../Typography';
import { format, isValid } from 'date-fns';
import Constants from '@/utils/constants';
import { BlurView } from 'expo-blur';

export interface EditTaskModalProps {
	edit?: string | null;
	onClose: () => void;
}

export function EditTaskModal({ 
	edit, 
	onClose 
}: EditTaskModalProps) {
	const { theme } = useUnistyles();

	// form (create)
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [colorId, setColorId] = useState(Constants.postItColors[0].id || 1);
	const [date, setDate] = useState(new Date());

	// controllers (errors, date, refs)
	const [descriptionRef, setDescriptionRef] = useState<TextInput | null>(null);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [isScheduled, setIsScheduled] = useState(false);
	const [error, setError] = useState<string>('');

	// (submit) function
	const addTask = useTaskStore(s => s.addTask);
	const getTask = useTaskStore(s => s.getTask);

	/**
	 * Res
	 */
	useEffect(() => {
		if (!edit) {
			return;
		}
		const handleOpenEdit = () => {
			const task = getTask(edit);
			if (!task) {
				return;
			}

			setTitle(task.title);
			setDescription(task.description);
			setColorId(task.colorId || Constants.postItColors[0].id || 1);
			setDate(task.scheduledAt ? new Date(task.scheduledAt) : new Date());
			setIsScheduled(!!task.scheduledAt);
		}
		handleOpenEdit();
	}, [edit]);

	const onChangeDate = (_: DateTimePickerEvent, _date?: Date) => {
		setShowDatePicker(false);
		if (!_date || !isValid(_date)) {
			return;
		}
    setDate(_date);
  }

	const onSubmit = async () => {
		setError('');

		if (!title.trim()) {
			setError('Título é obrigatório');
			return;
		}

		if (!description.trim()) {
			setError('Descrição é obrigatória');
			return;
		}

		if (isScheduled && !isValid(date)) {
			setError('Data inválida');
			return;
		}	

		addTask({
			title,
			description,
			colorId,
			userId: 1,
			scheduledAt: isScheduled ? date : null,
		});
		onClose();
	}

	return (
		<Modal 
			visible={edit !== undefined && edit !== null} 
			animationType='fade' 
			transparent={true}
			key={edit || 'edit-task-modal'}
		>
			<BlurView style={styles.modal} intensity={80} tint='dark'>
				<ScrollView style={styles.scroll}>
					
					<View style={styles.container}>

						<View style={styles.header}>
							<TouchableOpacity
								style={styles.backIconContainer}
								onPress={() => onClose()}
							>
								<Feather name='chevron-left' size={24} color={theme.colors.onBackground} />
							</TouchableOpacity>
							<Typography weight='medium' size='lg' >
								Editar tarefa
							</Typography>

							<TouchableOpacity
								style={[
									styles.submitButton, 
									{ backgroundColor: theme.hexToRgba(theme.colors.primary, 0.2)}
								]}
								onPress={onSubmit}
							>
								<Typography style={styles.submitButtonText} weight='medium'>
									Atualizar
								</Typography>
							</TouchableOpacity>
								
						</View>

						<Typography>
							Uma cor para a tarefa
						</Typography>
						<ColorPicker
							colors={[...Constants.postItColors]}
							onSelect={setColorId}
							selectedColor={colorId}
						/>
						
						<TextInput
							style={styles.input}
							value={title}
							onChangeText={setTitle}
							placeholder='Título'
							onSubmitEditing={() => descriptionRef?.focus()}
							returnKeyType='next'
							key={'title-edit-task-modal'}
						/>
						<TextInput  
							ref={setDescriptionRef}
							style={[styles.input, styles.multiline]}
							placeholder='Descrição'
							value={description}
							onChangeText={setDescription}
							numberOfLines={3}	
							multiline
							key={'description-edit-task-modal'}
						/>
						{error ? (
							<Typography style={{ color: theme.colors.error }} size='sm'>
								* {error}
							</Typography>
						) : null}
						
						<View style={styles.schedule}>
							<Typography>
								Tarefa agendada
							</Typography>
							<Switch 
								value={isScheduled}
								onValueChange={setIsScheduled}
								thumbColor={theme.colors.primary}
								trackColor={{ 
									false: theme.hexToRgba(theme.colors.onBackground, 0.2), 
									true: theme.hexToRgba(theme.colors.primary, 0.6) 
								}}
							/>
						</View>

						<Typography style={{ color: theme.hexToRgba(theme.colors.onBackground, 0.6) }} size='sm'>
							<Typography size='sm'>
								As tarefas sempre estão visíveis{", "}
							</Typography>
							mas você pode agendar para exibir somente em uma data.
						</Typography>

						<TouchableOpacity 
							style={[
								styles.input, styles.selectDate, 
								{ opacity: isScheduled ? 1 : 0.3 }
							]}
							onPress={() => setShowDatePicker(true)}
							disabled={!isScheduled}
						>
							<Ionicons name='calendar-outline' size={24} color={theme.colors.onBackground} />
							<Typography>
								{format(date, 'dd/MM/yyyy')}
							</Typography>
						</TouchableOpacity>

						{showDatePicker && (
							<DateTimePicker
								value={date}
								mode={'date'}
								is24Hour={true}
								disabled={!isScheduled}
								minimumDate={new Date()}
								onChange={onChangeDate}
							/>
						)}
					</View>

				</ScrollView>
			</BlurView>
		</Modal>
	);
}

const styles = StyleSheet.create((theme, rt) => ({
	modal: {
		flex: 1,
		paddingHorizontal: theme.gap(2),
		paddingTop: rt.insets.top + theme.gap(2),
	},
	scroll: {
		flex: 1
	},
	container: {
		flex: 1,
		gap: theme.gap(2),
		backgroundColor: theme.colors.background,
		borderRadius: theme.gap(2),
		paddingHorizontal: theme.gap(2),
		paddingVertical: theme.gap(3),
		overflow: 'hidden',
	},
	sheet: {
		flex: 1,
		minHeight: 400,
		gap: theme.gap(2),
		paddingHorizontal: theme.gap(2),
		paddingTop: theme.gap(1),
		paddingBottom: theme.gap(3),
		backgroundColor: theme.colors.background,
	},
	indicatorStyle: {
		backgroundColor: theme.colors.accent,
		minWidth: 60
	},
	backgroundSheet: {
		backgroundColor: theme.colors.background,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.gap(2),
		paddingRight: theme.gap(1),
	},
	backIconContainer: {
		width: 36,
		height: 36,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
		backgroundColor: theme.colors.muted
	},
	input: {
		paddingHorizontal: theme.gap(2),
		paddingVertical: theme.gap(1.5),
		borderRadius: theme.radius(4),
		backgroundColor: theme.colors.muted,
		color: theme.colors.onBackground,
		fontSize: theme.fonts.md,
		fontFamily: 'Rubik-Regular',
	},
	selectDate: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.gap(1),
	},
	multiline: {
		minHeight: 100,
		maxHeight: 200,
		paddingTop: theme.gap(1.75),
		textAlignVertical: 'top',
	},
	schedule: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.gap(1),
	},
	submitButton: {
		marginLeft: 'auto',
		backgroundColor: theme.colors.muted,
		paddingHorizontal: theme.gap(3),
		paddingVertical: theme.gap(0.5),
		borderRadius: theme.radius(6),
		overflow: 'hidden',
	},
	submitButtonText: {
		color: theme.colors.primary,
	}
}));