"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxCollection,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxItem,
	ComboboxLabel,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor,
} from "@/components/ui/combobox";
import { getCourseComboboxGroups } from "@/lib/universities/catalog";
import { cn } from "@/lib/utils";
import type { UniversityId } from "@/mock-data/types";

interface CourseComboboxProps {
	universityId: UniversityId | null;
	value: string[];
	onValueChange: (courses: string[]) => void;
	placeholder: string;
	disabled?: boolean;
	className?: string;
}

/**
 * Multi-select course combobox grouped by department for a chosen school.
 */
export function CourseCombobox({
	universityId,
	value,
	onValueChange,
	placeholder,
	disabled = false,
	className,
}: CourseComboboxProps) {
	const anchor = useComboboxAnchor();
	const groups = universityId ? getCourseComboboxGroups(universityId) : [];
	const isDisabled = disabled || !universityId;

	return (
		<Combobox
			disabled={isDisabled}
			items={groups}
			multiple
			onValueChange={onValueChange}
			value={value}
		>
			<ComboboxChips
				className={cn(
					"min-h-11 w-full rounded-xl border-0 bg-muted/70 px-3 py-2 shadow-none",
					isDisabled && "pointer-events-none opacity-50",
					className
				)}
				ref={anchor}
			>
				<ComboboxValue>
					{(values: string[]) => (
						<>
							{values.map((course) => (
								<ComboboxChip key={course}>{course}</ComboboxChip>
							))}
							{!isDisabled ? (
								<span className="flex min-w-[8rem] flex-1 items-center gap-1.5">
									{values.length === 0 ? (
										<PlusIcon className="size-4 shrink-0 text-muted-foreground" />
									) : null}
									<ComboboxChipsInput
										className="placeholder:text-muted-foreground"
										placeholder={
											values.length === 0
												? universityId
													? placeholder
													: "Select a school first"
												: "Add another"
										}
									/>
								</span>
							) : null}
						</>
					)}
				</ComboboxValue>
			</ComboboxChips>

			<ComboboxContent anchor={anchor} className="w-(--anchor-width)">
				<ComboboxEmpty>
					{universityId ? "No courses found." : "Select a school to see courses."}
				</ComboboxEmpty>
				<ComboboxList>
					{(group: (typeof groups)[number]) => (
						<ComboboxGroup items={group.items} key={group.value}>
							<ComboboxLabel>{group.value}</ComboboxLabel>
							<ComboboxCollection>
								{(item) => (
									<ComboboxItem key={item} value={item}>
										{item}
									</ComboboxItem>
								)}
							</ComboboxCollection>
						</ComboboxGroup>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}
