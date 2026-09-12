"use client";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { CurrencySelector } from "@/components/home/currency-selector";
import { CourseCombobox } from "@/components/swap-skill/course-combobox";
import { DayPicker } from "@/components/swap-skill/day-picker";
import { RatePeriodToggle } from "@/components/swap-skill/rate-period-toggle";
import { SchoolCombobox } from "@/components/swap-skill/school-combobox";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { currencyPrefix, formatWholeAmount } from "@/lib/currency/format";
import type { CurrencyCode } from "@/lib/currency/types";
import { usePreferredCurrency } from "@/lib/currency/use-preferred-currency";
import { cn } from "@/lib/utils";
import { ACADEMIC_LEVELS, type WeekdayId } from "@/mock-data/constants";
import { convertCurrency } from "@/mock-data/earnings";
import type { AcademicLevel, RatePeriod, UniversityId } from "@/mock-data/types";

/**
 * School course swap form: level, school, courses, rate, and availability.
 */
export function SchoolCourseExchangeForm() {
	const { currency, setCurrency } = usePreferredCurrency();
	const [level, setLevel] = useState<AcademicLevel | null>(null);
	const [universityId, setUniversityId] = useState<UniversityId | null>(null);
	const [openToOtherSchools, setOpenToOtherSchools] = useState(false);
	const [teachEnabled, setTeachEnabled] = useState(true);
	const [learnEnabled, setLearnEnabled] = useState(true);
	const [teachCourses, setTeachCourses] = useState<string[]>([]);
	const [learnCourses, setLearnCourses] = useState<string[]>([]);
	const [ratePeriod, setRatePeriod] = useState<RatePeriod>("hour");
	const [rateAmount, setRateAmount] = useState("0.00");
	const [note, setNote] = useState("");
	const [availableDays, setAvailableDays] = useState<WeekdayId[]>([]);
	const [agreedToTerms, setAgreedToTerms] = useState(false);

	const parsedAmount = Number.parseFloat(rateAmount.replace(/,/g, "")) || 0;
	const secondaryCurrency: CurrencyCode = currency === "USD" ? "NGN" : "USD";
	const secondaryAmount = convertCurrency(parsedAmount, currency, secondaryCurrency);

	function handleUniversityChange(next: UniversityId | null) {
		setUniversityId(next);
		setTeachCourses([]);
		setLearnCourses([]);
	}

	function swapCourseSides() {
		setTeachCourses(learnCourses);
		setLearnCourses(teachCourses);
		setTeachEnabled(learnEnabled);
		setLearnEnabled(teachEnabled);
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!agreedToTerms) {
			toast.error("Please agree to the Terms and Condition");
			return;
		}

		if (!level) {
			toast.error("Select your academic level");
			return;
		}

		if (!universityId) {
			toast.error("Select your school");
			return;
		}

		if (teachEnabled && teachCourses.length === 0) {
			toast.error("Add at least one course you can teach");
			return;
		}

		if (learnEnabled && learnCourses.length === 0 && parsedAmount <= 0) {
			toast.error("Add a course to learn or set a rate");
			return;
		}

		toast.success("Looking for course matches");
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
							<BreadcrumbPage className="font-medium">School Course Swap</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<p className="mt-3 text-muted-foreground text-sm leading-relaxed">
					Trade school courses you understand for courses you're struggling with. Made for High
					School and University students.
				</p>
			</div>

			<div className="space-y-2 rounded-2xl border border-border bg-card p-4 shadow-sm">
				<label className="font-medium text-sm" htmlFor="academic-level">
					Academic Level?
				</label>
				<Select
					onValueChange={(value) => {
						const next = Number(value);
						if (
							next === 100 ||
							next === 200 ||
							next === 300 ||
							next === 400 ||
							next === 500 ||
							next === 600 ||
							next === 700
						) {
							setLevel(next);
						}
					}}
					value={level !== null ? String(level) : undefined}
				>
					<SelectTrigger
						className="h-11 w-full rounded-xl border-0 bg-muted/70 px-3 shadow-none"
						id="academic-level"
					>
						<SelectValue placeholder="What level are you?" />
					</SelectTrigger>
					<SelectContent>
						{ACADEMIC_LEVELS.map((academicLevel) => (
							<SelectItem key={academicLevel} value={String(academicLevel)}>
								{academicLevel} Level
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
				<label className="font-medium text-sm" htmlFor="school-institution">
					School/Institution
				</label>
				<SchoolCombobox
					id="school-institution"
					onValueChange={handleUniversityChange}
					value={universityId}
				/>
				<label className="flex items-center gap-2 text-sm" htmlFor="open-other-schools">
					<Checkbox
						checked={openToOtherSchools}
						id="open-other-schools"
						onCheckedChange={(checked) => setOpenToOtherSchools(checked === true)}
					/>
					<span className="text-muted-foreground">I'm open to students from other schools</span>
				</label>
			</div>

			<div className="relative rounded-2xl border border-primary/40 bg-card p-4 shadow-sm">
				<div className="space-y-2">
					<div className="flex items-center justify-between gap-3">
						<p className="font-medium text-sm">Course I Can Teach?</p>
						<Switch
							aria-label="Enable courses you can teach"
							checked={teachEnabled}
							onCheckedChange={setTeachEnabled}
							size="sm"
						/>
					</div>
					<CourseCombobox
						disabled={!teachEnabled}
						onValueChange={setTeachCourses}
						placeholder="Add courses you're confident in teaching"
						universityId={universityId}
						value={teachCourses}
					/>
				</div>

				<div className="relative my-4 flex justify-center">
					<div className="absolute inset-x-0 top-1/2 h-px bg-border" />
					<button
						aria-label="Swap teach and learn courses"
						className="relative z-10 flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm"
						onClick={swapCourseSides}
						type="button"
					>
						<SwapArrowsIcon />
					</button>
				</div>

				<div className="space-y-2">
					<div className="flex items-center justify-between gap-3">
						<p className="font-medium text-sm">Course I Want To Learn?</p>
						<Switch
							aria-label="Enable courses you want to learn"
							checked={learnEnabled}
							onCheckedChange={setLearnEnabled}
							size="sm"
						/>
					</div>
					<CourseCombobox
						disabled={!learnEnabled}
						onValueChange={setLearnCourses}
						placeholder="Add courses you want to learn"
						universityId={universityId}
						value={learnCourses}
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
							<label className="sr-only" htmlFor="school-rate-amount">
								Rate amount
							</label>
							<div className="flex items-baseline gap-0.5">
								<span className="font-semibold text-2xl text-foreground">
									{currencyPrefix(currency)}
								</span>
								<input
									className="w-full min-w-0 bg-transparent font-semibold text-2xl text-foreground outline-none tabular-nums placeholder:text-muted-foreground"
									id="school-rate-amount"
									inputMode="decimal"
									onChange={(event) => setRateAmount(event.target.value.replace(/[^\d.]/g, ""))}
									placeholder="0.00"
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
				<label className="font-medium text-muted-foreground text-sm" htmlFor="school-note">
					Additional Note (Optional)
				</label>
				<Textarea
					className="min-h-24 rounded-2xl border-border bg-card px-3 py-3 shadow-sm"
					id="school-note"
					onChange={(event) => setNote(event.target.value)}
					placeholder="Mention specific topics you can teach well in the courses you have selected above or topics you need help with."
					value={note}
				/>
			</div>

			<div className="space-y-2 rounded-2xl bg-card px-3 py-5">
				<p className="font-medium text-muted-foreground text-xs">Available On</p>
				<DayPicker onValueChange={setAvailableDays} value={availableDays} />
			</div>

			<label className="flex items-start gap-2 text-sm" htmlFor="school-agree-terms">
				<Checkbox
					checked={agreedToTerms}
					className="mt-0.5"
					id="school-agree-terms"
					onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
				/>
				<span className="text-foreground leading-snug">
					Agree to the{" "}
					<Link className="text-blue-600 underline-offset-2 hover:underline" href="/terms">
						Terms
					</Link>{" "}
					and{" "}
					<Link className="text-blue-600 underline-offset-2 hover:underline" href="/terms">
						Condition
					</Link>
				</span>
			</label>

			<Button
				className={cn("h-12 w-full rounded-xl text-base", !agreedToTerms && "opacity-80")}
				size="lg"
				type="submit"
			>
				Find my course match
			</Button>
		</form>
	);
}
