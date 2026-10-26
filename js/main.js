'use strict';
// The HTML is complete before motion or project filters are enabled.
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-header nav a').forEach(link => {
  if (link.getAttribute('href').split('/').pop() === page) link.setAttribute('aria-current', 'page');
});
const filters = [...document.querySelectorAll('[data-filter]')];
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(other => {
    const active = other === button;
    other.classList.toggle('active', active);
    other.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  document.querySelectorAll('[data-category]').forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) count++;
  });
  const status = document.getElementById('filter-status');
  if (status) status.textContent = `${count} projects shown`;
  window.ScrollTrigger?.refresh();
}));

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
if (gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const soft = 'power3.out';
    const cleanup = new AbortController();
    const intro = document.querySelector('.hero');
    const strip = document.querySelector('.cover-strip');
    const header = document.querySelector('.site-header');
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    header?.appendChild(progress);
    gsap.to(progress, {scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.25}});

    if (intro) {
      // Six seconds overall; all elements settle by 2.9 seconds, then hold.
      const timeline = gsap.timeline({defaults:{ease:soft},onComplete:()=>{intro.dataset.cinemaState='complete';}});
      intro.dataset.cinemaState = 'revealing';
      timeline.fromTo('.portrait-card', {y:64,scale:1.04,rotation:-4,opacity:0,filter:'blur(10px)'}, {y:0,scale:1,rotation:3,opacity:1,filter:'blur(0px)',duration:1.9,clearProps:'filter,opacity'}, 0)
        .fromTo('.availability', {y:20,opacity:0,filter:'blur(5px)'}, {y:0,opacity:1,filter:'blur(0px)',duration:1.1,clearProps:'all'}, .12)
        .fromTo('.hero h1', {y:32,opacity:0,filter:'blur(8px)'}, {y:0,opacity:1,filter:'blur(0px)',duration:1.7,clearProps:'all'}, .3)
        .fromTo('.hero-description', {y:20,opacity:0,filter:'blur(6px)'}, {y:0,opacity:1,filter:'blur(0px)',duration:1.5,clearProps:'all'}, .62)
        .fromTo('.social-row a', {y:24,scale:.98,opacity:0,filter:'blur(5px)'}, {y:0,scale:1,opacity:1,filter:'blur(0px)',duration:1.45,stagger:{each:.07,from:'end'},clearProps:'all'}, .9)
        .fromTo('.hero-showcase', {y:20,opacity:0}, {y:0,opacity:1,duration:1.8,clearProps:'all'}, .2)
        .to({}, {duration:3.1}, 2.9);
    } else {
      const top = document.querySelector('.project-intro, .page-intro, .about-hero');
      if (top) {
        gsap.fromTo([...top.children], {y:24,opacity:0,filter:'blur(7px)'}, {y:0,opacity:1,filter:'blur(0px)',duration:1.45,stagger:.07,ease:soft,clearProps:'all'});
      }
    }

    if (strip) {
      const originals = [...strip.children];
      const clones = originals.map(element => {
        const copy=element.cloneNode(true);copy.alt='';strip.appendChild(copy);return copy;
      });
      let marquee;
      const playMarquee = () => {
        const distance = clones[0].offsetLeft-originals[0].offsetLeft;
        marquee?.kill();
        gsap.set(strip,{xPercent:-50});
        marquee = gsap.fromTo(strip,{x:distance/2},{x:-distance/2,duration:48,repeat:-1,ease:'none'});
      };
      playMarquee();
      let timer;
      window.addEventListener('resize',()=>{clearTimeout(timer);timer=setTimeout(playMarquee,160);},{signal:cleanup.signal,passive:true});
      cleanup.signal.addEventListener('abort',()=>{clearTimeout(timer);marquee?.kill();clones.forEach(clone=>clone.remove());gsap.set(strip,{clearProps:'all'});});
    }

    const reveal = (elements, trigger, stagger=.07) => {
      if (!elements.length) return;
      gsap.fromTo(elements, {y:28,opacity:0,filter:'blur(6px)'}, {y:0,opacity:1,filter:'blur(0px)',duration:1.35,stagger,ease:soft,clearProps:'all',scrollTrigger:{trigger,start:'top 90%',once:true}});
    };
    document.querySelectorAll('.section-heading, .about-teaser, .story-section, .decisions-section, .experience-section, .practice-section, .education-section, .comparison-section, .metrics-section, .contact-top').forEach(section => {
      reveal([...section.children],section,.07);
    });
    document.querySelectorAll('.project-card').forEach((card,index) => {
      const timeline = gsap.timeline({scrollTrigger:{trigger:card,start:'top 94%',once:true},defaults:{ease:soft}});
      timeline.fromTo(card.querySelector('.project-image'),{y:32,scale:.98,opacity:0,filter:'blur(5px)'},{y:0,scale:1,opacity:1,filter:'blur(0px)',duration:1.45,clearProps:'transform,filter,opacity'},index%2===0?.07:0)
        .fromTo(card.querySelector('.card-meta'),{y:20,opacity:0},{y:0,opacity:1,duration:1.1,clearProps:'all'},.2);
    });
    document.querySelectorAll('.case-cover, .project-gallery figure, .comparison-grid figure').forEach(frame => {
      const image=frame.querySelector('img');
      if (!image) return;
      gsap.fromTo(image,{scale:1.04,opacity:.15,filter:'blur(7px)'},{scale:1,opacity:1,filter:'blur(0px)',duration:1.7,ease:soft,clearProps:'all',scrollTrigger:{trigger:frame,start:'top 94%',once:true}});
    });

    const desktop = gsap.matchMedia();
    desktop.add('(min-width: 1025px)',()=>{
      const cases = document.querySelector('.case-section');
      if (cases) {
        ScrollTrigger.create({trigger:cases.querySelector('.section-heading'),start:'top 140px',endTrigger:cases,end:'bottom bottom',pin:true,pinSpacing:false,invalidateOnRefresh:true});
        cases.querySelectorAll('.case-feature').forEach(card=>{
          gsap.fromTo(card,{scale:.94,y:32},{scale:1,y:0,ease:'none',scrollTrigger:{trigger:card,start:'top 95%',end:'top 42%',scrub:.8}});
        });
      }
    });
    const pointerMedia=gsap.matchMedia();
    pointerMedia.add('(hover: hover) and (pointer: fine)',()=>{
      const controller=new AbortController();
      document.querySelectorAll('.project-image').forEach(surface=>{
        const tiltX=gsap.quickTo(surface,'rotationX',{duration:.65,ease:'power3.out'});
        const tiltY=gsap.quickTo(surface,'rotationY',{duration:.65,ease:'power3.out'});
        gsap.set(surface,{transformPerspective:1100});
        surface.addEventListener('pointermove',event=>{
          const rect=surface.getBoundingClientRect();
          const x=(event.clientX-rect.left)/rect.width, y=(event.clientY-rect.top)/rect.height;
          surface.style.setProperty('--pointer-x',`${x*100}%`);
          surface.style.setProperty('--pointer-y',`${y*100}%`);
          tiltX((.5-y)*3);tiltY((x-.5)*3);
        },{signal:controller.signal});
        surface.addEventListener('pointerleave',()=>{tiltX(0);tiltY(0);},{signal:controller.signal});
      });
      return ()=>controller.abort();
    });
    document.fonts?.ready.then(()=>ScrollTrigger.refresh());
    window.addEventListener('load',()=>ScrollTrigger.refresh(),{signal:cleanup.signal,once:true});
    return ()=>{cleanup.abort();desktop.revert();pointerMedia.revert();progress.remove();intro?.removeAttribute('data-cinema-state');};
  });
}
