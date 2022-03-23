import React from "react";
import Accordion from 'react-bootstrap/Accordion';

class Weather extends React.Component {


  render() {

    return (


      < Accordion >
        {this.props.weatherData.map((day, idx) => (
          <Accordion.Item key={idx} eventKey={idx}>
            <Accordion.Header>Weather Where You Want to Be on {day.date}</Accordion.Header>
            <Accordion.Body>

              {day.description}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion >

    )

  }
}


export default Weather

