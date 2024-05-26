import type { ComponentType, JSX } from 'react'

import { BoardPage } from '@/pages/board/BoardPage'
import { LaunchPage } from '@/pages/launch/LaunchPage.tsx'
import { WalletPage } from '@/pages/wallet/WalletPage'
import { CoinPage } from '@/pages/coin/CoinPage'

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: BoardPage },
  { path: '/launch', Component: LaunchPage, title: 'Launch new token' },
  { path: '/coin/:address', Component: CoinPage, title: 'Coin Card' },
  { path: '/wallet', Component: WalletPage, title: 'Wallet' }
]
