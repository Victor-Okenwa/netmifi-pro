import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProfileTopBarProps {
	backHref?: string;
	className?: string;
}

/**
 * Page title for a public barter profile.
 */
export function ProfileTopBar({ backHref = "/swap-skill/matches", className }: ProfileTopBarProps) {
	return (
		<header className={cn("relative flex items-center justify-center py-2", className)}>
			<Link
				aria-label="Go back"
				className="absolute top-1/2 left-0 flex size-10 -translate-y-1/2 items-center justify-center text-foreground"
				href={backHref}
			>
				<ChevronLeft className="size-6" />
			</Link>
			<h1 className="font-bold text-xl tracking-tight">Barter Profile</h1>
		</header>
	);
}
