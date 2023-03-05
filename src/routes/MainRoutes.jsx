import { lazy } from 'react';

import BaseLayout from 'layout/base';
import Loadable from 'components/Loadable';

const ActiveView = Loadable(lazy(() => import('views/auctions/ActiveView')));
const MyAuctionsView = Loadable(lazy(() => import('views/auctions/MyAuctionsView')));
const AuctionView = Loadable(lazy(() => import('views/auctions/AuctionView')));

const MainRoutes = {
    path: '/',
    element: <BaseLayout />,
    children: [
        {
            path: '',
            element: <ActiveView />,
        },
        {
            path: 'my',
            element: <MyAuctionsView />,
        },
        {
            path: 'auctions/:auctionId',
            element: <AuctionView />,
        },
    ],
};

export default MainRoutes;
