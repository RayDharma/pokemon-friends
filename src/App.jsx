import React, { useState } from 'react';
import './App.scss'
import Axios from 'axios';

const App = () => {

  const [pokemonName, setPokemonName] = useState('');
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: pokemonName,
    species: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    type: '',
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`).then((response) => {
      setPokemon({
        name: pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1),
        species: response.data.species.name.charAt(0).toUpperCase() + response.data.species.name.slice(1),
        image: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name.charAt(0).toUpperCase() + response.data.types[0].type.name.slice(1),
      });
      setPokemonChosen(true);
    });
  };

  return (
    <div className="app">
      <div className="title__section">
        <h2>Pokemon Friends</h2>
        <input type="text" onChange={(event) => {setPokemonName(event.target.value)}}/>
        <button onClick={searchPokemon}>Search Pokemon</button>
        <p>&copy; {new Date().getFullYear()} - Ray Dharma Creative</p>
      </div>
      <div className="display__section">
        {!pokemonChosen ? (
        <h2>Please choose a Pokemon~</h2>
        ) : (
          <>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} />
            <h3>Species: {pokemon.species}</h3>
            <h3>Type: {pokemon.type}</h3>
            <h4>HP: {pokemon.hp}</h4>
            <h4>Attack: {pokemon.attack}</h4>
            <h4>Defense: {pokemon.defense}</h4>
          </>
        )}
      </div>
    </div>
  )
}

export default App;