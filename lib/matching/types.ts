import type { CurrencyCode } from "@/lib/currency/types";
import type { AcademicLevel, RatePeriod, UniversityId } from "@/mock-data/types";

export type SwapKind = "general" | "school";

export type MatchKind = "perfect" | "partial";

/**
 * The current user's listing used as the matching query.
 */
export interface SwapOffer {
	kind: SwapKind;
	teach: string[];
	learn: string[];
	rateAmount: number;
	ratePeriod: RatePeriod;
	currency: CurrencyCode;
	universityId?: UniversityId;
	level?: AcademicLevel;
	openToOtherSchools?: boolean;
}

/**
 * A peer listing from the mock marketplace.
 */
export interface SwapListing {
	id: string;
	kind: SwapKind;
	name: string;
	verified: boolean;
	rating: number;
	/** Percentile-style review score shown in the card copy */
	ratingPercent: number;
	teaches: string[];
	wantsToLearn: string[];
	/** ISO timestamp for when the listing was posted */
	listedAt: string;
	rateAmountNgn?: number;
	ratePeriod?: RatePeriod;
	universityId?: UniversityId;
	level?: AcademicLevel;
	openToOtherSchools?: boolean;
}

export interface MatchResult {
	listing: SwapListing;
	matchKind: MatchKind;
	/** Their teach labels that overlap what the user wants to learn */
	matchedTheyTeach: string[];
	/** Their learn labels that overlap what the user can teach */
	matchedTheyWant: string[];
	/** True when the user's rate bridges a missing skill side */
	usedUserRate: boolean;
	/** True when the listing's rate bridges a missing skill side */
	usedListingRate: boolean;
}
