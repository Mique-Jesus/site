// Minimal JS: set year, smooth scroll & active section highlighting
document.getElementById('year').textContent = new Date().getFullYear();

const links = document.querySelectorAll('.nav a');
links.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
    history.pushState(null, '', id);
  });
});

// Intersection Observer to underline active section link
const sections = [...document.querySelectorAll('main .section')];
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const id = '#' + entry.target.id;
    const link = document.querySelector(`.nav a[href="${id}"]`);
    if(link){
      if(entry.isIntersecting){ links.forEach(l=>l.classList.remove('active')); link.classList.add('active'); }
    }
  });
}, {rootMargin:'-40% 0px -55% 0px', threshold:0});
sections.forEach(s=>obs.observe(s));
