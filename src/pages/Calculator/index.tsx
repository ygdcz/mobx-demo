import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import useStore from '../../store';
import useBreadcrumbs from '../../hooks/breadcrumb';
import styles from './index.module.scss';

const Calculator = observer(() => {
  const { counter } = useStore();
  useBreadcrumbs(['calc']);
  return (
    <div>
      <p className={styles['red']}>{counter.num}</p>
      <button onClick={() => counter.increment()}>+</button>
    </div>
  );
});

export default Calculator;
