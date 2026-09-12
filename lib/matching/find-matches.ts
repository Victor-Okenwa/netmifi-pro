import { labelsOverlap } from "@/lib/matching/labels";
import type { MatchKind, MatchResult, SwapListing, SwapOffer } from "@/lib/matching/types";

/**
 * Classifies a listing against the current offer.
 * Perfect: mutual exchange. Partial: one-way skill/course overlap (or money-backed demand).
 * @param offer - Current user offer
 * @param listing - Candidate listing
 * @returns Match kind, or null when there is no match
 */
export function classifyMatch(offer: SwapOffer, listing: SwapListing): MatchKind | null {
	if (offer.kind !== listing.kind) {
		return null;
	}

	if (offer.kind === "school" && !schoolsCompatible(offer, listing)) {
		return null;
	}

	const theyTeachWhatIWant = labelsOverlap(listing.teaches, offer.learn);
	const theyWantWhatITeach =
		labelsOverlap(listing.wantsToLearn, offer.teach) ||
		(offer.teach.length > 0 &&
			listing.wantsToLearn.length === 0 &&
			(listing.rateAmountNgn ?? 0) > 0);

	if (theyTeachWhatIWant && theyWantWhatITeach) {
		return "perfect";
	}

	if (theyTeachWhatIWant || theyWantWhatITeach) {
		return "partial";
	}

	return null;
}

/**
 * School listings must share a campus unless either side is open to other schools.
 * @param offer - Current offer
 * @param listing - Candidate listing
 * @returns Whether the schools are compatible
 */
function schoolsCompatible(offer: SwapOffer, listing: SwapListing): boolean {
	if (!offer.universityId || !listing.universityId) {
		return false;
	}

	if (offer.universityId === listing.universityId) {
		return true;
	}

	return Boolean(offer.openToOtherSchools || listing.openToOtherSchools);
}

/**
 * Finds perfect and partial matches for an offer, perfect first.
 * @param offer - Current user offer
 * @param listings - Marketplace listings
 * @returns Ranked match results
 */
export function findMatches(offer: SwapOffer, listings: SwapListing[]): MatchResult[] {
	const results: MatchResult[] = [];

	for (const listing of listings) {
		const matchKind = classifyMatch(offer, listing);
		if (!matchKind) {
			continue;
		}

		results.push({ listing, matchKind });
	}

	return results.sort((a, b) => {
		if (a.matchKind === b.matchKind) {
			return b.listing.rating - a.listing.rating;
		}
		return a.matchKind === "perfect" ? -1 : 1;
	});
}
