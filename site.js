(() => {
  const topButton = document.querySelector('.scroll-top');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  function updateScroll() { if (topButton) topButton.classList.toggle('visible', window.scrollY > 450); }
  window.addEventListener('scroll', updateScroll, { passive: true }); updateScroll();
  topButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  menu?.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!expanded));
    nav?.classList.toggle('open', !expanded);
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false');
  }));
  // Keep chapter navigation in sync with the actual visible heading.
  const tocLinks = [...document.querySelectorAll('.local-toc a[href^="#"]')];
  if ('IntersectionObserver' in window && tocLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
      if (!visible.length) return;
      const id = visible[0].target.id;
      tocLinks.forEach(a => a.classList.toggle('selected',a.hash === '#' + id));
    }, {rootMargin: '-12% 0px -74% 0px', threshold: 0});
    tocLinks.forEach(a => {const target=document.getElementById(decodeURIComponent(a.hash.slice(1)));if(target)observer.observe(target);});
  }
  // Native image links open the original report figure; no external libraries required.
})();
