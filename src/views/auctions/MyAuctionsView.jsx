import { useState } from 'react';

import { Badge, Box, Button, ButtonGroup } from '@mui/material';

import { useGetWonAuctionsQuery } from 'store/slices/api';
import BaseContainer from 'components/BaseContainer';
import OwnAuctionsView from 'views/auctions/OwnAuctionsView';
import WonAuctionsView from 'views/auctions/WonAuctionsView';

const leftButtonSX = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
};

const rightButtonSX = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
};

const MyAuctionsView = () => {
  const { data: packs } = useGetWonAuctionsQuery();

  const [ tab, setTab ] = useState('own');

  return (
    <BaseContainer title="Мои аукционы">
      <Box sx={{ margin: '24px 0', textAlign: 'center' }}>
        <ButtonGroup>
          <Button
            variant={tab === 'own' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setTab('own')}
            sx={leftButtonSX}
          >Аукционы с моим участием</Button>
          <Badge color="error" variant="dot" invisible={!packs || packs.length === 0}>
            <Button
              variant={tab === 'won' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setTab('won')}
              sx={rightButtonSX}
            >Выигранные аукционы</Button>
          </Badge>
        </ButtonGroup>
      </Box>
      {tab === 'own' && <OwnAuctionsView />}
      {tab === 'won' && <WonAuctionsView />}
    </BaseContainer>
  );
};

export default MyAuctionsView;
