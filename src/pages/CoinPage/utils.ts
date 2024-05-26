import {beginCell, Builder, toNano} from "@ton/core";

export function prepareBuy(amount: number): string {
	alert(toNano(amount.toString()))
	const body = beginCell().store(storeBuyToken({amount: toNano(amount.toString()), queryId: BigInt(Date.now())})).endCell();
	return body.toBoc().toString("base64");
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
