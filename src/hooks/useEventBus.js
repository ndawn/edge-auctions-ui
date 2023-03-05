import { useContext, useEffect } from 'react';

import { useBus } from 'react-bus';

import EmbedManagerContext from 'utils/embedManagerContext';

const useEventBus = () => {
  const bus = useBus();
  const embedManager = useContext(EmbedManagerContext);

  const handleWorkerMessage = (event) => {
    console.log('[Event Bus] Received event:', event.data.data);
    const { type, auctionId, ...payload } = event.data.data;
    const key = `${type}:${auctionId}`;
    bus.emit(key, payload);
  };

  const subscribeOnServiceWorkerMessages = () => {
    if (window.parent !== window) {
      embedManager.subscribeOnServiceWorkerMessages(handleWorkerMessage);

      return () => {
        embedManager.unsubscribeFromServiceWorkerMessages(handleWorkerMessage);
      };
    } else {
      navigator.serviceWorker.addEventListener('message', handleWorkerMessage);

      return () => {
        navigator.serviceWorker.removeEventListener('message', handleWorkerMessage);
      };
    };
  };

  useEffect(subscribeOnServiceWorkerMessages, []);
};

export default useEventBus;
