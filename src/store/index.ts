import { createContext, useContext } from 'react';
import breadcrumb from './Breadcrumb';
import comment from './Comment';
import counter from './Counter';

class RootStore {
  counter = counter;
  breadcrumb = breadcrumb;
  comment = comment;
}

const store = new RootStore();

const Context = createContext(store);

const useStore = () => {
  return useContext(Context);
};

export default useStore;
