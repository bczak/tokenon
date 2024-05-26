import {type FC, useCallback, useState} from 'react';
import './TradeFormComp.scss';
import {Button, Image, Input, Section, SegmentedControl, Subheadline, Text} from '@telegram-apps/telegram-ui';
import {ETradeFromControl} from './TradeFormComp.types';
import tonSvg from '/src/assets/icons/ton.svg';
import {ITokenInfo} from "@/pages/board/BoardPage.types.tsx";
import {toNano} from "@ton/core";
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {client} from "@/api/client.ts";
import {useQuery} from "@tanstack/react-query";
import {getJettonBalance} from "@/api";
import {prepareBuy, prepareSell} from "@/pages/coin/utils.ts";

export const TradeFormComp: FC<ITokenInfo> = (data) => {
	const [inputValue, setInputValue] = useState('');
	const [tonConnect] = useTonConnectUI()
	const wallet = useTonWallet()
	const [activeSegmentTradeFormControl, setActiveSegmentTradeFormControl] = useState<ETradeFromControl>(ETradeFromControl.BUY)
	
	const {data: balance = 0n} = useQuery({
		queryKey: ['balance', data.address, wallet?.account.address],
		queryFn: () => getJettonBalance(data.address, wallet!.account.address!)
	})
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
			const myTransaction = {
				validUntil: Math.floor(Date.now() / 1000) + 360,
				messages: [
					{
						address: data.curve,
						amount: toNano(Number(inputValue) + 0.3).toString(),
						payload: prepareBuy(Number(inputValue) * 100) // payload with comment in body
					}
				]
			}
			try {
				await tonConnect.sendTransaction(myTransaction, {modals: 'all'})
			} catch (e) {
				alert("Error happened, please try again")
			}
		} else {
			const holders = await client.jettons.getJettonHolders(data.address);
			const w = holders.addresses.filter((item) => item.owner.address === wallet?.account.address)[0].address
			const myTransaction = {
				validUntil: Math.floor(Date.now() / 1000) + 360,
				messages: [
					{
						address: w,
						amount: toNano(0.2).toString(),
						payload: prepareSell(inputValue, data.curve) // payload with comment in body
					}
				]
			}
			try {
				await tonConnect.sendTransaction(myTransaction, {modals: 'all'})
			} catch (e) {
				alert("Error happened, please try again")
			}
		}
	}
	
	const coinName = data.name
	const coinImg = data.image
	
	const tonDiv = <div className='inputAfterContainer'><Text>TON</Text><Image className='tonCoinImg' src={tonSvg}/></div>
	const coinDiv = <div className='inputAfterContainer'><Text>{coinName}</Text><Image className='coinImg' src={coinImg}/></div>
	return (
		<div className='tradeFormContainer'>
			<Subheadline style={{'padding': '0px 8px'}}>My balance: {(Number(balance) / 1000000000).toFixed(2)} {coinName} </Subheadline>
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
				{activeSegmentTradeFormControl === ETradeFromControl.BUY &&
					<Subheadline style={{textAlign: 'center', padding: '4px'}}>{inputValue} TON = {(Number(inputValue) || 0) * 100} {coinName}</Subheadline>}
				{activeSegmentTradeFormControl === ETradeFromControl.SELL &&
					<Subheadline style={{textAlign: 'center', padding: '4px'}}>{inputValue} {coinName} = {(Number(inputValue) || 0) / 100} TON</Subheadline>}
				<Button onClick={handleTransaction} className='tradeFormButton'>Execute transaction</Button>
			</Section>
		</div>
	)
};
