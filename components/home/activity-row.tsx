import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ActivityIcon } from "@/components/home/feed-icons";
import { cn } from "@/lib/utils";
import type { ActivityItem as ActivityItemData } from "@/mock-data/home-feed";

interface ActivityRowProps {
	item: ActivityItemData;
	className?: string;
}

/**
 * Recent-activity list row: icon, title, description, and chevron.
 */
export function ActivityRow({ item, className }: ActivityRowProps) {
	return (
		<Link
			className={cn(
				"flex items-start gap-3 px-3 py-3.5 transition-colors hover:bg-muted/40",
				className
			)}
			href={item.href}
		>
			<span className="mt-0.5 flex size-8 shrink-0 items-center justify-center">
				<ActivityIcon kind={item.kind} />
			</span>
			<span className="min-w-0 flex-1">
				<span className="block font-medium text-foreground text-sm leading-snug">{item.title}</span>
				<span className="mt-0.5 line-clamp-2 block text-muted-foreground text-xs leading-snug">
					{item.description}
				</span>
			</span>
			<ChevronRightIcon className="mt-1 size-4 shrink-0 text-muted-foreground" />
		</Link>
	);
}
