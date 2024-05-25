import type { FC } from 'react';
import { TradeFormComp } from '@/components/trade_form_comp';
import { ChartComp } from '@/components/chart_comp';

export const CoinPage: FC = () => {
  return (
    <>
      <TradeFormComp id={1} />
      <ChartComp />
    </>
  );
};
