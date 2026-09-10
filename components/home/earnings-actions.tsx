import type { ComponentType, SVGProps } from "react";

export interface EarningsAction {
	href: string;
	label: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
}

function SwapSkillIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden
			fill="none"
			height="22"
			viewBox="0 0 24 24"
			width="22"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Swap skill</title>
			<path
				d="M7 8h11.5M15.5 5.5 18.5 8.5 15.5 11.5M17 16H5.5M8.5 12.5 5.5 15.5 8.5 18.5"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.6"
			/>
		</svg>
	);
}

function CreateCourseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden
			fill="none"
			height="22"
			viewBox="0 0 24 24"
			width="22"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Create course</title>
			<path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
		</svg>
	);
}

function ScheduleIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden
			fill="none"
			height="22"
			viewBox="0 0 24 24"
			width="22"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Schedule</title>
			<path
				d="M7 3.5v3M17 3.5v3M4.5 8.5h15M6 5.5h12a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 18 20.5H6A1.5 1.5 0 0 1 4.5 19V7A1.5 1.5 0 0 1 6 5.5Z"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.6"
			/>
			<path
				d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="2"
			/>
		</svg>
	);
}

function WithdrawIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden
			fill="none"
			height="22"
			viewBox="0 0 24 24"
			width="22"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Withdraw</title>
			<path
				d="M12 4.5v10M8.5 8 12 4.5 15.5 8M5.5 14.5v3A1.5 1.5 0 0 0 7 19h10a1.5 1.5 0 0 0 1.5-1.5v-3"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.6"
			/>
		</svg>
	);
}

/**
 * Quick actions shown on the home earnings card.
 */
export const EARNINGS_ACTIONS: EarningsAction[] = [
	{ href: "/swap-skill", label: "Swap Skill", icon: SwapSkillIcon },
	{ href: "/create-course", label: "Create Course", icon: CreateCourseIcon },
	{ href: "/schedule", label: "Schedule", icon: ScheduleIcon },
	{ href: "/withdraw", label: "Withdraw", icon: WithdrawIcon },
];
