import React, { Component } from "react";
import PropTypes from "prop-types";

import Spinner from '../../atoms/Spinner';
import PageTransition from '../../atoms/PageTransition';
import TopRatedMovies from "../../organisms/TopRatedMovies";
import HomeList from "../../atoms/HomeList";

export default class TopListsContainer extends Component {
  static propTypes = {
    popular: PropTypes.array
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      topmovies: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.popularLoading) {
      this.setState({
        topmovies: nextProps.popular.slice(0, 5)
      });
    }
  }

  randomList = (to) => {
    var a = Array.from(Array(to), (_, x) => x);
    var n;
    var r = [];
    for (n = 1; n <= 5; ++n) {
      var i = Math.floor((Math.random() * (to - n)) + 1);
      r.push(a[i]);
      a[i] = a[to - n];
    }

    return r;
  }

  filterTopMovies = genre => {
    let movies = genre !== -1
      ? this.props.popular.filter(movie => movie.genre_ids.includes(genre))
      : this.props.popular;

    let moviesLength = movies.length;

    if (moviesLength > 5) {
      let a = this.randomList(moviesLength);
      movies = movies.filter((movie, index) => a.indexOf(index) !== -1);
    }

    this.setState({ topmovies: movies });
  }

  goToMovie = movieId => {
    this.context.router.history.push(`/movie/${movieId}`);
  };

  render() {

    if (this.props.nowPlayingLoading || this.props.popularLoading || this.props.upcomingLoading) {
      return <Spinner />
    }

    return (
      <PageTransition>
        <TopRatedMovies
          topMovies={this.state.topmovies}
          goToMovie={this.goToMovie}
          filterTopMovies={this.filterTopMovies}
        />

        <div className="top-lists-wrapper">
          <HomeList
            list={this.props.nowplaying.slice(0, 10)}
            goToMovie={this.goToMovie}
            title="In Theatres"
          />
          <HomeList
            list={this.props.upcoming.slice(0, 10)}
            goToMovie={this.goToMovie}
            title="Upcoming Movies"
          />
        </div>
      </PageTransition>
    );
  }
}