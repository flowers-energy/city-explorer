import React from "react";
import Accordion from 'react-bootstrap/Accordion';

class Movies extends React.Component {


  render() {

    return (


      < Accordion >
        {this.props.movData.map((movie, idx) => (
          <Accordion.Item key={idx} eventKey={idx}>
            <Accordion.Header>Films About This Location</Accordion.Header>
            <Accordion.Body>
              {movie.title}
              <img alt={movie.title} src={movie.img_url} />
              {movie.overview}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion >

    )

  }
}


export default Movies
