import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProfileSectionCardProps {
	title: string;
	children: ReactNode;
	className?: string;
}

/**
 * Rounded white card used for About, Skills, and other profile bands.
 */
export function ProfileSectionCard({ title, children, className }: ProfileSectionCardProps) {
	return (
		<section
			className={cn("rounded-2xl bg-card p-4 shadow-sm ring-1 ring-foreground/10", className)}
		>
			<h2 className="font-semibold text-base text-foreground">{title}</h2>
			<div className="mt-2">{children}</div>
		</section>
	);
}
