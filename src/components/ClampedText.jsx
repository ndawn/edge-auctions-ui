import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ClampedText = styled(Typography)(({ maxRows = 1, fontSize }) => ({
  display: '-webkit-box',
  overflow: 'hidden',
  fontSize,
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: maxRows,
  color: 'inherit !important',
}));

export default ClampedText;
