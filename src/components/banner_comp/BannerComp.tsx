import React from 'react'
import { Banner, Button } from '@telegram-apps/telegram-ui'

import './BannerComp.scss'

import bannerImage from '../../assets/images/borad_page_banner_1.webp'

export const BannerComp: React.FC = () => {

  const handleBannerButtonClick = () => {
    window.open('https://t.me/tokenon_official')
  }

  return (
    <Banner
      type="section"
      header="Join our community"
      subheader="Get all the news from the TON crypto world"
      className="banner-comp"
      background={
        <img
          alt="banner"
          src={ bannerImage }
          style={ {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          } }
        />
      }
    >
      <Button
        mode="gray"
        onClick={ handleBannerButtonClick }
      >
        explore
      </Button>
    </Banner>
  )
}
