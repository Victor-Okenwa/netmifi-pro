import { ComingSoonPage } from "@/components/shared/coming-soon-page";

interface TransactionDetailPageProps {
	params: Promise<{ id: string }>;
}

export default async function TransactionDetailPage({ params }: TransactionDetailPageProps) {
	const { id } = await params;

	return (
		<ComingSoonPage
			description={`Details for transfer ${id} will appear here soon.`}
			title="Transfer details"
		/>
	);
}
