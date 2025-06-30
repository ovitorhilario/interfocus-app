import { PropsWithChildren } from 'react';
import { Text } from 'react-native';
import { 
	StyleSheet, 
	type UnistylesVariants 
} from 'react-native-unistyles';

type TypographyProps = 
	UnistylesVariants<typeof styles> &
	React.ComponentProps<typeof Text> &
	PropsWithChildren;

export function Typography({ 
	children,
	style,
	...props 
}: TypographyProps) {
	styles.useVariants({
		size: props.size
	});

	return (
		<Text style={[styles.text, style]} {...props}>
			{children}
		</Text>
	);
}

const styles = StyleSheet.create((theme) => ({
	text: {
		color: theme.colors.onBackground,
		variants: {
			size: {
				title: {
					fontSize: theme.fonts.xl,
					fontFamily: 'Rubik-SemiBold',
				},
				subtitle: {
					fontSize: theme.fonts.lg,
					fontFamily: 'Rubik-Medium',
				},
				label: {
					fontSize: theme.fonts.sm,
					fontFamily: 'Rubik-Regular'
				},
				mini: {
					fontSize: theme.fonts.xs,
					fontFamily: 'Rubik-Regular'
				},
				default: {
					fontSize: theme.fonts.md,
					fontFamily: 'Rubik-Regular'
				}
			},
		}
	}
}));