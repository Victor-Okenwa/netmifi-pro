import type { ClassValue } from "clsx";

import { LogoIcon } from "@/components/brand/logo-icon";
import { cn } from "@/lib/utils";

interface AppLoaderProps {
	className?: ClassValue;
}

/**
 * Brand loader: white disc, centered logo, spinning red→white gradient ring.
 */
export function AppLoader({ className }: AppLoaderProps) {
	return (
		<div aria-busy="true" className={cn("relative size-28", className)}>
			{/* Spinning gradient arc — conic trail matches the design better than a stroked circle */}
			<div
				aria-hidden
				className="absolute inset-0 animate-spin rounded-full"
				style={{
					background:
						"conic-gradient(from 0deg, transparent 0%, oklch(0.985 0 0 / 0.2) 35%, var(--primary) 78%, var(--primary) 100%)",
					mask: "radial-gradient(farthest-side, transparent calc(100% - 0.55rem), #000 calc(100% - 0.55rem))",
					WebkitMask:
						"radial-gradient(farthest-side, transparent calc(100% - 0.55rem), #000 calc(100% - 0.55rem))",
				}}
			/>
			<div className="absolute inset-[15%] flex items-center justify-center rounded-full bg-white shadow-[0_6px_24px_rgba(0,0,0,0.28)]">
				<LogoIcon className="h-[58%] w-auto" />
			</div>
			<span className="sr-only">Loading</span>
		</div>
	);
}

interface AppLoaderOverlayProps {
	className?: ClassValue;
}

/**
 * Full-viewport loader centered on a transparent black scrim.
 */
export function AppLoaderOverlay({ className }: AppLoaderOverlayProps) {
	return (
		<div
			className={cn(
				"fixed inset-0 z-[100] flex items-center justify-center bg-black/50",
				className
			)}
		>
			<AppLoader />
		</div>
	);
}
