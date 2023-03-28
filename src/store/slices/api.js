import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from 'config';

const transformErrorResponse = (response, meta, arg) => {
  if (response?.status === 401) {
    window.location.reload();
    return;
  }

  return response;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().token.accessToken;

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    }
  }),
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => '/me',
      transformErrorResponse,
    }),
    getActiveSet: builder.query({
      query: () => '/auction_sets/active',
      transformErrorResponse,
    }),
    getActiveAuctions: builder.query({
      query: () => '/auctions',
      transformErrorResponse,
    }),
    getOwnAuctions: builder.query({
      query: () => '/auctions/my',
      transformErrorResponse,
    }),
    getWonAuctions: builder.query({
      query: () => '/auctions/won',
      transformErrorResponse,
    }),
    getAuction: builder.query({
      query: (auctionId) => `/auctions/${auctionId}/brief`,
      transformErrorResponse,
    }),
    createBid: builder.mutation({
      query: ({ auctionId, value }) => ({
        url: `/auctions/${auctionId}/bids`,
        method: 'POST',
        body: { value },
      }),
      transformErrorResponse,
    }),
    subscribeToPush: builder.mutation({
      query: (token) => ({
        url: '/push/subscribe',
        method: 'POST',
        body: { token },
      }),
      transformErrorResponse,
    }),
  })
});

export const {
  useGetMeQuery,
  useGetActiveSetQuery,
  useGetActiveAuctionsQuery,
  useGetOwnAuctionsQuery,
  useGetWonAuctionsQuery,
  useGetAuctionQuery,
  useCreateBidMutation,
  useSubscribeToPushMutation,
} = apiSlice;
