"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PromoBannerCard } from "@/components/home/promo-banner-card";
import { cn } from "@/lib/utils";

const PROMO_SLIDE_IDS = ["promo-1", "promo-2", "promo-3", "promo-4", "promo-5"] as const;

/** Fixed dot colors — do not theme. */
const ACTIVE_DOT = "#9F1239";
const INACTIVE_DOT = "#D1D5DB";

interface PromoCarouselProps {
	className?: string;
}

/**
 * Home promo carousel — five identical skill-discount banners with page dots.
 */
export function PromoCarousel({ className }: PromoCarouselProps) {
	const scrollerRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const syncActiveFromScroll = useCallback(() => {
		const scroller = scrollerRef.current;
		if (!scroller) {
			return;
		}

		const width = scroller.clientWidth;
		if (width <= 0) {
			return;
		}

		const nextIndex = Math.round(scroller.scrollLeft / width);
		setActiveIndex(Math.min(Math.max(nextIndex, 0), PROMO_SLIDE_IDS.length - 1));
	}, []);

	useEffect(() => {
		const scroller = scrollerRef.current;
		if (!scroller) {
			return;
		}

		syncActiveFromScroll();
		scroller.addEventListener("scroll", syncActiveFromScroll, { passive: true });
		return () => scroller.removeEventListener("scroll", syncActiveFromScroll);
	}, [syncActiveFromScroll]);

	function goToSlide(index: number) {
		const scroller = scrollerRef.current;
		if (!scroller) {
			return;
		}

		scroller.scrollTo({
			left: index * scroller.clientWidth,
			behavior: "smooth",
		});
		setActiveIndex(index);
	}

	return (
		<section aria-label="Promotions" className={cn("w-full", className)}>
			<div
				className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
				ref={scrollerRef}
			>
				{PROMO_SLIDE_IDS.map((slideId) => (
					<div className="w-full shrink-0 snap-center snap-always" key={slideId}>
						<PromoBannerCard />
					</div>
				))}
			</div>

			<div className="mt-3 flex items-center justify-center gap-1.5">
				{PROMO_SLIDE_IDS.map((slideId, index) => {
					const isActive = index === activeIndex;
					return (
						<button
							aria-current={isActive ? "true" : undefined}
							aria-label={`Go to promotion ${index + 1}`}
							className="size-2 rounded-full transition-[transform,background-color] duration-200"
							key={slideId}
							onClick={() => goToSlide(index)}
							style={{
								backgroundColor: isActive ? ACTIVE_DOT : INACTIVE_DOT,
								transform: isActive ? "scale(1.15)" : "scale(1)",
							}}
							type="button"
						/>
					);
				})}
			</div>
		</section>
	);
}
