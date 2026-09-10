"use client";

import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { formatSignedInDate, getNameInitial } from "@/lib/auth/display";

/**
 * Profile details: avatar, name (editable), email, and signed-in date.
 */
export function ProfilePageClient() {
	const { session, updateName } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [nameDraft, setNameDraft] = useState(session?.name ?? "");
	const [isSaving, setIsSaving] = useState(false);

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

	return (
		<section className="px-4 py-6">
			<h1 className="font-semibold text-xl">Profile</h1>
			<p className="mt-1 text-muted-foreground text-sm">Your account for this demo.</p>

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
						<Label htmlFor="profile-name">Name</Label>
						{isEditing ? (
							<div className="space-y-3">
								<Input
									autoFocus
									className="h-11 rounded-lg px-3"
									id="profile-name"
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
				</div>
			</div>
		</section>
	);
}
