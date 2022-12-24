import axios from 'axios';
import resultApi from '../templates/results-api.hbs';
import { refs } from './render-api';
import pokemonCard from '../templates/card-pokemon.hbs';
import { fetchPokemonApi } from './fetch-pokemon';
import { Notify } from 'notiflix';

const options = {
  root: null,
  rootMargin: '500px',
  // threshold: 1.0,
};
const observer = new IntersectionObserver(onLoadPokemonCards, options);
const target = document.querySelector('.target');

async function getFullInfo(urlArray) {
  const results = await Promise.all(urlArray);
  return results;
}
let page = 0;

function fullFetch() {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon-form/?limit=20&offset=${page}`)
    .then(response => response.data.results)
    .then(async fullCollection => {
      const urls = fullCollection.map(({ url }) => url);
      page += 20;
      const data = await getFullInfo(
        urls.map(el => axios.get(el).then(response => response.data))
      );
      const markupColection = resultApi({ results: data });
      refs.gallery.classList.add('show');
      refs.gallery.insertAdjacentHTML('beforeend', markupColection);
      observer.observe(target);
      if (!data) {
        refs.gallery.classList.remove('show');
      }
    });
}
fullFetch();

function onLoadPokemonCards(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fullFetch();
    }
  });
}

// =================

// refs.gallery.addEventListener('click', onOpenCard);
// let id = 0;

// function onOpenCard(e) {
//   e.preventDefault();
//   if (e.currentTarget === e.target) {
//     return;
//   }
//   const card = e.target;
//   fetch(`https://pokeapi.co/api/v2/pokemon-form/1`).then(renderCard);
// }

// function renderCard({ results }, owner) {
//   const card = results
//     .map(({ sprites, name, weight, height }) => {
//       return `<div class='card'>
//   <div class='card-img-top'>
//     <img
//       class='pokemon-img'
//       src='${sprites}'
//       alt='${name}'
//       id='${id}'
//     />
//   </div>
//   <div class='card-body'>
//     <h2 class='card-title'>Name:${name}</h2>
//     <p class='cardtext'>Weight:${weight}</p>
//     <p class='cardtext'>Height:${height}</p>
//     <p class='cardtext'>Skills</p>
//   </div>
// </div>`;
//     })
//     .join('');
//   gallery.insertAdjacentHTML('beforeend', markup);
// }
