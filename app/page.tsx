import { LogoIcon } from "@/components/brand/logo-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
	return (
		<main className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-16">
			<Card className="w-full max-w-lg">
				<CardHeader>
					<LogoIcon className="h-12 w-auto" />
					<CardTitle className="mt-4">NetMifi Pro</CardTitle>
					<CardDescription>Design tokens and primitives from the NetMifi system.</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					<div className="flex flex-wrap items-center gap-2">
						<Badge>Primary</Badge>
						<span className="rounded-full bg-primary-light px-2.5 py-0.5 text-primary-light-foreground text-xs">
							Primary light
						</span>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="preview">Label</Label>
						<Input id="preview" placeholder="Input preview" />
					</div>
					<div className="flex flex-wrap gap-2">
						<Button>Primary button</Button>
						<Button variant="outline">Outline</Button>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
