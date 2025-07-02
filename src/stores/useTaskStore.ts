import { mmkvStorage } from '@/services/storage/mmkv-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Task } from '@/types/task';
import * as Crypto from 'expo-crypto';
import { create } from 'zustand';
import { compareAsc, compareDesc, isSameDay } from 'date-fns';

type TaskState = {
	tasks: Task[];
	hasHydrated: boolean;
}

type TaskActions = {
	addTask: (task: Omit<Task, 'createdAt' | 'updatedAt' | 'completedAt' | 'id'>) => void;
	addTasks: (tasks: Omit<Task, 'createdAt' | 'updatedAt' | 'completedAt' | 'id'>[]) => void;
	updateTask: (id: string, update: Omit<Task, 'createdAt' | 'updatedAt' | 'completedAt' | 'id'>) => void;
	getTask: (id: string) => Task | null;
	setHasHydrated: (value: boolean) => void;
	getSortedTasks: (userId: number, mode?: 'asc' | 'desc') => Task[];
	deleteTasks: (ids: string[]) => void;
	markAsCompleted: (id: string[]) => void;
	hasTasksInDate: (date: Date) => boolean;
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

			addTasks: (tasks) => {
				const newTasks: Task[] = tasks.map((task) => ({
					id: Crypto.randomUUID(),
					title: task.title,
					description: task.description,
					userId: task.userId,
					scheduledAt: task.scheduledAt || null,
					createdAt: new Date(),
					updatedAt: new Date(),
					colorId: task.colorId,
					completedAt: null
				}));
				set((s) => ({ tasks: [...s.tasks, ...newTasks] }));
			},

			getTask: (id) => {
				const task = get().tasks.find((t) => t.id === id);
				if (!task) {
					return null;
				}
				return task;
			},

			getSortedTasks: (userId, mode) => {
				return get().tasks.filter(t => t.userId === userId).sort((a, b) => {
					if (mode === 'asc') {
						return compareAsc(a.createdAt, b.createdAt);
					}
					return compareDesc(a.createdAt, b.createdAt);
				});
			},

			hasTasksInDate: (date) => {
				return get().tasks.some(task => {
					if (task.scheduledAt !== null) {
						return isSameDay(task.scheduledAt, date);
					}
					return false;
				});
			},

			deleteTasks: (ids) => {
				set((s) => ({
					tasks: s.tasks.filter((task) => !ids.includes(task.id)),
				}));
			},

			markAsCompleted: (ids) => {
				set((s) => ({
					tasks: s.tasks.map((task) => {
						if (ids.includes(task.id)) {
							return { ...task, completedAt: new Date() };
						}
						return task;
					}),
				}));
			},

			updateTask: (id, update) => {
				set((s) => ({
					tasks: s.tasks.map((task) => {
						if (task.id === id) {
							return {
								...task,
								...update,
								updatedAt: new Date(),
							};
						}
						return task;
					}),
				}));
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