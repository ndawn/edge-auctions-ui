import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import PushPermissionContextProvider from './PushPermissionContextProvider';
import EventBusContextProvider from './EventBusContextProvider';
import { FirebaseProvider } from './FirebaseContext';
import useEmbedManager from 'hooks/useEmbedManager';
import EmbedManagerContext from 'utils/embedManagerContext';

const BaseLayout = () => {
  const embedManager = useEmbedManager();

  return (
    <EmbedManagerContext.Provider value={embedManager}>
      <FirebaseProvider>
        <PushPermissionContextProvider>
          <EventBusContextProvider>
            {window.parent !== window ? <Outlet /> : (
              <>
                <Sidebar />
                <Header />
                <Outlet />
                <Footer />
              </>
            )}
          </EventBusContextProvider>
        </PushPermissionContextProvider>
      </FirebaseProvider>
    </EmbedManagerContext.Provider>
  );
};

export default BaseLayout;
