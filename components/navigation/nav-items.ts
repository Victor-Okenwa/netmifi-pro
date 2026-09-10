import type { ComponentType, SVGProps } from "react";
import {
	AnalyticsNavIcon,
	CoursesNavIcon,
	DisputeNavIcon,
	HomeNavIcon,
	TradeRequestsNavIcon,
} from "./nav-icons";

export interface BottomNavItem {
	href: string;
	label: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
	{ href: "/", label: "Home", icon: HomeNavIcon },
	{ href: "/trade-requests", label: "Trade Requests", icon: TradeRequestsNavIcon },
	{ href: "/courses", label: "Courses", icon: CoursesNavIcon },
	{ href: "/analytics", label: "Analytics", icon: AnalyticsNavIcon },
	{ href: "/dispute", label: "Dispute", icon: DisputeNavIcon },
];
