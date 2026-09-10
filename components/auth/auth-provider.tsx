"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	findUserByEmail,
	readSession,
	readUsers,
	writeSession,
	writeUsers,
} from "@/lib/auth/storage";
import type { AuthSession, StoredUser } from "@/lib/auth/types";

interface SignUpInput {
	name: string;
	email: string;
	password: string;
}

interface SignInInput {
	email: string;
	password: string;
}

interface AuthContextValue {
	session: AuthSession | null;
	isReady: boolean;
	signUp: (input: SignUpInput) => Promise<AuthSession>;
	signIn: (input: SignInInput) => Promise<AuthSession>;
	signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
	children: ReactNode;
}

/**
 * Provides localStorage-backed session state for the hackathon demo.
 */
export function AuthProvider({ children }: AuthProviderProps) {
	const [session, setSession] = useState<AuthSession | null>(null);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		setSession(readSession());
		setIsReady(true);
	}, []);

	const signUp = useCallback(async (input: SignUpInput): Promise<AuthSession> => {
		const email = input.email.trim().toLowerCase();
		const name = input.name.trim();
		const password = input.password;

		if (findUserByEmail(email)) {
			throw new Error("An account with this email already exists. Sign in instead.");
		}

		const user: StoredUser = {
			id: crypto.randomUUID(),
			name,
			email,
			password,
			createdAt: new Date().toISOString(),
		};

		writeUsers([...readUsers(), user]);

		const nextSession: AuthSession = {
			userId: user.id,
			name: user.name,
			email: user.email,
		};
		writeSession(nextSession);
		setSession(nextSession);
		return nextSession;
	}, []);

	const signIn = useCallback(async (input: SignInInput): Promise<AuthSession> => {
		const email = input.email.trim().toLowerCase();
		const user = findUserByEmail(email);

		if (!user) {
			throw new Error("No account found for this email. Sign up instead.");
		}

		if (user.password !== input.password) {
			throw new Error("Incorrect password. Try again.");
		}

		const nextSession: AuthSession = {
			userId: user.id,
			name: user.name,
			email: user.email,
		};
		writeSession(nextSession);
		setSession(nextSession);
		return nextSession;
	}, []);

	const signOut = useCallback(() => {
		writeSession(null);
		setSession(null);
	}, []);

	const value = useMemo(
		() => ({
			session,
			isReady,
			signUp,
			signIn,
			signOut,
		}),
		[session, isReady, signUp, signIn, signOut]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Reads auth context from the nearest AuthProvider.
 * @returns Auth session helpers and state
 * @throws {Error} If used outside AuthProvider
 */
export function useAuth(): AuthContextValue {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
}
