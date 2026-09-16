import { ProfileSectionCard } from "@/components/profile/profile-section-card";
import { getUniversityById } from "@/lib/universities/catalog";
import type { BarterUser } from "@/mock-data/types";

interface ProfileEducationCardProps {
	user: BarterUser;
}

/**
 * School and level for users who listed a campus swap.
 */
export function ProfileEducationCard({ user }: ProfileEducationCardProps) {
	if (!user.education) {
		return null;
	}

	const school = getUniversityById(user.education.universityId);
	const schoolName = school?.name ?? user.education.universityId;

	return (
		<ProfileSectionCard title="Education Info">
			<p className="text-sm">
				<span className="text-muted-foreground">School: </span>
				<span className="text-foreground">{schoolName}</span>
			</p>
			<p className="mt-1 text-sm">
				<span className="text-muted-foreground">Level: </span>
				<span className="text-foreground">{user.education.level}L</span>
			</p>
		</ProfileSectionCard>
	);
}
