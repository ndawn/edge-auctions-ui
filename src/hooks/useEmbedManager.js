const useEmbedManager = () => {
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
    console.log(event);
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
