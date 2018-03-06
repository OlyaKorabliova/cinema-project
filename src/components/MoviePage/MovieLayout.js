import React, {Component} from 'react'
import MovieImage from "./MovieImage";
import MovieInfo from "./MovieInfo";
import Feedback from "./Feedback";
import "../../styles/MovieLayout.less"
import block from "../../helpers/BEM";
import {getById} from "../../reducers";
import {connect} from "react-redux";
import Header from "../Header";
import Footer from "../Footer";


const b = block("MovieLayout");

//TODO: Change id
const id = 1;


class MovieLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {film} = this.props;

        return (
            <div>
                  <div className={b()}>
                    <MovieImage film={film}/>
                    <MovieInfo film={film}/>

                </div>
            </div>
        )
    }
}


export default connect((state, props) => {
        console.log(props.match.params.id);
        const movie = getById(state, +props.match.params.id || id);
        return {film: movie};
    }
)(MovieLayout);
