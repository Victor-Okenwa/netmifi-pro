export interface StoredUser {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: string;
}

export interface AuthSession {
	userId: string;
	name: string;
	email: string;
}

export type AuthMode = "sign-in" | "sign-up";
