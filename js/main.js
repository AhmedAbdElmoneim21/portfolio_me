'use strict';
// Navigation and filters enhance content that is already available in HTML.
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-header nav a').forEach(link => {
  if (link.getAttribute('href').split('/').pop() === page) link.setAttribute('aria-current', 'page');
});
const filters = document.querySelectorAll('[data-filter]');
filters.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filters.forEach(other => {
    const active = other === button;
    other.classList.toggle('active', active);
    other.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  document.querySelectorAll('[data-category]').forEach(card => {
    const visible = selected === 'all' || card.dataset.category === selected;
    card.hidden = !visible;
    if (visible) count++;
  });
  const status = document.getElementById('filter-status');
  if (status) status.textContent = `${count} projects shown`;
}));
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const targets = document.querySelectorAll('.section-heading, .case-feature, .story-label, .practice-grid article');
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  targets.forEach(target => { target.classList.add('reveal'); observer.observe(target); });
}

// Keep real text in the accessibility tree while animating its visual copy.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!motionPreference.matches && 'animate' in Element.prototype) {
  const easing = 'cubic-bezier(.22,1,.36,1)';
  const animateText = (element, delay = 0) => {
    if (element.dataset.animated) return;
    element.dataset.animated = 'true';
    const visible = document.createElement('span');
    visible.setAttribute('aria-hidden', 'true');
    const accessible = document.createElement('span');
    accessible.className = 'sr-only';
    accessible.textContent = element.innerText.replace(/\s+/g, ' ').trim();
    const fragment = document.createDocumentFragment();
    let index = 0;
    for (const child of [...element.childNodes]) {
      if (child.nodeType !== Node.TEXT_NODE) {
        fragment.appendChild(child);
        continue;
      }
      for (const word of child.textContent.split(/(\s+)/)) {
        if (!word.trim()) { fragment.appendChild(document.createTextNode(word)); continue; }
        const wrap = document.createElement('span');
        wrap.className = 'motion-word';
        for (const letter of word) {
          const char = document.createElement('span');
          char.textContent = letter;
          char.className = 'motion-char';
          wrap.appendChild(char);
          char.animate([{opacity:0,transform:'translateY(65%) rotate(5deg)',filter:'blur(5px)'},{opacity:1,transform:'translateY(0) rotate(0)',filter:'blur(0)'}], {duration:650,delay:delay + index++ * 15,easing,fill:'backwards'});
        }
        fragment.appendChild(wrap);
      }
    }
    visible.appendChild(fragment);
    element.replaceChildren(accessible, visible);
  };
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    animateText(heroTitle, 100);
    document.querySelectorAll('.availability, .hero-description, .social-row a').forEach((element, i) => {
      element.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:850,delay:100+i*90,easing,fill:'backwards'});
    });
    document.querySelector('.portrait-card')?.animate([{opacity:0,transform:'translateY(70px) rotate(-8deg) scale(.9)'},{opacity:1,transform:'translateY(0) rotate(3deg) scale(1)'}],{duration:1200,delay:350,easing,fill:'backwards'});
  }
  const titleObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { animateText(entry.target); titleObserver.unobserve(entry.target); }
  }), {threshold:.3});
  document.querySelectorAll('.section-heading h2, .about-teaser h2, .contact h2').forEach(element=>titleObserver.observe(element));
  const cards = document.querySelectorAll('.project-card, .case-feature, .metrics-grid article');
  const cardObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.children];
    entry.target.animate([{opacity:0,transform:'translateY(50px) scale(.97)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:900,delay:(siblings.indexOf(entry.target)%2)*110,easing,fill:'backwards'});
    cardObserver.unobserve(entry.target);
  }),{threshold:.08});
  cards.forEach(card=>cardObserver.observe(card));
  const strip = document.querySelector('.cover-strip');
  if (strip) {
    const originals = [...strip.children];
    originals.forEach(element=>{ const copy=element.cloneNode(true);copy.alt='';strip.appendChild(copy); });
    const startMarquee = () => {
      const distance = originals.reduce((sum,element)=>sum+element.getBoundingClientRect().width,0)+originals.length*parseFloat(getComputedStyle(strip).gap);
      strip.getAnimations().forEach(animation=>animation.cancel());
      strip.animate([{transform:`translateX(calc(-50% + ${distance/2}px)) rotate(-2deg)`},{transform:`translateX(calc(-50% - ${distance/2}px)) rotate(-2deg)`}],{duration:42000,iterations:Infinity,easing:'linear'});
    };
    startMarquee();
    let resizeTimer;
    window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(startMarquee,150);},{passive:true});
  }
  // Honour a preference change without waiting for another page load.
  motionPreference.addEventListener('change',event=>{if(event.matches) document.getAnimations().forEach(animation=>animation.cancel());});
}
