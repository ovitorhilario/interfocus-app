import { PropsWithChildren } from 'react';
import { Text } from 'react-native';
import { 
	StyleSheet, 
	type UnistylesVariants 
} from 'react-native-unistyles';

type TypographyProps = 
	UnistylesVariants<typeof styles> &
	PropsWithChildren;

export function Typography({ 
	children, 
	...props 
}: TypographyProps) {
	styles.useVariants(props);

	return (
		<Text style={styles.text}>
			{children}
		</Text>
	);
}

const styles = StyleSheet.create((theme) => ({
	text: {
		variants: {
			size: {
				title: {
					color: theme.colors.barbie,
				},
				subtitle: {},
				default: {}
			}
		}
	}
}));