import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Weather from './Weather';
import Movies from './Movies';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      city_name: '',
      lat: '',
      lon: '',
      displayError: false,
      weatherData: [],
      movData: [],
      showMovData: false,
      title: '',
      overview: '',
      img_url: ''



    }
  }

  goHere = async event => {
    event.preventDefault()
    try {
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`
      const hereResponse = await axios.get(url);
      console.log(hereResponse.data[0]);
      this.setState({
        city_name: hereResponse.data[0].display_name,
        lat: hereResponse.data[0].lat,
        lon: hereResponse.data[0].lon,
        displayError: false
      });
    } catch (err) {
      this.setState({ displayError: true })

    }
    this.getWeather();
    this.findMovies();

  }

  getWeather = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.lat}&lon=${this.state.lon}`;
      const weatherResponse = await axios.get(url);
      console.log(weatherResponse.data);
      this.setState({ weatherData: weatherResponse.data })
    } catch (error) {
      this.setState({ displayError: true })
    }
  };

  findMovies = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.searchQuery}`;
      const movData = await axios.get(url);
      console.log(movData.data);
      this.setState({ movData: movData.data, showMovData: true })
    } catch (error) {
      this.setState({ displayError: true })
    }


  };


  render() {
    return (
      <div className="App">
        <input onChange={(event) => this.setState({ searchQuery: event.target.value })}
          placeholder='Where would you like to go?'></input>
        <button onClick={this.goHere}>Explore!</button>
        {this.state.city_name &&
          <h2>Discover {this.state.city_name}</h2>
        }
        {this.state.lat &&
          <>
            <h3>{this.state.lat}</h3>
            <h3>{this.state.lon}</h3>
            <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&zoom=11&center=${this.state.lat},${this.state.lon}&width=200px&height=200px`} />
            <Weather weatherData={this.state.weatherData}
            />
          </>
        }
        {this.state.showMovData &&
         <Movies movData={this.state.movData}/>
        }
        {
          this.state.displayError &&
          <p>error: please enter a location</p>
        }



      </div>
    );
  }
}

export default App;
