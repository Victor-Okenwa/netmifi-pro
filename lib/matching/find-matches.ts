import { intersectLabels } from "@/lib/matching/labels";
import type { MatchKind, MatchResult, SwapListing, SwapOffer } from "@/lib/matching/types";

/**
 * Classifies a listing against the current offer using catalog labels + optional rates.
 *
 * Perfect: mutual exchange — they teach what I want to learn AND they want what I teach
 *   (their "want" side may be satisfied by a money rate / open-buyer listing).
 * Partial: only one side overlaps (skill or rate-backed).
 *
 * @param offer - Current user offer
 * @param listing - Candidate listing
 * @returns Match result, or null when there is no match
 */
export function classifyMatch(offer: SwapOffer, listing: SwapListing): MatchResult | null {
	if (offer.kind !== listing.kind) {
		return null;
	}

	if (offer.kind === "school" && !schoolsCompatible(offer, listing)) {
		return null;
	}

	const matchedTheyTeach = intersectLabels(listing.teaches, offer.learn);
	const matchedTheyWant = intersectLabels(listing.wantsToLearn, offer.teach);

	const skillTheyTeach = matchedTheyTeach.length > 0;
	const skillTheyWant = matchedTheyWant.length > 0;

	const listingWillPay = (listing.rateAmountNgn ?? 0) > 0;
	const userWillPay = offer.rateAmount > 0;

	// Open buyer pays with no learn list. Bridge only for sell-only offers,
	// or when they also teach something the user wants to learn.
	const openBuyer =
		listing.wantsToLearn.length === 0 &&
		listingWillPay &&
		offer.teach.length > 0 &&
		(offer.learn.length === 0 || skillTheyTeach);

	const theyTeachWhatIWant = skillTheyTeach;
	const theyWantWhatITeach = skillTheyWant || openBuyer;

	if (!theyTeachWhatIWant && !theyWantWhatITeach) {
		return null;
	}

	const usedListingRate = openBuyer && !skillTheyWant;
	const usedUserRate = userWillPay && skillTheyTeach && !skillTheyWant && !openBuyer;

	const isPerfect =
		theyTeachWhatIWant &&
		theyWantWhatITeach &&
		(skillTheyTeach || skillTheyWant || openBuyer) &&
		skillTheyTeach &&
		(skillTheyWant || openBuyer);

	const matchKind: MatchKind = isPerfect ? "perfect" : "partial";

	return {
		listing,
		matchKind,
		matchedTheyTeach,
		matchedTheyWant: skillTheyWant ? matchedTheyWant : openBuyer ? [...offer.teach] : [],
		usedUserRate,
		usedListingRate,
	};
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
		const match = classifyMatch(offer, listing);
		if (!match) {
			continue;
		}
		results.push(match);
	}

	return results.sort((a, b) => {
		if (a.matchKind !== b.matchKind) {
			return a.matchKind === "perfect" ? -1 : 1;
		}

		const aHits = a.matchedTheyTeach.length + a.matchedTheyWant.length;
		const bHits = b.matchedTheyTeach.length + b.matchedTheyWant.length;
		if (aHits !== bHits) {
			return bHits - aHits;
		}

		return b.listing.rating - a.listing.rating;
	});
}
