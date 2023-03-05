import { Box, Typography } from '@mui/material';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';

import ClampedText from 'components/ClampedText';

const BidValue = ({ auction, variant, withLabel = false, ...props }) => (
  <Box {...props}>
    {withLabel && auction.lastBidValue && <Typography sx={{ color: '#7a66b9', marginBottom: '8px' }}>Последняя ставка</Typography>}
    <ClampedText variant={variant}>
      <PaymentsOutlinedIcon
        sx={{
          marginRight: '8px',
          fontSize: '1em',
          verticalAlign: 'middle',
        }}
      />
      {auction.lastBidValue ? `${auction.lastBidValue} ₽` : 'Нет ставок'}
    </ClampedText>
  </Box>
);

export default BidValue;
