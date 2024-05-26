import {TokenInfo} from "@/pages/board/BoardPage.types.tsx";
import {client} from "@/api/client.ts";
import {Cell} from "@ton/core";
import {Buffer} from "buffer";

export const fetchTokenByCurve = async (curve: string): Promise<TokenInfo> => {
	console.log('fetched events')
	const result = await client.blockchain.execGetMethodForBlockchainAccount(curve, 'token');
	const hex = result.stack[0].cell;
	const cells = Cell.fromBoc(Buffer.from(hex!, 'hex'));
	const token = cells[0].beginParse().loadAddressAny()?.toString()
	const data = await client.jettons.getJettonInfo(token!);
	console.log('fetched token', curve)
	return {
		address: token!,
		image: data.metadata.image,
		description: data.metadata.description,
		name: data.metadata.name,
		symbol: data.metadata.symbol,
		balance: BigInt((await fetchCurveBalance(curve, token!)).balance),
		tonBalance: 0n,
		curve: curve!
	} as TokenInfo;
	
}

export const fetchCurveBalance = async (curve: string, token: string) => {
	const tokens = await client.jettons.getJettonHolders(token);
	return tokens.addresses.filter((item) => item.address === curve)[0]
}