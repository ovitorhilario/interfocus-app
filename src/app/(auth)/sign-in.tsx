import { Stack } from 'expo-router';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useSession } from '@/context/auth';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet } from 'react-native-unistyles';
import { Typography } from '@/components/Typography';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const { signIn, isLoading } = useSession();
  
  async function handleSignIn() {
    try {
      signIn();
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  }

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.topHeader} />

      <Image 
        source={require('@/assets/images/store/splash-icon-light.png')}
        style={styles.image}
        contentFit="contain"
        alt="Interfocus Logo"
      />

      <TouchableOpacity
        onPress={handleSignIn}
        style={[styles.button, { opacity: isLoading ? 0.5 : 1 }]}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator 
            size={'small'}
            color={'#fff'}
          />
        ) : null}
        <Typography style={styles.buttonText} weight='medium'>
          Entrar com Interfocus
        </Typography>
        <Ionicons
          name='log-in-outline'
          size={24}
          color='#fff'
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topHeader: {
    backgroundColor: theme.colors.interfocus,
    width: '100%',
    height: 400,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    right: 0,
  }, 
  image: {
    width: 200,
    height: 200,
    marginBottom: theme.gap(4),
    borderRadius: theme.radius(100),
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  button: {
    paddingHorizontal: theme.gap(4),
    paddingVertical: theme.gap(2),
    backgroundColor: theme.colors.interfocus,
    borderRadius: theme.radius(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.gap(1),
  },
  buttonText: {
    color: '#fff',
  }
}));