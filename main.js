// Year
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('.footer');
  if (footer && !footer.textContent.includes(new Date().getFullYear())) {
    footer.innerHTML = footer.innerHTML.replace('Miguel A. Jesús', `Miguel A. Jesús • ${new Date().getFullYear()}`);
  }
});

// Smooth scroll + active states
document.querySelectorAll('.topnav a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    if(a.classList.contains('btn')) return;
    e.preventDefault();
    const id = a.getAttribute('href');
    document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
    history.pushState(null,'',id);
  });
});

// Tabs (Experience)
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
tabs.forEach(t=>{
  t.addEventListener('click', ()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    panels.forEach(p=>p.classList.remove('active'));
    t.classList.add('active');
    const panel = document.getElementById(t.dataset.target);
    if(panel) panel.classList.add('active');
  });
});
