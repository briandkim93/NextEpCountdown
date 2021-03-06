import React from 'react';

import './CountDownBlock.css';

const CountDownBlock = (props) => {
  return (
    <figure className="unit-block">
      <span className="unit-value">{props.unitValue}</span>
      <figcaption className="caption">{props.caption}</figcaption>
    </figure>
  );
}

export default CountDownBlock;