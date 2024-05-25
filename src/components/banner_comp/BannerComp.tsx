import React from 'react'
import { Banner, Button } from '@telegram-apps/telegram-ui'

import './BannerComp.scss'

import bannerImage from '../../assets/images/borad_page_banner_1.webp'

export const BannerComp: React.FC = () => {
  return (
    <Banner
      type="section"
      header="Join our community"
      subheader="Get all the news from the TON crypto world."
      className="banner-comp"
      background={
        <img
          alt="banner"
          src={ bannerImage }
          style={ {
            width: '100%',
            objectFit: 'cover'
          } }
        />
      }
    >
      <Button
        mode="white"
        size="s"
      >
        explore
      </Button>
    </Banner>
  )
}
