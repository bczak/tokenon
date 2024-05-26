import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { TonConnectButton, useTonAddress, useTonWallet, useTonConnectUI } from '@tonconnect/ui-react'
import {
  Button,
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

import { getAccount, getJettonsBalances } from '@/api'
import { Jetton } from '@/components/jetton'

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
  const [ isZeroUserAccountJettonsVisible, setZeroUserAccountJettonsVisible ] = useState<boolean>(false)

  const userCurrentBalance = useMemo(() => {
    if (userAccount) {
      return userAccount.balance.toDecimals()
    }
  }, [ userAccount ])

  const userAccountJettonsPositive = useMemo(() => {
    return userAccountJettons.filter((item) => item.balance !== '0')
  }, [ userAccountJettons ])

  const userAccountJettonsPositiveLength = useMemo(() => {
    return userAccountJettonsPositive.length
  }, [ userAccountJettonsPositive ])

  const userAccountJettonsZeros = useMemo(() => {
    return userAccountJettons.filter((item) => item.balance === '0')
  }, [ userAccountJettons ])

  const userAccountJettonsZerosLength = useMemo(() => {
    return userAccountJettonsPositive.length
  }, [ userAccountJettonsZeros ])

  useEffect(() => {
    if(userTonAddress) {
      getAccount(userTonAddress)
        .then((res) => setUserAccount(res))
      getJettonsBalances(userTonAddress)
        .then((res) => setUserAccountJettons(res.balances))
    }
  }, [ userTonAddress ])

  const handleDisconnectWalletVisible = useCallback((value: boolean) => {
    setDisconnectWalletVisible(value)
  }, [ setDisconnectWalletVisible ])

  const handleZeroUserAccountJettonsVisible = useCallback(() => {
    setZeroUserAccountJettonsVisible((prev) => !prev)
  }, [ setZeroUserAccountJettonsVisible ])

  const handleDisconnectWalletButton = useCallback(() => {
    walletConnect.disconnect().then(() => {
      setDisconnectWalletVisible(false)
    })
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
      { userAccountJettonsPositiveLength > 0 && (
        <Fragment>
          <Subheadline
            caps
            level="2"
          >
            My Tokens
          </Subheadline>
          <div className="wallet-jettons">
            { userAccountJettonsPositive.filter((item) => item.balance !== '0').map((jetton) => (
              <Jetton
                key={ jetton.wallet_address.address }
                { ...jetton }
              />
            )) }
          </div>
        </Fragment>
      ) }
      { userAccountJettonsZerosLength > 0 && (
        <Fragment>
          <div className="wallet-section-header">
            <Subheadline
              caps
              level="2"
            >
              Hidden Tokens
            </Subheadline>
            <Button
              mode="plain"
              size="s"
              onClick={ handleZeroUserAccountJettonsVisible }
              style={ {
                fontWeight: 'normal'
              } }
            >
              { isZeroUserAccountJettonsVisible ? 'hide' : 'show' }
            </Button>
          </div>
          { isZeroUserAccountJettonsVisible && (
            <div className="wallet-jettons">
              { userAccountJettons.filter((item) => item.balance === '0').map((jetton) => (
                <Jetton
                  key={ jetton.wallet_address.address }
                  { ...jetton }
                />
              )) }
            </div>
          ) }
        </Fragment>
      ) }
    </List>
  )
}
