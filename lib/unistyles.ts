import { StyleSheet } from 'react-native-unistyles'

const sharedColors = {
	primary: '#4A90E2',
}

const sharedTheme = {
	fonts: {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18,
		xl: 20,
	},
	gap: (v: number) => v * 8,
}

const lightTheme = {
	colors: {
		...sharedColors,
		background: '#ffffff',
		onBackground: '#000000',
		accent: '#ced4da',
		muted: '#e9ecef',
	},
	...sharedTheme
}

const darkTheme = {
	colors: {
		...sharedColors,
		background: '#000000',
		onBackground: '#ffffff',
		accent: '#ffffff',
		muted: '#ffffff',
	},
	...sharedTheme
}

const appTheme = {
	light: lightTheme,
	dark: darkTheme
}

const breakpoints = {
	xs: 0,
	sm: 300,
	md: 500,
	lg: 800,
	xl: 1200
}

type AppBreakpoints = typeof breakpoints
type AppThemes = typeof appTheme

declare module 'react-native-unistyles' {
	export interface UnistylesThemes extends AppThemes {}
	export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
	settings: {
		adaptiveThemes: true
	},
	breakpoints,
	themes: {
		light: lightTheme,
		dark: darkTheme,
	}
})
