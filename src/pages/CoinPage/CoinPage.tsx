import type {FC} from 'react';
import {TradeFormComp} from '@/components/trade_form_comp';
import {ChartComp} from '@/components/chart_comp';
import {CoinInfoComp} from '@/components/coin_info_comp';
import {useQuery} from "@tanstack/react-query";
import {TokenInfo} from "@/pages/board/BoardPage.types.tsx";
import {fetchTokenByCurve} from "@/components/coin_info_comp/utils.tsx";
import {useParams} from "react-router-dom";

export const CoinPage: FC = () => {
	const {address} = useParams<{ address: string }>();
	
	const {data} = useQuery<TokenInfo | null>({
		queryKey: ['token', address],
		queryFn: () => fetchTokenByCurve(address!),
	})
	
	if (!data) {
		return null
	}
	
	return (
		<div style={{height: 'calc(100vh - 90px)', overflow: 'auto'}}>
			<TradeFormComp {...data}/>
			<ChartComp/>
			<CoinInfoComp {...data}/>
		</div>
	);
};
