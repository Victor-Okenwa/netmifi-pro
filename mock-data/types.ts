export type AcademicLevel = 100 | 200 | 300 | 400 | 500 | 600 | 700;

export type RatePeriod = "hour" | "daily" | "weekly" | "monthly";

export type UniversityId = "imt" | "unn" | "ui" | "unilag" | "unical" | "unizik";

export interface AcademicCourse {
	name: string;
	code: string;
}

export interface CourseCategory {
	name: string;
	courses: AcademicCourse[];
}

export interface University {
	id: UniversityId;
	name: string;
	shortName: string;
	categories: CourseCategory[];
}

export interface Skill {
	name: string;
}

export interface SkillCategory {
	name: string;
	skills: Skill[];
}

export interface BarterSocialLinks {
	facebook?: string;
	instagram?: string;
	twitter?: string;
	linkedin?: string;
}

export interface BarterEducation {
	universityId: UniversityId;
	level: AcademicLevel;
}

export interface BarterUser {
	username: string;
	name: string;
	email: string;
	verified: boolean;
	/** Short tagline shown under the name */
	bio: string;
	/** Longer first-person or third-person bio in the About card */
	about: string;
	avatarUrl: string;
	coverUrl: string;
	rating: number;
	ratingPercent: number;
	positiveReviewPercent: number;
	peersCount: number;
	listingsCount: number;
	joinedAt: string;
	learnersPeeredWith: number;
	location: string;
	languages: string[];
	socials: BarterSocialLinks;
	education?: BarterEducation;
	teaches: string[];
	wantsToLearn: string[];
}
