import pokemonCard from '../templates/card-pokemon.hbs';
import { fetchPokemonApi } from './fetch-pokemon';
import { Notify } from 'notiflix';
import { onResetSearch } from './reset-input';
import listPokemon from '../templates/list-pokemon.hbs';
import debounce from 'lodash.debounce';

export const refs = {
  searchForm: document.querySelector('.header-search-form'),
  searchBtn: document.querySelector('.search-button'),
  gallery: document.querySelector('.gallery'),
  listItem: document.querySelector('.list-markup'),
  searchInput: document.querySelector('.search-input'),
};

refs.searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  refs.searchBtn.classList.add('open');
  const inputSearch = e.currentTarget.elements.searchQuery.value.trim();
  if (!inputSearch) {
    onResetSearch();
    return Notify.info('enter the name or id of the pokemon');
  }

  fetchPokemonApi(inputSearch).then(onShowGallery).catch(onError);
}

function onShowGallery(ownerApi) {
  const markup = pokemonCard(ownerApi);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  refs.gallery.classList.add('show');
}

function onError() {
  Notify.failure('Qui timide rogat docet negare');
}