import {TokenInfo} from "@/pages/board/BoardPage.types.tsx";
import {MASTER} from "@/config.ts";
import {client} from "@/api/client.ts";
import {Cell} from "@ton/core";
import {Buffer} from "buffer";

export const fetchTokens = async (): Promise<TokenInfo[]> => {
	// const res = await fetch(`https://tonapi.io/v2/accounts/${MASTER}/events?limit=100`);
	const res = await client.accounts.getAccountEvents(MASTER, {limit: 1});
	const {events} = res
	const curves: Set<string> = new Set();
	for (const event of events) {
		const {actions} = event;
		for (const action of actions) {
			if (action.type === 'TonTransfer' && action.TonTransfer && action.TonTransfer.comment === "MINT") {
				curves.add(action.TonTransfer.recipient.address);
			}
		}
	}
	console.log(curves)
	const tokens: TokenInfo[] = await Promise.all([...curves].map(async (curve) => {
		const result = await client.blockchain.execGetMethodForBlockchainAccount(curve, 'token');
		const hex = result.stack[0].cell;
		const cells = Cell.fromBoc(Buffer.from(hex!, 'hex'));
		const token = cells[0].beginParse().loadAddressAny()?.toString()
		const data = await client.jettons.getJettonInfo(token!);
		console.log(data)
		return {
			address: token!,
			image: data.metadata.image,
			description: data.metadata.description,
			name: data.metadata.name,
			symbol: data.metadata.symbol,
			balance: 0n
		} as TokenInfo;
	}))
	console.log(tokens)
	return tokens
}