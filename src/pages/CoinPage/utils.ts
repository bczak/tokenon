import {Address, beginCell, Builder, Cell, toNano} from "@ton/core";

export function prepareBuy(amount: number): string {
	const body = beginCell().store(storeBuyToken({amount: toNano(amount.toString()), queryId: BigInt(Date.now())})).endCell();
	return body.toBoc().toString("base64");
}

export function prepareSell(amount: string, curve: string): string {
	const body = beginCell().store(storeTokenTransfer({
		amount: toNano(amount.toString()),
		queryId: BigInt(Date.now()),
		custom_payload: Cell.EMPTY,
		forward_payload: Cell.EMPTY,
		forward_ton_amount: toNano('0.1'),
		destination: Address.parse(curve),
		response_destination: Address.parse(curve)
	})).endCell();
	return body.toBoc().toString("base64");
}


export function storeTokenTransfer(src: TokenTransfer) {
	return (builder: Builder) => {
		const b_0 = builder;
		b_0.storeUint(260734629, 32);
		b_0.storeUint(src.queryId, 64);
		b_0.storeCoins(src.amount);
		b_0.storeAddress(src.destination);
		b_0.storeAddress(src.response_destination);
		if (src.custom_payload !== null && src.custom_payload !== undefined) {
			b_0.storeBit(true).storeRef(src.custom_payload);
		} else {
			b_0.storeBit(false);
		}
		b_0.storeCoins(src.forward_ton_amount);
		b_0.storeBuilder(src.forward_payload.asBuilder());
	};
}


export function storeBuyToken(src: BuyToken) {
	return (builder: Builder) => {
		const b_0 = builder;
		b_0.storeUint(2989703118, 32);
		b_0.storeCoins(src.amount);
		b_0.storeUint(src.queryId, 64);
	};
}

export type BuyToken = {
	amount: bigint;
	queryId: bigint;
}

export type TokenTransfer = {
	queryId: bigint;
	amount: bigint;
	destination: Address;
	response_destination: Address;
	custom_payload: Cell | null;
	forward_ton_amount: bigint;
	forward_payload: Cell;
}