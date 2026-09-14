import { Suspense } from "react";
import { MatchingResultsPage } from "@/components/matching/matching-results-page";

export default function MatchesPage() {
	return (
		<Suspense
			fallback={
				<section className="px-4 py-8 text-center text-muted-foreground text-sm">
					Loading matches…
				</section>
			}
		>
			<MatchingResultsPage />
		</Suspense>
	);
}
