import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Puzzle from './Puzzle';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
    <Puzzle
        image='https://i.pinimg.com/236x/71/d0/f0/71d0f02081ef18a9b22675c2aeeb324c--georges-braque-pablo-picasso.jpg'
        image2='https://i.pinimg.com/originals/1a/e1/b9/1ae1b99c49475dc8b1fde6eade24bb91.jpg'
    />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
