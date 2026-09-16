import { MascotIcon } from "@/components/brand/mascot-icon";

/**
 * Empty state when a barter username is missing from mock data.
 */
export function ProfileNotFound() {
	return (
		<section className="flex min-h-[60dvh] flex-col items-center justify-center px-6 py-10 text-center">
			<div className="flex size-20 items-center justify-center rounded-full bg-primary-light">
				<MascotIcon className="size-12" />
			</div>
			<h1 className="mt-6 font-semibold text-2xl tracking-tight">Profile not found</h1>
			<p className="mt-2 max-w-xs text-muted-foreground text-sm leading-relaxed">
				That username was not found on marketplace.
			</p>
		</section>
	);
}
