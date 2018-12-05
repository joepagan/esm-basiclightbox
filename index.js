const getLightboxStyles = () => import(/* webpackChunkName: "basiclightboxCss" */ 'basiclightbox/dist/basicLightbox.min.css');
const getLightbox = () => import(/* webpackChunkName: "basiclightbox" */ 'basiclightbox');

export function linkImageLightbox(selector) {
  const links = document.querySelectorAll(selector);
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      Promise.all([
        getLightbox(),
        getLightboxStyles(),
      ]).then(([basicLightbox]) => {
        const instance = basicLightbox.create(`<img src="${href}" alt="">`);
        instance.show();
      });
      return false;
    });
  });
}

export function linkIframeLightbox(selector) {
  const links = document.querySelectorAll(selector);
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      const videoId = href.match(/v=(.*)&?/)[1];
      Promise.all([
        getLightbox(),
        getLightboxStyles(),
      ]).then(([basicLightbox]) => {
        const instance = basicLightbox.create(`<iframe width="960" height="540" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);
        instance.show();
      });
      return false;
    });
  });
}
