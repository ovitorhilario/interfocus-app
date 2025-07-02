import { addDays, startOfWeek } from 'date-fns';

/**
 * Generates an array of dates representing a 30-day timeline starting from the beginning of the current week.
 * The week starts on Sunday (0).
 *
 * @returns {Date[]} An array of Date objects for each day in the 30-day timeline.
 */
export function getTaskTimeline(): Date[] {
	const days: Date[] = [];
	const today = new Date();
	const startOfWeekDate = startOfWeek(today, { weekStartsOn: 0 });

	for (let i = 0; i < 30; i++) {
		const day = new Date(startOfWeekDate);
		const result = addDays(day, i);
		days.push(result);
	}
	return days;
}