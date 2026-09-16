"use client";

import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { formatSignedInDate, getNameInitial } from "@/lib/auth/display";
import { readStoredCurrency } from "@/lib/currency/storage";
import {
	clearSwapDrafts,
	hasMeaningfulGeneralDraft,
	hasMeaningfulSchoolDraft,
	readGeneralSwapDraft,
	readSchoolSwapDraft,
} from "@/lib/swap-preferences/storage";
import type { GeneralSwapDraft, SchoolSwapDraft } from "@/lib/swap-preferences/types";
import { getUniversityById } from "@/lib/universities/catalog";
import { RATE_PERIOD_LABELS } from "@/mock-data/constants";

/**
 * Settings: account details plus saved swap form preferences from localStorage.
 */
export function SettingsPageClient() {
	const { session, updateName } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [nameDraft, setNameDraft] = useState(session?.name ?? "");
	const [isSaving, setIsSaving] = useState(false);
	const [generalDraft, setGeneralDraft] = useState<GeneralSwapDraft | null>(null);
	const [schoolDraft, setSchoolDraft] = useState<SchoolSwapDraft | null>(null);
	const [currency, setCurrency] = useState<string | null>(null);
	const [prefsReady, setPrefsReady] = useState(false);

	useEffect(() => {
		const general = readGeneralSwapDraft();
		const school = readSchoolSwapDraft();
		setGeneralDraft(hasMeaningfulGeneralDraft(general) ? general : null);
		setSchoolDraft(hasMeaningfulSchoolDraft(school) ? school : null);
		setCurrency(readStoredCurrency());
		setPrefsReady(true);
	}, []);

	if (!session) {
		return null;
	}

	const currentSession = session;
	const initial = getNameInitial(currentSession.name);

	async function handleSaveName() {
		setIsSaving(true);
		try {
			await updateName(nameDraft);
			setIsEditing(false);
			toast.success("Name updated");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not update name");
		} finally {
			setIsSaving(false);
		}
	}

	function startEditing() {
		setNameDraft(currentSession.name);
		setIsEditing(true);
	}

	function cancelEditing() {
		setNameDraft(currentSession.name);
		setIsEditing(false);
	}

	function handleClearSwapPrefs() {
		clearSwapDrafts();
		setGeneralDraft(null);
		setSchoolDraft(null);
		toast.success("Swap preferences cleared");
	}

	return (
		<section className="px-4 py-6">
			<h1 className="font-semibold text-xl">Settings</h1>
			<p className="mt-1 text-muted-foreground text-sm">
				Account details and saved swap form preferences.
			</p>

			<div className="mt-8 flex flex-col items-center gap-4">
				<Avatar
					className="size-20 bg-primary text-primary-foreground after:border-primary/30"
					size="lg"
				>
					<AvatarFallback className="bg-primary font-semibold text-2xl text-primary-foreground">
						{initial}
					</AvatarFallback>
				</Avatar>

				<div className="w-full space-y-5">
					<div className="space-y-2">
						<Label htmlFor="settings-name">Name</Label>
						{isEditing ? (
							<div className="space-y-3">
								<Input
									autoFocus
									className="h-11 rounded-lg px-3"
									id="settings-name"
									onChange={(event) => setNameDraft(event.target.value)}
									value={nameDraft}
								/>
								<div className="flex gap-2">
									<Button
										className="flex-1"
										disabled={isSaving}
										onClick={handleSaveName}
										type="button"
									>
										{isSaving ? "Saving…" : "Save"}
									</Button>
									<Button
										className="flex-1"
										disabled={isSaving}
										onClick={cancelEditing}
										type="button"
										variant="outline"
									>
										Cancel
									</Button>
								</div>
							</div>
						) : (
							<div className="flex items-center gap-2">
								<p className="min-w-0 flex-1 truncate font-medium text-base">
									{currentSession.name}
								</p>
								<button
									aria-label="Edit name"
									className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted"
									onClick={startEditing}
									type="button"
								>
									<PencilIcon className="size-4" />
								</button>
							</div>
						)}
					</div>

					<div className="space-y-2">
						<Label>Email</Label>
						<p className="truncate text-base text-foreground">{currentSession.email}</p>
					</div>

					<div className="space-y-2">
						<Label>Signed in</Label>
						<p className="text-base text-foreground">
							{formatSignedInDate(currentSession.signedInAt)}
						</p>
					</div>

					{currency ? (
						<div className="space-y-2">
							<Label>Preferred currency</Label>
							<p className="text-base text-foreground">{currency}</p>
						</div>
					) : null}
				</div>
			</div>

			<div className="mt-10 space-y-4">
				<div className="flex items-center justify-between gap-3">
					<div>
						<h2 className="font-semibold text-base">Swap preferences</h2>
						<p className="text-muted-foreground text-xs">
							Saved locally so swap forms stay filled in.
						</p>
					</div>
					{(generalDraft || schoolDraft) && (
						<Button onClick={handleClearSwapPrefs} size="sm" type="button" variant="outline">
							Clear
						</Button>
					)}
				</div>

				{!prefsReady ? (
					<p className="text-muted-foreground text-sm">Loading preferences…</p>
				) : !generalDraft && !schoolDraft ? (
					<div className="rounded-2xl border border-border bg-card p-4">
						<p className="text-muted-foreground text-sm">
							No saved swap inputs yet. Fill a general or school swap form and it will be stored
							here automatically.
						</p>
						<div className="mt-3 flex flex-wrap gap-2">
							<Button asChild size="sm" variant="outline">
								<Link href="/swap-skill/general">General swap</Link>
							</Button>
							<Button asChild size="sm" variant="outline">
								<Link href="/swap-skill/school">School swap</Link>
							</Button>
						</div>
					</div>
				) : (
					<div className="space-y-3">
						{generalDraft ? <GeneralPrefsCard draft={generalDraft} /> : null}
						{schoolDraft ? <SchoolPrefsCard draft={schoolDraft} /> : null}
					</div>
				)}
			</div>
		</section>
	);
}

function GeneralPrefsCard({ draft }: { draft: GeneralSwapDraft }) {
	return (
		<div className="rounded-2xl border border-border bg-card p-4">
			<div className="flex items-center justify-between gap-2">
				<p className="font-medium text-sm">General skill swap</p>
				<Link
					className="text-primary text-xs underline-offset-2 hover:underline"
					href="/swap-skill/general"
				>
					Edit form
				</Link>
			</div>
			<PrefsRow label="Teach" value={joinOrDash(draft.teachSkills)} />
			<PrefsRow label="Learn" value={joinOrDash(draft.learnSkills)} />
			<PrefsRow
				label="Rate"
				value={`${draft.rateAmount} · ${RATE_PERIOD_LABELS[draft.ratePeriod]}`}
			/>
			{draft.availableDays.length > 0 ? (
				<PrefsRow label="Available" value={draft.availableDays.join(", ").toUpperCase()} />
			) : null}
			{draft.note.trim() ? <PrefsRow label="Note" value={draft.note} /> : null}
		</div>
	);
}

function SchoolPrefsCard({ draft }: { draft: SchoolSwapDraft }) {
	const schoolName = draft.universityId
		? (getUniversityById(draft.universityId)?.name ?? draft.universityId)
		: "—";

	return (
		<div className="rounded-2xl border border-border bg-card p-4">
			<div className="flex items-center justify-between gap-2">
				<p className="font-medium text-sm">School course swap</p>
				<Link
					className="text-primary text-xs underline-offset-2 hover:underline"
					href="/swap-skill/school"
				>
					Edit form
				</Link>
			</div>
			<PrefsRow label="Level" value={draft.level !== null ? `${draft.level}` : "—"} />
			<PrefsRow label="School" value={schoolName} />
			<PrefsRow
				label="Other schools"
				value={draft.openToOtherSchools ? "Open" : "Same school only"}
			/>
			<PrefsRow label="Teach" value={joinOrDash(draft.teachCourses)} />
			<PrefsRow label="Learn" value={joinOrDash(draft.learnCourses)} />
			<PrefsRow
				label="Rate"
				value={`${draft.rateAmount} · ${RATE_PERIOD_LABELS[draft.ratePeriod]}`}
			/>
			{draft.availableDays.length > 0 ? (
				<PrefsRow label="Available" value={draft.availableDays.join(", ").toUpperCase()} />
			) : null}
			{draft.note.trim() ? <PrefsRow label="Note" value={draft.note} /> : null}
		</div>
	);
}

function PrefsRow({ label, value }: { label: string; value: string }) {
	return (
		<p className="mt-2 text-muted-foreground text-xs leading-relaxed">
			<span className="font-medium text-foreground">{label}:</span> {value}
		</p>
	);
}

/**
 * Joins labels or returns an em dash.
 * @param items - Label list
 * @returns Display string
 */
function joinOrDash(items: string[]): string {
	if (items.length === 0) {
		return "—";
	}
	return items.join(", ");
}
