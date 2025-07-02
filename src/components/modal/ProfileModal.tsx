import { BlurView } from 'expo-blur';
import { Modal, TouchableOpacity, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import { Typography } from '../Typography';
import { Avatar } from '../Avatar';

export interface ProfileModalProps {
	open: boolean;
	onClose: () => void;
}

export function ProfileModal({ 
	open, 
	onClose
}: ProfileModalProps) {
	const { theme } = useUnistyles();

	return (
		<Modal 
			visible={open} 
			animationType='fade' 
			transparent={true}
		>
			<BlurView style={styles.modal} intensity={100} tint='dark'>
				<View style={styles.container}>
					<ImageBackground 
						source={require('@/assets/images/bg-profile.jpg')}
						style={styles.background}
					/>
					<View style={styles.avatar}>
						<Avatar 
							resource={require('@/assets/images/avatar.jpg')}
							size='profile'
						/>
					</View>
					
					{/* Informações do usuário */}
					<View>
						<Typography>
							Olá, <Typography weight='bold'>João</Typography>
						</Typography>

						<Typography size='sm'>
							login: teste@gmail.com
						</Typography>
						
						<Typography size='sm'>
							Usuário desde: <Typography weight='bold' size='sm'>01/01/2023</Typography>
						</Typography>
					</View>
					
					
					{/* Botão para encerrar a sesão */}
					<TouchableOpacity
						style={styles.finishButton}
						onPress={onClose}
					>
						<Ionicons name='log-out-outline' size={24} color={theme.colors.red} />
						<Typography style={styles.finishButtonText} weight='medium' size='sm'>
							Encerrar sessão
						</Typography>
					</TouchableOpacity>

					{/* Botão para finalizar sessão */}
					<TouchableOpacity 
						style={styles.closeButton}
						onPress={onClose}
					>
						<Ionicons name='close' size={24} color={theme.colors.onBackground} />
					</TouchableOpacity>

				</View>
			</BlurView>
		</Modal>
	);
}

const styles = StyleSheet.create((theme) => ({
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: theme.gap(2),
	},
	container: {
		width: '100%',
		backgroundColor: theme.colors.background,
		borderRadius: theme.gap(1.6),
		padding: theme.gap(2),
		position: 'relative',
		overflow: 'hidden',
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 100,
		objectFit: 'cover',
		opacity: 0.5
	},
	avatar: {
		alignSelf: 'center',
		borderWidth: 4,
		borderColor: theme.colors.background,
		borderRadius: 100,
	},
	finishButton: {
		marginTop: theme.gap(3),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: theme.gap(1),
		backgroundColor: theme.hexToRgba(theme.colors.red, 0.1),
		paddingVertical: theme.gap(1.6),
		paddingHorizontal: theme.gap(3),
		borderRadius: theme.gap(1.6),
	},
	finishButtonText: {
		color: theme.colors.error,
	},
	closeButton: {
		position: 'absolute',
		top: theme.gap(2),
		right: theme.gap(2),
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: theme.colors.muted,
		alignItems: 'center',
		justifyContent: 'center',
	}
}));