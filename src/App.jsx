import { useEffect, useState } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ToastProvider } from 'use-toast-mui';
import { Provider as EventBusProvider } from 'react-bus';

import Routes from 'routes';
import themes from 'themes';

import Loading from 'components/loading';
import useAuth from 'hooks/useAuth';
import LoginView from 'views/login';
import AuthContext from 'utils/authContext';

const App = () => {
  const auth = useAuth();

  const [ content, setContent ] = useState(null);

  useEffect(() => {
    if (!auth.isLoading) {
      if (auth.isAuthenticated) {

        setContent(<Routes />);
      } else {
        setContent(<LoginView />);
      }
    }
  }, [auth.isLoading, auth.isAuthenticated]);

  return (
    <StyledEngineProvider injectFirst>
      <ToastProvider>
        <ThemeProvider theme={themes()}>
          <CssBaseline />
          <Loading isLoading={auth.isLoading} />
          <AuthContext.Provider value={auth}>
            <EventBusProvider>
              {content}
            </EventBusProvider>
          </AuthContext.Provider>
        </ThemeProvider>
      </ToastProvider>
    </StyledEngineProvider>
  );
};

export default App;
