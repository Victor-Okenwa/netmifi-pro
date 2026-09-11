import type { AcademicLevel, RatePeriod } from "./types";

export const ACADEMIC_LEVELS: AcademicLevel[] = [100, 200, 300, 400, 500, 600, 700];

export const RATE_PERIODS: RatePeriod[] = ["hour", "daily", "weekly", "monthly"];

export const RATE_PERIOD_LABELS: Record<RatePeriod, string> = {
	hour: "Hourly",
	daily: "Daily",
	weekly: "Weekly",
	monthly: "Monthly",
};

export type WeekdayId = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface WeekdayOption {
	id: WeekdayId;
	label: string;
}

export const WEEKDAYS: WeekdayOption[] = [
	{ id: "mon", label: "Mon" },
	{ id: "tue", label: "Tue" },
	{ id: "wed", label: "Wed" },
	{ id: "thu", label: "Thurs" },
	{ id: "fri", label: "Fri" },
	{ id: "sat", label: "Sat" },
	{ id: "sun", label: "Sun" },
];
