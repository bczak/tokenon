import { Image, Text, Subheadline, Cell } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { Link } from '@/components/Link/Link.tsx';
import './CoinCardComp.scss';
import { useThemeParams } from '@tma.js/sdk-react';

interface CoinCardCompProps {
    id: number;
    img: string;
    cap: string;
    description: string;
    token: string;
}

export const CoinCardComp: FC<CoinCardCompProps>  = ({id, img, cap, description, token}) => {
    const themeParams = useThemeParams();

    return (
        <Link to={'/coin'}>
        {/* <Link to={`/coin${id}`}> */}
        <Cell
        style={{backgroundColor: themeParams.sectionBgColor}} 
        className="coinCard"
      before={<Image src={`${img}`} />}
      description={description}
      subhead={<>
        <Text className='capText'>Market cap: </Text>
        <Text style={{color: `${themeParams.buttonColor}`}} className='capValue'>{cap}</Text>
      </>}
    >
       <Subheadline style={{color: `${themeParams.textColor}`}} className='ticker'>{token}</Subheadline>
    </Cell>
    </Link>
    )
};
