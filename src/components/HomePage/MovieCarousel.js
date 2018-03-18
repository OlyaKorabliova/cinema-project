import React, {Component} from "react";
import "../../styles/MovieCarousel.less";
import block from "../../helpers/BEM";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import MoviePoster from "./MoviePoster";
import {getAllMovies} from '../../reducers';
import throttle from 'lodash';

const b = block("MovieCarousel");

const scrollTo = (params) => {
    const {
        el,
        to,
        duration,
        scrollDir
    } = params;
    const start = el[scrollDir];
    const change = to - start;
    const increment = 20;

    const animateScroll = (elapsedTime) => {
        elapsedTime += increment;
        el[scrollDir] = easeInOut(elapsedTime, start, change, duration);
        if (elapsedTime < duration) {
            setTimeout(() => {
                animateScroll(elapsedTime);
            }, increment);
        }
    };
    animateScroll(0);
};

const easeInOut = (curTime, start, change, duration) => {
    curTime /= duration / 2;
    if (curTime < 1) {
        return change / 2 * curTime * curTime + start;
    }
    curTime -= 1;
    return -change / 2 * (curTime * (curTime - 2) - 1) + start;
};

class MovieCarousel extends Component {

    handleClick(k = 1) {
        const {carousel} = this.refs;
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
    }

    leftClick() {
        this.handleClick(-1)
    };

    rightClick() {
        this.handleClick();
    };

    render() {
        const {label, films} = this.props;
        return (
            <section className={b()}>
                <button
                    className={b('button')}
                    onClick={this.leftClick.bind(this)}
                >
                    <span className={b('icon', ['left'])}></span>
                </button>
                <div ref='carousel' className={b('movies')}>
                    {films
                        .filter(film => film.label === label)
                        .map(film =>
                            <Link key={film.id} to={`/movie/${film.id}`}>
                                <MoviePoster film={film}/>
                            </Link>
                        )}
                </div>
                <button
                    className={b('button')}
                    onClick={this.rightClick.bind(this)}
                >
                    <span className={b('icon', ['right'])}></span>
                </button>
            </section>
        )
    }
}

export default connect(state => {
    const movies = getAllMovies(state);
    return {
        films: movies.map(movie => ({
            id: movie.id,
            name: movie.name,
            image: movie.image,
            rating: movie.rating,
            genre: movie.genre,
            label: movie.label
        }))
    }
})(MovieCarousel);