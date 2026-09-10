"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { type ComponentProps, useState } from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

/**
 * Password field with show/hide toggle for auth screens.
 */
export function PasswordInput({ ...props }: Omit<ComponentProps<"input">, "type">) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<InputGroup className="h-11">
			<InputGroupInput
				{...props}
				className={cn("h-11", props.className)}
				type={showPassword ? "text" : "password"}
			/>
			<InputGroupAddon align="inline-end">
				<InputGroupButton
					aria-label={showPassword ? "Hide password" : "Show password"}
					onClick={() => setShowPassword((visible) => !visible)}
					size="icon-xs"
					type="button"
				>
					{showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	);
}
