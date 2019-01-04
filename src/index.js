import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Puzzle from './Puzzle';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
    <Puzzle
        image='https://upload.wikimedia.org/wikipedia/en/6/68/John_Coltrane_-_Blue_Train.jpg'
        image2='http://www.juliahart.co.uk/wp-content/uploads/julia-hart-skincare-images-300x300px-07.jpg'
    />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
