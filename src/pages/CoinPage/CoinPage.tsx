import type { FC } from 'react';
import { Button, List } from '@telegram-apps/telegram-ui';

export const CoinPage: FC = () => {

  return (
    <List>
      <Button
        onClick={() => {
          alert('Hello, Telegram Mini Apps!');
        }}
        >
          Click me
        </Button>
    </List>
  );
};
