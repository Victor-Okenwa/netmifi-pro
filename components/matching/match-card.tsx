import { CheckBadgeIcon, StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getNameInitial } from "@/lib/auth/display";
import { formatWholeAmount } from "@/lib/currency/format";
import type { CurrencyCode } from "@/lib/currency/types";
import { toLabelSet } from "@/lib/matching/labels";
import type { MatchResult } from "@/lib/matching/types";
import { getUserByUsername, getUserProfileHref } from "@/lib/users/catalog";
import { cn } from "@/lib/utils";
import { RATE_PERIOD_LABELS } from "@/mock-data/constants";
import { convertFromNgn } from "@/mock-data/earnings";

interface MatchCardProps {
	match: MatchResult;
	currency: CurrencyCode;
	onInvite?: (listingId: string) => void;
	className?: string;
}

/**
 * Reusable matching-results card for general or school listings.
 */
export function MatchCard({ match, currency, onInvite, className }: MatchCardProps) {
	const { listing, matchKind, matchedTheyTeach, matchedTheyWant, usedUserRate, usedListingRate } =
		match;
	const initial = getNameInitial(listing.name);
	const profile = getUserByUsername(listing.username);
	const profileHref = getUserProfileHref(listing.username);
	const avatarUrl = profile?.avatarUrl;
	const footer = formatMatchFooter(
		listing.rateAmountNgn,
		listing.ratePeriod,
		listing.listedAt,
		currency
	);
	const teachHighlights = toLabelSet(matchedTheyTeach);
	const learnHighlights = toLabelSet(matchedTheyWant);

	return (
		<article className={cn("rounded-2xl border border-border bg-card p-4 shadow-sm", className)}>
			<div className="flex items-start gap-3">
				<Link
					className="flex min-w-0 flex-1 items-start gap-3 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
					href={profileHref}
				>
					<Avatar className="size-11 bg-primary text-primary-foreground after:border-primary/30">
						{avatarUrl ? <AvatarImage alt={listing.name} src={avatarUrl} /> : null}
						<AvatarFallback className="bg-primary font-semibold text-primary-foreground text-sm">
							{initial}
						</AvatarFallback>
					</Avatar>

					<div className="min-w-0 flex-1">
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
				</Link>
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

			<div className="mt-3 space-y-2">
				<TagRow
					highlights={teachHighlights}
					label="Teaches:"
					tags={listing.teaches}
					variant="teach"
				/>
				<TagRow
					emptyLabel={usedListingRate ? "Open to pay" : "—"}
					highlights={learnHighlights}
					label="Wants to learn:"
					tags={listing.wantsToLearn}
					variant="learn"
				/>
			</div>

			{(usedUserRate || usedListingRate) && (
				<p className="mt-2 text-[11px] text-muted-foreground">
					{usedUserRate && usedListingRate
						? "Matched with rates on both sides."
						: usedUserRate
							? "Your rate covers the missing skill swap."
							: "Their rate covers the missing skill swap."}
				</p>
			)}

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
	highlights: Set<string>;
	emptyLabel?: string;
}

function TagRow({ label, tags, variant, highlights, emptyLabel = "Open to pay" }: TagRowProps) {
	return (
		<div className="flex flex-wrap items-center gap-1.5">
			<span className="text-muted-foreground text-xs">{label}</span>
			{tags.length === 0 ? (
				<span className="text-muted-foreground text-xs italic">{emptyLabel}</span>
			) : (
				tags.map((tag) => {
					const isHit = highlights.has(tag.trim().toLowerCase());
					return (
						<span
							className={cn(
								"rounded-full border px-2 py-0.5 text-[11px] leading-tight",
								isHit && "ring-2 ring-primary/30",
								variant === "teach"
									? "border-primary/50 text-primary"
									: "border-foreground/40 text-foreground",
								isHit && variant === "teach" && "bg-primary-light",
								isHit && variant === "learn" && "bg-muted"
							)}
							key={tag}
						>
							{shortTag(tag)}
						</span>
					);
				})
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
 */
function formatMatchFooter(
	rateAmountNgn: number | undefined,
	ratePeriod: keyof typeof RATE_PERIOD_LABELS | undefined,
	listedAt: string,
	currency: CurrencyCode
): string {
	if (rateAmountNgn !== undefined && ratePeriod) {
		const amount = convertFromNgn(rateAmountNgn, currency);
		const period = RATE_PERIOD_LABELS[ratePeriod]
			.replace("Hourly", "hour")
			.replace("Daily", "day")
			.replace("Weekly", "week")
			.replace("Monthly", "month");
		return `${formatWholeAmount(amount, currency)}/${period}`;
	}

	return formatListedAt(listedAt);
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
