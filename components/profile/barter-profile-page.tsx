import { ProfileAboutCard } from "@/components/profile/profile-about-card";
import { ProfileDetailsCard } from "@/components/profile/profile-details-card";
import { ProfileEducationCard } from "@/components/profile/profile-education-card";
import { ProfileHero } from "@/components/profile/profile-hero";
import { ProfileLanguagesCard } from "@/components/profile/profile-languages-card";
import { ProfileSkillsCard } from "@/components/profile/profile-skills-card";
import { ProfileTopBar } from "@/components/profile/profile-top-bar";
import { cn } from "@/lib/utils";
import type { BarterUser } from "@/mock-data/types";

interface BarterProfilePageProps {
	user: BarterUser;
	backHref?: string;
	className?: string;
}

/**
 * Public barter profile composed from Figma sections.
 */
export function BarterProfilePage({ user, backHref, className }: BarterProfilePageProps) {
	return (
		<article className={cn("flex flex-col pb-6", className)}>
			<div className="px-4 pt-2">
				<ProfileTopBar backHref={backHref} />
			</div>
			<ProfileHero user={user} />
			<div className="mt-4 flex flex-col gap-3 px-4">
				<ProfileAboutCard user={user} />
				<ProfileSkillsCard user={user} />
				<ProfileEducationCard user={user} />
				<ProfileDetailsCard user={user} />
				<ProfileLanguagesCard user={user} />
			</div>
		</article>
	);
}
