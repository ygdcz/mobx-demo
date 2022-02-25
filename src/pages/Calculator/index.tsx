import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import useStore from '../../store';
import useBreadcrumbs from '../../hooks/breadcrumb';

const Calculator = observer(() => {
  const { counter } = useStore();
  useBreadcrumbs(['calc']);
  return (
    <>
      <p>{counter.num}</p>
      <button onClick={() => counter.increment()}>+</button>
    </>
  );
});

export default Calculator;
