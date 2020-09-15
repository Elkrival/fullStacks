import React, { useContext } from 'react';

function DrawingList(props) {
  return (
    <div>
        <h1>Hi</h1>
        {props.drawings.map(drawing => (<div>{drawing.src}</div>))}
    </div>
  );
}

export default DrawingList;