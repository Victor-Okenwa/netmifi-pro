import {
	CheckBadgeIcon,
	DocumentTextIcon,
	HomeIcon,
	StarIcon,
	UserGroupIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { ProfileInviteButton } from "@/components/profile/profile-invite-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameInitial } from "@/lib/auth/display";
import { formatCompactCount } from "@/lib/users/format";
import { cn } from "@/lib/utils";
import type { BarterUser } from "@/mock-data/types";

interface ProfileHeroProps {
	user: BarterUser;
	className?: string;
}

/**
 * Cover, avatar, name, bio, stats, and invite CTA for a barter profile.
 */
export function ProfileHero({ user, className }: ProfileHeroProps) {
	const initial = getNameInitial(user.name);

	return (
		<div className={cn("flex flex-col", className)}>
			<div className="relative h-28 w-full bg-gradient-to-r from-teal-700 to-emerald-500">
				<Image
					alt=""
					className="object-cover"
					fill
					priority
					sizes="(max-width: 28rem) 100vw, 28rem"
					src={user.coverUrl}
				/>
				<Link
					aria-label="Home"
					className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm"
					href="/"
				>
					<HomeIcon className="size-4" />
				</Link>
			</div>

			<div className="relative px-4">
				<div className="-top-12 absolute left-1/2 z-10 -translate-x-1/2">
					<Avatar className="size-24 bg-primary text-primary-foreground ring-[3px] ring-sky-200 after:border-white dark:ring-sky-800">
						<AvatarImage alt={user.name} src={user.avatarUrl} />
						<AvatarFallback className="bg-primary font-semibold text-2xl text-primary-foreground">
							{initial}
						</AvatarFallback>
					</Avatar>
				</div>

				<div className="flex flex-col items-center pt-14 text-center">
					<div className="flex items-center gap-1">
						<h2 className="font-semibold text-lg tracking-tight">{user.name}</h2>
						{user.verified ? (
							<CheckBadgeIcon aria-label="Verified" className="size-5 text-primary" />
						) : null}
					</div>
					<p className="mt-0.5 text-muted-foreground text-xs">@{user.username}</p>
					<p className="mt-2 line-clamp-2 max-w-sm text-muted-foreground text-xs leading-relaxed">
						{user.bio}
					</p>

					<div className="mt-3 flex items-center gap-5 text-muted-foreground text-xs">
						<span className="inline-flex items-center gap-1">
							<StarIcon className="size-4 text-amber-400" />
							<span className="font-medium text-foreground">{user.rating.toFixed(1)}</span>
						</span>
						<span className="inline-flex items-center gap-1">
							<UserGroupIcon className="size-4" />
							<span className="font-medium text-foreground">
								{formatCompactCount(user.peersCount)}
							</span>
						</span>
						<span className="inline-flex items-center gap-1">
							<DocumentTextIcon className="size-4" />
							<span className="font-medium text-foreground">
								{formatCompactCount(user.listingsCount)}
							</span>
						</span>
					</div>

					<ProfileInviteButton className="mt-4" name={user.name} username={user.username} />
				</div>
			</div>
		</div>
	);
}
