import anime from 'animejs';
import { refs } from './render-api';

refs.searchBtn.addEventListener('click', onOpenSearch);

function onOpenSearch() {
  refs.searchBtn.classList.add('open');
}

anime({
  targets: '.search-button',
  scale: 1.2,
  direction: 'alternate',
  loop: true,
  easing: 'linear',
  duration: 1000,
});
