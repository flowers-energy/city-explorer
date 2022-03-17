import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      city_name: '',
      lat: '',
      lon : ''
    }
  }

  goHere = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`
    const hereResponse = await axios.get(url);
    console.log(hereResponse.data[0]);
    this.setState({city_name: hereResponse.data[0].display_name});
    this.setState({lat: hereResponse.data[0].lat});
    this.setState({lon: hereResponse.data[0].lon});

  }

  render() {
    return (
      <div className="App">
        <input onChange={(event) => this.setState({searchQuery: event.target.value})}
          placeholder='Where would you like to go?'></input>
        <button onClick={this.goHere}>Explore!</button>
        {this.state.city_name &&
        <h2>Discover {this.state.city_name}</h2>
        }
        {this.state.lat &&
        <h3>{this.state.lat}</h3>
        }
        {this.state.lon &&
        <h3>{this.state.lon}</h3>
        }
      </div>
    );
  }
}

export default App;
