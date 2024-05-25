import type { FC } from 'react';
import { TradeFormComp } from '@/components/trade_form_comp';
import { ChartComp } from '@/components/chart_comp';
import { CoinInfoComp } from '@/components/coin_info_comp';
import coinImage from '../../assets/images/coin.jpg'

export const CoinPage: FC = () => {
  return (
    <div style={{ height: 'calc(100vh - 90px)', overflow: 'auto' }}>
      <TradeFormComp/>
      <ChartComp />
      <CoinInfoComp id={1} cap={'$5 460,717'} description={'Despite the challenges we faced with our previous developer, who unfortunately engaged in a rug pull, the CTO community remains stronger than ever. Weve learned from the past and are now ready to push forward with a robust plan and a dedicated team to ensure the success and stability of the CTO token.'} token={'Kabosu Funeral (ticker: KBF)'} img={coinImage}/>
    </div>
  );
};
