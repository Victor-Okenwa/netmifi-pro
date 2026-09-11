import Link from "next/link";
import { TransferIcon } from "@/components/home/feed-icons";
import { formatTransactionTimestamp, formatWholeAmount } from "@/lib/currency/format";
import type { CurrencyCode } from "@/lib/currency/types";
import { cn } from "@/lib/utils";
import { convertFromNgn } from "@/mock-data/earnings";
import type { TransactionItem as TransactionItemData } from "@/mock-data/home-feed";

interface TransactionRowProps {
	item: TransactionItemData;
	currency: CurrencyCode;
	className?: string;
}

/**
 * Transaction list row: transfer icon, recipient, time, amount, and status.
 */
export function TransactionRow({ item, currency, className }: TransactionRowProps) {
	const amount = convertFromNgn(item.amountNgn, currency);
	const statusLabel = statusCopy(item.status);

	return (
		<Link
			className={cn(
				"flex items-center gap-3 px-3 py-3.5 transition-colors hover:bg-muted/40",
				className
			)}
			href={item.href}
		>
			<TransferIcon />
			<span className="min-w-0 flex-1">
				<span className="block truncate font-medium text-foreground text-sm leading-snug">
					Transfer to {item.recipient}..
				</span>
				<span className="mt-0.5 block text-muted-foreground text-xs">
					{formatTransactionTimestamp(item.occurredAt)}
				</span>
			</span>
			<span className="shrink-0 text-right">
				<span className="block font-semibold text-emerald-600 text-sm tabular-nums dark:text-emerald-400">
					{formatWholeAmount(amount, currency)}
				</span>
				<span
					className={cn(
						"mt-1 inline-flex rounded-full px-2 py-0.5 font-medium text-[10px] leading-none",
						item.status === "successful" &&
							"bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
						item.status === "pending" &&
							"bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
						item.status === "failed" &&
							"bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
					)}
				>
					{statusLabel}
				</span>
			</span>
		</Link>
	);
}

/**
 * Human-readable status label for a transaction.
 * @param status - Transaction status code
 * @returns Display label
 */
function statusCopy(status: TransactionItemData["status"]): string {
	switch (status) {
		case "successful":
			return "Successful";
		case "pending":
			return "Pending";
		case "failed":
			return "Failed";
	}
}
