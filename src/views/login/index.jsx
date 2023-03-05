import { useContext, useEffect, useState } from 'react';

import { Alert, Button, Container, Paper, Snackbar, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import AuthContext from 'utils/authContext';

import logo from 'assets/logo_outlined.png';

const LoginView = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.error && auth.error !== 'Login required') {
      setIsSnackbarOpen(true);
    }
  }, [auth.error]);

  return (
    <Container sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '350px',
          padding: '32px',
          boxSizing: 'border-box',
          border: 'none',
          color: '#ffffff',
          background: 'none',
        }}
      >
        <Typography variant="h1" color="inherit" sx={{ marginBottom: '16px', fontSize: '6em' }}>Трунь</Typography>
        <Typography color="inherit">Ошибка авторизации</Typography>
      </Paper>
    </Container>
  );

  // return (
  //     <Container sx={{
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         height: '100vh',
  //     }}>
  //         <Snackbar
  //             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //             open={isSnackbarOpen}
  //             autoHideDuration={5000}
  //             onClose={() => setIsSnackbarOpen(false)}
  //         >
  //             <Alert onClose={() => setIsSnackbarOpen(false)} severity="error">{auth.error}</Alert>
  //         </Snackbar>
  //         <Paper
  //             variant="outlined"
  //             sx={{
  //                 display: 'flex',
  //                 flexDirection: 'column',
  //                 width: '350px',
  //                 padding: '32px',
  //                 boxSizing: 'border-box',
  //                 background: 'none',
  //             }}
  //         >
  //             <img src={logo} style={{ width: '100%', marginBottom: '24px' }} />
  //             <Button
  //                 color="grey"
  //                 size="large"
  //                 variant="outlined"
  //                 disableElevation
  //                 startIcon={<LoginIcon />}
  //                 onClick={auth.login}
  //             >Авторизация</Button>
  //         </Paper>
  //     </Container>
  // );
};

export default LoginView;
