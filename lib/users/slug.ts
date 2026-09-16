/**
 * Turns a display name into a URL username slug.
 * @param name - Full display name
 * @returns Lowercase hyphenated slug, or "user" when empty
 */
export function slugifyUsername(name: string): string {
	const slug = name
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
	return slug || "user";
}

/**
 * Builds a demo email from a username slug.
 * @param username - Profile slug
 * @returns Email on the netmifi.app domain
 */
export function emailFromUsername(username: string): string {
	return `${username.replace(/-/g, ".")}@netmifi.app`;
}

/**
 * Profile path for a marketplace user.
 * @param username - Profile slug
 * @returns App route
 */
export function getUserProfileHref(username: string): string {
	return `/users/${username}`;
}
