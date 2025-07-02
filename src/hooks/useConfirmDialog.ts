import { Alert } from 'react-native';

export function useConfirmDialog() {

	const showDialog = (message: string, onConfirm: () => void) => {
		Alert.alert(
			'Confirmação',
			message,
			[
				{
					text: 'Cancelar',
					style: 'cancel'
				},
				{
					text: 'Confirmar',
					onPress: onConfirm
				}
			],
			{ cancelable: true }
		);
	}

	return {
		showDialog
	};
}