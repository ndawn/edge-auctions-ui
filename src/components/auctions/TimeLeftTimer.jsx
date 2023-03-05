import { useMemo } from 'react';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Countdown from 'react-countdown';
import pluralize from 'pluralize-ru';

import dayjs from 'utils/dayjs';

const TimerContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  gap: '1px',
});

const TimerPartContainer = styled(Box)({
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '8px',
  gap: '1px',
});

const TimerPart = styled(Box)({
  padding: '4px 10px',
  width: '2em',
  fontSize: '1.1em',
  color: 'white',
  backgroundColor: '#241d3a',
});

const TimerSeparator = styled(TimerPart)({
  color: '#6a56a9',
  textAlign: 'center',
  backgroundColor: 'unset',
});

const TimeLeftTimer = ({ auction, onCompleted, sx }) => {
  const daysLeft = (days) => pluralize(days, 'дней', 'день', 'дня', 'дней');

  const dateDue = useMemo(() => +dayjs(auction.dateDue), [auction]);

  const timerRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      console.log('completed');
      setTimeout(() => onCompleted?.(), 3000);
      return <Typography sx={{ color: '#7a66b9', marginBottom: '8px' }}>Аукцион завершен</Typography>;
    }

    return (
      <Box sx={sx}>
        <Typography sx={{ color: '#7a66b9', marginBottom: '8px' }}>Аукцион завершится через</Typography>
        <TimerContainer>
          <TimerPartContainer>
            <TimerPart sx={{ width: 'unset' }}>{days} {daysLeft(days)}</TimerPart>
          </TimerPartContainer>
          <TimerSeparator>:</TimerSeparator>
          <TimerPartContainer>
            <TimerPart>{Math.floor(hours / 10)}</TimerPart>
            <TimerPart>{hours % 10}</TimerPart>
          </TimerPartContainer>
          <TimerSeparator>:</TimerSeparator>
          <TimerPartContainer>
            <TimerPart>{Math.floor(minutes / 10)}</TimerPart>
            <TimerPart>{minutes % 10}</TimerPart>
          </TimerPartContainer>
          <TimerSeparator>:</TimerSeparator>
          <TimerPartContainer>
            <TimerPart>{Math.floor(seconds / 10)}</TimerPart>
            <TimerPart>{seconds % 10}</TimerPart>
          </TimerPartContainer>
        </TimerContainer>
      </Box>
    );
  };

  return dateDue ? <Countdown date={dateDue} renderer={timerRenderer} /> : null;
};

export default TimeLeftTimer;
