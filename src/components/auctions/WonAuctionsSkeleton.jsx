import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const WonAuctionsSkeleton = () => (
  <Grid container spacing={4} sx={{ marginTop: '48px' }}>
    {[...Array(8).keys()].map((index) => (
      <Grid key={index} item xs={12}>
        <Skeleton
          variant="rounded"
          sx={{
            width: '100%',
            height: '200px',
          }}
        />
      </Grid>
    ))}
  </Grid>
);

export default WonAuctionsSkeleton;
