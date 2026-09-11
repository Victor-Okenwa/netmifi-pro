"use client";

import Link from "next/link";
import { useState } from "react";
import { ActivityRow } from "@/components/home/activity-row";
import { TransactionRow } from "@/components/home/transaction-row";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CurrencyCode } from "@/lib/currency/types";
import { cn } from "@/lib/utils";
import { MOCK_ACTIVITIES, MOCK_TRANSACTIONS } from "@/mock-data/home-feed";

type FeedTab = "activity" | "transactions";

interface HomeFeedSectionProps {
	currency: CurrencyCode;
	className?: string;
}

/**
 * Home feed: Recent Activity and Transactions tabs with a See all control.
 */
export function HomeFeedSection({ currency, className }: HomeFeedSectionProps) {
	const [tab, setTab] = useState<FeedTab>("activity");
	const seeAllHref = tab === "activity" ? "/activity" : "/transactions";

	return (
		<section className={cn("w-full", className)}>
			<Tabs
				onValueChange={(value) => {
					if (value === "activity" || value === "transactions") {
						setTab(value);
					}
				}}
				value={tab}
			>
				<div className="flex items-end justify-between gap-3">
					<TabsList className="h-auto gap-4 rounded-none bg-transparent p-0" variant="line">
						<TabsTrigger
							className={cn(
								"h-auto flex-none rounded-none px-0 pb-2 font-medium text-muted-foreground text-sm shadow-none",
								"after:bottom-0 after:h-[3px] after:rounded-full after:bg-primary",
								"data-active:bg-transparent data-active:font-semibold data-active:text-foreground data-active:shadow-none"
							)}
							value="activity"
						>
							Recent Activity
						</TabsTrigger>
						<TabsTrigger
							className={cn(
								"h-auto flex-none rounded-none px-0 pb-2 font-medium text-muted-foreground text-sm shadow-none",
								"after:bottom-0 after:h-[3px] after:rounded-full after:bg-primary",
								"data-active:bg-transparent data-active:font-semibold data-active:text-foreground data-active:shadow-none"
							)}
							value="transactions"
						>
							Transactions
						</TabsTrigger>
					</TabsList>

					<Link
						className="mb-1.5 inline-flex shrink-0 items-center rounded-full border border-border bg-background px-3 py-1 text-muted-foreground text-xs"
						href={seeAllHref}
					>
						See all
					</Link>
				</div>

				<TabsContent className="mt-3" value="activity">
					<ul className="overflow-hidden rounded-2xl border border-border bg-card">
						{MOCK_ACTIVITIES.map((item, index) => (
							<li className={cn(index > 0 && "border-border border-t")} key={item.id}>
								<ActivityRow item={item} />
							</li>
						))}
					</ul>
				</TabsContent>

				<TabsContent className="mt-3" value="transactions">
					<ul className="overflow-hidden rounded-2xl border border-border bg-card">
						{MOCK_TRANSACTIONS.map((item, index) => (
							<li className={cn(index > 0 && "border-border border-t")} key={item.id}>
								<TransactionRow currency={currency} item={item} />
							</li>
						))}
					</ul>
				</TabsContent>
			</Tabs>
		</section>
	);
}
