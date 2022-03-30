import useStore from 'store';
import { $storage } from 'utils';
export const isAutoLogin = () => {
  if ($storage.username && $storage.token) return true;
};
