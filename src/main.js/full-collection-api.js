import axios from 'axios';
import cardPokemon from '../templates/card-pokemon.hbs';
import { refs } from './render-api';

function fullFetch() {
  return axios
    .get('https://pokeapi.co/api/v2/ability/?limit=20&offset=20')
    .then(response => response.data)
    .then(fullCollection => {
      const markupColection = cardPokemon(fullCollection);
      refs.gallery.innerHTML = markupColection;
    });
}
fullFetch();
