import React, {Component} from "react";
import "../styles/AllActors.less";
import block from "../helpers/BEM";
import {connect} from "react-redux";
import ActorPoster from "./ActorPoster";
import {Link} from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroller";
import {getAllActorsIds, isActorFetching} from "../reducers";
import {fetchAdditionalActors} from "../actions/fetch"
import LazyLoad from 'react-lazyload';

const b = block("AllActors");

class AllActors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: 6,
            hasMoreItems: true
        };
    }

    componentWillMount() {
        this.props.fetchAllActors(this.state.items, 1);
    }

    componentWillReceiveProps(nextProps) {
      console.log(nextProps);
        if (nextProps.actors.length === this.props.actors.length && this.props.isFetching && !nextProps.isFetching) {
            this.setState({...this.state, hasMoreItems: false});
        }
    }

    showItems() {
        const {actors} = this.props;


        if (actors.length !== 0) {
            return (
                <div className={b()}>
                    {actors
                        .map((actor, i) =>
                            <LazyLoad key={i} height='100%' offsetBottom={250}>
                                <Link key={actor} to={`/actor/${actor}`}>
                                    <ActorPoster actorId={actor}/>
                                </Link>
                            </LazyLoad>
                        )}
                </div>
            );
        }
    }

    loadMore(page) {
        this.props.fetchAllActors(this.state.items, page);
    }

    render() {
        if (this.props.actors.length !== 0) {
            return (
                <section>
                    <InfiniteScroll
                        loadMore={this.loadMore.bind(this)}
                        hasMore={this.state.hasMoreItems}
                        initialLoad={false}
                        pageStart={1}
                        loader={<div className={b("loader")}>
                            <span className={b("loader-dot")}></span>
                            <span className={b("loader-dot")}></span>
                            <span className={b("loader-dot")}></span>
                            <span className={b("loader-dot")}></span>
                        </div>}
                    >
                        {this.showItems()}{" "}
                    </InfiniteScroll>{" "}
                </section>
            )
        }
        return null;
    }
}

const mapDispatchToProps = (dispatch) => ( {fetchAllActors: (labels, pages) => dispatch(fetchAdditionalActors(labels, pages))} );

const mapStateToProps = state => {
    const actors = getAllActorsIds(state);
    const isFetching = isActorFetching('additional', state);
    return {
        actors,
        isFetching
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllActors);