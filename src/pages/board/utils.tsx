import {TokenInfo} from "@/pages/board/BoardPage.types.tsx";
import {MASTER} from "@/config.ts";
import {client} from "@/api/client.ts";
import {Cell} from "@ton/core";

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
	const tokens = await Promise.all([...curves].map(async (curve) => {
		const result = await client.blockchain.execGetMethodForBlockchainAccount(curve, 'token');
		return result.stack[0].cell;
	}))
	console.log(tokens)
	
	
	// const cell = tokens[0];
	// try {
	// 	console.log(Cell.fromBase64(cell!))
	// } catch (e) {
	// 	console.log(e)
	// }
	
	
	return []
}