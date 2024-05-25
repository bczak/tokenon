import React, {useCallback, useState} from 'react'
import {List, Section, SegmentedControl} from '@telegram-apps/telegram-ui'

import {BannerComp} from '@/components/banner_comp'
import {EBoardPageSegmentsControl} from '@/pages/board/BoardPage.types.tsx'

import './BoardPage.css'
import {CoinCardComp} from '@/components/coin_card_comp'
import {useQuery} from "@tanstack/react-query";
import {fetchTokens} from "@/pages/board/utils.tsx";

export const BoardPage: React.FC = () => {
	
	const [activeSegmentBoardControl, setActiveSegmentBoardControl] = useState<EBoardPageSegmentsControl>(EBoardPageSegmentsControl.RECENT)
	
	const handleSegmentBoardControlChange = useCallback((segment: EBoardPageSegmentsControl) => {
		setActiveSegmentBoardControl(segment)
	}, [setActiveSegmentBoardControl])
	
	const {data = []} = useQuery({
		queryKey: ['tokens'],
		queryFn: fetchTokens
	})
	
	
	return (
		<List className="page">
			<BannerComp/>
			<SegmentedControl>
				<SegmentedControl.Item
					selected={activeSegmentBoardControl === EBoardPageSegmentsControl.RECENT}
					onClick={() => handleSegmentBoardControlChange(EBoardPageSegmentsControl.RECENT)}
				>
					Recent
				</SegmentedControl.Item>
				<SegmentedControl.Item
					selected={activeSegmentBoardControl === EBoardPageSegmentsControl.FAVORITES}
					onClick={() => handleSegmentBoardControlChange(EBoardPageSegmentsControl.FAVORITES)}
				>
					Favorites
				</SegmentedControl.Item>
			</SegmentedControl>
			<Section>
				{data.map((token, i) => <CoinCardComp id={i} key={i}
				                                      cap={token.balance} description={token.description}
				                                      token={`${token.name} (ticker: ${token.symbol})`} img={token.image}/>)
				}
			</Section>
		</List>
	)
}
