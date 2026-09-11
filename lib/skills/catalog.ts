import { SKILL_CATEGORIES } from "@/mock-data/skills";

export interface SkillComboboxGroup {
	value: string;
	items: string[];
}

/**
 * Skill categories shaped for Base UI Combobox groups.
 * @returns Grouped skill names from mock catalog
 */
export function getSkillComboboxGroups(): SkillComboboxGroup[] {
	return SKILL_CATEGORIES.map((category) => ({
		value: category.name,
		items: category.skills.map((skill) => skill.name),
	}));
}

/**
 * Flat list of all skill names from the catalog.
 * @returns Every skill name
 */
export function getAllSkillNames(): string[] {
	return getSkillComboboxGroups().flatMap((group) => [...group.items]);
}
