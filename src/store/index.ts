import { createContext, useContext } from 'react';
import breadcrumb from './Breadcrumb';
import cart from './Cart';
import comment from './Comment';
import counter from './Counter';
import detail from './Detail';
import good from './Good';

class RootStore {
  counter = counter;
  breadcrumb = breadcrumb;
  comment = comment;
  good = good;
  cart = cart;
  detail = detail;
}

const store = new RootStore();

const Context = createContext(store);

const useStore = () => {
  return useContext(Context);
};

export default useStore;
