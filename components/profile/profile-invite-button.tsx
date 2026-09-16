"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

interface ProfileInviteButtonProps {
	name: string;
	username: string;
	className?: string;
}

/**
 * Sends a mock invite from a public profile.
 */
export function ProfileInviteButton({ name, username, className }: ProfileInviteButtonProps) {
	function handleInvite() {
		toast.success("Invite sent", {
			description: `Invitation drafted for @${username} (${name})`,
		});
	}

	return (
		<Button
			className={cn("h-11 w-full rounded-full text-sm", className)}
			onClick={handleInvite}
			type="button"
		>
			Invite to Match
		</Button>
	);
}
