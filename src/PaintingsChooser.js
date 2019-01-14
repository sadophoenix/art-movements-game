import React from 'react';
import './PaintingsChooser.css'

function imagePath(step) {
    return "/resources/paintings/"+step+".jpg";
}

function test(imgs) {
    alert(imgs.src);
}

class PaintingsChooser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { image: "", image2: "" };
    }

    addImage(path) {
        if (this.state.image === "") {
            this.setState({image: path});
        } else if (this.state.image === path) {
            this.setState({image: ""});
        } else if (this.state.image2 === "") {
            this.setState({image2: path});
            const path1 = this.state.image;
            this.props.setImages({image: path1, image2: path});
        } else if (this.state.image2 === path) {
            this.setState({image2: ""});
        }
    }

    render() {
        return <div className="row">
                <div className="column">
                    <img src={imagePath(0)} onClick={() => { this.addImage(imagePath(0)) } } />
                </div>
                <div className="column">
                    <img src={imagePath(1)} onClick={() => { this.addImage(imagePath(1)) } } />
                </div>
                <div className="column">
                    <img src={imagePath(2)} onClick={() => { this.addImage(imagePath(2)) } } />
                </div>
            </div>;
    }
}

export default PaintingsChooser;