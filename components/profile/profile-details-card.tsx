import {
	AtSymbolIcon,
	CalendarDaysIcon,
	EnvelopeIcon,
	FaceSmileIcon,
	MapPinIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import type { ReactNode } from "react";
import { ProfileSectionCard } from "@/components/profile/profile-section-card";
import { ProfileSocialLinks } from "@/components/profile/profile-social-links";
import { formatGroupedCount, formatJoinedDate } from "@/lib/users/format";
import type { BarterUser } from "@/mock-data/types";

interface ProfileDetailsCardProps {
	user: BarterUser;
}

/**
 * Join date, reviews, peers, location, contact, and socials.
 */
export function ProfileDetailsCard({ user }: ProfileDetailsCardProps) {
	return (
		<ProfileSectionCard title="Details">
			<ul className="flex flex-col gap-2.5">
				<DetailRow icon={<CalendarDaysIcon className="size-4" />}>
					Joined {formatJoinedDate(user.joinedAt)}
				</DetailRow>
				<DetailRow icon={<FaceSmileIcon className="size-4" />}>
					{user.positiveReviewPercent}% positive reviews
				</DetailRow>
				<DetailRow icon={<UserGroupIcon className="size-4" />}>
					{formatGroupedCount(user.learnersPeeredWith)} learners peered with
				</DetailRow>
				<DetailRow icon={<MapPinIcon className="size-4" />}>{user.location}</DetailRow>
				<DetailRow icon={<AtSymbolIcon className="size-4" />}>@{user.username}</DetailRow>
				<DetailRow icon={<EnvelopeIcon className="size-4" />}>
					<a className="hover:underline" href={`mailto:${user.email}`}>
						{user.email}
					</a>
				</DetailRow>
			</ul>
			<ProfileSocialLinks className="mt-3" socials={user.socials} />
		</ProfileSectionCard>
	);
}

interface DetailRowProps {
	icon: ReactNode;
	children: ReactNode;
}

function DetailRow({ icon, children }: DetailRowProps) {
	return (
		<li className="flex items-start gap-2.5 text-muted-foreground text-sm">
			<span className="mt-0.5 shrink-0">{icon}</span>
			<span className="min-w-0 leading-snug">{children}</span>
		</li>
	);
}
