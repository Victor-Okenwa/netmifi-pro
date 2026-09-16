"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthDemoNotice } from "@/components/auth/auth-demo-notice";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import type { AuthMode } from "@/lib/auth/types";
import { cn } from "@/lib/utils";

const signInSchema = z.object({
	email: z.email("Enter a valid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = signInSchema.extend({
	name: z.string().trim().min(2, "Name must be at least 2 characters"),
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;

interface AuthFormProps {
	mode: AuthMode;
	onModeChange: (mode: AuthMode) => void;
	onSignIn: (values: SignInValues) => Promise<void>;
	onSignUp: (values: SignUpValues) => Promise<void>;
	className?: string;
}

/**
 * Mobile auth form used for both sign-in and sign-up.
 */
export function AuthForm({ mode, onModeChange, onSignIn, onSignUp, className }: AuthFormProps) {
	const isSignUp = mode === "sign-up";

	return (
		<div className={cn("flex w-full flex-col", className)}>
			<div className="mb-8 flex justify-end">
				<Button
					className="font-light"
					onClick={() => onModeChange(isSignUp ? "sign-in" : "sign-up")}
					type="button"
					variant="secondary"
				>
					{isSignUp ? "Sign in" : "Sign up"}
				</Button>
			</div>

			<div className="mx-auto w-full max-w-md">
				<header className="mb-8">
					<h1 className="font-bold text-xl tracking-tight">
						{isSignUp ? "Create your Netmifi account" : "Sign in to Netmifi"}
					</h1>
					<p className="mt-2 text-muted-foreground text-sm">
						{isSignUp
							? "Save your name and email so trades feel personal across the demo."
							: "Welcome back. Use the email and password you registered with."}
					</p>
				</header>

				<AuthDemoNotice />

				{isSignUp ? (
					<SignUpFields key="sign-up" onModeChange={onModeChange} onSubmit={onSignUp} />
				) : (
					<SignInFields key="sign-in" onModeChange={onModeChange} onSubmit={onSignIn} />
				)}
			</div>
		</div>
	);
}

interface SignUpFieldsProps {
	onSubmit: (values: SignUpValues) => Promise<void>;
	onModeChange: (mode: AuthMode) => void;
}

function SignUpFields({ onSubmit, onModeChange }: SignUpFieldsProps) {
	const [formError, setFormError] = useState<string | null>(null);
	const form = useForm<SignUpValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	async function handleSubmit(values: SignUpValues) {
		setFormError(null);
		try {
			await onSubmit(values);
		} catch (error) {
			setFormError(error instanceof Error ? error.message : "Something went wrong");
		}
	}

	return (
		<>
			<Form {...form}>
				<form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										autoComplete="name"
										className="h-11 rounded-lg px-3"
										placeholder="Ada Lovelace"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										autoComplete="email"
										className="h-11 rounded-lg px-3"
										placeholder="you@example.com"
										type="email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<PasswordInput
										autoComplete="new-password"
										className="h-11 rounded-lg"
										placeholder="----------"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{formError ? (
						<p className="text-destructive text-sm" role="alert">
							{formError}
						</p>
					) : null}
					<Button
						className="h-11 w-full rounded-lg text-base"
						disabled={form.formState.isSubmitting}
						size="lg"
						type="submit"
					>
						{form.formState.isSubmitting ? "Creating account…" : "Create account"}
					</Button>
				</form>
			</Form>
			<p className="mt-6 text-muted-foreground text-sm">
				Already have an account?{" "}
				<button
					className="font-medium text-primary underline-offset-4 hover:underline"
					onClick={() => onModeChange("sign-in")}
					type="button"
				>
					Sign in
				</button>
			</p>
		</>
	);
}

interface SignInFieldsProps {
	onSubmit: (values: SignInValues) => Promise<void>;
	onModeChange: (mode: AuthMode) => void;
}

function SignInFields({ onSubmit, onModeChange }: SignInFieldsProps) {
	const [formError, setFormError] = useState<string | null>(null);
	const form = useForm<SignInValues>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function handleSubmit(values: SignInValues) {
		setFormError(null);
		try {
			await onSubmit(values);
		} catch (error) {
			setFormError(error instanceof Error ? error.message : "Something went wrong");
		}
	}

	return (
		<>
			<Form {...form}>
				<form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										autoComplete="email"
										className="h-11 rounded-lg px-3"
										placeholder="you@example.com"
										type="email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<PasswordInput
										autoComplete="current-password"
										className="h-11 rounded-lg"
										placeholder="----------"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{formError ? (
						<p className="text-destructive text-sm" role="alert">
							{formError}
						</p>
					) : null}
					<Button
						className="h-11 w-full rounded-lg text-base"
						disabled={form.formState.isSubmitting}
						size="lg"
						type="submit"
					>
						{form.formState.isSubmitting ? "Signing in…" : "Sign in"}
					</Button>
				</form>
			</Form>
			<p className="mt-6 text-muted-foreground text-sm">
				New here?{" "}
				<button
					className="font-medium text-primary underline-offset-4 hover:underline"
					onClick={() => onModeChange("sign-up")}
					type="button"
				>
					Sign up
				</button>
			</p>
		</>
	);
}
