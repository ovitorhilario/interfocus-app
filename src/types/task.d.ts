export type Task = {
	id: string;
	title: string;
	description: string;
	userId: number;
	colorId: number;
	createdAt: Date;
	updatedAt: Date;
	// If scheduledAt is set, the task is considered scheduled
	scheduledAt: Date | null;
	completedAt: Date | null;
}

export type TaskFilter = 'all' | 'pending' | 'completed';