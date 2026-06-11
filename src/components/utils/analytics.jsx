export const setupGoogleAnalytics = () => {
  const scriptGtag = document.createElement('script');
  scriptGtag.async = true;
  scriptGtag.src = 'https://www.googletagmanager.com/gtag/js?id=G-VECW1H30NP';
  document.head.appendChild(scriptGtag);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-VECW1H30NP');

  window.gtag = gtag;
};
