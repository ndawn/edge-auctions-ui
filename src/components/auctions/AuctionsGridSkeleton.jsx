import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const AuctionsGridSkeleton = () => (
  <Grid container spacing={4} sx={{ marginTop: '48px' }}>
    {[...Array(12).keys()].map((index) => (
      <Grid key={index} item xs={6} md={4} lg={3}>
        <Skeleton
          variant="rounded"
          sx={{
            width: '100%',
            height: '400px',
          }}
        />
      </Grid>
    ))}
  </Grid>
);

export default AuctionsGridSkeleton;
