import { useState } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { Header } from '@/components/Header';
import useProfileStore from '@/stores/useProfileStore';
import { StyleSheet } from 'react-native-unistyles';
import { DateTimeline } from '@/components/timeline/DateTimeline';
import { FilterSection } from '@/components/filter/FilterSection';
import { Fab } from '@/components/Fab';
import { getTaskTimeline } from '@/utils/date';
import { TaskSection } from '@/components/task/TaskSection';
import { CreateTaskModal } from '@/components/modal/CreateTaskModal';
import { ProfileModal } from '@/components/modal/ProfileModal';
import type { TaskFilter } from '@/types/task';

export default function Home() {
  const profile = useProfileStore(s => s.profile);
  const [filter, setFilter] = useState<TaskFilter>('pending')
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
 
  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Home header */}
      <Header 
        name={profile.name} 
        onOpenProfile={() => setProfileOpen(true)}
      />
      
      <DateTimeline 
        selectedDate={selectedDate}
        dates={getTaskTimeline().map(date => ({
          date,
          hasTasks: Math.random() > 0.6, // Randomly assign tasks for demo
        }))}
        onDatePress={(date) => {
          setSelectedDate(date);
        }}
      />

      <FilterSection 
        selectedFilter={filter}
        onFilterChange={setFilter}
      />   

      {/* Task section */}
      <TaskSection 
        filter={filter}
        selectedDate={selectedDate}
      />

      <CreateTaskModal 
        open={createTaskOpen}
        onClose={() => setCreateTaskOpen(false)}
      />
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      <Fab 
        onPress={() => setCreateTaskOpen(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.background,
  },
}));