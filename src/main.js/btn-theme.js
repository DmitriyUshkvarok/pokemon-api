const btnTheme = document.querySelector('.toggle-theme-btn');

btnTheme.addEventListener('click', onClickTheme);

function onClickTheme() {
  btnTheme.classList.toggle('show');
  document.body.classList.toggle('show');
}
