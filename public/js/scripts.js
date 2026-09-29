
document.addEventListener('DOMContentLoaded', () => {

  const burger = document.getElementById('navbar-burger');
  burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      document.getElementById(burger.dataset.target).classList.toggle('is-active');
  });
  
  // Get all "menu-item" elements
  const $menuItems = Array.prototype.slice.call(document.querySelectorAll('.menu-item'), 0);

  // Add a click event on each of them
  $menuItems.forEach( el => {
    el.addEventListener('click', () => {

      burger.classList.toggle('is-active');
      document.getElementById(burger.dataset.target).classList.toggle('is-active');

    });
  });

});