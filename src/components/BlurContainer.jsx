import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const BlurContainer = styled(Box)({
  display: 'inline-block',
  margin: 0,
  color: 'inherit !important',
  padding: '6px 10px',
  border: '1px solid rgba(27, 22, 43, 0.2)',
  borderRadius: '4px',
  backgroundColor: 'rgba(27, 22, 43, 0.7)',
  backdropFilter: 'blur(8px)',
});

export default BlurContainer;
