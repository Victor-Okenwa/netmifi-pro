"use client";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { CurrencySelector } from "@/components/home/currency-selector";
import { DayPicker } from "@/components/swap-skill/day-picker";
import { RatePeriodToggle } from "@/components/swap-skill/rate-period-toggle";
import { SkillCombobox } from "@/components/swap-skill/skill-combobox";
import { SwapArrowsIcon } from "@/components/swap-skill/swap-arrows-icon";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { currencyPrefix, formatWholeAmount } from "@/lib/currency/format";
import type { CurrencyCode } from "@/lib/currency/types";
import { usePreferredCurrency } from "@/lib/currency/use-preferred-currency";
import { buildMatchesHref, writeSwapOffer } from "@/lib/matching/offer-storage";
import { readGeneralSwapDraft, writeGeneralSwapDraft } from "@/lib/swap-preferences/storage";
import type { GeneralSwapDraft } from "@/lib/swap-preferences/types";
import { cn } from "@/lib/utils";
import type { WeekdayId } from "@/mock-data/constants";
import { convertCurrency } from "@/mock-data/earnings";
import type { RatePeriod } from "@/mock-data/types";

/**
 * General skill exchange form matching the swap-skill flow design.
 * Inputs persist to localStorage so Settings and return visits stay filled.
 */
export function GeneralSkillExchangeForm() {
	const router = useRouter();
	const { currency, setCurrency } = usePreferredCurrency();
	const [hydrated, setHydrated] = useState(false);
	const [teachEnabled, setTeachEnabled] = useState(true);
	const [learnEnabled, setLearnEnabled] = useState(true);
	const [teachSkills, setTeachSkills] = useState<string[]>([]);
	const [learnSkills, setLearnSkills] = useState<string[]>([]);
	const [ratePeriod, setRatePeriod] = useState<RatePeriod>("hour");
	const [rateAmount, setRateAmount] = useState("2000");
	const [note, setNote] = useState("");
	const [availableDays, setAvailableDays] = useState<WeekdayId[]>([]);
	const [agreedToTerms, setAgreedToTerms] = useState(false);

	useEffect(() => {
		const draft = readGeneralSwapDraft();
		setTeachEnabled(draft.teachEnabled);
		setLearnEnabled(draft.learnEnabled);
		setTeachSkills(draft.teachSkills);
		setLearnSkills(draft.learnSkills);
		setRatePeriod(draft.ratePeriod);
		setRateAmount(draft.rateAmount);
		setNote(draft.note);
		setAvailableDays(draft.availableDays);
		setAgreedToTerms(draft.agreedToTerms);
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (!hydrated) {
			return;
		}

		const draft: GeneralSwapDraft = {
			teachEnabled,
			learnEnabled,
			teachSkills,
			learnSkills,
			ratePeriod,
			rateAmount,
			note,
			availableDays,
			agreedToTerms,
		};
		writeGeneralSwapDraft(draft);
	}, [
		hydrated,
		teachEnabled,
		learnEnabled,
		teachSkills,
		learnSkills,
		ratePeriod,
		rateAmount,
		note,
		availableDays,
		agreedToTerms,
	]);

	const parsedAmount = Number.parseFloat(rateAmount.replace(/,/g, "")) || 0;
	const secondaryCurrency: CurrencyCode = currency === "USD" ? "NGN" : "USD";
	const secondaryAmount = convertCurrency(parsedAmount, currency, secondaryCurrency);

	function swapSkillSides() {
		setTeachSkills(learnSkills);
		setLearnSkills(teachSkills);
		setTeachEnabled(learnEnabled);
		setLearnEnabled(teachEnabled);
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!agreedToTerms) {
			toast.error("Please agree to the Terms and Condition");
			return;
		}

		const teach = teachEnabled ? teachSkills : [];
		const learn = learnEnabled ? learnSkills : [];

		if (teach.length === 0) {
			toast.error("Add at least one skill you can teach");
			return;
		}

		if (learn.length === 0 && parsedAmount <= 0) {
			toast.error("Add a skill to learn or set a rate");
			return;
		}

		writeGeneralSwapDraft({
			teachEnabled,
			learnEnabled,
			teachSkills,
			learnSkills,
			ratePeriod,
			rateAmount,
			note,
			availableDays,
			agreedToTerms,
		});

		writeSwapOffer({
			kind: "general",
			teach,
			learn,
			rateAmount: parsedAmount,
			ratePeriod,
			currency,
		});

		router.push(
			buildMatchesHref({
				kind: "general",
				teach,
				learn,
				rateAmount: parsedAmount,
				ratePeriod,
				currency,
			})
		);
	}

	return (
		<form className="flex flex-col gap-5 px-4 pt-2 pb-6" onSubmit={handleSubmit}>
			<div>
				<Breadcrumb>
					<BreadcrumbList className="text-xs">
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/swap-skill">Swap Skill</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage className="font-medium">General Skill Exchange</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<p className="mt-3 text-muted-foreground text-sm leading-relaxed">
					Trade the skills you know for skills you want. Perfect for professionals and career
					growth. (Eg., Product Design &gt; Product Management)
				</p>
			</div>

			<div className="relative rounded-2xl border border-primary/40 bg-card p-4 shadow-sm">
				<div className="space-y-2">
					<div className="flex items-center justify-between gap-3">
						<label className="font-medium text-sm" htmlFor="teach-skills">
							What can you teach?
						</label>
						<Switch
							aria-label="Enable skills you can teach"
							checked={teachEnabled}
							onCheckedChange={setTeachEnabled}
							size="sm"
						/>
					</div>
					<SkillCombobox
						disabled={!teachEnabled}
						onValueChange={setTeachSkills}
						placeholder="Add skills you're confident in teaching"
						value={teachSkills}
					/>
				</div>

				<div className="relative my-4 flex justify-center">
					<div className="absolute inset-x-0 top-1/2 h-px bg-border" />
					<button
						aria-label="Swap teach and learn skills"
						className="relative z-10 flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm"
						onClick={swapSkillSides}
						type="button"
					>
						<SwapArrowsIcon />
					</button>
				</div>

				<div className="space-y-2">
					<div className="flex items-center justify-between gap-3">
						<label className="font-medium text-sm" htmlFor="learn-skills">
							What do you want to learn?
						</label>
						<Switch
							aria-label="Enable skills you want to learn"
							checked={learnEnabled}
							onCheckedChange={setLearnEnabled}
							size="sm"
						/>
					</div>
					<SkillCombobox
						disabled={!learnEnabled}
						onValueChange={setLearnSkills}
						placeholder="Add skills you want to learn"
						value={learnSkills}
					/>
				</div>
			</div>

			<div className="space-y-2 rounded-2xl bg-primary-light">
				<p className="flex items-start gap-1.5 px-4 pt-3 text-primary text-xs leading-snug">
					<ExclamationCircleIcon className="mt-0.5 size-4 shrink-0" />
					<span>
						Set rate incase the learner doesn't have a skill to swap or trade with your own skills
						set.
					</span>
				</p>

				<div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
					<div className="flex flex-wrap items-center justify-between gap-2">
						<p className="font-medium text-sm">Set your rate</p>
						<RatePeriodToggle onValueChange={setRatePeriod} value={ratePeriod} />
					</div>

					<div className="mt-4 flex items-end justify-between gap-3">
						<div className="min-w-0 flex-1">
							<label className="sr-only" htmlFor="rate-amount">
								Rate amount
							</label>
							<div className="flex items-baseline gap-0.5">
								<span className="font-semibold text-2xl text-foreground">
									{currencyPrefix(currency)}
								</span>
								<input
									className="w-full min-w-0 bg-transparent font-semibold text-2xl text-foreground outline-none tabular-nums placeholder:text-muted-foreground"
									id="rate-amount"
									inputMode="decimal"
									onChange={(event) => setRateAmount(event.target.value.replace(/[^\d.]/g, ""))}
									placeholder="0"
									value={rateAmount}
								/>
							</div>
							<p className="mt-0.5 text-muted-foreground text-xs tabular-nums">
								{formatWholeAmount(secondaryAmount, secondaryCurrency)}
							</p>
						</div>
						<CurrencySelector className="shrink-0" onValueChange={setCurrency} value={currency} />
					</div>
				</div>
			</div>

			<div className="space-y-2">
				<label className="font-medium text-muted-foreground text-sm" htmlFor="additional-note">
					Additional Note (Optional)
				</label>
				<Textarea
					className="min-h-24 rounded-2xl border-border bg-card px-3 py-3 shadow-sm"
					id="additional-note"
					onChange={(event) => setNote(event.target.value)}
					placeholder="Tell the vendor something extra (like if you want a discount or have special requests)"
					value={note}
				/>
			</div>

			<div className="space-y-2 rounded-2xl bg-card px-3 py-5">
				<p className="font-medium text-muted-foreground text-xs">Available On</p>
				<DayPicker onValueChange={setAvailableDays} value={availableDays} />
			</div>

			<label className="flex items-start gap-2 text-sm" htmlFor="agree-terms">
				<Checkbox
					checked={agreedToTerms}
					className="mt-0.5"
					id="agree-terms"
					onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
				/>
				<span className="text-foreground leading-snug">
					Agree to the{" "}
					<Link className="text-blue-600 underline-offset-2 hover:underline" href="/terms">
						Terms
					</Link>{" "}
					and{" "}
					<Link className="text-blue-600 underline-offset-2 hover:underline" href="/terms">
						Condition!
					</Link>
				</span>
			</label>

			<Button
				className={cn("h-12 w-full rounded-xl text-base", !agreedToTerms && "opacity-80")}
				size="lg"
				type="submit"
			>
				Swap
			</Button>
		</form>
	);
}
