import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SwapOptionCardProps {
	href: string;
	title: string;
	description: string;
	icon: ReactNode;
	/** Emphasized / selected look (pale primary fill + primary border). */
	emphasized?: boolean;
	className?: string;
}

/**
 * Tappable option card for choosing a swap flow (general vs school).
 */
export function SwapOptionCard({
	href,
	title,
	description,
	icon,
	emphasized = false,
	className,
}: SwapOptionCardProps) {
	return (
		<Link
			className={cn(
				"flex flex-col items-center text-center gap-3 rounded-lg border px-4 py-7 transition-colors",
				emphasized
					? "border-primary bg-primary-light text-primary"
					: "border-border bg-card text-foreground",
				"active:opacity-90",
				className
			)}
			href={href}
		>
			<span className={cn("mt-0.5 shrink-0", emphasized ? "text-primary" : "text-foreground")}>
				{icon}
			</span>
			<span className="min-w-0 flex-1">
				<span
					className={cn(
						"block font-semibold text-base leading-snug",
						emphasized ? "text-primary" : "text-foreground"
					)}
				>
					{title}
				</span>
				<span className={cn("mt-1 block text-sm leading-relaxed text-muted-foreground")}>
					{description}
				</span>
			</span>
		</Link>
	);
}
