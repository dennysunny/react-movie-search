import React from "react";
import { Link } from "react-router-dom";

function CastImages(props) {

  if (props.loading || props.configLoading) {
    return (
      <div className="loader">
        <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  const profileURL =
    props.config.images.secure_base_url + props.config.images.profile_sizes[2];

  const images = props.person.images
    .sort((a, b) => b.vote_average - a.vote_average)
    .map((image, i) => (
      <figure key={i} className="cast-images__element">
        <a href={props.config.images.secure_base_url +
          props.config.images.profile_sizes[3] +
          image.file_path} target="_blank" rel="noopener noreferrer">
          <img src={profileURL + image.file_path} alt={props.person.name} />
          <figcaption>
            <p>
              Size: <br />
              {image.height} x {image.width}
            </p>
          </figcaption>
        </a>
      </figure>
    ));
  return (
    <div>
      <div className="cast-images__header">
        <Link to={`/person/${props.person.id}`}><h2>{props.person.name}</h2></Link>
      </div>
      <div className="cast-images__container">{images}</div>
    </div>
  );
}

export default CastImages;
