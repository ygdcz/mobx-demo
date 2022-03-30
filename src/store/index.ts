import { createContext, useContext } from 'react';
import auth from './Auth';
import breadcrumb from './Breadcrumb';
import cart from './Cart';
import comment from './Comment';
import counter from './Counter';
import detail from './Detail';
import good from './Good';
import order from './Order';
import person from './Person';

class RootStore {
  counter = counter;
  breadcrumb = breadcrumb;
  comment = comment;
  good = good;
  cart = cart;
  detail = detail;
  order = order;
  auth = auth;
  person = person;
}

const store = new RootStore();

const Context = createContext(store);

const useStore = () => {
  return useContext(Context);
};

export default useStore;
