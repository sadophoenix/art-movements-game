import React from 'react';
import Puzzle from './Puzzle';
import Tutorial from './Tutorial';
import './Game.css'

const images = [
    'https://i.pinimg.com/236x/71/d0/f0/71d0f02081ef18a9b22675c2aeeb324c--georges-braque-pablo-picasso.jpg',
    'https://i.pinimg.com/originals/1a/e1/b9/1ae1b99c49475dc8b1fde6eade24bb91.jpg'
];

class Game extends React.Component {
    pages = {menu: "menu", tutorial: "tutorial", puzzle: "puzzle"};

    constructor(props) {
        super(props);
        this.state = {page: this.pages.menu};
    }

    mainMenu() {
        return  <div className={"menu-div"}>
                    <ul>
                        <li> <button onClick={() => {this.setState({ page: this.pages.puzzle })}} type="button"> start </button> </li>
                        <li> <button onClick={() => {this.setState({ page: this.pages.tutorial })}}type="button"> tutorial </button> </li>
                    </ul>
                </div>;
    }

    backToMenuButton() {
        return <button onClick={() => {this.setState({ page: this.pages.menu })}} type="button"> Back to menu </button>
    }

    puzzleGame() {
        return <div>
            <Puzzle image={images[0]} image2={images[1]} />
            {this.backToMenuButton()}
        </div>;
    }

    gameTutorial() {
        return <div>
            <Tutorial/>
            {this.backToMenuButton()}
        </div>
    }

    render() {
        switch (this.state.page) {
            case "menu":
                return this.mainMenu();
            case "tutorial":
                return this.gameTutorial();
            case "puzzle":
                return this.puzzleGame();
        }
    }
}

export default Game;