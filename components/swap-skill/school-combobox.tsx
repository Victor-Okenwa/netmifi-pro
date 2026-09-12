"use client";

import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import { getUniversityOptions } from "@/lib/universities/catalog";
import { cn } from "@/lib/utils";
import type { UniversityId } from "@/mock-data/types";

const UNIVERSITY_OPTIONS = getUniversityOptions();
const UNIVERSITY_NAMES = UNIVERSITY_OPTIONS.map((university) => university.name);

interface SchoolComboboxProps {
	value: UniversityId | null;
	onValueChange: (id: UniversityId | null) => void;
	className?: string;
	id?: string;
}

/**
 * Single-select school combobox backed by mock universities.
 */
export function SchoolCombobox({ value, onValueChange, className, id }: SchoolComboboxProps) {
	const selectedName =
		UNIVERSITY_OPTIONS.find((university) => university.id === value)?.name ?? null;

	function handleValueChange(next: string | null) {
		if (!next) {
			onValueChange(null);
			return;
		}

		const match = UNIVERSITY_OPTIONS.find((university) => university.name === next);
		onValueChange(match?.id ?? null);
	}

	return (
		<Combobox items={UNIVERSITY_NAMES} onValueChange={handleValueChange} value={selectedName}>
			<ComboboxInput
				className={cn(
					"h-11 w-full rounded-xl border-0 bg-muted/70 shadow-none *:data-[slot=input-group-control]:bg-transparent",
					className
				)}
				id={id}
				placeholder="Type your school"
				showClear={selectedName !== null}
			/>
			<ComboboxContent className="w-(--anchor-width)">
				<ComboboxEmpty>No schools found.</ComboboxEmpty>
				<ComboboxList>
					{(name: string) => (
						<ComboboxItem key={name} value={name}>
							{name}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}
