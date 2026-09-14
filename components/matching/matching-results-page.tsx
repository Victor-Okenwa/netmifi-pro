"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MatchCard } from "@/components/matching/match-card";
import { toast } from "@/components/ui/sonner";
import { usePreferredCurrency } from "@/lib/currency/use-preferred-currency";
import { findMatches } from "@/lib/matching/find-matches";
import { decodeOfferParam, readSwapOffer, writeSwapOffer } from "@/lib/matching/offer-storage";
import type { MatchResult, SwapOffer } from "@/lib/matching/types";
import { cn } from "@/lib/utils";
import { getListingsByKind } from "@/mock-data/swap-listings";

interface MatchingResultsPageProps {
	className?: string;
	backHref?: string;
}

/**
 * Matching results for the current general or school swap offer.
 * Reads the offer from the URL (preferred) or storage, then scores mock listings.
 */
export function MatchingResultsPage({
	className,
	backHref = "/swap-skill",
}: MatchingResultsPageProps) {
	const searchParams = useSearchParams();
	const { currency } = usePreferredCurrency();
	const [offer, setOffer] = useState<SwapOffer | null>(null);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const fromQuery = decodeOfferParam(searchParams.get("offer"));
		const resolved = fromQuery ?? readSwapOffer();
		if (fromQuery) {
			writeSwapOffer(fromQuery);
		}
		setOffer(resolved);
		setIsReady(true);
	}, [searchParams]);

	const matches = useMemo(() => {
		if (!offer) {
			return [] as MatchResult[];
		}
		return findMatches(offer, getListingsByKind(offer.kind));
	}, [offer]);

	const editHref = offer?.kind === "school" ? "/swap-skill/school" : "/swap-skill/general";

	function handleInvite(listingId: string) {
		toast.success("Invite sent", {
			description: `Invitation drafted for ${listingId}`,
		});
	}

	return (
		<section className={cn("flex flex-col px-4 pt-2 pb-6", className)}>
			<header className="relative flex items-center justify-center py-2">
				<Link
					aria-label="Go back"
					className="absolute top-1/2 left-0 flex size-10 -translate-y-1/2 items-center justify-center text-foreground"
					href={offer ? editHref : backHref}
				>
					<ChevronLeft className="size-6" />
				</Link>
				<h1 className="font-bold text-xl tracking-tight">Matching Results</h1>
			</header>

			{!isReady ? (
				<p className="mt-8 text-center text-muted-foreground text-sm">Loading matches…</p>
			) : !offer ? (
				<div className="mt-10 text-center">
					<p className="font-medium text-foreground">No search yet</p>
					<p className="mt-1 text-muted-foreground text-sm">
						Submit a general or school swap form to see matches.
					</p>
					<Link
						className="mt-4 inline-flex text-primary text-sm underline-offset-2 hover:underline"
						href="/swap-skill"
					>
						Start a swap
					</Link>
				</div>
			) : (
				<>
					<div className="mt-3 rounded-2xl border border-border bg-card p-3">
						<p className="font-medium text-foreground text-xs">Your offer</p>
						<p className="mt-1 text-muted-foreground text-xs">
							<span className="text-foreground">Teach:</span>{" "}
							{offer.teach.length > 0 ? offer.teach.join(", ") : "—"}
						</p>
						<p className="mt-0.5 text-muted-foreground text-xs">
							<span className="text-foreground">Learn:</span>{" "}
							{offer.learn.length > 0 ? offer.learn.join(", ") : "—"}
						</p>
						{offer.rateAmount > 0 ? (
							<p className="mt-0.5 text-muted-foreground text-xs">
								<span className="text-foreground">Rate:</span> {offer.currency} {offer.rateAmount}/
								{offer.ratePeriod}
							</p>
						) : null}
						<p className="mt-2 text-muted-foreground text-xs">
							{matches.length} match{matches.length === 1 ? "" : "es"} from marketplace data
						</p>
					</div>

					{matches.length === 0 ? (
						<div className="mt-10 text-center">
							<p className="font-medium text-foreground">No match found</p>
							<p className="mt-1 text-muted-foreground text-sm">
								No listing teaches what you want or wants what you teach
								{offer.rateAmount > 0 ? " (including rate-backed offers)" : ""}. Try different
								skills/courses
								{offer.kind === "school" ? ", or open to other schools" : ""}.
							</p>
							<Link
								className="mt-4 inline-flex text-primary text-sm underline-offset-2 hover:underline"
								href={editHref}
							>
								Edit your listing
							</Link>
						</div>
					) : (
						<ul className="mt-4 flex flex-col gap-3">
							{matches.map((match) => (
								<li key={match.listing.id}>
									<MatchCard currency={currency} match={match} onInvite={handleInvite} />
								</li>
							))}
						</ul>
					)}
				</>
			)}
		</section>
	);
}
