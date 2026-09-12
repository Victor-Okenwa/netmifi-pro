import type { SVGProps } from "react";

/**
 * Vertical swap arrows used between teach / learn fields.
 */
export function SwapArrowsIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden
			fill="none"
			height="18"
			viewBox="0 0 24 24"
			width="18"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Swap</title>
			<path
				d="M8 4v12.5M5.5 7 8 4.5 10.5 7M16 20V7.5M13.5 17 16 19.5 18.5 17"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.7"
			/>
		</svg>
	);
}
