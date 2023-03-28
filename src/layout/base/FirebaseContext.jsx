import useFirebase from 'hooks/useFirebase';
import { createContext } from 'react';

export const FirebaseContext = createContext(null);
export const FirebaseProvider = ({ children }) => {
  const firebase = useFirebase();

  return <FirebaseContext.Provider value={firebase}>{children}</FirebaseContext.Provider>;
};
