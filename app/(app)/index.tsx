import { Button, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import useProfileStore from '@/stores/useProfileStore';

export default function Home() {
  const profile = useProfileStore(s => s.profile);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <Button
        title="Login with OAuth"
      >
      </Button>
      <Text>I m here</Text>
    </View>
  );
}
