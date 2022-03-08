import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import useStore from '../../store';
import useBreadcrumbs from '../../hooks/breadcrumb';
import styles from './index.module.scss';

const Calculator = observer(() => {
  const { counter } = useStore();
  useBreadcrumbs(['calc']);
  const useUpdate = () => {
    console.log(1);

    const [, setState] = useState({});
    return useCallback(() => setState({}), []);
  };
  const update = useUpdate();

  // return useCallback(() => setState({}), []);
  return (
    <div>
      <p className={styles['red']}>{counter.num}</p>
      <button onClick={() => counter.increment()}>+</button>
      <button onClick={update}>useUpdate</button>
    </div>
  );
});

export default Calculator;
