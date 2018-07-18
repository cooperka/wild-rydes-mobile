import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { API } from 'aws-amplify';
import { Analytics } from 'aws-amplify';

import logo from './logo.svg';
import './App.css';

let apiName = 'PetAPI';
let path = '/pets';

class App extends Component {

  state = {
    pets: []
  };

  async componentDidMount() {
    const data = await API.get(apiName, path);
    console.log('data: ', data);
    this.setState({
      pets: data.data,
    });
  }

  addToCart = () => {
    console.log('Simulating adding item to cart.');
    Analytics.record('Item added to cart!');
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {
          this.state.pets.map((pet, index) => (
            <h2 key={index}>{pet}</h2>
          ))
        }
        <button onClick={this.addToCart}>Add To Cart</button>
      </div>
    );
  }

}

export default withAuthenticator(App);
