import { Image, Text, Subheadline, Cell } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { Link } from '@/components/Link/Link.tsx';
import './CoinCardComp.scss';

interface CoinCardCompProps {
	id: number;
	img: string;
	cap: bigint;
	description: string;
	token: string;
}

export const CoinCardComp: FC<CoinCardCompProps> = ({ img, cap, description, token}) => {
	return (
		<Link to={'/coin'}>
			{/* <Link to={`/coin${id}`}> */}
			<Cell
				className="coinCard"
				before={<Image src={`${img}`}/>}
				description={description}
				subhead={<>
					<Text className='capText'>Market cap: </Text>
					<Text className='capValue'>{Number(cap / 10n ** 9n).toLocaleString()}</Text>
				</>}
			>
				<Subheadline className='ticker'>{token}</Subheadline>
			</Cell>
		</Link>
	)
};
