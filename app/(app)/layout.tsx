import type { ReactNode } from "react";
import { RequireAuth } from "@/components/auth/require-auth";
import { AppChrome } from "./app-chrome";

export default function AppGroupLayout({ children }: { children: ReactNode }) {
	return (
		<RequireAuth>
			<AppChrome>{children}</AppChrome>
		</RequireAuth>
	);
}
