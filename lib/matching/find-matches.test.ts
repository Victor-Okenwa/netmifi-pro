import { describe, expect, test } from "bun:test";
import { classifyMatch, findMatches } from "@/lib/matching/find-matches";
import type { SwapListing, SwapOffer } from "@/lib/matching/types";
import { getListingsByKind } from "@/mock-data/swap-listings";

const baseOffer = {
	rateAmount: 0,
	ratePeriod: "weekly" as const,
	currency: "NGN" as const,
};

describe("classifyMatch", () => {
	test("flags perfect when teach/learn are mutual", () => {
		const offer: SwapOffer = {
			...baseOffer,
			kind: "general",
			teach: ["Python"],
			learn: ["UI design"],
		};
		const listing: SwapListing = {
			id: "a",
			kind: "general",
			name: "Test",
			username: "test-user",
			verified: true,
			rating: 4.5,
			ratingPercent: 50,
			teaches: ["UI design", "Figma"],
			wantsToLearn: ["Python", "SQL"],
			listedAt: "2026-01-01T00:00:00.000Z",
		};

		const result = classifyMatch(offer, listing);
		expect(result?.matchKind).toBe("perfect");
		expect(result?.matchedTheyTeach).toContain("UI design");
		expect(result?.matchedTheyWant).toContain("Python");
	});

	test("flags partial for one-way overlap", () => {
		const offer: SwapOffer = {
			...baseOffer,
			kind: "general",
			teach: ["Python"],
			learn: ["Guitar"],
		};
		const listing: SwapListing = {
			id: "b",
			kind: "general",
			name: "Partial",
			username: "partial-user",
			verified: false,
			rating: 4,
			ratingPercent: 40,
			teaches: ["JavaScript"],
			wantsToLearn: ["Python"],
			listedAt: "2026-01-01T00:00:00.000Z",
		};

		expect(classifyMatch(offer, listing)?.matchKind).toBe("partial");
	});

	test("matches open buyer via listing rate", () => {
		const offer: SwapOffer = {
			...baseOffer,
			kind: "general",
			teach: ["Figma"],
			learn: ["Python"],
			rateAmount: 0,
		};
		const listing: SwapListing = {
			id: "c",
			kind: "general",
			name: "Buyer",
			username: "buyer-user",
			verified: true,
			rating: 4.2,
			ratingPercent: 45,
			teaches: ["Python"],
			wantsToLearn: [],
			listedAt: "2026-01-01T00:00:00.000Z",
			rateAmountNgn: 3000,
			ratePeriod: "weekly",
		};

		const result = classifyMatch(offer, listing);
		expect(result?.matchKind).toBe("perfect");
		expect(result?.usedListingRate).toBe(true);
	});
});

describe("findMatches against marketplace data", () => {
	test("Python teach + UI design learn returns Victony as perfect", () => {
		const offer: SwapOffer = {
			...baseOffer,
			kind: "general",
			teach: ["UI design", "Figma"],
			learn: ["Python"],
		};

		const matches = findMatches(offer, getListingsByKind("general"));
		expect(matches.length).toBeGreaterThan(0);
		expect(matches.some((match) => match.matchKind === "perfect")).toBe(true);
		expect(matches.some((match) => match.listing.name === "Victony Darey")).toBe(true);
		expect(matches.some((match) => match.listing.username === "victony-darey")).toBe(true);
	});

	test("unrelated skills can yield no matches", () => {
		const offer: SwapOffer = {
			...baseOffer,
			kind: "general",
			teach: ["zzzz-not-a-skill"],
			learn: ["yyyy-also-missing"],
		};

		expect(findMatches(offer, getListingsByKind("general"))).toEqual([]);
	});
});
