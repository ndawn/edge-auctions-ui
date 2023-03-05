import useEventBus from 'hooks/useEventBus';

const EventBusContextProvider = ({ children }) => {
  useEventBus();

  return (
    <>
      {children}
    </>
  )
};

export default EventBusContextProvider;
