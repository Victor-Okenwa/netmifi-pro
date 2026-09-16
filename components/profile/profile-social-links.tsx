import { cn } from "@/lib/utils";
import type { BarterSocialLinks } from "@/mock-data/types";

interface ProfileSocialLinksProps {
	socials: BarterSocialLinks;
	className?: string;
}

/**
 * External social icons for a barter profile.
 */
export function ProfileSocialLinks({ socials, className }: ProfileSocialLinksProps) {
	const items = [
		socials.facebook ? { href: socials.facebook, label: "Facebook", icon: FacebookIcon } : null,
		socials.instagram ? { href: socials.instagram, label: "Instagram", icon: InstagramIcon } : null,
		socials.twitter ? { href: socials.twitter, label: "Twitter", icon: TwitterIcon } : null,
		socials.linkedin ? { href: socials.linkedin, label: "LinkedIn", icon: LinkedInIcon } : null,
	].filter((item): item is NonNullable<typeof item> => item !== null);

	if (items.length === 0) {
		return null;
	}

	return (
		<div className={cn("flex items-center gap-3 text-muted-foreground", className)}>
			{items.map((item) => (
				<a
					aria-label={item.label}
					className="flex size-8 items-center justify-center rounded-full hover:bg-muted hover:text-foreground"
					href={item.href}
					key={item.label}
					rel="noreferrer"
					target="_blank"
				>
					<item.icon />
				</a>
			))}
		</div>
	);
}

function FacebookIcon() {
	return (
		<svg aria-hidden fill="currentColor" height="16" viewBox="0 0 24 24" width="16">
			<title>Facebook</title>
			<path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" />
		</svg>
	);
}

function InstagramIcon() {
	return (
		<svg aria-hidden fill="none" height="16" viewBox="0 0 24 24" width="16">
			<title>Instagram</title>
			<rect height="16" rx="4" stroke="currentColor" strokeWidth="1.6" width="16" x="4" y="4" />
			<circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
			<circle cx="16.4" cy="7.6" fill="currentColor" r="0.9" />
		</svg>
	);
}

function TwitterIcon() {
	return (
		<svg aria-hidden fill="currentColor" height="16" viewBox="0 0 24 24" width="16">
			<title>Twitter</title>
			<path d="M14.7 10.3 21.2 3h-1.7l-5.6 6.3L9.3 3H3.5l7 9.9L3.5 21h1.7l6.1-6.9 4.9 6.9h5.8l-7.3-10.7Zm-2.2 2.5-.7-1-5.6-7.8h2.4l4.5 6.3.7 1 5.9 8.2h-2.4l-4.8-6.7Z" />
		</svg>
	);
}

function LinkedInIcon() {
	return (
		<svg aria-hidden fill="currentColor" height="16" viewBox="0 0 24 24" width="16">
			<title>LinkedIn</title>
			<path d="M6.5 9H4V20h2.5V9ZM5.2 4C4.3 4 3.6 4.7 3.6 5.6S4.3 7.2 5.2 7.2 6.9 6.5 6.9 5.6 6.2 4 5.2 4ZM20 20h-2.5v-5.6c0-1.6-.6-2.2-1.6-2.2s-1.8.8-1.8 2.3V20H11.6s.1-9.7 0-10.7h2.5v1.5c.5-.8 1.6-1.8 3.4-1.8 2.2 0 3.5 1.4 3.5 4.4V20Z" />
		</svg>
	);
}
