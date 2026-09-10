"use client";

import { cn } from "@/lib/utils";
import type { BottomNavItem } from "./nav-items";

interface BottomNavProps {
	items: BottomNavItem[];
	pathname: string;
	className?: string;
}

/**
 * Sticky mobile tab bar. Pass `pathname` from the route layer.
 */
export function BottomNav({ items, pathname, className }: BottomNavProps) {
	return (
		<nav
			aria-label="Primary"
			className={cn(
				"fixed right-0 bottom-0 left-0 z-50 mx-auto w-full max-w-md border-border border-t bg-card px-1 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]",
				className
			)}
		>
			<ul className="flex items-start justify-between">
				{items.map((item) => {
					const isActive =
						item.href === "/"
							? pathname === "/"
							: pathname === item.href || pathname.startsWith(`${item.href}/`);
					const Icon = item.icon;

					return (
						<li className="min-w-0 flex-1" key={item.href}>
							<a
								aria-current={isActive ? "page" : undefined}
								className={cn(
									"flex flex-col items-center gap-1 px-0.5 text-center text-[11px] leading-tight",
									isActive ? "font-semibold text-foreground" : "font-medium text-muted-foreground"
								)}
								href={item.href}
							>
								<Icon aria-hidden className="size-6" />
								<span className="max-w-full">{item.label}</span>
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
