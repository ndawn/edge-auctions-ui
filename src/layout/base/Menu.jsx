import { Link } from 'react-router-dom';

import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import Login from './Login';

const MenuContainer = styled('nav')({
  padding: 24,
  paddingRight: 0,
  height: '100%',
});

const MenuEntry = styled(Button)({
  margin: '0 24px',
  padding: 24,
  color: 'white',
  height: '100%',

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.04)'
  },
});

const Menu = ({ orientation = 'horizontal' }) => {
  return (
    <MenuContainer>
      <MenuEntry>
        <Link to="/my" style={{ color: 'inherit', textDecoration: 'none' }}>Мои аукционы</Link>
      </MenuEntry>
      <Login />
    </MenuContainer>
  );
};

export default Menu;
