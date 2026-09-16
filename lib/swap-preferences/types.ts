import type { CurrencyCode } from "@/lib/currency/types";
import type { WeekdayId } from "@/mock-data/constants";
import type { AcademicLevel, RatePeriod, UniversityId } from "@/mock-data/types";

/**
 * Persisted draft for the general skill exchange form.
 */
export interface GeneralSwapDraft {
	teachEnabled: boolean;
	learnEnabled: boolean;
	teachSkills: string[];
	learnSkills: string[];
	ratePeriod: RatePeriod;
	rateAmount: string;
	note: string;
	availableDays: WeekdayId[];
	agreedToTerms: boolean;
}

/**
 * Persisted draft for the school course swap form.
 */
export interface SchoolSwapDraft {
	level: AcademicLevel | null;
	universityId: UniversityId | null;
	openToOtherSchools: boolean;
	teachEnabled: boolean;
	learnEnabled: boolean;
	teachCourses: string[];
	learnCourses: string[];
	ratePeriod: RatePeriod;
	rateAmount: string;
	note: string;
	availableDays: WeekdayId[];
	agreedToTerms: boolean;
}

export interface SwapPreferencesSnapshot {
	general: GeneralSwapDraft | null;
	school: SchoolSwapDraft | null;
	currency: CurrencyCode | null;
}

export const DEFAULT_GENERAL_SWAP_DRAFT: GeneralSwapDraft = {
	teachEnabled: true,
	learnEnabled: true,
	teachSkills: [],
	learnSkills: [],
	ratePeriod: "hour",
	rateAmount: "2000",
	note: "",
	availableDays: [],
	agreedToTerms: false,
};

export const DEFAULT_SCHOOL_SWAP_DRAFT: SchoolSwapDraft = {
	level: null,
	universityId: null,
	openToOtherSchools: false,
	teachEnabled: true,
	learnEnabled: true,
	teachCourses: [],
	learnCourses: [],
	ratePeriod: "hour",
	rateAmount: "0.00",
	note: "",
	availableDays: [],
	agreedToTerms: false,
};
