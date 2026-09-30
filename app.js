'use strict';
const config=window.PORTFOLIO_CONFIG;
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');}
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
window.matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const links=[...nav.querySelectorAll('a')];
const sections=links.map(a=>document.getElementById(a.dataset.section));
let scrollPending=false;
function markSection(){let current=sections[0];for(const section of sections){if(section.getBoundingClientRect().top<=window.innerHeight*.35)current=section;}
 if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-35)current=sections.at(-1);
 links.forEach(a=>{const active=a.dataset.section===current.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});scrollPending=false;}
window.addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(markSection);}},{passive:true});markSection();
const motion=window.matchMedia('(prefers-reduced-motion:reduce)');
if(!motion.matches&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));document.documentElement.classList.add('motion-ready');motion.addEventListener('change',e=>{if(e.matches){document.documentElement.classList.remove('motion-ready');observer.disconnect();}});}
const portrait=document.querySelector('.portrait-area');
portrait.addEventListener('pointermove',e=>{if(motion.matches||e.pointerType!=='mouse')return;const r=portrait.getBoundingClientRect();portrait.style.setProperty('--px',`${((e.clientX-r.left)/r.width-.5)*8}px`);portrait.style.setProperty('--py',`${((e.clientY-r.top)/r.height-.5)*8}px`);});
portrait.addEventListener('pointerleave',()=>{portrait.style.setProperty('--px','0px');portrait.style.setProperty('--py','0px');});
if(config.behance&&/^https:\/\/(www\.)?behance\.net\//i.test(config.behance)){document.querySelectorAll('.optional-behance').forEach(el=>{const a=document.createElement('a');a.className='social';a.href=config.behance;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Bē Behance';el.replaceWith(a);});}
const form=document.getElementById('contact-form');
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const subject=`Contato pelo portfólio — ${data.get('name').trim()}`;const body=`Nome: ${data.get('name').trim()}\nE-mail: ${data.get('email').trim()}\n\n${data.get('message').trim()}`;window.location.href=`mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;document.getElementById('form-status').textContent='Continue o envio no seu aplicativo de e-mail. Se ele não abrir, escreva diretamente para '+config.email+'. Sua mensagem permanece aqui.';});
