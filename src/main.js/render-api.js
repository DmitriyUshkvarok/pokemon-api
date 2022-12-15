import PokemonCard from '../templates/card-pokemon.hbs';
import './fetch-pokemon';

const refs = {
  searchForm: document.querySelector('.header-search-form'),
  searchBtn: document.querySelector('.search-button'),
  gallery: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const inputSearch = e.currentTarget.elements.searchQuery.value;
  console.log(e);
}
