import React, { useCallback, useState } from 'react'
import { Image, Text, Subheadline, Cell } from '@telegram-apps/telegram-ui'
import { useThemeParams } from '@tma.js/sdk-react'

import { Link } from '../Link/Link.tsx'
import { ICoinCardProps } from './CoinCard.types'

import jettonDefaultImage from '@/assets/images/jetton_default_image.webp'

import './CoinCard.scss'

export const CoinCard: React.FC<ICoinCardProps> = (props) => {
	const { curve, img, cap, description, tokenName, tokenTicker } = props

	const [ coinImage, setCoinImage ] = useState(img)

	const themeParams = useThemeParams()

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
				description={
					<Text
						style={ {
							fontSize: '12px',
							opacity: '0.6',
						} }
					>
						{ description }
					</Text>
				}
				subhead={
					<>
						<Text
							className="coin-card__cap-text"
							style={ {
								fontSize: '12px'
							} }
						>
							Market cap:
						</Text>
						<Text
							className="coin-card__cap-value"
							style={ {
								marginLeft: '1ch',
								fontSize: '12px'
							} }
						>
							{ Number(cap / 10n ** 9n).toLocaleString() }
						</Text>
					</>
				}
			>
        <Subheadline className="coin-card__ticker">
					{ tokenName } (ticker: <span style={ { color: themeParams.destructiveTextColor } }>{ tokenTicker }</span>)
				</Subheadline>
      </Cell>
    </Link>
  )
}
