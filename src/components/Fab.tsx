import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export interface FabProps extends TouchableOpacityProps {
	onPress?: () => void;
	icon?: React.ReactNode;
}

export function Fab({
	onPress = () => {},
	disabled = false,
	icon,
	style,
	...props
}: FabProps) {
	return (
		<TouchableOpacity 
			style={[styles.fab, { opacity: disabled ? 0.6 : 1 }, style]}
			onPress={onPress}
			disabled={disabled}
			{...props}
		>
			{icon || <MaterialCommunityIcons name="pencil" size={24} color="white" />}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create((theme, rt) => ({
	fab: {
		position: 'absolute',
		bottom: theme.gap(2) + rt.insets.bottom,
		right: theme.gap(2) + rt.insets.right,
		width: 56,
		height: 56,
		borderRadius: 20,
		backgroundColor: theme.colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 4,
	},
}));