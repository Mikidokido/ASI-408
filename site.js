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
  // Load an external Bilibili player only after a visitor chooses to play.
  // The direct source link in each caption remains available if embedding is blocked.
  document.querySelectorAll('.video-launch[data-bvid]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.bvid;
      if (!/^BV[A-Za-z0-9]{10}$/.test(id)) return;
      const frame = button.closest('.video-frame');
      if (!frame) return;
      const iframe = document.createElement('iframe');
      iframe.src = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(id)}&autoplay=0&high_quality=1`;
      iframe.loading = 'lazy';
      iframe.title = button.getAttribute('aria-label') || 'Bilibili demonstration video';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      frame.replaceChildren(iframe);
    });
  });
  // Native image links open the original report figure; no external libraries required.
})();

// Homepage 3D model: no broken viewer when the GLB has not been uploaded yet.
(function () {
  const mount = document.getElementById('home-model-slot');
  if (mount && mount.dataset.modelUrl) {
    const modelUrl = new URL(mount.dataset.modelUrl, document.baseURI).href;
    fetch(modelUrl, {method: 'HEAD', cache: 'no-store'}).then(response => {
      if (!response.ok) return;
      const moduleTag = document.createElement('script');
      moduleTag.type = 'module';
      moduleTag.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      document.head.appendChild(moduleTag);
      const viewer = document.createElement('model-viewer');
      viewer.src = modelUrl;
      viewer.setAttribute('camera-controls', '');
      viewer.setAttribute('auto-rotate', '');
      viewer.setAttribute('rotation-per-second', '18deg');
      viewer.setAttribute('shadow-intensity', '0.7');
      viewer.setAttribute('exposure', '0.95');
      viewer.setAttribute('interaction-prompt', 'auto');
      viewer.setAttribute('alt', 'Interactive 3D CAD assembly of the ASI-408 RoboMaster Heavy Robot; drag to rotate, scroll to zoom.');
      viewer.addEventListener('error', () => { viewer.remove(); mount.querySelector('.hero-cad-poster').style.display = ''; });
      const poster = mount.querySelector('.hero-cad-poster');
      if (poster) poster.style.display = 'none';
      mount.appendChild(viewer);
      mount.classList.add('model-live');
      const status = mount.querySelector('.hero-model-status');
      if (status) status.innerHTML = '<span class="status-dot"></span> INTERACTIVE · DRAG TO ROTATE';
      const caption = mount.parentElement.querySelector('.model-caption-text');
      if (caption) caption.textContent = 'Interactive 3D CAD model · Rotate, pan and zoom';
      const help = mount.parentElement.querySelector('.model-help');
      if (help) help.textContent = 'Model viewer loaded from the ASI-408 GitHub repository.';
    }).catch(() => { /* Keep the actual CAD image until a GLB exists. */ });
  }
  const photo = document.getElementById('author-portrait');
  if (photo && photo.dataset.portraitUrl) {
    const photoUrl = new URL(photo.dataset.portraitUrl, document.baseURI).href;
    fetch(photoUrl, {method: 'HEAD'}).then(response => {
      if (response.ok) {
        photo.src = photoUrl;
        photo.alt = 'Portrait of Cheng Yi, author of the ASI-408 project';
        const note = photo.closest('.author-photo-frame')?.querySelector('.photo-note');
        if (note) note.textContent = 'Project author · Cheng Yi';
      }
    }).catch(() => {});
  }
})();
