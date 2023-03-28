import { useEffect, useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken as getCurrentToken } from 'firebase/messaging';

const useFirebase = () => {
  const [ firebase, setFirebase ] = useState(null);
  const [ messaging, setMessaging ] = useState(null);

  useEffect(() => {
    const app = initializeApp({
      apiKey: 'AIzaSyDJRR1Aq82-rvaT5untfF5zigEtl95OIzw',
      authDomain: 'edgecomicsru.firebaseapp.com',
      projectId: 'edgecomicsru',
      messagingSenderId: '935662148500',
      appId: '1:935662148500:web:d3a51cd664a58392',
    });

    setFirebase(app);
    setMessaging(getMessaging(app));
  }, []);

  const getToken = () => getCurrentToken(messaging);

  return {
    app: firebase,
    messaging,
    getToken,
  }
};

export default useFirebase;
