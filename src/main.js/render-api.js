import pokemonCard from '../templates/card-pokemon.hbs';
import { fetchPokemonApi } from './fetch-pokemon';
import { Notify } from 'notiflix';
import { onResetSearch } from './reset-input';

export const refs = {
  searchForm: document.querySelector('.header-search-form'),
  searchBtn: document.querySelector('.search-button'),
  gallery: document.querySelector('.gallery'),
  listItem: document.querySelector('.list-markup'),
  searchInput: document.querySelector('.search-input'),
  cardAll: document.querySelector('.card-all'),
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
  if (inputSearch) {
    refs.gallery.innerHTML = '';
    refs.gallery.classList.remove('show');
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
