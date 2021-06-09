import React from 'react';

const Counter = ({ number, CounterActions }) => {
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={() => CounterActions.increment()}>증가 (+)</button>
      <button onClick={() => CounterActions.decrement()}>감소 (-)</button>
    </div>
  );
};

Counter.defaultProps = {
  number: 0,
};

export default Counter;
