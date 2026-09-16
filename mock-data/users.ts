import type { SwapListing } from "@/lib/matching/types";
import { emailFromUsername } from "@/lib/users/slug";
import { SWAP_LISTINGS } from "@/mock-data/swap-listings";
import type { BarterUser, UniversityId } from "@/mock-data/types";

const FALLBACK_COVER =
	"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";

const COVER_IMAGES = [
	FALLBACK_COVER,
	"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
	"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
	"https://images.unsplash.com/photo-1541339903308-d7b52c0b7788?auto=format&fit=crop&w=1200&q=80",
	"https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
	"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
] as const;

const LOCATIONS = [
	"Lagos State, Nigeria",
	"Enugu, Nigeria",
	"Ibadan, Nigeria",
	"Accra, Ghana",
	"Calabar, Nigeria",
	"Awka, Nigeria",
] as const;

const LANGUAGE_SETS = [
	["English", "Yoruba"],
	["English", "Igbo"],
	["English", "French"],
	["English", "Hausa"],
	["Spanish", "English", "French"],
	["English", "Twi"],
] as const;

const PROFILE_OVERRIDES: Record<string, Partial<BarterUser>> = {
	"victony-darey": {
		email: "victony.darey@netmifi.app",
		bio: "Technical product designer and illustrator | social hacker | Techpreneur | web3 enthusiastic | content creator",
		about:
			"As CEO of BUILD the Company, I'm focused on creating real solutions for real problems – whether that's helping companies launch new products fast or preparing young Africans for the future of work. Since day one, BUILD has taken pride in being a hands-on execution partner, building MVPs and digital experiences for businesses looking to innovate, transform, and scale.",
		avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
		coverUrl: FALLBACK_COVER,
		rating: 4.8,
		positiveReviewPercent: 97,
		peersCount: 40_000,
		listingsCount: 20,
		joinedAt: "2025-01-19T00:00:00.000Z",
		learnersPeeredWith: 126_811,
		location: "Lagos State, Nigeria",
		languages: ["Spanish", "English", "French"],
		education: { universityId: "unn", level: 100 },
		socials: {
			facebook: "https://facebook.com/victonydarey",
			instagram: "https://instagram.com/victonydarey",
			twitter: "https://x.com/victonydarey",
			linkedin: "https://linkedin.com/in/victonydarey",
		},
	},
	"gideon-jefferson": {
		bio: "Data-minded engineer who trades Python sessions for design craft.",
		about:
			"I help teams turn messy spreadsheets into decisions. On NetMifi I teach analysis and pick up visual design so my dashboards feel as clear as they are correct.",
		location: "Ibadan, Nigeria",
		languages: ["English", "Yoruba", "French"],
		education: { universityId: "ui", level: 300 },
		peersCount: 12_400,
		listingsCount: 8,
		positiveReviewPercent: 94,
		learnersPeeredWith: 18_220,
		joinedAt: "2024-11-02T00:00:00.000Z",
	},
	"onyekachi-nnaemena": {
		bio: "Product designer swapping Figma files for backend fundamentals.",
		about:
			"I run critique circles for early-career designers and want to understand how the interfaces I ship are actually built. Happy to trade UI systems for programming hours.",
		location: "Enugu, Nigeria",
		languages: ["English", "Igbo"],
		education: { universityId: "unizik", level: 400 },
		peersCount: 9_800,
		listingsCount: 6,
		positiveReviewPercent: 91,
		learnersPeeredWith: 11_450,
		joinedAt: "2025-03-08T00:00:00.000Z",
	},
	"adaobi-okeke": {
		bio: "Languages coach open to paying for Python and SQL mentorship.",
		about:
			"I teach English, French, and public speaking to professionals. I'm building a data skill stack so I can measure learning outcomes for the cohorts I run.",
		location: "Lagos State, Nigeria",
		languages: ["English", "French", "Igbo"],
		education: { universityId: "unilag", level: 200 },
		peersCount: 22_100,
		listingsCount: 11,
		positiveReviewPercent: 96,
		learnersPeeredWith: 34_002,
		joinedAt: "2024-08-14T00:00:00.000Z",
	},
	"samuel-okoro": {
		bio: "Mobile engineer who pays to learn adjacent skills.",
		about:
			"I ship React Native apps for startups and list a weekly rate when I need a skill I do not have time to swap for. Always looking for thoughtful collaborators.",
		location: "Accra, Ghana",
		languages: ["English", "Twi"],
		peersCount: 7_250,
		listingsCount: 4,
		positiveReviewPercent: 89,
		learnersPeeredWith: 6_410,
		joinedAt: "2025-02-21T00:00:00.000Z",
	},
	"chioma-okeke": {
		bio: "UNN 100-level student trading computing courses for mathematics.",
		about:
			"I am comfortable with COS 101 and COS 102 and want a stronger maths foundation before 200 level. I prefer swaps with classmates on the same campus.",
		location: "Nsukka, Nigeria",
		languages: ["English", "Igbo"],
		education: { universityId: "unn", level: 100 },
		peersCount: 3_400,
		listingsCount: 3,
		positiveReviewPercent: 93,
		learnersPeeredWith: 2_180,
		joinedAt: "2025-09-01T00:00:00.000Z",
	},
	"ebuka-nwankwo": {
		bio: "200-level maths tutor open to computer science swaps across schools.",
		about:
			"I tutor MTH 111 and MTH 211 and want COS depth for side projects. I am open to learners from other universities if the timetable works.",
		location: "Enugu, Nigeria",
		languages: ["English", "Igbo", "French"],
		education: { universityId: "unn", level: 200 },
		peersCount: 5_600,
		listingsCount: 5,
		positiveReviewPercent: 92,
		learnersPeeredWith: 4_905,
		joinedAt: "2025-06-12T00:00:00.000Z",
	},
	"tola-adebayo": {
		bio: "UNILAG freshman swapping intro computing for core maths.",
		about:
			"CSC 111 clicked for me; algebra still needs a partner who can explain it slowly. I keep sessions on campus and write notes we can both reuse.",
		location: "Lagos State, Nigeria",
		languages: ["English", "Yoruba"],
		education: { universityId: "unilag", level: 100 },
		peersCount: 4_150,
		listingsCount: 2,
		positiveReviewPercent: 95,
		learnersPeeredWith: 1_760,
		joinedAt: "2025-10-03T00:00:00.000Z",
	},
	"seyi-ogunleye": {
		bio: "Statistics-first student looking for computing practice.",
		about:
			"I can teach MTH 111 and STA 111 and want lab time with CSC courses. Weekly rate is listed for people who would rather pay than swap.",
		location: "Lagos State, Nigeria",
		languages: ["English", "Yoruba", "French"],
		education: { universityId: "unilag", level: 100 },
		peersCount: 6_020,
		listingsCount: 4,
		positiveReviewPercent: 90,
		learnersPeeredWith: 3_330,
		joinedAt: "2025-07-18T00:00:00.000Z",
	},
};

/**
 * Stable integer hash for rotating mock portraits and stats.
 * @param value - Username or other seed
 * @returns Non-negative integer
 */
function hashString(value: string): number {
	let hash = 0;
	for (let index = 0; index < value.length; index += 1) {
		hash = (hash * 31 + value.charCodeAt(index)) | 0;
	}
	return Math.abs(hash);
}

/**
 * Deduplicates labels while preserving first-seen order.
 * @param values - Skill or course labels
 * @returns Unique labels
 */
function uniqueLabels(values: string[]): string[] {
	const seen = new Set<string>();
	const result: string[] = [];
	for (const value of values) {
		const key = value.trim().toLowerCase();
		if (!key || seen.has(key)) {
			continue;
		}
		seen.add(key);
		result.push(value);
	}
	return result;
}

/**
 * Groups marketplace listings by profile username.
 * @param listings - All swap listings
 * @returns Username to listings map
 */
function groupListingsByUsername(listings: SwapListing[]): Map<string, SwapListing[]> {
	const groups = new Map<string, SwapListing[]>();
	for (const listing of listings) {
		const existing = groups.get(listing.username);
		if (existing) {
			existing.push(listing);
			continue;
		}
		groups.set(listing.username, [listing]);
	}
	return groups;
}

/**
 * Picks education from the first school listing in a group.
 * @param listings - Listings for one user
 * @returns Education, or undefined
 */
function educationFromListings(
	listings: SwapListing[]
): { universityId: UniversityId; level: NonNullable<SwapListing["level"]> } | undefined {
	for (const listing of listings) {
		if (listing.kind === "school" && listing.universityId && listing.level) {
			return { universityId: listing.universityId, level: listing.level };
		}
	}
	return undefined;
}

/**
 * Builds a public barter profile from one or more listings.
 * @param username - Profile slug
 * @param listings - Listings owned by this user
 * @returns Complete profile row
 */
function buildUserFromListings(username: string, listings: SwapListing[]): BarterUser {
	const primary = listings[0];
	if (!primary) {
		throw new Error(`No listings for username ${username}`);
	}

	const hash = hashString(username);
	const gender = hash % 2 === 0 ? "men" : "women";
	const photoIndex = hash % 100;
	const override = PROFILE_OVERRIDES[username];
	const education = educationFromListings(listings);

	const generated: BarterUser = {
		username,
		name: primary.name,
		email: emailFromUsername(username),
		verified: listings.some((listing) => listing.verified),
		bio: `${primary.name} trades ${primary.teaches[0] ?? "skills"} on NetMifi and is open to new matches.`,
		about: `${primary.name} listed ${listings.length} swap offer${listings.length === 1 ? "" : "s"} on the marketplace. Invite them to draft an agreement when the skills line up.`,
		avatarUrl: `https://randomuser.me/api/portraits/${gender}/${photoIndex}.jpg`,
		coverUrl: COVER_IMAGES[hash % COVER_IMAGES.length] ?? FALLBACK_COVER,
		rating: Math.max(...listings.map((listing) => listing.rating)),
		ratingPercent: Math.max(...listings.map((listing) => listing.ratingPercent)),
		positiveReviewPercent: Math.min(99, 80 + (hash % 18)),
		peersCount: 800 + (hash % 20_000),
		listingsCount: listings.length,
		joinedAt: listings.map((listing) => listing.listedAt).sort()[0] ?? "2025-01-01T00:00:00.000Z",
		learnersPeeredWith: 120 + (hash % 8_000),
		location: LOCATIONS[hash % LOCATIONS.length] ?? "Lagos State, Nigeria",
		languages: [...(LANGUAGE_SETS[hash % LANGUAGE_SETS.length] ?? ["English"])],
		socials:
			hash % 3 === 0
				? {
						instagram: `https://instagram.com/${username.replace(/-/g, "")}`,
						twitter: `https://x.com/${username.replace(/-/g, "")}`,
					}
				: {},
		education,
		teaches: uniqueLabels(listings.flatMap((listing) => listing.teaches)),
		wantsToLearn: uniqueLabels(listings.flatMap((listing) => listing.wantsToLearn)),
	};

	return override ? { ...generated, ...override } : generated;
}

/**
 * Marketplace user profiles derived from listings, with richer rows for showcase names.
 */
export const BARTER_USERS: BarterUser[] = [...groupListingsByUsername(SWAP_LISTINGS).entries()].map(
	([username, listings]) => buildUserFromListings(username, listings)
);

const USERS_BY_USERNAME = new Map(
	BARTER_USERS.map((user) => [user.username.toLowerCase(), user] as const)
);

/**
 * Looks up a barter profile by username (case-insensitive).
 * @param username - Profile slug from the URL
 * @returns Matching user, or undefined
 */
export function getUserByUsername(username: string): BarterUser | undefined {
	return USERS_BY_USERNAME.get(username.trim().toLowerCase());
}
