import {useCallback, useState, type FC} from 'react';
import './TradeFormComp.scss';
import {Button, Input, Section, SegmentedControl, Image, Text, Subheadline} from '@telegram-apps/telegram-ui';
import {ETradeFromControl} from './TradeFormComp.types';
import tonSvg from '/src/assets/icons/ton.svg';
import {ITokenInfo} from "@/pages/board/BoardPage.types.tsx";
import {toNano} from "@ton/core";
import {prepareBuy} from "@/pages/CoinPage/utils.ts";

export const TradeFormComp: FC<ITokenInfo> = (data) => {
	const [inputValue, setInputValue] = useState('');

	const [activeSegmentTradeFormControl, setActiveSegmentTradeFormControl] = useState<ETradeFromControl>(ETradeFromControl.BUY)

	const handleSegmentTradeFormControlChange = useCallback((segment: ETradeFromControl) => {
		setActiveSegmentTradeFormControl(segment)
	}, [setActiveSegmentTradeFormControl])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		if (/^\d*\.?\d*$/.test(newValue)) {
			setInputValue(newValue);
		}
	}

	const handleTransaction = async () => {
		if (activeSegmentTradeFormControl === ETradeFromControl.BUY) {
			alert(`Buy ${inputValue}`);
			const myTransaction = {
				validUntil: Math.floor(Date.now() / 1000) + 360,
				messages: [
					{
						address: data.curve,
						amount: toNano(Number(inputValue) + 0.3).toString(),
						payload: prepareBuy(Number(inputValue)) // payload with comment in body
					}
				]
			}
			alert(myTransaction)
		} else {
			alert(`Sell ${inputValue}`);
		}
	}

	const coinName = data.name
	const coinImg = data.image

	const tonDiv = <div className='inputAfterContainer'><Text>TON</Text><Image className='tonCoinImg' src={tonSvg}/></div>
	const coinDiv = <div className='inputAfterContainer'><Text>{coinName}</Text><Image className='coinImg' src={coinImg}/></div>

	return (
		<div className='tradeFormContainer'>
			<Section className="tradeFormSection">
				<SegmentedControl className='segment'>
					<SegmentedControl.Item
						className={activeSegmentTradeFormControl === ETradeFromControl.BUY ? 'activeBuy' : ''}
						selected={activeSegmentTradeFormControl === ETradeFromControl.BUY}
						onClick={() => handleSegmentTradeFormControlChange(ETradeFromControl.BUY)}
					>
						Buy
					</SegmentedControl.Item>
					<SegmentedControl.Item
						className={activeSegmentTradeFormControl === ETradeFromControl.SELL ? 'activeSell' : ''}
						selected={activeSegmentTradeFormControl === ETradeFromControl.SELL}
						onClick={() => handleSegmentTradeFormControlChange(ETradeFromControl.SELL)}
					>
						Sell
					</SegmentedControl.Item>
				</SegmentedControl>
				<Input inputMode="decimal" pattern="^\d*\.?\d*$" className='tradeFormInput' header="Input" placeholder="0.0" value={inputValue} onChange={handleInputChange}
				       after={activeSegmentTradeFormControl === ETradeFromControl.BUY ? tonDiv : coinDiv}/>
				<Subheadline style={{textAlign: 'center', padding: '4px'}}>{inputValue} TON = {(Number(inputValue) || 0) * 100} {coinName}</Subheadline>
				<Button onClick={handleTransaction} className='tradeFormButton'>Execute transaction</Button>
			</Section>
		</div>
	)
};
