import { ProfileSectionCard } from "@/components/profile/profile-section-card";
import type { BarterUser } from "@/mock-data/types";

interface ProfileAboutCardProps {
	user: BarterUser;
}

/**
 * Longer bio copy for a barter profile About card.
 */
export function ProfileAboutCard({ user }: ProfileAboutCardProps) {
	return (
		<ProfileSectionCard title="About">
			<p className="text-muted-foreground text-sm leading-relaxed">{user.about}</p>
		</ProfileSectionCard>
	);
}
