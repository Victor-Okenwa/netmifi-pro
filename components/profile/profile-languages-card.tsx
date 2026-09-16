import { ProfileSectionCard } from "@/components/profile/profile-section-card";
import type { BarterUser } from "@/mock-data/types";

interface ProfileLanguagesCardProps {
	user: BarterUser;
}

/**
 * Spoken languages listed on a barter profile.
 */
export function ProfileLanguagesCard({ user }: ProfileLanguagesCardProps) {
	if (user.languages.length === 0) {
		return null;
	}

	return (
		<ProfileSectionCard title="Languages Known">
			<p className="text-muted-foreground text-sm">{user.languages.join(", ")}</p>
		</ProfileSectionCard>
	);
}
