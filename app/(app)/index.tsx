import { Button, View } from 'react-native';
import { Stack } from 'expo-router';
import { useSession } from '@/context/auth';
import { Header } from '@/components/Header';
import useProfileStore from '@/stores/useProfileStore';
import { StyleSheet } from 'react-native-unistyles';
import { DateItem } from '@/components/date-timeline/DateItem';
import { DateTimeline } from '@/components/date-timeline/DateTimeline';
import { Filter } from '@/components/filter/Filter';
import { Task } from '@/components/task/Task';
import { Fab } from '@/components/Fab';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { Typography } from '@/components/Typography';
import { TaskEditSheet } from '@/components/bottom-sheet/TaskEdit';

export default function Home() {
  const profile = useProfileStore(s => s.profile);
  const { signOut } = useSession();
  
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <Header name={profile.name} />
      
      <DateTimeline 
        dates={[
          { date: new Date(), hasTasks: true },
          { date: new Date(), hasTasks: true },
          { date: new Date(), hasTasks: false },
          { date: new Date(), hasTasks: false },
          { date: new Date(), hasTasks: false },
          { date: new Date(), hasTasks: false },
          { date: new Date(), hasTasks: true },
          { date: new Date(), hasTasks: false },
          { date: new Date(), hasTasks: false },
          { date: new Date(), hasTasks: false },
        ]}
        onDatePress={() => {}}
      />

      <Filter />

      <Task 
        title="Task 1"
        description="This is a description of task 1"
      />
      <Task 
        title="Task 1"
        description="This is a description of task 1"
      />
      <Task 
        title="Task 1"
        description="This is a description of task 1"
      />
      <Task 
        title="Task 1"
        description="This is a description of task 1"
      />

      <TaskEditSheet 
        ref={bottomSheetModalRef}
      />
      <Fab 
        onPress={handlePresentModalPress}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    flexDirection: 'column',
  },
}));