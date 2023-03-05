import { Typography } from '@mui/material';

const ItemDescription = ({ item }) => (
  item.description
    ? <Typography color="inherit" sx={{ textAlign: 'justify' }}>{item.description}</Typography>
    : <Typography sx={{ color: '#7a66b9' }}>Описание отсутствует</Typography>
);

export default ItemDescription;
