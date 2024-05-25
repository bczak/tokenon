import React from 'react';
import './ChartComp.scss'
import { Text, Card } from '@telegram-apps/telegram-ui';
import chartImage from '../../assets/images/chart.jpeg'
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';


// import chartImg from 
// interface ChartCompCompProps {
// }

export const ChartComp: React.FC = () => {
  const coinName = 'UserCoin'
  const creator = 'Arina'

  return (
    <Card className='cardContainer'>
  <React.Fragment key=".0">
  <div className='chartContainer'>
  <CardCell
      readOnly
      subtitle={<Text>+0.05%</Text>}
    >
      {coinName}
    </CardCell>
    <CardChip  readOnly>
     Created by: {creator}
    </CardChip>
    <img
      alt="chart"
      src={chartImage}
      className='chartImage'
    />
    </div>
  </React.Fragment>
</Card>
  );
};
