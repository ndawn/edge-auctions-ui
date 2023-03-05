import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import auth0 from 'auth0-js';

import { setAccessToken as storeAccessToken } from 'store/slices/token';
import config from 'config';

const useAuth = () => {
  const dispatch = useDispatch();

  const [ isLoading, setIsLoading ] = useState(true);
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  const [ accessToken, setAccessToken ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ error, setError ] = useState(null);

  const auth0Client = new auth0.WebAuth({
    domain: config.auth0Domain,
    clientID: config.auth0ClientId,
    redirectUri: window.location.origin,
    audience: config.auth0Audience,
    scope: config.auth0Scope,
    responseType: 'id_token token',
  });

  const verifyTokenPermissions = async (token) => {
    const response = await fetch(
      `${config.baseUrl}/auth/me`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (response.status >= 400) {
      console.error(`HTTP Error: ${response.status}`, response);
      if (response.status === 401) {
        setError('Доступ запрещен');
      } else {
        setError('Ошибка авторизации');
      }
      return;
    }

    setIsAuthenticated(true);
  };

  const extractLoginData = () => {
    if (window.location.search !== '') {
      return Object.fromEntries(new URLSearchParams(window.location.search).entries());
    }

    return JSON.parse(localStorage.getItem('auctionsAuthData') ?? '{}');
  };

  const login = async () => {
    const body = extractLoginData();

    const response = await fetch(
      `${config.baseUrl}/auth/login/shop`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );

    if (response.status >= 400) {
      console.error(`HTTP Error: ${response.status}`, response);

      if (response.status === 401) {
        setError('Доступ запрещен');
      } else {
        setError('Ошибка авторизации');
      }

      setIsLoading(false);
      return;
    }

    const data = await response.json();

    dispatch(storeAccessToken(data.accessToken));
    setAccessToken(data.accessToken);

    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const processHash = async (err, decodedHash) => {
    history.pushState('', document.title, location.pathname + location.search);

    if (err) {
      setError(err.description);
      setIsLoading(false);
      return;
    }

    dispatch(storeAccessToken(decodedHash.accessToken));

    setAccessToken(decodedHash.accessToken);
    setUser(decodedHash.idTokenPayload);

    await verifyTokenPermissions(decodedHash.accessToken);
    setIsLoading(false);
  };

  const processCheckSession = async (err, result) => {
    if (err) {
      setError(err.description);
      setIsLoading(false);
      return;
    }

    dispatch(storeAccessToken(result.accessToken));
    setUser(result.idTokenPayload);

    await verifyTokenPermissions(result.accessToken);
    setIsLoading(false);
  };

  useEffect(() => {
    if (window.parent !== window) {
      login();
    } else {
      if (location.hash === '') {
        auth0Client.checkSession({}, processCheckSession);
        return;
      }
  
      auth0Client.parseHash(processHash);
    }
  }, []);

  const logout = () => {
    if (window.parent === window) {
      auth0Client.logout({ returnTo: window.location.origin });
    }
  };

  return {
    isLoading,
    isAuthenticated,
    error,
    accessToken,
    user,
    login,
    logout,
  };
};

export default useAuth;
