import Image from "next/image";
import Link from "next/link";
import { SwapOptionCard } from "@/components/swap-skill/swap-option-card";
import {
	BackChevronIcon,
	ClassicalBuildingIcon,
	SchoolBuildingIcon,
} from "@/components/swap-skill/swap-skill-icons";
import { cn } from "@/lib/utils";

interface SwapSkillPageProps {
	className?: string;
	backHref?: string;
}

/**
 * Swap Skill landing: choose general skill swap or school course swap.
 */
export function SwapSkillPage({ className, backHref = "/" }: SwapSkillPageProps) {
	return (
		<section className={cn("flex flex-col px-4 pb-4 pt-2", className)}>
			<header className="relative flex items-center justify-center py-2">
				<Link
					aria-label="Go back"
					className="absolute top-1/2 left-0 flex size-10 -translate-y-1/2 items-center justify-center text-foreground"
					href={backHref}
				>
					<BackChevronIcon />
				</Link>
				<h1 className="font-bold text-xl tracking-tight">Swap Skill</h1>
			</header>

			<p className="mt-3 text-center text-muted-foreground text-sm leading-relaxed">
				Choose the skill you want to swap or exchange
			</p>

			<div className="mx-auto mt-8 flex w-full max-w-[16rem] justify-center">
				<Image
					alt="Pink box filled with goods and gifts"
					className="h-auto w-full"
					height={280}
					priority
					src="/brand/pink_box_with_goods.png"
					width={280}
				/>
			</div>

			<div className="mt-8 flex flex-col gap-3">
				<SwapOptionCard
					description="Swap professional skills. e.g. Design for Coding, English for Finance"
					emphasized
					href="/swap-skill/general"
					icon={<ClassicalBuildingIcon />}
					title="General Skill Swap"
				/>
				<SwapOptionCard
					description="Swap school courses. e.g. Math for Biology, Physics for Economics"
					href="/swap-skill/school"
					icon={<SchoolBuildingIcon />}
					title="School Course Swap"
				/>
			</div>
		</section>
	);
}
