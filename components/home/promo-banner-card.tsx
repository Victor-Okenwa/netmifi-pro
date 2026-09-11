import Link from "next/link";
import { RobotTokens } from "@/components/brand/robot-tokens";
import { cn } from "@/lib/utils";

/** Fixed banner colors — do not theme (stay the same in light/dark). */
const PROMO_GRADIENT = "linear-gradient(90deg, #0A0A0A 0%, #5C0F1E 42%, #9F1239 78%, #BE123C 100%)";
const PROMO_CTA_TEXT = "#9F1239";

interface PromoBannerCardProps {
	className?: string;
	href?: string;
}

/**
 * Promotional banner: dark-to-crimson gradient, copy, CTA, and robot art.
 */
export function PromoBannerCard({ className, href = "/create-course" }: PromoBannerCardProps) {
	return (
		<article
			className={cn(
				"relative isolate min-h-[9.5rem] overflow-hidden rounded-3xl px-4 py-4 pr-28 sm:pr-32",
				className
			)}
			style={{ background: PROMO_GRADIENT }}
		>
			<div className="relative z-10 flex h-full max-w-[60%] flex-col justify-center gap-2">
				<h2 className="font-semibold text-[0.95rem] text-white leading-snug tracking-tight">
					Elevate Your Skills to
					<br />
					Transform Your Career
				</h2>
				<p className="text-[0.7rem] text-white/70 leading-snug">
					Enjoy 30% discount on your first purchase.
				</p>
				<Link
					className="mt-1 inline-flex w-fit items-center justify-center rounded-full bg-white px-4 py-1.5 font-semibold text-xs"
					href={href}
					style={{ color: PROMO_CTA_TEXT }}
				>
					Buy Now!
				</Link>
			</div>

			<div className="pointer-events-none absolute right-[-0.25rem] bottom-[-0.35rem] z-0 w-[9.5rem] sm:w-[10.5rem]">
				<RobotTokens className="h-auto w-full" />
			</div>
		</article>
	);
}
