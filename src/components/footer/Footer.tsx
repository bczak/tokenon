import React, { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tabbar } from '@telegram-apps/telegram-ui'
import { IoAlbumsOutline, IoRocketOutline, IoWalletOutline } from 'react-icons/io5'

import './Footer.scss'

export const Footer: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const activeRoute = useMemo(() => {
    return location.pathname
  }, [ location ])

  const handleFooterNavigate = useCallback((path: string) => {
    navigate(path)
  }, [ navigate ])

  return (
    <Tabbar
      style={ {
        paddingBottom: '28px'
      } }
    >
      <Tabbar.Item
        text="Board"
        selected={ activeRoute === '/' }
        onClick={ () => handleFooterNavigate('/') }
      >
        <IoAlbumsOutline size={ 28 }/>
      </Tabbar.Item>
      <Tabbar.Item
        text="Launch"
        selected={ activeRoute === '/init-data' }
        onClick={ () => handleFooterNavigate('/init-data') }
      >
        <IoRocketOutline size={ 28 }/>
      </Tabbar.Item>
      <Tabbar.Item
        text="Wallet"
        selected={ activeRoute === '/wallet' }
        onClick={ () => handleFooterNavigate('/wallet') }
      >
        <IoWalletOutline size={ 28 }/>
      </Tabbar.Item>
    </Tabbar>
  )
}
