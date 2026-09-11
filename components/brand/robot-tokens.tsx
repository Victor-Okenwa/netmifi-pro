import type { ClassValue } from "clsx";

import { cn } from "@/lib/utils";

interface RobotTokensProps {
	className?: ClassValue;
}

/**
 * Robot tokens illustration used in skill-trading UI.
 */
export function RobotTokens({ className }: RobotTokensProps) {
	return (
		<svg
			className={cn(className)}
			fill="none"
			height="109"
			viewBox="0 0 155 109"
			width="155"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
		>
			<title>Robot tokens</title>
			<rect fill="url(#pattern0_robot_tokens)" height="109" rx="10" width="154.985" />
			<defs>
				<pattern
					height="1"
					id="pattern0_robot_tokens"
					patternContentUnits="objectBoundingBox"
					width="1"
				>
					<use
						transform="matrix(0.000925926 0 0 0.00131655 0 -0.0312291)"
						xlinkHref="#image0_robot_tokens"
					/>
				</pattern>
				<image
					height="807"
					id="image0_robot_tokens"
					preserveAspectRatio="none"
					width="1080"
					xlinkHref="/brand/robot-tokens.png"
				/>
			</defs>
		</svg>
	);
}
