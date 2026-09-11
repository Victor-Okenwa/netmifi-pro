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
