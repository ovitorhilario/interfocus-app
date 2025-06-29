import { mmkvStorage } from '@/services/storage/mmkv-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as Crypto from 'expo-crypto';
import { create } from 'zustand';

export type Task = {
	id: string;
	title: string;
	userId: number;
	createdAt: Date;
	updatedAt: Date;
}

type TaskState = {
	tasks: Task[];
	hasHydrated: boolean;
}

type TaskActions = {
	addTask: (task: Pick<Task, 'title' | 'userId'>) => void;
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
					userId: task.userId,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				set((s) => ({ tasks: [...s.tasks, newTask] }));
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