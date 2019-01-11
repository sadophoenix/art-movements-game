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

    definePieceBorders(index, position, finished)
    {
        // If finished the puzzle we remove all borders
        if (finished) {
            return '';
        }

        let { level } = this.props;
        // The piece is in the correct place if starting from index=18,19,20... we have i=0,1,2... and so on
        if (index === (position+18)) {
            // Change the border to green
            return '3px ridge green';
            // If we are placing a piece from the wrong image in the result section, make it red
        } else if (index >= 2 * level * level && position < 2 * level * level && position >= level * level) {
            return '3px dotted red';
            // If we are placing a piece from the correct image but in wrong place in the result section, make it yellow
        } else if (index >= 2 * level * level && position < level * level) {
            return '3px dotted yellow';
        }
        return '3px solid black';
    }

    renderSquares(finished) {
        const { image, image2, size, level } = this.props;
        const { positions } = this.state;

        let index = -1;
        const squares = positions.map((i) => {
            index++;
            // If we have finished, we want to show only the result image
            if (finished && index < 2 * level * level)
            {
                return;
            }
            let border = this.definePieceBorders(index, i, finished);

            // Check if this should be a blank cell
            if (i >= 2 * level * level) {
                return (
                    <Cell
                        key={i}
                        size={size}
                        border={border}
                        level={level}
                        position={i}
                        onSwap={this.onSwap.bind(this)}
                    />
                );
            }
            // Use second image
            else if (i >= level * level) {
                return (
                    <Cell
                        key={i}
                        size={size}
                        border={border}
                        image={image2}
                        level={level}
                        position={i}
                        onSwap={this.onSwap.bind(this)}
                    />
                );
            // Use first image
            } else {
                return (
                    <Cell
                        key={i}
                        size={size}
                        image={image}
                        border={border}
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
        const squares = this.renderSquares(finished);
        return (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: "1%",
                    width: `${3*size+120}px`,
                    height: `${size+40}px`
                }}>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        padding: "1%",
                        width: `${2*size+40}px`,
                        height: `${size}px`
                    }}>
                    {squares.slice(0, 2 * level * level)}
                </div>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginLeft: '10px',
                    padding: "1%",
                    width: `${size+15}px`,
                    height: `${size}px`
                }}>
                    {squares.slice(2 * level * level)}
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
    onDone: () => { alert("Congratulations!"); },
};

export default DragDropContext(HTML5Backend)(Puzzle);
