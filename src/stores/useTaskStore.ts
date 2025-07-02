import { mmkvStorage } from '@/services/storage/mmkv-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Task } from '@/types/task';
import * as Crypto from 'expo-crypto';
import { create } from 'zustand';

type TaskState = {
	tasks: Task[];
	hasHydrated: boolean;
}

type TaskActions = {
	addTask: (task: Omit<Task, 'createdAt' | 'updatedAt' | 'completedAt' | 'id'>) => void;
	getTask: (id: string) => Task | null;
	setHasHydrated: (value: boolean) => void;
}

const useTaskStore = create<TaskState & TaskActions>()(
	persist(
		(set, get) => ({

			// Initial state
			tasks: [],
			
			// Actions
			addTask: (task) => {
				const newTask: Task = {
					id: Crypto.randomUUID(),
					title: task.title,
					description: task.description,
					userId: task.userId,
					scheduledAt: task.scheduledAt || null,
					createdAt: new Date(),
					updatedAt: new Date(),
					colorId: task.colorId,
					completedAt: null
				};
				set((s) => ({ tasks: [...s.tasks, newTask] }));
			},

			getTask: (id) => {
				const task = get().tasks.find((t) => t.id === id);
				if (!task) {
					return null;
				}
				return task;
			},
			
			hasHydrated: false,
			setHasHydrated: (v) => set({ hasHydrated: v }),
		}),
		{
			name: 'tasks-storage',
			storage: createJSONStorage(() => mmkvStorage),
			onRehydrateStorage: () => (state) => {
				if (state) {
					state.setHasHydrated(true);
				}
			}
		}
	),
)

export default useTaskStore;