
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

  // Load the YouTube player only when someone clicks the video thumbnail
  document.querySelectorAll('.video-facade').forEach(figure => {
    const button = figure.querySelector('.video-play');
    if (!button) return;
    button.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.className = 'has-ratio';
      iframe.width = 640;
      iframe.height = 360;
      iframe.src = 'https://www.youtube.com/embed/' + encodeURIComponent(figure.dataset.videoId) + '?rel=0&autoplay=1';
      iframe.title = 'YouTube video player';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      figure.replaceChildren(iframe);
    });
  });

});