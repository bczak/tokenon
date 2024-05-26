import {ITokenInfo} from "@/pages/board/BoardPage.types.tsx";
import {client} from "@/api/client.ts";
import {Cell} from "@ton/core";
import {Buffer} from "buffer";

export const fetchTokenByCurve = async (curve: string): Promise<ITokenInfo> => {
	console.log('fetched events')
	const result = await client.blockchain.execGetMethodForBlockchainAccount(curve, 'token');
	const hex = result.stack[0].cell;
	const cells = Cell.fromBoc(Buffer.from(hex!, 'hex'));
	const token = cells[0].beginParse().loadAddressAny()?.toString()
	const data = await client.jettons.getJettonInfo(token!);
	console.log('fetched token', curve)
	const balance = await fetchCurveBalance(curve, token!)
	const account = await client.accounts.getAccount(curve);
	return {
		address: token!,
		image: data.metadata.image,
		description: data.metadata.description,
		name: data.metadata.name,
		symbol: data.metadata.symbol,
		balance: balance,
		tonBalance: BigInt(account.balance),
		curve: curve!
	} as ITokenInfo;
	
}

export const fetchCurveBalance = async (curve: string, token: string) => {
	const holders = await client.jettons.getJettonHolders(token);
	console.log(holders, curve)
	return BigInt(holders.addresses.filter((item) => item.owner.address === curve)[0].balance)
}