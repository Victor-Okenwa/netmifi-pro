export type ActivityKind = "messages" | "requests" | "matches";

export interface ActivityItem {
	id: string;
	kind: ActivityKind;
	title: string;
	description: string;
	href: string;
}

export type TransactionStatus = "successful" | "pending" | "failed";

export interface TransactionItem {
	id: string;
	recipient: string;
	/** ISO timestamp */
	occurredAt: string;
	/** Amount in NGN (base currency for mock conversions) */
	amountNgn: number;
	status: TransactionStatus;
	href: string;
}

export const MOCK_ACTIVITIES: ActivityItem[] = [
	{
		id: "activity-messages",
		kind: "messages",
		title: "6 messages waiting for you",
		description: "You have 6 new messages from customers to reply to.",
		href: "/messages",
	},
	{
		id: "activity-requests",
		kind: "requests",
		title: "20 request waiting for you accept",
		description: "You have 20 new requests from learners who wants to learn backend development.",
		href: "/trade-requests",
	},
	{
		id: "activity-matches",
		kind: "matches",
		title: "Found 12 people who teach UI Design",
		description: "We found 12 people who teach UI Design and want to learn from you.",
		href: "/swap-skill",
	},
];

export const MOCK_TRANSACTIONS: TransactionItem[] = [
	{
		id: "tx-1",
		recipient: "Onyekachi Nnaemena",
		occurredAt: "2026-09-08T01:20:30.000Z",
		amountNgn: 20_000,
		status: "successful",
		href: "/transactions/tx-1",
	},
	{
		id: "tx-2",
		recipient: "Adaobi Okeke",
		occurredAt: "2026-09-07T18:05:12.000Z",
		amountNgn: 12_500,
		status: "successful",
		href: "/transactions/tx-2",
	},
	{
		id: "tx-3",
		recipient: "Chinedu Eze",
		occurredAt: "2026-09-06T09:41:03.000Z",
		amountNgn: 8_000,
		status: "successful",
		href: "/transactions/tx-3",
	},
];
