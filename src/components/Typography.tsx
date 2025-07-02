import { Text, type TextProps } from 'react-native';
import { 
	StyleSheet, 
	type UnistylesVariants 
} from 'react-native-unistyles';

type TypographyProps = 
	UnistylesVariants<typeof styles> &
	TextProps;

export function Typography({ 
	style,
	size,
	weight,
	...props 
}: TypographyProps) {
	styles.useVariants({ size, weight });

	return (
		<Text style={[styles.text, style]} {...props} />
	);
}

const styles = StyleSheet.create((theme) => ({
	text: {
		includeFontPadding: false,
		color: theme.colors.onBackground,
		variants: {
			size: {
				xl: {
					fontSize: theme.fonts.xl,
				},
				lg: {
					fontSize: theme.fonts.lg,
				},
				sm: {
					fontSize: theme.fonts.sm,
				},
				xs: {
					fontSize: theme.fonts.xs,
				},
				default: {
					fontSize: theme.fonts.md,
				}
			},
			weight: {
				light: {
					fontFamily: 'Rubik-Light',
					fontWeight: '300'
				},
				medium: {
					fontFamily: 'Rubik-Medium',
					fontWeight: '500',
				},
				semibold: {
					fontFamily: 'Rubik-SemiBold',
					fontWeight: '600'
				},
				bold: {
					fontFamily: 'Rubik-Bold',
					fontWeight: '700'
				},
				default: {
					fontFamily: 'Rubik-Regular',
					fontWeight: '400'
				}
			}
		}
	}
}));