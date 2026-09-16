import { isCurrencyCode } from "@/lib/currency/currencies";
import type { CurrencyCode } from "@/lib/currency/types";
import {
	DEFAULT_GENERAL_SWAP_DRAFT,
	DEFAULT_SCHOOL_SWAP_DRAFT,
	type GeneralSwapDraft,
	type SchoolSwapDraft,
	type SwapPreferencesSnapshot,
} from "@/lib/swap-preferences/types";
import type { WeekdayId } from "@/mock-data/constants";
import type { AcademicLevel, RatePeriod, UniversityId } from "@/mock-data/types";

const GENERAL_KEY = "netmifi-pro:swap-draft:general";
const SCHOOL_KEY = "netmifi-pro:swap-draft:school";

/**
 * Reads the general swap form draft from localStorage.
 * @returns Stored draft merged with defaults
 */
export function readGeneralSwapDraft(): GeneralSwapDraft {
	return mergeGeneralDraft(readJson(GENERAL_KEY));
}

/**
 * Persists the general swap form draft.
 * @param draft - Draft to store
 */
export function writeGeneralSwapDraft(draft: GeneralSwapDraft): void {
	writeJson(GENERAL_KEY, draft);
}

/**
 * Reads the school swap form draft from localStorage.
 * @returns Stored draft merged with defaults
 */
export function readSchoolSwapDraft(): SchoolSwapDraft {
	return mergeSchoolDraft(readJson(SCHOOL_KEY));
}

/**
 * Persists the school swap form draft.
 * @param draft - Draft to store
 */
export function writeSchoolSwapDraft(draft: SchoolSwapDraft): void {
	writeJson(SCHOOL_KEY, draft);
}

/**
 * Clears both swap drafts from localStorage.
 */
export function clearSwapDrafts(): void {
	if (typeof window === "undefined") {
		return;
	}

	try {
		window.localStorage.removeItem(GENERAL_KEY);
		window.localStorage.removeItem(SCHOOL_KEY);
	} catch {
		// Ignore storage failures.
	}
}

/**
 * Snapshot of saved swap preferences for the settings screen.
 * @param currency - Current preferred currency from currency storage
 * @returns Preferences snapshot
 */
export function getSwapPreferencesSnapshot(currency: CurrencyCode | null): SwapPreferencesSnapshot {
	const general = readGeneralSwapDraft();
	const school = readSchoolSwapDraft();
	return {
		general: hasMeaningfulGeneralDraft(general) ? general : null,
		school: hasMeaningfulSchoolDraft(school) ? school : null,
		currency,
	};
}

/**
 * @param draft - General draft
 * @returns Whether the draft has user-entered content
 */
export function hasMeaningfulGeneralDraft(draft: GeneralSwapDraft): boolean {
	return (
		draft.teachSkills.length > 0 ||
		draft.learnSkills.length > 0 ||
		draft.note.trim().length > 0 ||
		draft.availableDays.length > 0 ||
		draft.agreedToTerms
	);
}

/**
 * @param draft - School draft
 * @returns Whether the draft has user-entered content
 */
export function hasMeaningfulSchoolDraft(draft: SchoolSwapDraft): boolean {
	return (
		draft.level !== null ||
		draft.universityId !== null ||
		draft.teachCourses.length > 0 ||
		draft.learnCourses.length > 0 ||
		draft.note.trim().length > 0 ||
		draft.availableDays.length > 0 ||
		draft.openToOtherSchools ||
		draft.agreedToTerms
	);
}

function readJson(key: string): unknown {
	if (typeof window === "undefined") {
		return null;
	}

	try {
		const raw = window.localStorage.getItem(key);
		if (!raw) {
			return null;
		}
		return JSON.parse(raw) as unknown;
	} catch {
		return null;
	}
}

function writeJson(key: string, value: unknown): void {
	if (typeof window === "undefined") {
		return;
	}

	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// Ignore storage failures.
	}
}

function mergeGeneralDraft(value: unknown): GeneralSwapDraft {
	if (typeof value !== "object" || value === null) {
		return { ...DEFAULT_GENERAL_SWAP_DRAFT };
	}

	const record = value as Record<string, unknown>;
	return {
		teachEnabled: typeof record.teachEnabled === "boolean" ? record.teachEnabled : true,
		learnEnabled: typeof record.learnEnabled === "boolean" ? record.learnEnabled : true,
		teachSkills: asStringArray(record.teachSkills),
		learnSkills: asStringArray(record.learnSkills),
		ratePeriod: asRatePeriod(record.ratePeriod) ?? "hour",
		rateAmount: typeof record.rateAmount === "string" ? record.rateAmount : "2000",
		note: typeof record.note === "string" ? record.note : "",
		availableDays: asWeekdays(record.availableDays),
		agreedToTerms: record.agreedToTerms === true,
	};
}

function mergeSchoolDraft(value: unknown): SchoolSwapDraft {
	if (typeof value !== "object" || value === null) {
		return { ...DEFAULT_SCHOOL_SWAP_DRAFT };
	}

	const record = value as Record<string, unknown>;
	return {
		level: asAcademicLevel(record.level),
		universityId: asUniversityId(record.universityId),
		openToOtherSchools: record.openToOtherSchools === true,
		teachEnabled: typeof record.teachEnabled === "boolean" ? record.teachEnabled : true,
		learnEnabled: typeof record.learnEnabled === "boolean" ? record.learnEnabled : true,
		teachCourses: asStringArray(record.teachCourses),
		learnCourses: asStringArray(record.learnCourses),
		ratePeriod: asRatePeriod(record.ratePeriod) ?? "hour",
		rateAmount: typeof record.rateAmount === "string" ? record.rateAmount : "0.00",
		note: typeof record.note === "string" ? record.note : "",
		availableDays: asWeekdays(record.availableDays),
		agreedToTerms: record.agreedToTerms === true,
	};
}

function asStringArray(value: unknown): string[] {
	if (!Array.isArray(value)) {
		return [];
	}
	return value.filter((item): item is string => typeof item === "string");
}

function asWeekdays(value: unknown): WeekdayId[] {
	if (!Array.isArray(value)) {
		return [];
	}
	const allowed: WeekdayId[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
	return value.filter((item): item is WeekdayId =>
		typeof item === "string" ? allowed.includes(item as WeekdayId) : false
	);
}

function asRatePeriod(value: unknown): RatePeriod | null {
	if (value === "hour" || value === "daily" || value === "weekly" || value === "monthly") {
		return value;
	}
	return null;
}

function asAcademicLevel(value: unknown): AcademicLevel | null {
	if (
		value === 100 ||
		value === 200 ||
		value === 300 ||
		value === 400 ||
		value === 500 ||
		value === 600 ||
		value === 700
	) {
		return value;
	}
	return null;
}

function asUniversityId(value: unknown): UniversityId | null {
	if (
		value === "imt" ||
		value === "unn" ||
		value === "ui" ||
		value === "unilag" ||
		value === "unical" ||
		value === "unizik"
	) {
		return value;
	}
	return null;
}

/**
 * Type guard helper re-export for settings currency display.
 * @param value - Unknown currency
 * @returns Whether value is a supported currency
 */
export function isStoredCurrency(value: unknown): value is CurrencyCode {
	return isCurrencyCode(value);
}
