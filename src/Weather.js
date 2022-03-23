import React from "react";
import Accordion from 'react-bootstrap/Accordion';

class Weather extends React.Component {


  render() {

    return (
     <>
            {this.props.weatherData.map((day, idx) => (
              <div key={idx}>
                <h4>{day.date}</h4>
                <p>{day.description}</p>
              </div>))}; 
      </>


    )
  }
}

export default Weather

