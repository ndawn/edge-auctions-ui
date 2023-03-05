import { useEffect, useState } from 'react';

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import { getTimeLeft } from 'utils/auctions';
import ClampedText from 'components/ClampedText';

const TimeLeft = ({ auction, variant }) => {
  const [ timeLeft, setTimeLeft ] = useState('');
  const [ isEnded, setIsEnded ] = useState(auction.endedAt !== null);
  const [ tlInterval, setTLInterval ] = useState(null);

  const calculateTimeLeft = (dateDue) => {
    const newTimeLeft = getTimeLeft(dateDue);

    setTimeLeft(newTimeLeft);
    setIsEnded(auction.endedAt !== null || newTimeLeft.startsWith('-'));
  };

  useEffect(() => {
    if (tlInterval) {
      clearInterval(tlInterval);
      setTLInterval(null);
    }

    calculateTimeLeft(auction.dateDue);

    setTLInterval(
      setInterval(() => {
        calculateTimeLeft(auction.dateDue);
      }, 1000)
    );

    return () => {
      clearInterval(tlInterval);
      setTLInterval(null);
    };
  }, [auction]);

  useEffect(() => {
    if (isEnded && tlInterval) {
      clearInterval(tlInterval);
      setTLInterval(null);
    }
  }, [isEnded]);

  return (
    <ClampedText variant={variant}>
      <AccessTimeOutlinedIcon
        sx={{
          marginRight: '4px',
          fontSize: '1em',
          verticalAlign: 'middle',
        }}
      />
      {isEnded ? 'Завершен' : timeLeft}
    </ClampedText>
  );
};

export default TimeLeft;
