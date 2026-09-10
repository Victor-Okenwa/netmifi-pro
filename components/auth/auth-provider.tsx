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
	findUserById,
	readSession,
	readUsers,
	updateStoredUserName,
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
	updateName: (name: string) => Promise<AuthSession>;
	getCurrentUser: () => StoredUser | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
	children: ReactNode;
}

/**
 * Builds a session object from a stored user and sign-in timestamp.
 * @param user - Stored user record
 * @param signedInAt - ISO timestamp for this session
 * @returns Auth session payload
 */
function toSession(user: StoredUser, signedInAt: string): AuthSession {
	return {
		userId: user.id,
		name: user.name,
		email: user.email,
		signedInAt,
	};
}

/**
 * Provides localStorage-backed session state for the hackathon demo.
 */
export function AuthProvider({ children }: AuthProviderProps) {
	const [session, setSession] = useState<AuthSession | null>(null);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const existing = readSession();
		if (existing) {
			writeSession(existing);
		}
		setSession(existing);
		setIsReady(true);
	}, []);

	const signUp = useCallback(async (input: SignUpInput): Promise<AuthSession> => {
		const email = input.email.trim().toLowerCase();
		const name = input.name.trim();
		const password = input.password;

		if (findUserByEmail(email)) {
			throw new Error("An account with this email already exists. Sign in instead.");
		}

		const now = new Date().toISOString();
		const user: StoredUser = {
			id: crypto.randomUUID(),
			name,
			email,
			password,
			createdAt: now,
		};

		writeUsers([...readUsers(), user]);

		const nextSession = toSession(user, now);
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

		const nextSession = toSession(user, new Date().toISOString());
		writeSession(nextSession);
		setSession(nextSession);
		return nextSession;
	}, []);

	const signOut = useCallback(() => {
		writeSession(null);
		setSession(null);
	}, []);

	const updateName = useCallback(
		async (name: string): Promise<AuthSession> => {
			if (!session) {
				throw new Error("You must be signed in to update your name");
			}

			const trimmed = name.trim();
			if (trimmed.length < 2) {
				throw new Error("Name must be at least 2 characters");
			}

			const updated = updateStoredUserName(session.userId, trimmed);
			const nextSession = toSession(updated, session.signedInAt);
			writeSession(nextSession);
			setSession(nextSession);
			return nextSession;
		},
		[session]
	);

	const getCurrentUser = useCallback((): StoredUser | null => {
		if (!session) {
			return null;
		}
		return findUserById(session.userId) ?? null;
	}, [session]);

	const value = useMemo(
		() => ({
			session,
			isReady,
			signUp,
			signIn,
			signOut,
			updateName,
			getCurrentUser,
		}),
		[session, isReady, signUp, signIn, signOut, updateName, getCurrentUser]
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
