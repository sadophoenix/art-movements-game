import React from 'react';
import "./Tutorial.css"

function imagePath(step) {
    return "/resources/tutorial/"+step+".svg";
}

class Tutorial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {step: 0};
    }

    incrementStep() {
        let step = this.state.step + 1;
        if (step <= 7) {
            this.setState({step: step});
        }
    }

    decrementStep() {
        let step = this.state.step - 1;
        if (step >= 0) {
            this.setState({step: step});
        }
    }

    render() {
        return <div>
            <img height="300px" width="600px" src={imagePath(this.state.step)}/>
            <div>
            <button className={"buttonPrevNext previous round"} type="button" onClick={this.decrementStep.bind(this)}> &#9664; </button>
            <button className={"next round buttonPrevNext"} type="button" onClick={this.incrementStep.bind(this)}> &#9654; </button>
            </div>
        </div>;
    }
}

export default Tutorial;