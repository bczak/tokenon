import type {FC} from 'react';
import {TradeFormComp} from '@/components/trade_form_comp';
import {ChartComp} from '@/components/chart_comp';
import {CoinInfoComp} from '@/components/coin_info_comp';

export const CoinPage: FC = () => {
	return (
		<div style={{height: 'calc(100vh - 90px)', overflow: 'auto'}}>
			<TradeFormComp/>
			<ChartComp/>
			<CoinInfoComp/>
		</div>
	);
};
