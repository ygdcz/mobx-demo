import { createContext, useContext } from 'react';
import counter from './Counter';

class RootStore {
  counter = counter;
}

const store = new RootStore();

const Context = createContext(store);

const useStore = () => {
  return useContext(Context);
};

export default useStore;
