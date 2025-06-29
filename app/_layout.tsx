import React from 'react';
import { Stack } from 'expo-router';
import { SessionProvider, useSession } from '@/context/auth';
import { SplashScreenController } from '@/components/Splash';
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
    <Stack>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)/index" />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)/sign-in" />
      </Stack.Protected>
    </Stack>
  );
}