import { InfoIcon } from "lucide-react";

/**
 * Demo disclaimer shown on sign-in and sign-up.
 */
export function AuthDemoNotice() {
	return (
		<div className="mb-6 flex items-start gap-2.5 rounded-xl bg-primary-light px-3 py-3">
			<InfoIcon aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
			<p className="text-foreground text-sm leading-relaxed">
				We are not collecting actual data yet on signup. This demo keeps your details on this device
				only.
			</p>
		</div>
	);
}
