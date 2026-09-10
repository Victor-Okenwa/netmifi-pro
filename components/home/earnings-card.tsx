"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { EARNINGS_ACTIONS } from "@/components/home/earnings-actions";
import { Card, CardContent } from "@/components/ui/card";
import { formatBalance, formatEarnedToday, formatHiddenBalance } from "@/lib/currency/format";
import type { CurrencyCode } from "@/lib/currency/types";
import { cn } from "@/lib/utils";
import { convertFromNgn, type EarningsSnapshot } from "@/mock-data/earnings";

interface EarningsCardProps {
	currency: CurrencyCode;
	earnings: EarningsSnapshot;
	className?: string;
}

/**
 * Home earnings summary with visibility toggle and quick-action links.
 */
export function EarningsCard({ currency, earnings, className }: EarningsCardProps) {
	const [isVisible, setIsVisible] = useState(true);

	const total = convertFromNgn(earnings.totalNgn, currency);
	const earnedToday = convertFromNgn(earnings.earnedTodayNgn, currency);
	const balanceLabel = isVisible ? formatBalance(total, currency) : formatHiddenBalance(currency);

	return (
		<Card className={cn("rounded-2xl bg-card py-5 shadow-sm ring-1 ring-foreground/8", className)}>
			<CardContent className="flex flex-col items-center px-4">
				<p className="text-muted-foreground text-sm">Total Earnings</p>

				<div className="mt-1 flex items-center gap-2">
					<p className="font-semibold text-2xl tracking-tight text-foreground tabular-nums">
						{balanceLabel}
					</p>
					<button
						aria-label={isVisible ? "Hide earnings" : "Show earnings"}
						aria-pressed={!isVisible}
						className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
						onClick={() => setIsVisible((prev) => !prev)}
						type="button"
					>
						{isVisible ? <EyeIcon className="size-5" /> : <EyeSlashIcon className="size-5" />}
					</button>
				</div>

				<div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1">
					<span className="text-muted-foreground text-xs">Earned Today</span>
					<span className="font-medium text-emerald-600 text-xs tabular-nums dark:text-emerald-400">
						{isVisible ? formatEarnedToday(earnedToday) : "••••"}
					</span>
				</div>

				<nav aria-label="Earnings actions" className="mt-6 grid w-full grid-cols-4 gap-2">
					{EARNINGS_ACTIONS.map((action) => {
						const Icon = action.icon;
						return (
							<Link
								className="flex flex-col items-center gap-2 text-center"
								href={action.href}
								key={action.href}
							>
								<span className="flex size-12 items-center justify-center rounded-full border border-border bg-background text-foreground">
									<Icon className="size-5" />
								</span>
								<span className="text-[11px] text-muted-foreground leading-tight">
									{action.label}
								</span>
							</Link>
						);
					})}
				</nav>
			</CardContent>
		</Card>
	);
}
