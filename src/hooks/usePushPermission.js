import { useContext, useEffect, useState } from 'react';

import { useSubscribeToPushMutation } from 'store/slices/api';
import EmbedManagerContext from 'utils/embedManagerContext';
import { FirebaseContext } from 'layout/base/FirebaseContext';

const usePushPermission = () => {
  const [ subscribeToPush ] = useSubscribeToPushMutation();

  const embedManager = useContext(EmbedManagerContext);
  const firebase = useContext(FirebaseContext);

  const [ hasPermission, setHasPermission ] = useState(false);

  useEffect(() => {
    subscribe();
  }, []);

  const requestPermission = async () => {
    let token;

    if (window.parent !== window) {
      token = await embedManager.requestPermission();
    } else {
      const permissionState = await Notification.requestPermission();

      if (permissionState === 'granted') {
        token = await firebase.getToken();
        console.log(token);
      }
    }

    setHasPermission(token !== undefined);

    return token;
  };

  const subscribe = async () => {
    const token = await requestPermission();

    if (token) {
      await subscribeToPush(token).unwrap();
    } else {
      console.error('Push permission denied');
    }
  };

  return hasPermission;
};

export default usePushPermission;
