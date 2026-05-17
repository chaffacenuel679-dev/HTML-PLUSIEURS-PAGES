const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; });
(function animCursor(){
  if(cur){ cur.style.left=mx+'px'; cur.style.top=my+'px'; }
  rx+=(mx-rx).12; ry+=(my-ry).12;
  if(ring){ ring.style.left=rx+'px'; ring.style.top=ry+'px'; }
  requestAnimationFrame(animCursor);
})();

const navbar = document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  if(navbar) navbar.classList.toggle('scrolled', window.scrollY>60);
});

const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a=>{
  if(a.getAttribute('href')===page) a.classList.add('active');
});

const toggle = document.getElementById('navToggle');
if(toggle){
  toggle.addEventListener('click',()=>{
    document.getElementById('navbar').classList.toggle('nav-open');
  });
}

const revealEls = document.querySelectorAll('.reveal');
const revealIO  = new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      e.target.style.transitionDelay=(i%5)*.1+'s';
      e.target.classList.add('visible');
    }
  });
},{threshold:.1});
revealEls.forEach(el=>revealIO.observe(el));

const barIO = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const bar=e.target.querySelector('.skill-bar');
      if(bar) bar.style.transform=scaleX(${getComputedStyle(bar).getPropertyValue('--w')||.7});
    }
  });
},{threshold:.25});
document.querySelectorAll('.skill-card').forEach(c=>barIO.observe(c));

window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  document.querySelectorAll('.blob').forEach((b,i)=>{
    b.style.transform=translateY(${y*(i%2===0?.07:-.05)}px);
  });
});