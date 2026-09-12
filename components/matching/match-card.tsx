import { CheckBadgeIcon, StarIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getNameInitial } from "@/lib/auth/display";
import { formatWholeAmount } from "@/lib/currency/format";
import type { CurrencyCode } from "@/lib/currency/types";
import type { MatchKind, SwapListing } from "@/lib/matching/types";
import { cn } from "@/lib/utils";
import { RATE_PERIOD_LABELS } from "@/mock-data/constants";
import { convertFromNgn } from "@/mock-data/earnings";

interface MatchCardProps {
	listing: SwapListing;
	matchKind: MatchKind;
	currency: CurrencyCode;
	onInvite?: (listingId: string) => void;
	className?: string;
}

/**
 * Reusable matching-results card for general or school listings.
 */
export function MatchCard({ listing, matchKind, currency, onInvite, className }: MatchCardProps) {
	const initial = getNameInitial(listing.name);
	const footer = formatMatchFooter(listing, currency);

	return (
		<article className={cn("rounded-2xl border border-border bg-card p-4 shadow-sm", className)}>
			<div className="flex items-start gap-3">
				<Avatar className="size-11 bg-primary text-primary-foreground after:border-primary/30">
					<AvatarFallback className="bg-primary font-semibold text-primary-foreground text-sm">
						{initial}
					</AvatarFallback>
				</Avatar>

				<div className="min-w-0 flex-1">
					<div className="flex items-start justify-between gap-2">
						<div className="min-w-0">
							<div className="flex items-center gap-1">
								<p className="truncate font-semibold text-foreground text-sm">{listing.name}</p>
								{listing.verified ? (
									<CheckBadgeIcon aria-label="Verified" className="size-4 shrink-0 text-primary" />
								) : null}
							</div>
							<p className="mt-0.5 flex items-center gap-1 text-muted-foreground text-xs">
								<StarIcon className="size-3.5 text-amber-400" />
								<span>
									{listing.rating.toFixed(1)} ({listing.ratingPercent}%) rating & reviews
								</span>
							</p>
						</div>
						<span
							className={cn(
								"shrink-0 rounded-full px-2.5 py-1 font-medium text-[10px] leading-none",
								matchKind === "perfect"
									? "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300"
									: "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300"
							)}
						>
							{matchKind === "perfect" ? "Perfect Match" : "Partial Match"}
						</span>
					</div>
				</div>
			</div>

			<div className="mt-3 space-y-2">
				<TagRow label="Teaches:" tags={listing.teaches} variant="teach" />
				<TagRow label="Wants to learn:" tags={listing.wantsToLearn} variant="learn" />
			</div>

			<div className="mt-4 flex items-center justify-between gap-3">
				<p className="min-w-0 truncate text-muted-foreground text-xs">{footer}</p>
				<Button
					className="h-9 shrink-0 rounded-full px-5"
					onClick={() => onInvite?.(listing.id)}
					size="sm"
					type="button"
				>
					Invite
				</Button>
			</div>
		</article>
	);
}

interface TagRowProps {
	label: string;
	tags: string[];
	variant: "teach" | "learn";
}

function TagRow({ label, tags, variant }: TagRowProps) {
	return (
		<div className="flex flex-wrap items-center gap-1.5">
			<span className="text-muted-foreground text-xs">{label}</span>
			{tags.length === 0 ? (
				<span className="text-muted-foreground text-xs italic">Open to pay</span>
			) : (
				tags.map((tag) => (
					<span
						className={cn(
							"rounded-full border px-2 py-0.5 text-[11px] leading-tight",
							variant === "teach"
								? "border-primary/50 text-primary"
								: "border-foreground/40 text-foreground"
						)}
						key={tag}
					>
						{shortTag(tag)}
					</span>
				))
			)}
		</div>
	);
}

/**
 * Shortens long course labels for compact chips.
 * @param tag - Full skill or course label
 * @returns Chip text
 */
function shortTag(tag: string): string {
	const separator = " · ";
	if (tag.includes(separator)) {
		const [code] = tag.split(separator);
		return code ?? tag;
	}
	return tag;
}

/**
 * Formats the card footer as a rate or listed timestamp.
 * @param listing - Match listing
 * @param currency - Display currency
 * @returns Footer string
 */
function formatMatchFooter(listing: SwapListing, currency: CurrencyCode): string {
	if (listing.rateAmountNgn !== undefined && listing.ratePeriod) {
		const amount = convertFromNgn(listing.rateAmountNgn, currency);
		const period = RATE_PERIOD_LABELS[listing.ratePeriod]
			.replace("Hourly", "hour")
			.replace("Daily", "day")
			.replace("Weekly", "week")
			.replace("Monthly", "month");
		return `${formatWholeAmount(amount, currency)}/${period}`;
	}

	return formatListedAt(listing.listedAt);
}

/**
 * Formats listing time like "25 Nov 2026, 12:43:42".
 * @param iso - ISO timestamp
 * @returns Display string
 */
function formatListedAt(iso: string): string {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) {
		return "Recently listed";
	}

	const day = date.getUTCDate();
	const month = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" }).format(date);
	const year = date.getUTCFullYear();
	const time = new Intl.DateTimeFormat("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
		timeZone: "UTC",
	}).format(date);

	return `${day} ${month} ${year}, ${time}`;
}
