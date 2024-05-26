import React, { useCallback, useState } from 'react'
import { JettonBalance } from 'tonapi-sdk-js'
import { Cell, Text } from '@telegram-apps/telegram-ui'
import { MdVerified } from "react-icons/md"

import jettonDefaultImage from '../../assets/images/jetton_default_image.webp'

import './Jetton.scss'

export const Jetton: React.FC<JettonBalance> = (jetton) => {

  const [ jettonImage, setJettonImage ] = useState(jetton.jetton.image)

  const onImageError = useCallback(() => {
    setJettonImage(jettonDefaultImage)
  }, [ setJettonImage ])

  return (
    <Cell
      className="jetton"
      hovered
      description={
        <div className="jetton__desc">
          <Text
            style={ {
              fontSize: '10px'
            } }
          >
            { jetton.jetton.symbol }
          </Text>
          { jetton.jetton.verification === 'whitelist' && (
            <MdVerified />
          ) }
        </div>
      }
      before={
        <img
          className="jetton__img"
          src={ jettonImage }
          onError={ onImageError }
          alt={ jetton.jetton.name }
        />
      }
      after={
        <div className="jetton__after">
          <Text>{ jetton.balance.toDecimals(jetton.jetton.decimals) }</Text>
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
  )
}
