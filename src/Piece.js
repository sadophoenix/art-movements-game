// This file is taken from <Màxim Colls> @ github.com/mllocs

import React from 'react';
import { DragSource } from 'react-dnd';

const Piece = (props) => {
  const { image, size, side, border, x, y, connectDragSource, isOver } = props;

  return connectDragSource(
    <div
      style={{
        width: `${side}px`,
        height: `${side}px`,
        margin: '0 -1px -1px',
        border: `${border}`,
        backgroundImage: `url(${image})`,
        backgroundSize: `${size}px ${size}px`,
        backgroundPosition: `-${x}px -${y}px`,
        opacity: `${isOver ? '0.2' : '1'}`,
        cursor: 'move',
      }}
    />
  );
};

const pieceSource = {
  beginDrag(props) {
    const { position } = props;

    return { position };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
  }
}

export default DragSource('piece', pieceSource, collect)(Piece);
