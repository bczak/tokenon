import React, { useState } from 'react';
import './ChartComp.scss'
import { Text, Card, Accordion } from '@telegram-apps/telegram-ui';
import chartImage from '../../assets/images/chart.jpeg'
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';
import { AccordionContent } from '@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent';
import { AccordionSummary } from '@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary';

// import chartImg from 
// interface ChartCompCompProps {
// }

export const ChartComp: React.FC = () => {
  const coinName = 'UserCoin'
  const creator = 'Arina'

  const [expanded, setExpanded] = useState(false)

  const handleExpand = () => {
    setExpanded(!expanded)
  }


  return (
    <div className="chartComp">
      <Accordion
      expanded={expanded}
      onChange={handleExpand}>
        <AccordionSummary className='accordionSummary'>
          Graph
        </AccordionSummary>
        <AccordionContent className='accordionContent'>
          <Card className='cardContainer'>
          <React.Fragment key=".0">
          <div className='chartContainer'>
          <CardCell
          className='cardCell'
              readOnly
              subtitle={<Text style={{color: 'green'}}>+0.05%</Text>}
            >
              {coinName}
            </CardCell>
            <CardChip readOnly>
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
        </AccordionContent>
  </Accordion>
</div>
  );
};
