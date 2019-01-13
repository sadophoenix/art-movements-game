import React from 'react';

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
        if (step <= 2) {
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
            <button type="button" onClick={this.incrementStep.bind(this)}> Next </button>
            <button type="button" onClick={this.decrementStep.bind(this)}> Prev </button>
        </div>;
    }
}

export default Tutorial;