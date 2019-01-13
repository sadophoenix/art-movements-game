// This file is adapted from <Màxim Colls> @ github.com/mllocs

import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import "./Puzzle.css"

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

function Statistics(props) {
    return <div className={"statistics-div"}>
        <p>Total moves: {props.totalMoves}</p>
        <p>Greens: {props.greens}</p>
        <p>Reds: {props.reds}</p>
        <p>Yellows: {props.yellows}</p>
    </div>
}

class Puzzle extends React.Component {
    constructor(props) {
        super(props);

        const { level } = props;
        const cells = 3 * level * level;
        const statistics = { totalMoves: 0, reds: 0, yellows: 0, greens: 0, points: 100 };
        this.state = { positions: Array.from(Array(cells).keys()), statistics: statistics };
    }

    componentDidMount() {
        const positions = this.state.positions;
        const level = this.props.level;
        // Shuffle only the image cells
        const shuffled = shuffle(positions.slice(0, 2 * level * level));
        for (let i in shuffled) {
            positions[i] = shuffled[i];
        }
        this.setState({ positions: positions });
    }

    updateStatistics(statistics, swappedType) {
        statistics.totalMoves = statistics.totalMoves + 1;
        switch (swappedType) {
            case 'G':
                statistics.greens = statistics.greens + 1;
                break;
            case 'R':
                statistics.reds = statistics.reds + 1;
                break;
            case 'Y':
                statistics.yellows = statistics.yellows + 1;
                break;
        }
    }

    onSwap(sourcePosition, dropPosition) {
        const positions = this.state.positions.slice();
        const statistics = this.state.statistics;
        for (let i in positions) {
            if (positions[i] === sourcePosition) {
                positions[i] = dropPosition;
            } else if (positions[i] === dropPosition) {
                positions[i] = sourcePosition;
                this.updateStatistics(statistics, this.typeOfSwap(parseInt(i), sourcePosition));
            }
        }
        this.setState({ positions: positions, statistics: statistics });
    }

    typeOfSwap(index, sourcePosition) {
        let { level } = this.props;
        if (index === (sourcePosition+18)) {
            // Change the border to green
            return 'G';
            // If we are placing a piece from the wrong image in the result section, make it red
        } else if (index >= 2 * level * level && sourcePosition < 2 * level * level && sourcePosition >= level * level) {
            return 'R';
            // If we are placing a piece from the correct image but in wrong place in the result section, make it yellow
        } else if (index >= 2 * level * level && sourcePosition < level * level) {
            return 'Y';
        }
        return 'B';
    }

    definePieceBorders(index, position, finished) {
        // If finished the puzzle we remove all borders
        if (finished) {
            return '';
        }
        const swappedType = this.typeOfSwap(index, position);
        switch (swappedType) {
            case 'G':
                return '3px ridge green';
            case 'R':
                return '3px dotted red';
            case 'Y':
                return '3px dotted yellow';
            case 'B':
                return '3px solid black';
        }
    }

    renderSquares(finished) {
        const { image, image2, size, level } = this.props;
        const positions = this.state.positions.slice();

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
        const level = this.props.level;
        const result = this.state.positions.slice(2 * level * level);
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
        const statistics = this.state.statistics;
        return (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: "1%",
                    width: `${3*size+120}px`,
                    height: `${size+350}px`
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
                <div>
                    {Statistics(statistics)}
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
