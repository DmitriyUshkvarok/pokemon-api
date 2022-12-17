import axios from 'axios';

export function fetchPokemonApi(inputSearch) {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/${inputSearch}`)
    .then(response => response.data);
}

// ?offset=20&limit=50
