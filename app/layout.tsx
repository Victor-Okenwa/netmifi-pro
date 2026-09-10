import type { Metadata } from "next";
import { JetBrains_Mono, Lexend, Orbitron } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const lexend = Lexend({
	subsets: ["latin"],
	variable: "--font-lexend",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains",
});

const orbitron = Orbitron({
	subsets: ["latin"],
	variable: "--font-orbitron",
});

export const metadata: Metadata = {
	title: "NetMifi",
	description: "NetMifi Pro",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${lexend.variable} ${jetbrainsMono.variable} ${orbitron.variable} h-full antialiased`}
		>
			<body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
