import { useCallback, useState, type FC } from 'react';
import './TradeFormComp.scss';
import { Button, Input, Section, SegmentedControl, Image, Text } from '@telegram-apps/telegram-ui';
import { ETradeFromControl } from './TradeFormComp.types';
import tonSvg from '/src/assets/icons/ton.svg';

interface TradeFormCompProps {
    id: number;
}

export const TradeFormComp: FC<TradeFormCompProps>  = ({id}) => {
    const [inputValue, setInputValue] = useState('');
    
    const [ activeSegmentTradeFormControl, setActiveSegmentTradeFormControl] = useState<ETradeFromControl>(ETradeFromControl.BUY)

    const handleSegmentTradeFormControlChange = useCallback((segment: ETradeFromControl) => {
      setActiveSegmentTradeFormControl(segment)
    }, [ setActiveSegmentTradeFormControl ])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d*\.?\d*$/.test(newValue)) {
            setInputValue(newValue);
        }
    };

    const coinName = 'UserCoin'
    const coinImg = 'coinImg'

    const tonDiv = <div className='inputAfterContainer'><Text>TON</Text><Image className='tonCoinImg' src={tonSvg}/></div>
    const coinDiv = <div className='inputAfterContainer'><Text>{coinName}</Text><Image className='coinImg' src={coinImg}/></div>

    return (
        <Section className="tradeFormSection" >
            <SegmentedControl className='segment'>
        <SegmentedControl.Item
        className={activeSegmentTradeFormControl === ETradeFromControl.BUY ? 'activeBuy' : ''}
          selected={ activeSegmentTradeFormControl === ETradeFromControl.BUY }
          onClick={ () => handleSegmentTradeFormControlChange(ETradeFromControl.BUY) }
        >
          Buy
        </SegmentedControl.Item>
        <SegmentedControl.Item
        className={activeSegmentTradeFormControl === ETradeFromControl.SELL ? 'activeSell' : ''}
           selected={ activeSegmentTradeFormControl === ETradeFromControl.SELL }
           onClick={ () => handleSegmentTradeFormControlChange(ETradeFromControl.SELL) }
         >
          Sell
        </SegmentedControl.Item>
      </SegmentedControl>
      <Input inputMode="decimal" pattern="^\d*\.?\d*$" className='tradeFormInput' header="Input" placeholder="0.0" value={inputValue} onChange={handleInputChange} after={activeSegmentTradeFormControl === ETradeFromControl.BUY ? tonDiv : coinDiv} />
      <Button className='tradeFormButton'>Execute transaction</Button>
        </Section>
    )
};
