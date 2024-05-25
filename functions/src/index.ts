import {Sha256} from "@aws-crypto/sha256-js";
import {Dictionary, beginCell, Cell, Builder, toNano} from "@ton/core";
import {onCall} from "firebase-functions/v2/https";
import {logger} from "firebase-functions";

export const prepareTransaction = onCall(async (context) => {
	const data = context.data as { content: any, supply: number };
	
	const body = prepare({
		supply: toNano(data.supply),
		content: await buildOnchainMetadata(data.content)
	});
	return body.toBoc().toString("base64");
	
});


export const deployToken = onCall(async (context) => {
	const boc = context.data as string;
	const cell = Cell.fromBase64(boc);
	logger.log(cell.toString());
})


const ONCHAIN_CONTENT_PREFIX = 0x00;
const SNAKE_PREFIX = 0x00;
const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);

function bufferToChunks(buff: Buffer, chunkSize: number) {
	const chunks: Buffer[] = [];
	while (buff.byteLength > 0) {
		chunks.push(buff.slice(0, chunkSize));
		buff = buff.slice(chunkSize);
	}
	return chunks;
}

export function makeSnakeCell(data: Buffer) {
	const chunks = bufferToChunks(data, CELL_MAX_SIZE_BYTES);
	const b = chunks.reduceRight((curCell, chunk, index) => {
		if (index === 0) {
			curCell.storeInt(SNAKE_PREFIX, 8);
		}
		curCell.storeBuffer(chunk);
		if (index > 0) {
			const cell = curCell.endCell();
			return beginCell().storeRef(cell);
		} else {
			return curCell;
		}
	}, beginCell());
	return b.endCell();
}

const sha256 = (str: string) => {
	const sha = new Sha256();
	sha.update(str);
	return Buffer.from(sha.digestSync());
};

const toKey = (key: string) => {
	return BigInt(`0x${sha256(key).toString("hex")}`);
};


export function buildOnchainMetadata(data: {
	name: string;
	description: string;
	image: string;
	symbol: string;
}): Cell {
	const dict = Dictionary.empty(
		Dictionary.Keys.BigUint(256),
		Dictionary.Values.Cell()
	);
	Object.entries(data).forEach(([key, value]) => {
		dict.set(toKey(key), makeSnakeCell(Buffer.from(value, "utf8")));
	});
	
	return beginCell()
		.storeInt(ONCHAIN_CONTENT_PREFIX, 8)
		.storeDict(dict)
		.endCell();
}


type MintToken = {
	content: Cell;
	supply: bigint;
}

function storeMintToken(src: MintToken) {
	return (builder: Builder) => {
		const b_0 = builder;
		b_0.storeUint(4105044968, 32);
		b_0.storeRef(src.content);
		b_0.storeCoins(src.supply);
	};
}

function prepare(message: MintToken): Cell {
	return beginCell().store(storeMintToken(message)).endCell()
}