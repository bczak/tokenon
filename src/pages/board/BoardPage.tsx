import React, { useCallback, useState } from 'react'
import { List, SegmentedControl } from '@telegram-apps/telegram-ui'

import { BannerComp } from '@/components/banner_comp'
import { EBoardPageSegmentsControl } from '@/pages/board/BoardPage.types.tsx'

import './BoardPage.css'

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
    </List>
  )
}
