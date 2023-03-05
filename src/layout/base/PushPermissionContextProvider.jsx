import usePushPermission from 'hooks/usePushPermission';
import PushPermissionContext from 'utils/pushPermissionContext';

const PushPermissionContextProvider = ({ children }) => {
  const pushPermission = usePushPermission();

  return (
    <PushPermissionContext.Provider value={pushPermission}>
      {children}
    </PushPermissionContext.Provider>
  )
};

export default PushPermissionContextProvider;
