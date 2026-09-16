import { ProfileSectionCard } from "@/components/profile/profile-section-card";
import { cn } from "@/lib/utils";
import type { BarterUser } from "@/mock-data/types";

interface ProfileSkillsCardProps {
	user: BarterUser;
}

/**
 * Teach / learn chips for a barter profile.
 */
export function ProfileSkillsCard({ user }: ProfileSkillsCardProps) {
	return (
		<ProfileSectionCard title="Skills">
			<SkillRow label="Teaches:" tags={user.teaches} variant="teach" />
			<SkillRow
				className="mt-2"
				emptyLabel="Open to pay"
				label="Wants to learn:"
				tags={user.wantsToLearn}
				variant="learn"
			/>
		</ProfileSectionCard>
	);
}

interface SkillRowProps {
	label: string;
	tags: string[];
	variant: "teach" | "learn";
	emptyLabel?: string;
	className?: string;
}

function SkillRow({ label, tags, variant, emptyLabel = "—", className }: SkillRowProps) {
	return (
		<div className={cn("flex flex-wrap items-center gap-1.5", className)}>
			<span className="text-muted-foreground text-xs">{label}</span>
			{tags.length === 0 ? (
				<span className="text-muted-foreground text-xs italic">{emptyLabel}</span>
			) : (
				tags.map((tag) => (
					<span
						className={cn(
							"rounded-full border px-2 py-0.5 text-[11px] leading-tight",
							variant === "teach"
								? "border-primary/50 text-primary"
								: "border-foreground/40 text-foreground"
						)}
						key={tag}
					>
						{shortTag(tag)}
					</span>
				))
			)}
		</div>
	);
}

/**
 * Shortens long course labels for compact chips.
 * @param tag - Full skill or course label
 * @returns Chip text
 */
function shortTag(tag: string): string {
	const separator = " · ";
	if (tag.includes(separator)) {
		const [code] = tag.split(separator);
		return code ?? tag;
	}
	return tag;
}
