import React from 'react';
import { Stack } from 'expo-router';
import { SessionProvider, useSession } from '@/context/auth';
import { SplashScreenController } from '@/components/Splash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native-unistyles';
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavigation />
      <StatusBar style="auto" />
    </SessionProvider>
  );
} 

function RootNavigation() {
  const { session } = useSession();

  return (
    <GestureHandlerRootView style={styles.root}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Protected guard={!!session}>
            <Stack.Screen name="(app)/index" />
          </Stack.Protected>
          <Stack.Protected guard={!session}>
            <Stack.Screen name="(auth)/sign-in" />
          </Stack.Protected>
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
  },
}));