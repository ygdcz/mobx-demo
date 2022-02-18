import React from 'react';
import { observer } from 'mobx-react';
import useStore from '../store';

const Calculator = observer(() => {
  const { counter } = useStore();
  return (
    <>
      <p>{counter.num}</p>
      <button onClick={() => counter.increment()}>+</button>
    </>
  );
});

export default Calculator;
