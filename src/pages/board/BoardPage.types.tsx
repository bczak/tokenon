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
	balance: bigint,
	tonBalance: bigint,
	curve: string
}
