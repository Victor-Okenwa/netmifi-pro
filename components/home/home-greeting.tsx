"use client";

import { CurrencySelector } from "@/components/home/currency-selector";
import { getFirstName, getTimeOfDayGreeting } from "@/lib/greeting";
import { cn } from "@/lib/utils";

interface HomeGreetingProps {
	fullName: string;
	email: string;
	className?: string;
}

/**
 * Home top row: time-based greeting with first name, email, and currency selector.
 */
export function HomeGreeting({ fullName, email, className }: HomeGreetingProps) {
	const greeting = getTimeOfDayGreeting();
	const firstName = getFirstName(fullName);

	return (
		<div className={cn("flex items-center justify-between gap-3", className)}>
			<div className="min-w-0">
				<p className="truncate font-semibold text-foreground text-lg leading-tight tracking-tight">
					{greeting}, {firstName}
				</p>
				<p className="mt-0.5 truncate text-muted-foreground text-sm">{email}</p>
			</div>
			<CurrencySelector className="shrink-0" />
		</div>
	);
}
