import {Caption, Image, Progress, Text} from '@telegram-apps/telegram-ui';
import {type FC, useCallback, useState} from 'react';
import './CoinInfoComp.scss';
import {useThemeParams} from '@tma.js/sdk-react';
import {ITokenInfo} from '@/pages/board/BoardPage.types';
import jettonDefaultImage from "@/assets/images/jetton_default_image.webp";

export const CoinInfoComp: FC<ITokenInfo> = (data) => {
	const themeParams = useThemeParams()
	const progress = Math.round((Number(data.supply - data.balance) / Number(data.supply)) * 100);
	
	const [coinImage, setCoinImage] = useState(data.image)
	
	const onImageError = useCallback(() => {
		setCoinImage(jettonDefaultImage)
	}, [setCoinImage])
	return (
		<>
			<div className='coinInfoContainer'>
				<Image className='coinImage' src={coinImage} onError={onImageError}/>
				<div className='infoContainer'>
					<Text className='tokenText' style={{color: themeParams.isDark ? 'lightgray' : themeParams.textColor}} weight="1">{`${data.name} (ticker: ${data.symbol})`}</Text>
					<div className='marketCap'>
						<Caption className='capText'>Market cap: </Caption>
						<Caption className='capValue'>{(Number(data?.tonBalance) / Number(10n ** 9n)).toFixed(2)}</Caption>
					</div>
					<Text style={{color: themeParams.isDark ? 'lightgray' : themeParams.textColor}} className='description'>{data.description}</Text>
				</div>
			</div>
			<div className='progressContainer'>
				<Text style={{color: themeParams.isDark ? 'lightgray' : themeParams.textColor}} weight="1">Progress</Text>
				<Progress style={{backgroundColor: themeParams.sectionBgColor}} className='progressLine' value={progress}/>
				<Caption className='progressValue'>{progress}%</Caption>
			</div>
			<div className='progressContainer'>
				<Text style={{color: themeParams.isDark ? 'lightgray' : themeParams.textColor}} weight="1">Holder distribution</Text>
				<div style={{backgroundColor: themeParams.sectionBgColor}} className='list'>
					{/* {holders.map((holder, idx) => { */}
					<div className='listItem'>
						<Caption>1. Name 1</Caption>
						<Caption>40%</Caption>
					</div>
					<div className='listItem'>
						<Caption>2. Name 2</Caption>
						<Caption>20%</Caption>
					</div>
					<div className='listItem'>
						<Caption>3. Name 3</Caption>
						<Caption>10%</Caption>
					</div>
					{/* } */}
				</div>
			</div>
		</>
	)
};

