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
		const session = normalizeSession(parsed);
		if (!session) {
			return null;
		}
		return session;
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
 * Finds a stored user by id.
 * @param id - User id
 * @returns The matching user, or `undefined`
 */
export function findUserById(id: string): StoredUser | undefined {
	return readUsers().find((user) => user.id === id);
}

/**
 * Updates a stored user's name and returns the updated user.
 * @param userId - User id to update
 * @param name - New display name
 * @returns The updated user
 * @throws {Error} If the user does not exist
 */
export function updateStoredUserName(userId: string, name: string): StoredUser {
	const trimmed = name.trim();
	const users = readUsers();
	const index = users.findIndex((user) => user.id === userId);
	if (index < 0) {
		throw new Error("User not found");
	}

	const existing = users[index];
	if (!existing) {
		throw new Error("User not found");
	}

	const updated: StoredUser = {
		...existing,
		name: trimmed,
	};
	const nextUsers = [...users];
	nextUsers[index] = updated;
	writeUsers(nextUsers);
	return updated;
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
 * Normalizes a parsed session, filling signedInAt for older stored sessions.
 * @param value - Unknown parse result
 * @returns A valid AuthSession, or `null`
 */
function normalizeSession(value: unknown): AuthSession | null {
	if (typeof value !== "object" || value === null) {
		return null;
	}

	if (
		!("userId" in value) ||
		!("name" in value) ||
		!("email" in value) ||
		typeof value.userId !== "string" ||
		typeof value.name !== "string" ||
		typeof value.email !== "string"
	) {
		return null;
	}

	const signedInAt =
		"signedInAt" in value && typeof value.signedInAt === "string"
			? value.signedInAt
			: new Date().toISOString();

	return {
		userId: value.userId,
		name: value.name,
		email: value.email,
		signedInAt,
	};
}
