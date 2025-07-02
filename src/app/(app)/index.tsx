import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack } from 'expo-router';
import { Header } from '@/components/Header';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { CreateTaskModal } from '@/components/modal/CreateTaskModal';
import { DateTimeline } from '@/components/timeline/DateTimeline';
import { FilterSection } from '@/components/filter/FilterSection';
import { EditTaskModal } from '@/components/modal/EditTaskModal';
import { ProfileModal } from '@/components/modal/ProfileModal';
import { TaskSection } from '@/components/task/TaskSection';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTaskStore from '@/stores/useTaskStore';
import type { TaskFilter } from '@/types/task';
import { Fab } from '@/components/Fab';
import { sleep } from '@/utils/sleep';

export default function Home() {
  const [filter, setFilter] = useState<TaskFilter>('pending')
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [editTaskOpen, setEditTaskOpen] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const { theme } = useUnistyles();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [multiSelectTasks, setMultiSelectTasks] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);
  const deleteTasks = useTaskStore(s => s.deleteTasks);
  const markAsCompleted = useTaskStore(s => s.markAsCompleted);
  const { showDialog } = useConfirmDialog();

  // long press and press handlers (for each task)
  function handleMultiSelect(taskId: string) {
    if (multiSelectTasks.includes(taskId)) {
      setMultiSelectTasks(tasks => tasks.filter(id => id !== taskId));
    } else {
      setMultiSelectTasks([...multiSelectTasks, taskId]);
    }
  }

  // This function is used when the user presses a task while in multi-select mode
  function handlePressWhenMultiSelect(taskId: string) {
    if (multiSelectTasks.includes(taskId)) {
      setMultiSelectTasks(tasks => tasks.filter(id => id !== taskId));
    } else {
      setMultiSelectTasks([...multiSelectTasks, taskId]);
    }
  }

  // tasks (functions)
  async function deleteSelectedTasks() {
    if (multiSelectTasks.length === 0) {
      return;
    }

    const deleteCallback = async () => {
      setIsPending(true);
      try {
        await sleep(1000); // simula 1s
        deleteTasks(multiSelectTasks);
        setMultiSelectTasks([]);
      } catch (error) {
        console.error('Failed to delete tasks:', error);
      } finally {
        setIsPending(false);
      }
    }

    showDialog(
      'Você tem certeza que deseja excluir as tarefas selecionadas?', 
      deleteCallback
    );
  }

  // Mark tasks as completed
  function markAsCompletedTasks() {
    if (multiSelectTasks.length === 0) {
      return;
    }
    markAsCompleted(multiSelectTasks);
    setMultiSelectTasks([]);
  }

  function handleEditSelected() {
    if (multiSelectTasks.length !== 1) {
      return;
    }
    setEditTaskOpen(multiSelectTasks[0]);
    setMultiSelectTasks([]);
  }

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Home header */}
      <Header 
        onOpenProfile={() => setProfileOpen(true)}
      />
      
      {/* Timeline with days */}
      <DateTimeline 
        selectedDate={selectedDate}
        onDatePress={setSelectedDate}
      />

      {/* Filter by task state */}
      <FilterSection 
        selectedFilter={filter}
        onFilterChange={setFilter}
      />   

      {/* Task section */}
      <TaskSection 
        filter={filter}
        selectedDate={selectedDate}
        onLongPress={handleMultiSelect}
        onPress={handlePressWhenMultiSelect}
        multiSelectTasks={multiSelectTasks}
      />

      {/* Modals (create, edit, profile) */}
      <CreateTaskModal 
        open={createTaskOpen}
        onClose={() => setCreateTaskOpen(false)}
      />
      <EditTaskModal 
        edit={editTaskOpen}
        onClose={() => setEditTaskOpen(null)}
      />
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      {/* Floating Action Buttons */}
      {multiSelectTasks.length === 1 ? (
        <Fab 
          style={[styles.fabEditOrClear, { backgroundColor: theme.colors.primary }]}
          onPress={handleEditSelected}
          icon={<MaterialCommunityIcons name="pencil" size={24} color="white" />}
          disabled={isPending}
        />
      ) : null}
      {multiSelectTasks.length > 0 ? (
        <>
          <Fab 
            style={[styles.fabAddOrDelete, { backgroundColor: theme.colors.error }]}
            onPress={deleteSelectedTasks}
            icon={isPending ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <MaterialCommunityIcons name="trash-can" size={24} color="white" />
            )}
            disabled={isPending}
          />
          <Fab 
            style={[styles.fabMaskAsDone, { backgroundColor: theme.colors.onBackground }]}
            onPress={markAsCompletedTasks}
            icon={<MaterialCommunityIcons name="check" size={24} color={theme.colors.background} />}
            disabled={isPending}
          />
          {multiSelectTasks.length > 1 ? (
            <Fab 
              style={[styles.fabEditOrClear, { backgroundColor: theme.colors.primary }]}
              onPress={() => setMultiSelectTasks([])}
              icon={<MaterialCommunityIcons name="close" size={24} color="white" />}
              disabled={isPending}
            />
          ) : null}
        </>
      ) : (
        <Fab 
          style={[styles.fabAddOrDelete, { backgroundColor: theme.colors.primary }]}
          onPress={() => setCreateTaskOpen(true)}
          icon={<MaterialCommunityIcons name="plus" size={24} color="white" />}
          disabled={isPending}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.background,
  },
  fabAddOrDelete: {
    position: 'absolute',
		bottom: theme.gap(2) + rt.insets.bottom,
		right: theme.gap(2) + rt.insets.right,
		backgroundColor: theme.colors.primary,
  },
  fabEditOrClear: {
    position: 'absolute',
    bottom: theme.gap(2) + rt.insets.bottom + 70,
    right: theme.gap(2) + rt.insets.right,
    backgroundColor: theme.colors.error,
  },
  fabMaskAsDone: {
    position: 'absolute',
    bottom: theme.gap(2) + rt.insets.bottom,
    right: theme.gap(2) + rt.insets.right + 70,
    backgroundColor: theme.colors.onBackground,
  }
}));