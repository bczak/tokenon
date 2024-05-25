import { Image, Text } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import './CoinInfoComp.scss';

interface CoinInfoCompProps {
    id: number;
    img: string;
    cap: string;
    description: string;
    token: string;
}

export const CoinInfoComp: FC<CoinInfoCompProps>  = ({id, img, cap, description, token}) => {
    return (
        <div className='coinInfoContainer'>
            <Image className='coinImage' src={img} />
            <div className='infoContainer'>
            <Text>{id}</Text>
            <Text>{cap}</Text>
            <Text>{description}</Text>
            <Text>{token}</Text>
            <Text>fjnjdnvf</Text>
            <Text>fjnjdnvf</Text>
            </div>
        </div>
    )
};
