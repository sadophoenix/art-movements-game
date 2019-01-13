import React from 'react';
import Puzzle from './Puzzle';
import Tutorial from './Tutorial';
import './Game.css'

const images = [
    'http://1.bp.blogspot.com/-lallcokDt3g/UVbdwPV-YsI/AAAAAAAAGyA/8kkzX35rC1c/s1600/images.jpg',
    'https://tse1.mm.bing.net/th?id=OIP.ptAvt00eTeZPN98EHkqSwAHaHa&pid=15.1&P=0&w=300&h=300'
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