import useServiceWorker from 'hooks/useServiceWorker';
import ServiceWorkerContext from 'utils/serviceWorkerContext';


const ServiceWorkerContextProvider = ({ children }) => {
  const serviceWorker = useServiceWorker();

  return (
    <ServiceWorkerContext.Provider value={serviceWorker}>
      {children}
    </ServiceWorkerContext.Provider>
  )
};

export default ServiceWorkerContextProvider;
