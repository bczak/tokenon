import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TonConnectButton, useTonAddress, useTonWallet, useTonConnectUI } from '@tonconnect/ui-react'
import {
  Button,
  Cell,
  Chip,
  LargeTitle,
  List,
  Modal,
  Placeholder,
  Subheadline,
  Text
} from '@telegram-apps/telegram-ui'
import { Account, JettonsBalances } from 'tonapi-sdk-js'
import { IoExitOutline } from 'react-icons/io5'

import { DisplayData } from '@/components/DisplayData/DisplayData.tsx'
import { getAccount, getJettonsBalances } from '@/api'

import tonIconBg from '../../assets/icons/ton_bg.svg'
import walletDisconnectImage from '../../assets/images/disconnect.gif'

import './WalletPage.scss'

export const WalletPage: React.FC = () => {
  const wallet = useTonWallet()
  const [ walletConnect ] = useTonConnectUI()
  const userTonAddress = useTonAddress()

  const [ userAccount, setUserAccount ] = useState<Account>()
  const [ userAccountJettons, setUserAccountJettons ] = useState<JettonsBalances['balances']>([])
  const [ isDisconnectWalletVisible, setDisconnectWalletVisible ] = useState<boolean>(false)

  const userCurrentBalance = useMemo(() => {
    if (userAccount) {
      return userAccount.balance.toTON()
    }
  }, [ userAccount ])

  useEffect(() => {
    if(userTonAddress) {
      getAccount('UQAQ6i-LfUZCQwcP7TrpEB8P3jASUzsJoXIaNxzGtwRlw0YQ')
        .then((res) => setUserAccount(res))
      getJettonsBalances('UQAQ6i-LfUZCQwcP7TrpEB8P3jASUzsJoXIaNxzGtwRlw0YQ')
        .then((res) => setUserAccountJettons(res.balances))
    }
  }, [ userTonAddress ])

  const handleDisconnectWalletVisible = useCallback((value: boolean) => {
    setDisconnectWalletVisible(value)
  }, [ setDisconnectWalletVisible ])

  const handleDisconnectWalletButton = useCallback(() => {
    walletConnect.disconnect()
    setDisconnectWalletVisible(false)
  }, [ walletConnect, setDisconnectWalletVisible ])

  // Wallet doesn't connect with ton
  if (!wallet) {
    return (
      <Placeholder
        className="ton-connect-page__placeholder"
        header="TON Connect"
        description={
          <>
            <Text>
              To display the data related to the TON Connect, it is required to connect your wallet
            </Text>
            <TonConnectButton
              className="ton-connect-page__button"
            />
          </>
        }
      />
    )
  }

  const {
    account: { chain, publicKey, address, walletStateInit },
    device: {
      appName,
      appVersion,
      maxProtocolVersion,
      platform,
      features
    }
  } = wallet

  return (
    <List className="scrolling-page">
      <div className="wallet-balance">
        <LargeTitle className="wallet-balance__num">
          <img
            alt="TON icon"
            className="wallet-balance__num__icon"
            src={ tonIconBg }
          />
          { userCurrentBalance }
        </LargeTitle>
        <div className="wallet-balance__uid">
          <Chip onClick={ () => handleDisconnectWalletVisible(true) }>
            { userTonAddress.compact() }
          </Chip>
          <Modal
            dismissible
            nested
            preventScrollRestoration
            open={ isDisconnectWalletVisible }
            onOpenChange={ handleDisconnectWalletVisible }
            header={ <Modal.Header /> }
          >
            <Placeholder
              action={
                <Button
                  mode="gray"
                  onClick={ handleDisconnectWalletButton }
                  after={ <IoExitOutline size={ 24 } /> }
                >
                  disconnect
                </Button>
              }
            >
              <img
                alt="Telegram sticker"
                className="wallet-balance__uid__img"
                src={ walletDisconnectImage }
              />
              <Text className="wallet-balance__uid__desc">
                Are you sure you want to disconnect your wallet?
              </Text>
            </Placeholder>
          </Modal>
        </div>
      </div>
      <Subheadline
        caps
        level="2"
      >
        My Tokens
      </Subheadline>
      <div className="wallet-jettons">
        { userAccountJettons.map((jetton) => (
          <Cell
            className="wallet-jettons__item"
            hovered
            key={ jetton.wallet_address.address }
            description={
              <Text
                style={ {
                  fontSize: '10px'
                } }
              >
                { jetton.jetton.symbol }
              </Text>
            }
            before={
              <img
                className="wallet-jettons__item__img"
                src={ jetton.jetton.image }
                alt={ jetton.jetton.name }
              />
            }
            after={
              <div className="wallet-jettons__item__after">
                <Text>{ jetton.balance.toTON() }</Text>
              </div>
            }
          >
            <Text
              weight="2"
              style={ {
                fontSize: '14px'
              }}
            >
            { jetton.jetton.name }
            </Text>
          </Cell>
        )) }
      </div>
      <List>
        <DisplayData
          header="Account"
          rows={ [
            { title: 'Address', value: address },
            { title: 'Chain', value: chain },
            { title: 'Public Key', value: publicKey },
            { title: 'Wallet state init', value: walletStateInit }
          ] }
        />
        <DisplayData
          header="Device"
          rows={ [
            { title: 'App Name', value: appName },
            { title: 'App Version', value: appVersion },
            { title: 'Max Protocol Version', value: maxProtocolVersion },
            { title: 'Platform', value: platform },
            {
              title: 'Features',
              value: features
                .map(f => typeof f === 'object' ? f.name : undefined)
                .filter(v => v)
                .join(', ')
            }
          ] }
        />
      </List>
    </List>
  )
}
