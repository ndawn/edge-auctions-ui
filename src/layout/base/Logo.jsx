import { styled, useTheme } from '@mui/material/styles';

const StyledImg = styled('img')({
  objectFit: 'contain',
  padding: 24,
  paddingLeft: 0,
  boxSizing: 'border-box',
  height: '100%',
});

const Logo = ({ src }) => (
  <StyledImg src={src} />
);

export default Logo;
