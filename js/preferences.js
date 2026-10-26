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
