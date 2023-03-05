import { Grid } from '@mui/material';

import AuctionCard from 'components/auctions/AuctionCard';

const AuctionsGrid = ({ auctions, noMargin = false }) => (
  <Grid container spacing={4} sx={{ marginTop: noMargin ? '0' : '48px', paddingBottom: '48px' }}>
    {auctions.map((auction) => (
      <Grid key={auction.id} item xs={6} md={4} lg={3}>
        <AuctionCard auction={auction} />
      </Grid>
    ))}
  </Grid>
);

export default AuctionsGrid;
