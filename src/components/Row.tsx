import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { View, ViewProps } from 'react-native';

export type RowProps = PropsWithChildren 
	& ViewProps;

export function Row({
	style,
	...props
}: RowProps) {
	return (
		<View style={[styles.row, style]} {...props} />
	);
}

const styles = StyleSheet.create((theme) => ({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.gap(1),
	},
}));