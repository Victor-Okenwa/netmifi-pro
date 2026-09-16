import { BarterProfilePage } from "@/components/profile/barter-profile-page";
import { ProfileNotFound } from "@/components/profile/profile-not-found";
import { getUserByUsername } from "@/lib/users/catalog";

interface UserProfilePageProps {
	params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: UserProfilePageProps) {
	const { username } = await params;
	const user = getUserByUsername(username);
	if (!user) {
		return { title: "Profile not found · NetMifi" };
	}

	return {
		title: `${user.name} · Barter Profile`,
		description: user.bio,
	};
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
	const { username } = await params;
	const user = getUserByUsername(username);
	if (!user) {
		return <ProfileNotFound />;
	}

	return <BarterProfilePage user={user} />;
}
