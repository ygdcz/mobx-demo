import { createContext, useContext } from 'react';
import breadcrumb from './Breadcrumb';
import counter from './Counter';

class RootStore {
  counter = counter;
  breadcrumb = breadcrumb;
}

const store = new RootStore();

const Context = createContext(store);

const useStore = () => {
  return useContext(Context);
};

export default useStore;
