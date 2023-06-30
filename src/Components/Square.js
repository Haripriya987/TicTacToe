import React from 'react';

const Square = ({ val, chooseSquare }) => {
  let className = "square";
  if (val === "X") {
    className += " x";
  } else if (val === "O") {
    className += " o";
  }

  return (
    <div className={className} onClick={chooseSquare}>{val}</div>
  );
};

export default Square;
