import { Caption, Image, Progress, Text } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import './CoinInfoComp.scss';
import { useThemeParams } from '@tma.js/sdk-react';

interface CoinInfoCompProps {
    id: number;
    img: string;
    cap: string;
    description: string;
    token: string;
}

export const CoinInfoComp: FC<CoinInfoCompProps>  = ({id, img, cap, description, token}) => {
    const themeParams = useThemeParams()
    const progress = 35;

    return (
        <>
        <div className='coinInfoContainer'>
            <Image className='coinImage' src={img} />
            <div className='infoContainer'>
            {/* <Text>{id}</Text> */}
            <Text style={{ color: themeParams.isDark ? 'lightgray' : themeParams.textColor}} weight="1">{token}</Text>
            <div className='marketCap'>
                <Caption className='capText'>Market cap: </Caption>
                <Caption className='capValue'>{cap}</Caption>
            </div>
            <Text style={{ color: themeParams.isDark ? 'lightgray' : themeParams.textColor}} className='description'>{description}</Text>
            </div>
        </div>
        <div className='progressContainer'>
            <Text style={{ color: themeParams.isDark ? 'lightgray' : themeParams.textColor}} weight="1">Progress</Text>
            <Progress style={{ backgroundColor: themeParams.sectionBgColor}} className='progressLine'  value={progress} />
            <Caption className='progressValue'>{progress}%</Caption>
        </div>
        <div className='progressContainer'>
        <Text style={{ color: themeParams.isDark ? 'lightgray' : themeParams.textColor}} weight="1">Holder distribution</Text>
            <div style={{ backgroundColor: themeParams.sectionBgColor}} className='list'>
                {/* {holders.map((holder, idx) => { */}
            <div className='listItem'>
                <Caption>{id}. Name 1</Caption>
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
