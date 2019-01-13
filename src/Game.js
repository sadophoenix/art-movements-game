import React from 'react';
import Puzzle from './Puzzle';
import './Game.css'

const images = [
    'https://i.pinimg.com/236x/71/d0/f0/71d0f02081ef18a9b22675c2aeeb324c--georges-braque-pablo-picasso.jpg',
    'https://i.pinimg.com/originals/1a/e1/b9/1ae1b99c49475dc8b1fde6eade24bb91.jpg'
];

class Game extends React.Component {
    pages = {menu: "menu", puzzle: "puzzle"};

    constructor(props) {
        super(props);
        this.state = {page: this.pages.menu};
    }

    mainMenu() {
        return  <div className={"menu-div"} >
                    <ul>
                        <li> <button onClick={() => {this.setState({ page: this.pages.puzzle })}} type="button"> start </button> </li>
                        <li> <button type="button"> tutorial </button> </li>
                    </ul>
                </div>;
    }

    puzzleGame() {
        return <div>
            <Puzzle image={images[0]} image2={images[1]} />
                <button onClick={() => {this.setState({ page: this.pages.menu })}} type="button"> Back to menu </button>
        </div>
    }

    render() {
        const { page } = this.state;
        switch (page) {
            case "menu":
                return this.mainMenu();
            case "puzzle":
                return this.puzzleGame();
        }
    }
}

export default Game;