import {TokenInfo} from "@/pages/board/BoardPage.types.tsx";
import {MASTER} from "@/config.ts";

export const fetchTokens = async (): Promise<TokenInfo[]> => {
	const res = await fetch(`https://tonapi.io/v2/accounts/${MASTER}/events?limit=100`);
	const {events} = await res.json();
	const curves = []
	for (const event of events) {
		const {actions} = event;
		for (const action of actions) {
			if (action.type === 'TonTransfer' && action.TonTransfer.comment === "MINT") {
				curves.push(action.TonTransfer.recipient.address);
			}
		}
	}
	const tokens = await Promise.all(curves.map(async (curve) => {
		const out = await fetch(`https://tonapi.io/v2/blockchain/accounts/${curve}/methods/token`, {headers: {'Authorization': 'Bearer ' + API_KEY}});
		const result = await out.json();
		return result.stack[0].cell;
	}))
	
	console.log(tokens)
	return []
}