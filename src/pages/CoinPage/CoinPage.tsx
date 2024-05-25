import type { FC } from 'react';
import { TradeFormComp } from '@/components/trade_form_comp';
import { ChartComp } from '@/components/chart_comp';
import { CoinInfoComp } from '@/components/coin_info_comp';
import coinImage from '../../assets/images/coin.jpg'

export const CoinPage: FC = () => {
  return (
    <>
      <TradeFormComp/>
      <ChartComp />
      <CoinInfoComp id={1} cap={'$5 460,717'} description={'CTO Old dev rugged but we already have 40 in cto vc ready to send this lets go to raydium'} token={'Kabosu Funeral (ticker: KBF)'} img={coinImage}/>
    </>
  );
};
