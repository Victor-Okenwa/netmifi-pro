"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MatchCard } from "@/components/matching/match-card";
import { toast } from "@/components/ui/sonner";
import { usePreferredCurrency } from "@/lib/currency/use-preferred-currency";
import { findMatches } from "@/lib/matching/find-matches";
import { readSwapOffer } from "@/lib/matching/offer-storage";
import type { MatchResult, SwapOffer } from "@/lib/matching/types";
import { cn } from "@/lib/utils";
import { getListingsByKind } from "@/mock-data/swap-listings";

interface MatchingResultsPageProps {
	className?: string;
	backHref?: string;
}

/**
 * Matching results for the stored general or school swap offer.
 */
export function MatchingResultsPage({
	className,
	backHref = "/swap-skill",
}: MatchingResultsPageProps) {
	const { currency } = usePreferredCurrency();
	const [offer, setOffer] = useState<SwapOffer | null>(null);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		setOffer(readSwapOffer());
		setIsReady(true);
	}, []);

	const matches = useMemo(() => {
		if (!offer) {
			return [] as MatchResult[];
		}
		return findMatches(offer, getListingsByKind(offer.kind));
	}, [offer]);

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
					href={backHref}
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
			) : matches.length === 0 ? (
				<div className="mt-10 text-center">
					<p className="font-medium text-foreground">No match found</p>
					<p className="mt-1 text-muted-foreground text-sm">
						Try different skills or courses, or open your listing to other schools.
					</p>
					<Link
						className="mt-4 inline-flex text-primary text-sm underline-offset-2 hover:underline"
						href={offer.kind === "school" ? "/swap-skill/school" : "/swap-skill/general"}
					>
						Edit your listing
					</Link>
				</div>
			) : (
				<ul className="mt-4 flex flex-col gap-3">
					{matches.map((match) => (
						<li key={match.listing.id}>
							<MatchCard
								currency={currency}
								listing={match.listing}
								matchKind={match.matchKind}
								onInvite={handleInvite}
							/>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
