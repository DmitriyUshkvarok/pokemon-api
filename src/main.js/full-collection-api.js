import axios from 'axios';
import resultApi from '../templates/results-api.hbs';
import { refs } from './render-api';
// import InfiniteScroll from 'infinite-scroll';

async function getFullInfo(urlArray) {
  const results = await Promise.all(urlArray);
  return results;
}
let page = '';

function fullFetch() {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon-form/?limit=50&offset=${page}`)
    .then(response => response.data.results)
    .then(async fullCollection => {
      const urls = fullCollection.map(({ url }) => url);
      const data = await getFullInfo(
        urls.map(el => axios.get(el).then(response => response.data))
      );
      page = 1;
      const markupColection = resultApi({ results: data });
      refs.gallery.classList.add('show');
      refs.gallery.innerHTML = markupColection;

      if (!data) {
        refs.gallery.classList.remove('show');
      }
    });
}
fullFetch();

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 0.5,
};
const observer = new IntersectionObserver(onLoadPokemonCards, options);
const target = document.querySelector('.target');

function onLoadPokemonCards(entries) {
  entries.forEach(entry => {
    page += 1;
    if (entry.isIntersecting) {
      // как сюда передать гет запрос который связан с promise.all что бы реализовать бесконечный скролл
    }
  });
}
observer.observe(document.querySelector('.target'));
