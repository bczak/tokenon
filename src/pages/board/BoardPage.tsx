import React, { useCallback, useState } from 'react'
import { List, Section, SegmentedControl } from '@telegram-apps/telegram-ui'

import { BannerComp } from '@/components/banner_comp'
import { EBoardPageSegmentsControl } from '@/pages/board/BoardPage.types.tsx'

import './BoardPage.css'
import { CoinCardComp } from '@/components/coin_card_comp'

export const BoardPage: React.FC = () => {

  const [ activeSegmentBoardControl, setActiveSegmentBoardControl] = useState<EBoardPageSegmentsControl>(EBoardPageSegmentsControl.RECENT)

  const handleSegmentBoardControlChange = useCallback((segment: EBoardPageSegmentsControl) => {
    setActiveSegmentBoardControl(segment)
  }, [ setActiveSegmentBoardControl ])

  return (
    <List className="page">
      <BannerComp />
      <SegmentedControl>
        <SegmentedControl.Item
          selected={ activeSegmentBoardControl === EBoardPageSegmentsControl.RECENT }
          onClick={ () => handleSegmentBoardControlChange(EBoardPageSegmentsControl.RECENT) }
        >
          Recent
        </SegmentedControl.Item>
        <SegmentedControl.Item
          selected={ activeSegmentBoardControl === EBoardPageSegmentsControl.FAVORITES }
          onClick={ () => handleSegmentBoardControlChange(EBoardPageSegmentsControl.FAVORITES) }
        >
          Favorites
        </SegmentedControl.Item>
      </SegmentedControl>
      <Section
        >
          <CoinCardComp id={1} cap={'$5 460,717'} description={'CTO Old dev rugged but we already have 40 in cto vc ready to send this lets go to raydium'} token={'Kabosu Funeral (ticker: KBF)'} img={'/images/coin.png'}/>
          </Section>
    </List>
  )
}
