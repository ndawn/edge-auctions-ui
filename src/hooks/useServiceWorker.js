import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import EmbedManagerContext from 'utils/embedManagerContext';

const useServiceWorker = () => {
  const [ serviceWorker, setServiceWorker ] = useState(null);
  const accessToken = useSelector((state) => state.token.accessToken);
  const embedManager = useContext(EmbedManagerContext);

  useEffect(() => {
    register();
  }, []);

  const register = async () => {
    let registration;

    if (window.parent !== window) {
      registration = await embedManager.registerServiceWorker({ url: '/auctions_sw.js', accessToken });
      setServiceWorker(registration);
      return;
    }

    registration = await navigator.serviceWorker.getRegistration('/auctions_sw.js');

    if (registration !== undefined) {
      await registration.update();
    } else {
      registration = await navigator.serviceWorker.register('/auctions_sw.js');
    }

    let serviceWorker_;

    for (let state of ['installing', 'waiting', 'active']) {
      if (registration[state]) {
        serviceWorker_ = registration[state];
      }
    }

    if (serviceWorker_) {
      serviceWorker_.postMessage({ type: 'accessToken', payload: accessToken });
    }

    setServiceWorker(registration);
  };

  return serviceWorker;
};

export default useServiceWorker;
