import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Vibrant from "node-vibrant";

import Spinner from '../../atoms/Spinner';
import PageTransition from "../../atoms/PageTransition/index";
import TvProfile from "../../organisms/TvProfile";

export default class Tv extends Component {
  state = {
    dcolor: [0, 0, 0],
    tvId: this.props.match.params.tvId || ''
  };

  static propTypes = {
    config: PropTypes.object.isRequired,
    tv: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && !nextProps.configLoading) {
      let tvId = nextProps.match.params.tvId;
      this.setState({ tvId });
      this.getPalette(nextProps);
    }
  }

  getPalette = (props) => {
    const { tv: { poster_path }, config: { images } } = props;
    if (poster_path) {
      const path = images.secure_base_url + images.poster_sizes[3] + poster_path;
      Vibrant.from(path).getSwatches((err, palette) => {
        this.setState({ dcolor: (palette.DarkVibrant !== null) ? palette.DarkVibrant._rgb : [0, 0, 0] })
      });
    };
  };

  handleTvClick = tvId => {
    this.context.router.history.push(`/tv/${tvId}`);
  };

  handleFullCrewClick = () => {
    this.context.router.history.push(`/tv/${this.props.tv.id}/crew`);
  };

  handlePersonClick = personId => {
    this.context.router.history.push(`/person/${personId}`);
  };

  render() {
    
    if (this.props.loading) {
      return <Spinner />
    }

    return (
      <PageTransition>
        <TvProfile
          key={this.props.tv.id}
          config={this.props.config}
          tv={this.props.tv}
          dcolor={this.state.dcolor}
          handleTvClick={this.handleTvClick}
          handlePersonClick={this.handlePersonClick}
          handleFullCrewClick={this.handleFullCrewClick}
        />
      </PageTransition>
    );
  }
}