import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { API } from 'aws-amplify';
import { Analytics, Auth, graphqlOperation } from 'aws-amplify';

import logo from './logo.svg';
import './App.css';

const ListPets = `
  query {
    listPets {
      items {
        id
        name
      }
    }
  }
`;

class App extends Component {

  state = {
    pets: [],
    username: null,
  };

  async componentDidMount() {
    const pets = await API.graphql(graphqlOperation(ListPets));
    console.log('pets:', pets);
    this.setState({ pets: pets.data.listPets.items });

    const user = await Auth.currentAuthenticatedUser();
    console.log('user:', user);
    this.setState({ username: user.username });
  }

  addToCart = () => {
    const { username } = this.state;
    console.log('Adding item to cart. User:', username);
    Analytics.record({ name: 'Item added to cart!', attributes: { username }});
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
            <h2 key={index}>{pet.name}</h2>
          ))
        }
        <button onClick={this.addToCart}>Add To Cart</button>
      </div>
    );
  }

}

export default withAuthenticator(App);
