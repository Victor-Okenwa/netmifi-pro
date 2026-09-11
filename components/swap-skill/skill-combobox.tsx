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
import { getSkillComboboxGroups } from "@/lib/skills/catalog";
import { cn } from "@/lib/utils";

const SKILL_GROUPS = getSkillComboboxGroups();

interface SkillComboboxProps {
	value: string[];
	onValueChange: (skills: string[]) => void;
	placeholder: string;
	disabled?: boolean;
	className?: string;
}

/**
 * Multi-select skill combobox grouped by mock skill categories.
 */
export function SkillCombobox({
	value,
	onValueChange,
	placeholder,
	disabled = false,
	className,
}: SkillComboboxProps) {
	const anchor = useComboboxAnchor();

	return (
		<Combobox
			disabled={disabled}
			items={SKILL_GROUPS}
			multiple
			onValueChange={onValueChange}
			value={value}
		>
			<ComboboxChips
				className={cn(
					"min-h-11 w-full rounded-xl border-0 bg-muted/70 px-3 py-2 shadow-none",
					disabled && "pointer-events-none opacity-50",
					className
				)}
				ref={anchor}
			>
				<ComboboxValue>
					{(values: string[]) => (
						<>
							{values.map((skill) => (
								<ComboboxChip key={skill}>{skill}</ComboboxChip>
							))}
							{!disabled ? (
								<span className="flex min-w-[8rem] flex-1 items-center gap-1.5">
									{values.length === 0 ? (
										<PlusIcon className="size-4 shrink-0 text-muted-foreground" />
									) : null}
									<ComboboxChipsInput
										className="placeholder:text-muted-foreground"
										placeholder={values.length === 0 ? placeholder : "Add another"}
									/>
								</span>
							) : null}
						</>
					)}
				</ComboboxValue>
			</ComboboxChips>

			<ComboboxContent anchor={anchor} className="w-(--anchor-width)">
				<ComboboxEmpty>No skills found.</ComboboxEmpty>
				<ComboboxList>
					{(group: (typeof SKILL_GROUPS)[number]) => (
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
