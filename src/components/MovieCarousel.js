import React, {Component} from "react";
import "../styles/MovieCarousel.less";
import block from "../helpers/BEM";
import scrollTo from '../helpers/scrollTo';
import checkScrollPosition from '../helpers/checkScrollPosition';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import MoviePoster from "./MoviePoster";
import {getPopularMoviesIds, getComingsoonrMoviesIds, getMovieById} from '../reducers';
import {fetchPopularMovies, fetchComingsoonMovies} from '../api/fetch';
import LazyLoad from 'react-lazyload';

const b = block("MovieCarousel");

class MovieCarousel extends Component {

    componentWillMount() {
        this.props.fetchMovies();
    }

    handleClick(k = 1) {
        const {carousel, rightBut, leftBut} = this.refs;
        let numOfItemsToScroll = 3.5;
        let widthOfItem = 275;
        let newPos = carousel.scrollLeft + k * (widthOfItem * numOfItemsToScroll);
        const timeForItem = 200;
        const totalTime = numOfItemsToScroll * timeForItem;

        scrollTo({
            el: carousel,
            to: newPos,
            duration: totalTime,
            scrollDir: 'scrollLeft'
        });
        checkScrollPosition(carousel, rightBut, leftBut);

    };

    leftClick() {
        this.handleClick(-1);
    };

    rightClick() {
        this.handleClick();
    };

    onScrollMove() {
        const {carousel, rightBut, leftBut} = this.refs;
        checkScrollPosition(carousel, rightBut, leftBut, carousel.scrollLeft);
    }

    render() {
        const {label, films} = this.props;
        return (
            <section className={b()}>
                <button
                    className={b('button', ['left'])}
                    onClick={this.leftClick.bind(this)}
                    ref={'leftBut'}
                    style={{'display': 'none'}}
                >
                    <span className={b('icon', ['left'])}></span>
                </button>
                <div ref='carousel'
                     className={b('movies')}
                     onScroll={this.onScrollMove.bind(this)}
                >
                    {films
                        .map(film =>
                            <LazyLoad height='100%' offsetRight={100}>
                                <Link key={film} to={`/movie/${film}`}>
                                    <MoviePoster film={film}/>
                                </Link>
                            </LazyLoad>
                        )}
                </div>
                <button
                    className={b('button', ['right'])}
                    onClick={this.rightClick.bind(this)}
                    ref={'rightBut'}
                >
                    <span className={b('icon', ['right'])}></span>
                </button>
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchMovies: () => {
            if (props.label === 'popular') {
                return dispatch(fetchPopularMovies());
            }
            return fetchComingsoonMovies()(dispatch);
        },
    }
};


export default connect((state, props) => {
    let movies = [];
    if (props.label === 'popular') {
        movies = getPopularMoviesIds(state);
    } else {
        movies = getComingsoonrMoviesIds(state);
    }
    return {
        films: movies
    }
}, mapDispatchToProps)(MovieCarousel);