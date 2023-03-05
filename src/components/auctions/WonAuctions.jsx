import { Link } from 'react-router-dom';

import { Box, Button, Grid, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import pluralize from 'pluralize-ru';

import AuctionsGrid from 'components/auctions/AuctionsGrid';
import { getSetName, getTotal } from 'utils/auctions';

const WonAuctions = ({ packs }) => (
  <Grid container spacing={4} sx={{ marginTop: '48px', paddingBottom: '48px' }}>
    {packs.map((pack, index) => (
      <Grid key={index} item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h2" color="dark.light">{getSetName(pack.set)}</Typography>
            <Typography sx={{ color: '#7a66b9' }}>
              {pack.auctions.length} {pluralize(pack.auctions.length, 'аукционов', 'аукцион', 'аукциона', 'аукционов')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '32px' }}>
            <Box>
              <Typography sx={{ marginBottom: '4px', color: '#7a66b9' }}>Сумма к оплате</Typography>
              <Typography align="right" variant="h2" sx={{ color: 'white' }}>{getTotal(pack.auctions)} ₽</Typography>
            </Box>
            <Button variant="contained" size="large">
              <Link to={pack.auctions[0].invoiceLink} target="_blank" style={{ color: 'inherit', textDecoration: 'none' }}>
                Оплатить <LaunchIcon fontSize="inherit" sx={{ verticalAlign: 'middle' }} />
              </Link>
            </Button>
          </Box>
        </Box>
        <AuctionsGrid auctions={pack.auctions} noMargin />
      </Grid>
    ))}
  </Grid>
);

export default WonAuctions;
