import { useContext, useRef } from 'react';

import { Avatar, Chip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';

import AuthContext from 'utils/authContext';

const Login = () => {
  const theme = useTheme();
  const auth = useContext(AuthContext);

  const anchorRef = useRef(null);

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <Chip
      sx={{
        height: '100%',
        alignItems: 'center',
        borderRadius: '27px',
        borderColor: 'transparent',
        transition: 'all .2s ease-in-out',
        backgroundColor: 'white',
        '&:hover': {
          borderColor: theme.palette.primary.light,
          background: `${theme.palette.primary.light}!important`,
          color: theme.palette.primary.main,
        },
        '& .MuiChip-label': {
          lineHeight: 0
        },
        '&& .MuiTouchRipple-child': {
          backgroundColor: 'white',
        }
      }}
      icon={
        <Avatar
          src={auth.user?.picture}
          sx={{
            ...theme.typography.mediumAvatar,
            margin: '8px 0 8px 8px !important',
            cursor: 'pointer'
          }}
          ref={anchorRef}
          color="inherit"
        />
      }
      variant="outlined"
      label={<LogoutIcon stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
      ref={anchorRef}
      onClick={handleLogout}
      color="primary"
    />
  );
};

export default Login;
