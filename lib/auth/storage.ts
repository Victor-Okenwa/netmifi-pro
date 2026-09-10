import type { AuthSession, StoredUser } from "./types";

const USERS_KEY = "netmifi-pro:users";
const SESSION_KEY = "netmifi-pro:session";

/**
 * Checks whether localStorage is available in the current environment.
 * @returns `true` when running in a browser with localStorage
 */
function canUseStorage(): boolean {
	return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/**
 * Reads the registered users list from localStorage.
 * @returns Stored users, or an empty array when missing or invalid
 */
export function readUsers(): StoredUser[] {
	if (!canUseStorage()) {
		return [];
	}

	const raw = window.localStorage.getItem(USERS_KEY);
	if (!raw) {
		return [];
	}

	try {
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) {
			return [];
		}
		return parsed.filter(isStoredUser);
	} catch {
		return [];
	}
}

/**
 * Persists the full users list to localStorage.
 * @param users - Users to store
 */
export function writeUsers(users: StoredUser[]): void {
	if (!canUseStorage()) {
		return;
	}
	window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Reads the current session from localStorage.
 * @returns The session, or `null` when missing or invalid
 */
export function readSession(): AuthSession | null {
	if (!canUseStorage()) {
		return null;
	}

	const raw = window.localStorage.getItem(SESSION_KEY);
	if (!raw) {
		return null;
	}

	try {
		const parsed: unknown = JSON.parse(raw);
		if (!isAuthSession(parsed)) {
			return null;
		}
		return parsed;
	} catch {
		return null;
	}
}

/**
 * Persists the current session to localStorage.
 * @param session - Session to store, or `null` to clear
 */
export function writeSession(session: AuthSession | null): void {
	if (!canUseStorage()) {
		return;
	}

	if (!session) {
		window.localStorage.removeItem(SESSION_KEY);
		return;
	}

	window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/**
 * Finds a stored user by email (case-insensitive).
 * @param email - Email to match
 * @returns The matching user, or `undefined`
 */
export function findUserByEmail(email: string): StoredUser | undefined {
	const normalized = email.trim().toLowerCase();
	return readUsers().find((user) => user.email.toLowerCase() === normalized);
}

/**
 * Type guard for StoredUser objects.
 * @param value - Unknown parse result
 * @returns Whether value is a StoredUser
 */
function isStoredUser(value: unknown): value is StoredUser {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	return (
		"id" in value &&
		"name" in value &&
		"email" in value &&
		"password" in value &&
		"createdAt" in value &&
		typeof value.id === "string" &&
		typeof value.name === "string" &&
		typeof value.email === "string" &&
		typeof value.password === "string" &&
		typeof value.createdAt === "string"
	);
}

/**
 * Type guard for AuthSession objects.
 * @param value - Unknown parse result
 * @returns Whether value is an AuthSession
 */
function isAuthSession(value: unknown): value is AuthSession {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	return (
		"userId" in value &&
		"name" in value &&
		"email" in value &&
		typeof value.userId === "string" &&
		typeof value.name === "string" &&
		typeof value.email === "string"
	);
}
