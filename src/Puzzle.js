// This file is taken from <Màxim Colls> @ github.com/mllocs

import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

/**
 * Shuffles the passed array and returns a new one
 *
 * @param  {Array} a
 * @return {Array}
 */
function shuffle(a) {
    const b = a.slice();

    for (let i = b.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [b[i], b[j]] = [b[j], b[i]];
    }

    return b;
}

class Puzzle extends React.Component {
    constructor(props) {
        super(props);

        const { level } = props;
        const cells = 3 * level * level;

        this.state = { positions: Array.from(Array(cells).keys()), level: level };
    }

    componentDidMount() {
        const { level, positions } = this.state;
        // Shuffle only the image cells
        const shuffled = shuffle(positions.slice(0, 2 * level * level));
        for (let i in shuffled) {
            positions[i] = shuffled[i];
        }
        this.setState({ positions: positions });
    }

    onSwap(sourcePosition, dropPosition) {
        const positions = this.state.positions.slice();
        for (let i in positions) {
            if (positions[i] === sourcePosition) {
                positions[i] = dropPosition;
            } else if (positions[i] === dropPosition) {
                positions[i] = sourcePosition;
            }
        }
        this.setState({ positions: positions });
    }

    renderSquares() {
        const { image, image2, size, level } = this.props;
        const { positions } = this.state;

        const squares = positions.map((i) => {
            // Check if this should be a blank cell
            if (i >= 2 * level * level) {
                return (
                    <Cell
                        key={i}
                        size={size}
                        level={level}
                        position={i}
                        onSwap={this.onSwap.bind(this)}
                    />
                );
            }
            // Use first image
            else if (i >= level * level) {
                return (
                    <Cell
                        key={i}
                        size={size}
                        image={image}
                        level={level}
                        position={i}
                        onSwap={this.onSwap.bind(this)}
                    />
                );
            // Use second image
            } else {
                return (
                    <Cell
                        key={i}
                        size={size}
                        image={image2}
                        level={level}
                        position={i}
                        onSwap={this.onSwap.bind(this)}
                    />
                );
            }
        })
        return squares;
    }

    checkIfPuzzleComplete() {
        const {level, positions} = this.state;
        const result = positions.slice(2 * level * level);
        for (let i in result) {
            if (result[i] != i) {
                return false;
            }
        }
        return true;
    }

    render() {
        const { level, size } = this.props;
        const finished = this.checkIfPuzzleComplete();
        if (finished) {
            this.props.onDone();
        }
        return (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: "1%",
                    width: `${2*size}px`,
                    height: `${2*size}px`
                }}>
                {this.renderSquares().slice(0, 2 * level * level)}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginLeft: `${size/2}px`,
                    marginTop: "10px",
                    width: `${size}px`,
                    height: `${size}px`
                }}>
                    {this.renderSquares().slice(2 * level * level)}
                </div>
            </div>
        );
    }
};

Puzzle.propTypes = {
    image: PropTypes.string.isRequired,
    size: PropTypes.number,
    level: PropTypes.number,
    onDone: PropTypes.func,
};

Puzzle.defaultProps = {
    size: 300,
    level: 3,
    onDone: () => { alert("Done"); },
};

export default DragDropContext(HTML5Backend)(Puzzle);
