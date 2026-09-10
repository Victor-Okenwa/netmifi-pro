"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { EarningsCard } from "@/components/home/earnings-card";
import { HomeGreeting } from "@/components/home/home-greeting";
import { usePreferredCurrency } from "@/lib/currency/use-preferred-currency";
import { MOCK_EARNINGS } from "@/mock-data/earnings";

/**
 * Authenticated home screen with greeting, currency, and earnings.
 */
export function HomePageClient() {
	const { session } = useAuth();
	const { currency, setCurrency } = usePreferredCurrency();

	if (!session) {
		return null;
	}

	return (
		<section className="px-4 py-6">
			<HomeGreeting
				currency={currency}
				email={session.email}
				fullName={session.name}
				onCurrencyChange={setCurrency}
			/>
			<EarningsCard className="mt-5" currency={currency} earnings={MOCK_EARNINGS} />
		</section>
	);
}
