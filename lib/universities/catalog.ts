import type { AcademicCourse, University, UniversityId } from "@/mock-data/types";
import { UNIVERSITIES } from "@/mock-data/universities";

export interface CourseComboboxGroup {
	value: string;
	items: string[];
}

/**
 * Formats a course for combobox chips and list rows.
 * @param course - Academic course
 * @returns Display label like "COM 111 · Introduction to Computing"
 */
export function formatCourseLabel(course: AcademicCourse): string {
	return `${course.code} · ${course.name}`;
}

/**
 * Looks up a university by id.
 * @param id - University id
 * @returns Matching university, or undefined
 */
export function getUniversityById(id: UniversityId): University | undefined {
	return UNIVERSITIES.find((university) => university.id === id);
}

/**
 * Course categories for a university, shaped for Combobox groups.
 * @param universityId - Selected school id
 * @returns Grouped course labels
 */
export function getCourseComboboxGroups(universityId: UniversityId): CourseComboboxGroup[] {
	const university = getUniversityById(universityId);
	if (!university) {
		return [];
	}

	return university.categories.map((category) => ({
		value: category.name,
		items: category.courses.map((course) => formatCourseLabel(course)),
	}));
}

/**
 * University options for the school picker.
 * @returns List of id + display name
 */
export function getUniversityOptions(): { id: UniversityId; name: string }[] {
	return UNIVERSITIES.map((university) => ({
		id: university.id,
		name: university.name,
	}));
}
