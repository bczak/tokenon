export enum EBoardPageSegmentsControl {
	
	OWNED = 'owned',
	RECENT = 'recent'
}


export interface ITokenInfo {
	address: string,
	symbol: string,
	name: string,
	description: string,
	image: string,
	supply: bigint,
	balance: bigint,
	tonBalance: bigint,
	curve: string
}
