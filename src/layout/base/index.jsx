import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import ServiceWorkerContextProvider from './ServiceWorkerContextProvider';
import PushPermissionContextProvider from './PushPermissionContextProvider';
import EventBusContextProvider from './EventBusContextProvider';
import useEmbedManager from 'hooks/useEmbedManager';
import EmbedManagerContext from 'utils/embedManagerContext';

const BaseLayout = () => {
  const embedManager = useEmbedManager();

  return (
    <EmbedManagerContext.Provider value={embedManager}>
      <ServiceWorkerContextProvider>
        <PushPermissionContextProvider>
          <EventBusContextProvider>
            {embedManager.isEmbedded ? <Outlet /> : (
              <>
                <Sidebar />
                <Header />
                <Outlet />
                <Footer />
              </>
            )}
          </EventBusContextProvider>
        </PushPermissionContextProvider>
      </ServiceWorkerContextProvider>
    </EmbedManagerContext.Provider>
  );
};

export default BaseLayout;
