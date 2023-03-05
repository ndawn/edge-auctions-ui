import { useContext, useEffect, useState } from 'react';

import { useGetPublicKeyQuery, useSubscribeToPushMutation } from 'store/slices/api';
import ServiceWorkerContext from 'utils/serviceWorkerContext';
import urlBase64ToUint8Array from 'utils/urlBase64ToUint8Array';
import EmbedManagerContext from 'utils/embedManagerContext';

const usePushPermission = () => {
  const { data: publicKey, isLoading } = useGetPublicKeyQuery();
  const [ subscribeToPush, subscribeToPushResult ] = useSubscribeToPushMutation();

  const serviceWorker = useContext(ServiceWorkerContext);
  const embedManager = useContext(EmbedManagerContext);

  const [ permissionState, setPermissionState ] = useState(null);

  useEffect(() => {
    if (!isLoading && publicKey && serviceWorker) {
      const key = urlBase64ToUint8Array(publicKey.key);
      requestPermission(key).then((state) => subscribe(key));
    }
  }, [serviceWorker, isLoading, publicKey]);

  const requestPermission = async (serverPublicKey) => {
    let state;

    if (window.parent !== window) {
      state = await embedManager.requestPermission({
        userVisibleOnly: true,
        applicationServerKey: serverPublicKey,
      });
    } else {
      state = await serviceWorker.pushManager.permissionState({
        userVisibleOnly: true,
        applicationServerKey: serverPublicKey,
      });

      if (state === 'prompt') {
        state = await Notification.requestPermission();
      }
    }

    setPermissionState(state);
  };

  const subscribe = async (serverPublicKey) => {
    let subscription;

    if (embedManager.isEmbedded) {
      subscription = await embedManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: serverPublicKey,
      });
    } else {
      subscription = await serviceWorker.pushManager.getSubscription({
        userVisibleOnly: true,
        applicationServerKey: serverPublicKey,
      });

      if (subscription !== null) {
        await subscribeToPush(subscription).unwrap();
        return;
      }

      subscription = await pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: serverPublicKey,
      });
    }

    console.log(subscription);
    await subscribeToPush(subscription).unwrap();
  };

  // const unsubscribe = async () => {
  //   if (pushSubscription !== null) {
  //     await pushSubscription.unsubscribe();
  //     setPushSubscription(null);
  //   }
  // };

  return permissionState;
};

export default usePushPermission;
