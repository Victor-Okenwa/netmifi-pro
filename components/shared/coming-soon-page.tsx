import { MascotIcon } from "@/components/brand/mascot-icon";
import { cn } from "@/lib/utils";

interface ComingSoonPageProps {
	title: string;
	description?: string;
	className?: string;
}

/**
 * Placeholder screen for routes that are not built yet.
 */
export function ComingSoonPage({
	title,
	description = "This feature is on the way. Check back soon.",
	className,
}: ComingSoonPageProps) {
	return (
		<section
			className={cn(
				"flex min-h-[60dvh] flex-col items-center justify-center px-6 py-10 text-center",
				className
			)}
		>
			<div className="flex size-20 items-center justify-center rounded-full bg-primary-light">
				<MascotIcon className="size-12" />
			</div>
			<p className="mt-6 font-semibold text-primary text-xs uppercase tracking-[0.2em]">
				Coming soon
			</p>
			<h1 className="mt-2 font-semibold text-2xl tracking-tight">{title}</h1>
			<p className="mt-2 max-w-xs text-muted-foreground text-sm leading-relaxed">{description}</p>
		</section>
	);
}
