import type { ReactNode } from "react";
import { AppChrome } from "./app-chrome";

export default function AppGroupLayout({ children }: { children: ReactNode }) {
	return <AppChrome>{children}</AppChrome>;
}
