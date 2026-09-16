import type { SwapListing } from "@/lib/matching/types";
import { getUniversityById } from "@/lib/universities/catalog";
import { emailFromUsername } from "@/lib/users/slug";
import { SWAP_LISTINGS } from "@/mock-data/swap-listings";
import type { AcademicLevel, BarterUser, UniversityId } from "@/mock-data/types";

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
		bio: "Data engineer · Ibadan | Python, analysis, and cleaner dashboards",
		about:
			"Gideon is a data engineer in Ibadan who cares more about clear thinking than flashy tools. He started in spreadsheets, moved into Python, and now helps teams turn messy numbers into decisions they can actually use. When he is not in a notebook, he is usually sketching how a chart should feel.",
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
		bio: "Product designer · Enugu | craft, critique, and systems",
		about:
			"Onyekachi is a product designer from Enugu. He runs critique circles for early-career designers and is stubborn about craft — spacing, type, and whether an interface actually helps someone finish a task. He is teaching himself how the things he designs get built so he can talk with engineers without guessing.",
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
		bio: "Languages coach · Lagos | English, French, public speaking",
		about:
			"Adaobi coaches professionals in English, French, and public speaking. She grew up switching languages at home and now runs small cohorts for people who need to sound clear at work. She is also teaching herself data skills so she can measure whether her sessions actually change how people communicate.",
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
		bio: "Mobile engineer · Accra | React Native and product shipping",
		about:
			"Samuel is a mobile engineer in Accra who ships React Native apps for early-stage teams. He likes calm code reviews, small pull requests, and products that still work on a slow phone. Outside work he is usually comparing notes with other builders rather than collecting certificates.",
		location: "Accra, Ghana",
		languages: ["English", "Twi"],
		peersCount: 7_250,
		listingsCount: 4,
		positiveReviewPercent: 89,
		learnersPeeredWith: 6_410,
		joinedAt: "2025-02-21T00:00:00.000Z",
	},
	"chioma-okeke": {
		bio: "Computer science student · UNN 100L | Nsukka",
		about:
			"Chioma is a 100-level computer science student at the University of Nigeria, Nsukka. Computing came easily; she wants a stronger maths foundation before 200 level so she is not guessing in later courses. She prefers studying with classmates on campus and rewriting notes until they make sense.",
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
		bio: "Mathematics tutor · UNN 200L | Enugu",
		about:
			"Ebuka is a 200-level student at UNN who tutors first-year mathematics on the side. He is patient with people who say they are 'not maths people' and keeps a folder of past questions he has rewritten in plain language. He wants more computer science depth for side projects and does not mind working with students from other schools.",
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
		bio: "UNILAG freshman · computing and campus study groups",
		about:
			"Tola is a freshman at the University of Lagos. Introductory computing clicked; algebra still needs someone who can slow down without making it feel like a lecture. She studies on campus, writes notes both people can reuse, and would rather ask a question twice than pretend she understood it.",
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
		bio: "Statistics student · UNILAG | numbers first, then code",
		about:
			"Seyi is a University of Lagos student who came in through statistics and is now trying to make computing feel as natural as a spreadsheet. He explains numbers patiently and wants more lab time so theory stops sitting on paper. Evenings are usually past questions, football, and a stubborn statistics problem.",
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
 * First word of a display name.
 * @param name - Full name
 * @returns Given name
 */
function firstNameOf(name: string): string {
	return name.trim().split(/\s+/)[0] ?? name;
}

/**
 * Drops course codes so bios read like ordinary sentences.
 * @param tag - Skill or "CODE · Name" course label
 * @returns Plain language label
 */
function plainLabel(tag: string): string {
	const separator = " · ";
	if (!tag.includes(separator)) {
		return tag;
	}
	const [, name] = tag.split(separator);
	return name?.trim() || tag;
}

/**
 * Writes a third-person bio from listing and profile facts.
 * @param name - Display name
 * @param location - City / region
 * @param teaches - Skills or courses they offer
 * @param wantsToLearn - Skills or courses they want
 * @param education - Optional school + level
 * @param hash - Seed for rotating sentence shapes
 * @returns About-card biography
 */
function buildAboutBio(
	name: string,
	location: string,
	teaches: string[],
	wantsToLearn: string[],
	education: { universityId: UniversityId; level: AcademicLevel } | undefined,
	hash: number
): string {
	const first = firstNameOf(name);
	const craft = plainLabel(teaches[0] ?? "their craft");
	const curiosity = wantsToLearn[0] ? plainLabel(wantsToLearn[0]) : null;
	const school = education ? getUniversityById(education.universityId) : undefined;
	const schoolLine =
		school && education ? ` ${first} is a ${education.level}L student at ${school.name}.` : "";
	const interest = curiosity ? ` Lately ${first} has been curious about ${curiosity}.` : "";

	const variants = [
		`${first} is based in ${location}.${schoolLine} People around them know the work in ${craft}.${interest} They like learning with peers who bring real projects, not just theory.`,
		`${name} lives in ${location} and spends most weeks practising ${craft}.${schoolLine}${interest} ${first} would rather make something with someone else than study alone.`,
		`${first} grew up working things out in public — asking questions, sharing notes, and iterating.${schoolLine} ${craft} is the craft they are most trusted for.${interest} Home base is ${location}.`,
	] as const;

	return variants[hash % variants.length] ?? variants[0];
}

/**
 * Short tagline for the profile hero.
 * @param teaches - Offer labels
 * @param location - City / region
 * @returns Compact bio line
 */
function buildHeroBio(teaches: string[], location: string): string {
	const craft = plainLabel(teaches[0] ?? "Skills");
	return `${craft} · ${location}`;
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
	const location = LOCATIONS[hash % LOCATIONS.length] ?? "Lagos State, Nigeria";
	const teaches = uniqueLabels(listings.flatMap((listing) => listing.teaches));
	const wantsToLearn = uniqueLabels(listings.flatMap((listing) => listing.wantsToLearn));

	const generated: BarterUser = {
		username,
		name: primary.name,
		email: emailFromUsername(username),
		verified: listings.some((listing) => listing.verified),
		bio: buildHeroBio(teaches, location),
		about: buildAboutBio(primary.name, location, teaches, wantsToLearn, education, hash),
		avatarUrl: `https://randomuser.me/api/portraits/${gender}/${photoIndex}.jpg`,
		coverUrl: COVER_IMAGES[hash % COVER_IMAGES.length] ?? FALLBACK_COVER,
		rating: Math.max(...listings.map((listing) => listing.rating)),
		ratingPercent: Math.max(...listings.map((listing) => listing.ratingPercent)),
		positiveReviewPercent: Math.min(99, 80 + (hash % 18)),
		peersCount: 800 + (hash % 20_000),
		listingsCount: listings.length,
		joinedAt: listings.map((listing) => listing.listedAt).sort()[0] ?? "2025-01-01T00:00:00.000Z",
		learnersPeeredWith: 120 + (hash % 8_000),
		location,
		languages: [...(LANGUAGE_SETS[hash % LANGUAGE_SETS.length] ?? ["English"])],
		socials:
			hash % 3 === 0
				? {
						instagram: `https://instagram.com/${username.replace(/-/g, "")}`,
						twitter: `https://x.com/${username.replace(/-/g, "")}`,
					}
				: {},
		education,
		teaches,
		wantsToLearn,
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
