'use strict';
// Apply a stored preference consistently across pages, with system preference as the default.
const themeButton = document.querySelector('.theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const updateThemeButton = () => {
  const dark=document.documentElement.dataset.theme==='dark';
  themeButton?.setAttribute('aria-pressed',String(dark));
  themeButton?.setAttribute('aria-label',`Switch to ${dark?'light':'dark'} mode`);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#141217':'#ffffff');
};
updateThemeButton();
themeButton?.addEventListener('click',()=>{
  const value=document.documentElement.dataset.theme==='dark'?'light':'dark';
  document.documentElement.dataset.theme=value;
  try{localStorage.setItem('ahmed-theme',value);}catch(error){/* Theme still works without storage. */}
  updateThemeButton();
});
systemTheme.addEventListener('change',event=>{
  let stored=null;try{stored=localStorage.getItem('ahmed-theme');}catch(error){/* Use system preference. */}
  if(!stored){document.documentElement.dataset.theme=event.matches?'dark':'light';updateThemeButton();}
});
const lens=document.querySelector('.lens-stage');
if(lens){
  const buttons=[...document.querySelectorAll('[data-lens-mode]')];
  const status=document.querySelector('.lens-status');
  const pointer=window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,inside=false;
  let mouse={x:0,y:0},smooth={x:0,y:0},grid={x:0,y:0};
  const size=()=>{
    const rect=lens.getBoundingClientRect();
    mouse={x:rect.width/2,y:rect.height/2};smooth={...mouse};
    lens.style.setProperty('--lens-radius',`${Math.round(Math.min(420,Math.max(160,window.innerWidth*.16)))}px`);
    lens.style.setProperty('--grid-cell',`${Math.round(Math.min(64,Math.max(36,window.innerWidth*.028)))}px`);
    lens.style.setProperty('--lens-x',`${smooth.x}px`);lens.style.setProperty('--lens-y',`${smooth.y}px`);
  };
  const setMode=mode=>{
    if(mode==='lens'&&(!pointer.matches||reduced.matches))mode='new';
    lens.dataset.lensState=mode;
    buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lensMode===mode)));
    status.textContent=mode==='lens'?'Move your pointer across the image to reveal v2.0. You can also select either complete design.':mode==='new'?'Showing the complete Simlo v2.0 redesign.':'Showing the complete earlier Simlo design.';
    if(mode!=='lens'){cancelAnimationFrame(frame);frame=0;}
  };
  const draw=()=>{
    frame=0;
    if(lens.dataset.lensState!=='lens'||!inside||reduced.matches)return;
    smooth.x+=(mouse.x-smooth.x)*.1;smooth.y+=(mouse.y-smooth.y)*.1;
    const rect=lens.getBoundingClientRect();
    const tx=(smooth.x/rect.width-.5)*16,ty=(smooth.y/rect.height-.5)*16;
    grid.x+=(tx-grid.x)*.06;grid.y+=(ty-grid.y)*.06;
    lens.style.setProperty('--lens-x',`${smooth.x}px`);lens.style.setProperty('--lens-y',`${smooth.y}px`);
    lens.style.setProperty('--grid-x',`${grid.x}px`);lens.style.setProperty('--grid-y',`${grid.y}px`);
    if(Math.abs(mouse.x-smooth.x)+Math.abs(mouse.y-smooth.y)+Math.abs(tx-grid.x)+Math.abs(ty-grid.y)>.1)frame=requestAnimationFrame(draw);
  };
  const move=event=>{
    if(!pointer.matches)return;
    const rect=lens.getBoundingClientRect();mouse={x:event.clientX-rect.left,y:event.clientY-rect.top};inside=true;
    if(!frame&&lens.dataset.lensState==='lens')frame=requestAnimationFrame(draw);
  };
  lens.addEventListener('pointermove',move,{passive:true});
  lens.addEventListener('pointerleave',()=>{inside=false;cancelAnimationFrame(frame);frame=0;});
  buttons.forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.lensMode)));
  pointer.addEventListener('change',()=>setMode(pointer.matches&&!reduced.matches?'lens':'new'));
  reduced.addEventListener('change',()=>setMode(reduced.matches?'new':pointer.matches?'lens':'new'));
  new ResizeObserver(size).observe(lens);
  size();setMode(pointer.matches&&!reduced.matches?'lens':'new');
}
let projectOpener=null;
document.querySelectorAll('[data-open-project]').forEach(button=>button.addEventListener('click',()=>{
  const dialog=document.getElementById(button.dataset.openProject);
  if(!dialog)return;
  projectOpener=button;dialog.showModal();document.body.classList.add('drawer-open');
}));
document.querySelectorAll('.project-drawer').forEach(dialog=>{
  dialog.querySelector('[data-close-project]')?.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{
    const rect=dialog.getBoundingClientRect();
    if(event.target===dialog&&(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom))dialog.close();
  });
  dialog.addEventListener('close',()=>{document.body.classList.remove('drawer-open');projectOpener?.focus();});
});
