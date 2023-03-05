import { Box, Skeleton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const AuctionViewSkeleton = () => (
  <Grid container spacing={4}>
    <Grid item xs={12} md={4}>
      <Skeleton variant="rounded" sx={{ width: '100%', height: '500px' }} />
      <Box sx={{ display: 'flex', alignItems: 'stretch', gap: '8px', marginTop: '8px', height: '56px' }}>
        {[...Array(5).keys()].map((index) =>
          <Skeleton key={index} variant="rounded" sx={{ flexBasis: '20%', height: '100%' }} />
        )}
      </Box>
    </Grid>
    <Grid item xs={12} md={8}>
      <Skeleton variant="rounded" height="32px" sx={{ marginBottom: '24px', height: '32px' }} />
      <Skeleton variant="text" width="50%" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="50%" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="50%" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="25%" sx={{ marginTop: '16px' }} />
      <Box sx={{ display: 'flex', gap: '8px', marginTop: '24px', height: '56px' }}>
        <Skeleton variant="rounded" width="50%" height="100%" />
        <Skeleton variant="rounded" width="50%" height="100%" />
      </Box>
    </Grid>
  </Grid>
);

export default AuctionViewSkeleton;
