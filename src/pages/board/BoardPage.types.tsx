export enum EBoardPageSegmentsControl {
  RECENT = 'recent',
  FAVORITES = 'favorites'
}


export interface TokenInfo {
  address: string,
  symbol: string,
  name: string,
  description: string,
  image: string,
  balance: bigint,
}