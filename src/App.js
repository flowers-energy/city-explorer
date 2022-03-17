import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      itMe: {},
      lat: {},
      long: {}
    }
  }

  goHere = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`
    const hereResponse = await axios.get(url);
    console.log(hereResponse.data[0]);
    this.setState({itMe: hereResponse.data[0]});
  }

  render() {
    return (
      <div className="App">
        <input onChange={(event) => this.setState({searchQuery: event.target.value})}
          placeholder='Where would you like to go?'></input>
        <button onClick={this.goHere}>Explore!</button>
        {this.state.itMe.display_name &&
        <h2>Discover {this.state.itMe.display_name}</h2>
        }
        {this.state.lat.latitude &&
        <h3>{this.state.lat.latitude}</h3>
        }
        {this.state.long.longitude &&
        <h3>{this.state.long.longitude}</h3>
        }
      </div>
    );
  }
}

export default App;
