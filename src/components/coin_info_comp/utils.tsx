import {TokenInfo} from "@/pages/board/BoardPage.types.tsx";
import {client} from "@/api/client.ts";

export const fetchTokenByAddress = async (token: string): Promise<TokenInfo> => {
	console.log('fetched events')
	const data = await client.jettons.getJettonInfo(token!);
	console.log('fetched token', token)
	return {
		address: token!,
		image: data.metadata.image,
		description: data.metadata.description,
		name: data.metadata.name,
		symbol: data.metadata.symbol,
		balance: 0n
	} as TokenInfo;
	
}
