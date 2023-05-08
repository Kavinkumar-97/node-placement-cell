(() => {
  const menuButton = document.getElementsByClassName('menu-btn')[0];
  const menuActions = document.getElementsByClassName('header-actions')[0];

  menuButton.addEventListener('click', (event) => {
    menuButton.classList.toggle('open');
    menuActions.classList.toggle('open');
  });
})();
