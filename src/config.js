const config = {
  basename: '',
  fontFamily: `'Inter', sans-serif`,
  borderRadius: 12,
  defaultAntiSniper: 10,
  bidValueLimit: 1000000,
  baseUrl: import.meta.env.VITE_BASE_URL,
  staticUrl: import.meta.env.VITE_STATIC_URL,
  auth0Domain: import.meta.env.VITE_AUTH0_DOMAIN,
  auth0ClientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  auth0Audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  auth0Scope: import.meta.env.VITE_AUTH0_SCOPE,
};

export default config;
