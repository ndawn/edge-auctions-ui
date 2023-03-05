import { Box, Typography } from '@mui/material';

const NoAuctions = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 0,
      minHeight: '500px',
      color: 'white',
      textAlign: 'center',
    }}
  >
    <Typography variant="h1" sx={{ color: '#605c6b', fontSize: '5em' }}>Трунь</Typography>
    <Typography
      sx={{ margin: '48px 0' }}
    >Кажется, тут сейчас ничего нет. Но не переживай,<br />скоро всё обязательно будет!</Typography>
  </Box>
);

export default NoAuctions;
