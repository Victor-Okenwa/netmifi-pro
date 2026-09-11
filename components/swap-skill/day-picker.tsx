"use client";

import { cn } from "@/lib/utils";
import { WEEKDAYS, type WeekdayId } from "@/mock-data/constants";

interface DayPickerProps {
	value: WeekdayId[];
	onValueChange: (days: WeekdayId[]) => void;
	className?: string;
}

/**
 * Toggle chips for days the user is available.
 */
export function DayPicker({ value, onValueChange, className }: DayPickerProps) {
	function toggle(day: WeekdayId) {
		if (value.includes(day)) {
			onValueChange(value.filter((item) => item !== day));
			return;
		}
		onValueChange([...value, day]);
	}

	return (
		<div className={cn("flex flex-wrap gap-2", className)}>
			{WEEKDAYS.map((day) => {
				const isSelected = value.includes(day.id);
				return (
					<button
						aria-pressed={isSelected}
						className={cn(
							"rounded-full border px-3 py-1.5 font-medium text-xs transition-colors",
							isSelected
								? "border-primary bg-primary-light text-primary"
								: "border-transparent bg-muted text-muted-foreground hover:text-foreground"
						)}
						key={day.id}
						onClick={() => toggle(day.id)}
						type="button"
					>
						{day.label}
					</button>
				);
			})}
		</div>
	);
}
