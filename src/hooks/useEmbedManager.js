import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useEmbedManager = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.parent !== window) {
      const observer = new ResizeObserver((entries) => {
        const bounds = entries[0].target.getBoundingClientRect();
        const height = bounds.top * 2 + bounds.height;
        window.parent.postMessage({ type: 'height', value: height }, 'https://edgecomics.ru');
      });

      observer.observe(document.body);
    }
  }, []);

  useEffect(() => {
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'location', value: location.pathname }, 'https://edgecomics.ru');
    }
  }, [location]);

  const returnResponseMessage = (eventType, resolve) => {
    const returnResponseMessageHandler = (event) => {
      if (event.source !== window.parent || event.data?.type !== eventType) {
        return;
      }

      window.removeEventListener('message', returnResponseMessageHandler);
      return resolve(event.data?.payload ?? null);
    };

    return returnResponseMessageHandler;
  };

  const message = (eventType) => (payload = {}) => (
    new Promise((resolve) => {
      window.addEventListener('message', returnResponseMessage(`auctions:${eventType}Result`, resolve));
      window.parent.postMessage({ type: `auctions:${eventType}`, payload }, 'https://edgecomics.ru');
    })
  );

  const pushHandler = (callback) => (event) => {
    if (event.data.type === 'push') {
      callback(event);
    }
  };

  const subscribeOnServiceWorkerMessages = (messageHandler) => {
    window.addEventListener('message', pushHandler(messageHandler));
  };

  const unsubscribeFromServiceWorkerMessages = (messageHandler) => {
    window.removeEventListener('message', pushHandler(messageHandler));
  };

  return {
    requestPermission: message('requestPermission'),
    subscribeOnServiceWorkerMessages,
    unsubscribeFromServiceWorkerMessages,
  };
};

export default useEmbedManager;
