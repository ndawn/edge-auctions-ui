import { Link } from 'react-router-dom';

import { Container } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import Logo from './Logo';
import Menu from './Menu';

import logo from 'assets/logo_outlined.png';

const StyledHeader = styled('header')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  width: '100%',
  height: 96,
  borderBottom: '1px solid #29233e',
  backgroundColor: 'rgba(27, 22, 43, 0.7)',
  backdropFilter: 'blur(8px)',
  zIndex: 100,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  height: '100%',
}));

const Header = () => {
  const theme = useTheme();

  return (
    <StyledHeader theme={theme}>
      <StyledContainer>
        <Link to="/">
          <Logo src={logo} />
        </Link>
        <Menu />
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
