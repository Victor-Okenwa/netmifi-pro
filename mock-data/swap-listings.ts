import type { SwapListing } from "@/lib/matching/types";
import { getAllSkillNames } from "@/lib/skills/catalog";
import { formatCourseLabel } from "@/lib/universities/catalog";
import { slugifyUsername } from "@/lib/users/slug";
import type { AcademicCourse, RatePeriod, UniversityId } from "@/mock-data/types";
import { UNIVERSITIES } from "@/mock-data/universities";

/**
 * Resolves a course label from a university catalog.
 * @param universityId - School id
 * @param code - Course code
 * @returns Formatted label, or code when missing
 */
function course(universityId: UniversityId, code: string): string {
	const university = UNIVERSITIES.find((item) => item.id === universityId);
	if (!university) {
		return code;
	}

	for (const category of university.categories) {
		const match: AcademicCourse | undefined = category.courses.find((item) => item.code === code);
		if (match) {
			return formatCourseLabel(match);
		}
	}

	return code;
}

/**
 * Builds a listing display name and unique profile username.
 * @param first - First name
 * @param last - Last name
 * @param suffix - Optional suffix so generated rows stay unique
 * @returns Name and username
 */
function listingPerson(
	first: string,
	last: string,
	suffix?: string
): { name: string; username: string } {
	const name = `${first} ${last}`;
	const base = slugifyUsername(name);
	return { name, username: suffix ? `${base}-${suffix}` : base };
}

const FIRST_NAMES = [
	"Victony",
	"Gideon",
	"Onyekachi",
	"Adaobi",
	"Chinedu",
	"Funke",
	"Ibrahim",
	"Ngozi",
	"Tunde",
	"Amaka",
	"Kemi",
	"Samuel",
	"Blessing",
	"David",
	"Chioma",
	"Ebuka",
	"Tola",
	"Seyi",
	"Adeola",
	"Esther",
];

const LAST_NAMES = [
	"Darey",
	"Jefferson",
	"Nnaemena",
	"Okeke",
	"Eze",
	"Adeyemi",
	"Musa",
	"Umeh",
	"Bakare",
	"Obi",
	"Balogun",
	"Okoro",
	"Etuk",
	"Nwosu",
	"Nwankwo",
	"Adebayo",
	"Ogunleye",
	"Fashola",
	"Bassey",
	"Okonkwo",
];

const RATE_PERIODS: RatePeriod[] = ["hour", "daily", "weekly", "monthly"];

/**
 * Builds general listings so every catalog skill appears as teach and learn.
 * @returns Generated general listings
 */
function buildGeneralCatalogListings(): SwapListing[] {
	const skills = getAllSkillNames();
	const listings: SwapListing[] = [];

	for (let index = 0; index < skills.length; index += 1) {
		const teachSkill = skills[index];
		const learnSkill = skills[(index + 3) % skills.length];
		const learnSkillB = skills[(index + 7) % skills.length];
		if (!teachSkill || !learnSkill || !learnSkillB) {
			continue;
		}

		const first = FIRST_NAMES[index % FIRST_NAMES.length] ?? "Alex";
		const last = LAST_NAMES[(index * 3) % LAST_NAMES.length] ?? "User";
		const withRate = index % 3 === 0;

		const { name, username } = listingPerson(first, last, `g${index}`);

		listings.push({
			id: `gen-catalog-${index}`,
			kind: "general",
			name,
			username,
			verified: index % 2 === 0,
			rating: 4 + (index % 10) / 10,
			ratingPercent: 40 + (index % 50),
			teaches: [teachSkill, skills[(index + 1) % skills.length] ?? teachSkill],
			wantsToLearn: [learnSkill, learnSkillB],
			listedAt: new Date(
				Date.UTC(2026, 9, 1 + (index % 28), 8 + (index % 10), 15, 30)
			).toISOString(),
			...(withRate
				? {
						rateAmountNgn: 1000 + index * 150,
						ratePeriod: RATE_PERIODS[index % RATE_PERIODS.length],
					}
				: {}),
		});
	}

	// Dedicated open buyers (rate, no learn skills) for each teach cluster
	for (let index = 0; index < skills.length; index += 4) {
		const skill = skills[index];
		if (!skill) {
			continue;
		}
		const buyerFirst = FIRST_NAMES[(index + 5) % FIRST_NAMES.length] ?? "Alex";
		const buyerLast = LAST_NAMES[(index + 2) % LAST_NAMES.length] ?? "Buyer";
		const buyer = listingPerson(buyerFirst, buyerLast, `b${index}`);

		listings.push({
			id: `gen-buyer-${index}`,
			kind: "general",
			name: buyer.name,
			username: buyer.username,
			verified: true,
			rating: 4.5,
			ratingPercent: 60,
			teaches: [skills[(index + 2) % skills.length] ?? skill],
			wantsToLearn: [],
			listedAt: new Date(Date.UTC(2026, 10, 1 + (index % 20), 12, 0, 0)).toISOString(),
			rateAmountNgn: 2500 + index * 100,
			ratePeriod: "weekly",
		});
	}

	return listings;
}

/**
 * Builds school listings covering courses across universities.
 * @returns Generated school listings
 */
function buildSchoolCatalogListings(): SwapListing[] {
	const listings: SwapListing[] = [];
	let counter = 0;

	for (const university of UNIVERSITIES) {
		const allCourses = university.categories.flatMap((category) =>
			category.courses.map((item) => formatCourseLabel(item))
		);

		for (let index = 0; index < allCourses.length; index += 2) {
			const teachA = allCourses[index];
			const teachB = allCourses[(index + 1) % allCourses.length];
			const learnA = allCourses[(index + 2) % allCourses.length];
			const learnB = allCourses[(index + 3) % allCourses.length];
			if (!teachA || !learnA) {
				continue;
			}

			const first = FIRST_NAMES[counter % FIRST_NAMES.length] ?? "Student";
			const last = LAST_NAMES[(counter * 2) % LAST_NAMES.length] ?? "Scholar";
			const withRate = counter % 4 === 0;

			const { name, username } = listingPerson(first, last, `s${counter}`);

			listings.push({
				id: `sch-catalog-${university.id}-${counter}`,
				kind: "school",
				name,
				username,
				verified: counter % 2 === 0,
				rating: 4 + (counter % 9) / 10,
				ratingPercent: 45 + (counter % 40),
				teaches: teachB ? [teachA, teachB] : [teachA],
				wantsToLearn: learnB ? [learnA, learnB] : [learnA],
				listedAt: new Date(
					Date.UTC(2026, 8, 1 + (counter % 27), 9 + (counter % 8), 20, 10)
				).toISOString(),
				universityId: university.id,
				level: ([100, 200, 300, 400] as const)[counter % 4],
				openToOtherSchools: counter % 3 === 0,
				...(withRate
					? {
							rateAmountNgn: 1200 + counter * 80,
							ratePeriod: RATE_PERIODS[counter % RATE_PERIODS.length],
						}
					: {}),
			});
			counter += 1;
		}
	}

	return listings;
}

/**
 * Hand-authored showcase listings (Figma-style names) plus catalog-wide coverage.
 */
const HANDCRAFTED_LISTINGS: SwapListing[] = [
	{
		id: "gen-victony",
		kind: "general",
		name: "Victony Darey",
		username: "victony-darey",
		verified: true,
		rating: 4.8,
		ratingPercent: 63,
		teaches: ["Python", "JavaScript", "SQL"],
		wantsToLearn: ["UI design", "Figma"],
		listedAt: "2026-11-25T12:43:42.000Z",
	},
	{
		id: "gen-gideon-rate",
		kind: "general",
		name: "Gideon Jefferson",
		username: "gideon-jefferson",
		verified: true,
		rating: 4.9,
		ratingPercent: 71,
		teaches: ["Python", "Data analysis"],
		wantsToLearn: ["UI design", "Brand identity"],
		listedAt: "2026-11-24T09:12:08.000Z",
		rateAmountNgn: 2000,
		ratePeriod: "weekly",
	},
	{
		id: "gen-gideon-partial",
		kind: "general",
		name: "Gideon Jefferson",
		username: "gideon-jefferson",
		verified: true,
		rating: 4.6,
		ratingPercent: 58,
		teaches: ["TypeScript", "Web development"],
		wantsToLearn: ["Guitar", "Piano"],
		listedAt: "2026-11-20T16:05:21.000Z",
	},
	{
		id: "gen-onyekachi",
		kind: "general",
		name: "Onyekachi Nnaemena",
		username: "onyekachi-nnaemena",
		verified: true,
		rating: 4.7,
		ratingPercent: 64,
		teaches: ["Figma", "UI design", "Graphic design"],
		wantsToLearn: ["Python", "JavaScript"],
		listedAt: "2026-11-18T08:22:10.000Z",
	},
	{
		id: "gen-adaobi",
		kind: "general",
		name: "Adaobi Okeke",
		username: "adaobi-okeke",
		verified: true,
		rating: 4.5,
		ratingPercent: 55,
		teaches: ["English", "French", "Public speaking"],
		wantsToLearn: ["Python", "SQL"],
		listedAt: "2026-11-15T14:01:44.000Z",
		rateAmountNgn: 3500,
		ratePeriod: "weekly",
	},
	{
		id: "gen-samuel-buyer",
		kind: "general",
		name: "Samuel Okoro",
		username: "samuel-okoro",
		verified: true,
		rating: 4.3,
		ratingPercent: 50,
		teaches: ["Mobile development", "JavaScript", "TypeScript"],
		wantsToLearn: [],
		listedAt: "2026-10-25T09:48:12.000Z",
		rateAmountNgn: 4000,
		ratePeriod: "weekly",
	},
	{
		id: "sch-unn-chioma",
		kind: "school",
		name: "Chioma Okeke",
		username: "chioma-okeke",
		verified: true,
		rating: 4.8,
		ratingPercent: 67,
		teaches: [course("unn", "COS 101"), course("unn", "COS 102")],
		wantsToLearn: [course("unn", "MTH 111"), course("unn", "MTH 121")],
		listedAt: "2026-11-25T12:43:42.000Z",
		universityId: "unn",
		level: 100,
		openToOtherSchools: false,
	},
	{
		id: "sch-unn-ebuka",
		kind: "school",
		name: "Ebuka Nwankwo",
		username: "ebuka-nwankwo",
		verified: true,
		rating: 4.7,
		ratingPercent: 62,
		teaches: [course("unn", "MTH 111"), course("unn", "MTH 211")],
		wantsToLearn: [course("unn", "COS 101"), course("unn", "COS 201")],
		listedAt: "2026-11-22T08:30:15.000Z",
		universityId: "unn",
		level: 200,
		rateAmountNgn: 2000,
		ratePeriod: "weekly",
		openToOtherSchools: true,
	},
	{
		id: "sch-unilag-tola",
		kind: "school",
		name: "Tola Adebayo",
		username: "tola-adebayo",
		verified: true,
		rating: 4.9,
		ratingPercent: 74,
		teaches: [course("unilag", "CSC 111"), course("unilag", "CSC 120")],
		wantsToLearn: [course("unilag", "MTH 111"), course("unilag", "MTH 112")],
		listedAt: "2026-11-21T09:40:18.000Z",
		universityId: "unilag",
		level: 100,
		openToOtherSchools: false,
	},
	{
		id: "sch-unilag-seyi",
		kind: "school",
		name: "Seyi Ogunleye",
		username: "seyi-ogunleye",
		verified: true,
		rating: 4.6,
		ratingPercent: 60,
		teaches: [course("unilag", "MTH 111"), course("unilag", "STA 111")],
		wantsToLearn: [course("unilag", "CSC 111"), course("unilag", "CSC 220")],
		listedAt: "2026-11-17T14:55:02.000Z",
		universityId: "unilag",
		level: 100,
		rateAmountNgn: 2500,
		ratePeriod: "weekly",
		openToOtherSchools: true,
	},
];

/**
 * Marketplace listings for general skill and school course matching.
 * Includes handcrafted rows plus catalog-generated coverage so selections resolve.
 */
export const SWAP_LISTINGS: SwapListing[] = [
	...HANDCRAFTED_LISTINGS,
	...buildGeneralCatalogListings(),
	...buildSchoolCatalogListings(),
];

/**
 * Listings for a given swap kind.
 * @param kind - general or school
 * @returns Filtered listings
 */
export function getListingsByKind(kind: SwapListing["kind"]): SwapListing[] {
	return SWAP_LISTINGS.filter((listing) => listing.kind === kind);
}
