import React from 'react';
import './PaintingsChooser.css'

function imagePath(step) {
    return "/resources/paintings/"+step+".jpg";
}

class PaintingsChooser extends React.Component {
    constructor(props) {
        super(props);
        const borders = Array(props.numberOfImages).fill("");
        this.state = { image: "", image2: "", goalImageId: -1, borders: borders};
    }

    addImage(i) {
        const path = imagePath(i);
        // Set first image (goal for the puzzle)
        if (this.state.image === "") {
            const borders = this.state.borders;
            borders[i] = '4px ridge green';
            this.setState({image: path, goalImageId: i, borders: borders});
            this.props.setImages({image: path, image2: this.state.image2, goalImageId: i});
        // Unset first image
        } else if (this.state.image === path) {
            const borders = this.state.borders;
            borders[i] = '';
            this.setState({image: "", goalImageId: -1, borders: borders});
            this.props.setImages({image: '', image2: this.state.image2, goalImageId: -1});
            // Set second image (the wrong painting)
        } else if (this.state.image2 === "") {
            const borders = this.state.borders;
            borders[i] = '4px dotted red';
            this.setState({image2: path, borders: borders});
            this.props.setImages({image: this.state.image, image2: path, goalImageId: this.state.goalImageId});
        // Unset the second image
        } else if (this.state.image2 === path) {
            const borders = this.state.borders;
            borders[i] = '';
            this.setState({image2: "", borders: borders});
            this.props.setImages({image: this.state.image, image2: '', goalImageId: this.state.goalImageId});
        }
    }

    render() {
        const nums = Array.from(Array(this.props.numberOfImages).keys());
        const imgs = nums.map((i) => {
            return <img style={{
                border: `${this.state.borders[i]}`}}
                src={imagePath(i)} onClick={() => { this.addImage(i)
                }} />
        });
        return <div className="row">
                <div className="column">
                    {imgs.slice(0,3)}
                </div>
                <div className="column">
                    {imgs.slice(3,6)}
                </div>
                <div className="column">
                    {imgs.slice(6,9)}
                </div>
            </div>;
    }
}

export default PaintingsChooser;