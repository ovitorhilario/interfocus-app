import { StyleSheet } from 'react-native-unistyles'

const sharedColors = {
	primary: '#4A90E2',
	pastelBlue: '#4A90E2',
	error: '#ef476f',
	red: '#ef476f',
}

const sharedTheme = {
	fonts: {
		xs: 10,
		sm: 12,
		md: 15,
		lg: 16,
		xl: 18,
	},
	gap: (v: number) => v * 8,
	radius: (v: number) => v * 4,
	hexToRgba: (hex: string, alpha: number = 1) => {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}
}

const lightTheme = {
	colors: {
		...sharedColors,
		background: '#ffffff',
		onBackground: '#000000',
		accent: '#B4B4B8',
		muted: '#F0F0F0',
	},
	...sharedTheme
}

const darkTheme = {
	colors: {
		...sharedColors,
		background: '#202020',
		onBackground: '#ffffff',
		accent: '#404040',
		muted: '#303030',
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
