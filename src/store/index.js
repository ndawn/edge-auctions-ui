import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/api';
import tokenReducer from './slices/token';

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    token: tokenReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});
