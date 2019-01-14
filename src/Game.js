import React from 'react';
import Puzzle from './Puzzle';
import Tutorial from './Tutorial';
import PaintingsChooser from './PaintingsChooser';
import './Game.css'

class Game extends React.Component {
    pages = {menu: "menu", tutorial: "tutorial", choosePaintings: "choosePaintings", puzzle: "puzzle"};

    constructor(props) {
        super(props);
        this.state = { page: this.pages.menu, images: {image: "", image2: ""} };
    }

    mainMenu() {
        return  <div className={"menu-div"}>
            <ul>
                <li> <button onClick={() => {this.setState({ page: this.pages.puzzle })}} type="button"> start </button> </li>
                <li> <button onClick={() => {this.setState({ page: this.pages.tutorial })}}type="button"> tutorial </button> </li>
                <li> <button onClick={() => {this.setState({ page: this.pages.choosePaintings })}}type="button"> choose paintings </button> </li>
            </ul>
        </div>;
    }

    setImages(images) {
        this.setState({images: images} );
    }

    backToMenuButton() {
        return <button onClick={() => {this.setState({ page: this.pages.menu })}} type="button"> Back to menu </button>
    }

    puzzleGame() {
        return <div>
            <Puzzle image={this.state.images.image} image2={this.state.images.image2} />
            {this.backToMenuButton()}
        </div>;
    }

    gameTutorial() {
        return <div>
            <Tutorial/>
            {this.backToMenuButton()}
        </div>
    }

    paintingsChooser() {
        return <div width="1800px" height="400px">
            <PaintingsChooser setImages={this.setImages.bind(this)}/>
            {this.backToMenuButton()}
        </div>
    }

    render() {
        switch (this.state.page) {
            case "menu":
                return this.mainMenu();
            case "tutorial":
                return this.gameTutorial();
            case "choosePaintings":
                return this.paintingsChooser();
            case "puzzle":
                return this.puzzleGame();
        }
    }
}

export default Game;