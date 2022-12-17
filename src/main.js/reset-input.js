import { refs } from './render-api';

export function onResetSearch() {
  refs.gallery.innerHTML = '';
  refs.gallery.classList.remove('show');
  refs.searchBtn.classList.remove('open');
}
