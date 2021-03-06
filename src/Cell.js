// This file is adapted from <Màxim Colls> @ github.com/mllocs

import React from 'react';
import { DropTarget } from 'react-dnd';
import Piece from './Piece';

const Cell = (props) => {
    const { image, border, size, level, position, connectDropTarget, isOver } = props;
    const side = (size / level);
    const posForImage = position % (level * level);
    const x = (posForImage % level) * side;
    const y = Math.floor(posForImage / level) * side;

    return connectDropTarget(
        <div className='piece'>
            <Piece
                position={position}
                image={image}
                border={border}
                size={size}
                side={side}
                x={x}
                y={y}
                isOver={isOver}
            />

            <style>{`
                .piece:hover {
                opacity: 0.8;
                }
            `}</style>
        </div>
    );
};

const squareTarget = {
    drop(props, monitor) {
        const item = monitor.getItem();
        const sourcePosition = item.position;
        const dropPosition = props.position;

        props.onSwap(sourcePosition, dropPosition);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

export default DropTarget('piece', squareTarget, collect)(Cell);
