import { styled } from '@mui/material/styles';

const Thumb = styled('img')({
  display: 'inline-block',
  objectFit: 'cover',
  marginRight: '8px',
  width: '56px',
  height: '56px',
  border: '1px solid #59536e',
  borderRadius: '8px',
  cursor: 'pointer',

  '&:hover': {
    borderColor: '#a9a3be'
  },
});

export default Thumb;
