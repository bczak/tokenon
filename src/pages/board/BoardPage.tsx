import React, { useCallback, useState } from 'react'
import { Headline, List, Section, SegmentedControl } from '@telegram-apps/telegram-ui'
import { useQuery } from '@tanstack/react-query'

import { BannerComp } from '@/components/banner_comp'
import { CoinCard } from '@/components/coin_card'
import { EBoardPageSegmentsControl } from '@/pages/board/BoardPage.types'
import { fetchTokens } from '@/api/tokens'

import './BoardPage.css'

export const BoardPage: React.FC = () => {
  const [ activeSegmentBoardControl, setActiveSegmentBoardControl ] = useState<EBoardPageSegmentsControl>(EBoardPageSegmentsControl.RECENT)

  const handleSegmentBoardControlChange = useCallback((segment: EBoardPageSegmentsControl) => {
    setActiveSegmentBoardControl(segment)
  }, [ setActiveSegmentBoardControl ])

  const { data = [] } = useQuery({
    queryKey: [ activeSegmentBoardControl === EBoardPageSegmentsControl.RECENT ? 'tokens' : 'owned_tokens' ],
    queryFn: activeSegmentBoardControl === EBoardPageSegmentsControl.RECENT ? fetchTokens : () => []
  })

  return (
    <List className="scrolling-page">
      <BannerComp/>
      <SegmentedControl>
        <SegmentedControl.Item
          selected={ activeSegmentBoardControl === EBoardPageSegmentsControl.RECENT }
          onClick={ () => handleSegmentBoardControlChange(EBoardPageSegmentsControl.RECENT) }
        >
          Recent
        </SegmentedControl.Item>
        <SegmentedControl.Item
          selected={ activeSegmentBoardControl === EBoardPageSegmentsControl.OWNED }
          onClick={ () => handleSegmentBoardControlChange(EBoardPageSegmentsControl.OWNED) }
        >
          Owned
        </SegmentedControl.Item>
      </SegmentedControl>
			<Section className="board-coins">
				{ data.map((token) => (
					<CoinCard
						key={ token.address }
						curve={ token.curve }
						address={ token.address }
						cap={ token.balance }
            description={ token.description }
						tokenName={ token.name }
            tokenTicker={ token.symbol }
						img={ token.image }
					/>
				)) }
			</Section>
      { activeSegmentBoardControl === EBoardPageSegmentsControl.OWNED && (
        <Headline
          style={ {
            marginTop: '50px',
            textAlign: 'center'
          } }
        >
          Coming soon
        </Headline>
      ) }
    </List>
  )
}
