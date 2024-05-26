import React, { useCallback, useState } from 'react'
import { Image, Text, Subheadline, Cell } from '@telegram-apps/telegram-ui'

import { Link } from '../Link/Link.tsx'
import { ICoinCardProps } from './CoinCard.types'

import jettonDefaultImage from '@/assets/images/jetton_default_image.webp'

import './CoinCard.scss'

export const CoinCard: React.FC<ICoinCardProps> = (props) => {
	const { curve, img, cap, description, token } = props

	const [ coinImage, setCoinImage ] = useState(img)

	const onImageError = useCallback(() => {
		setCoinImage(jettonDefaultImage)
	}, [ setCoinImage ])

  return (
		<Link to={ `/coin/${ curve }` }>
			<Cell
				className="coin-card"
				before={
					<Image
						onError={ onImageError }
						src={ `${ coinImage }` }
					/>
				}
				description={ description }
				subhead={
					<>
						<Text className="coin-card__cap-text">Market cap: </Text>
						<Text className="coin-card__cap-value">{ Number(cap / 10n ** 9n).toLocaleString() }</Text>
					</>
				}
			>
        <Subheadline className="coin-card__ticker">
					{ token }
				</Subheadline>
      </Cell>
    </Link>
  )
}
