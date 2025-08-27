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

// Hero rotating word: DATA → AI → TECH
const rot = document.getElementById('rotatingWord');
if (rot) {
  const words = ['data', 'AI', 'tech'];
  let i = 0;
  rot.textContent = words[i]; // ya es DATA por HTML, pero aseguramos

  setInterval(() => {
    rot.classList.add('fade');      // anima salida
    setTimeout(() => {
      i = (i + 1) % words.length;
      rot.textContent = words[i];   // cambia palabra
      rot.classList.remove('fade'); // anima entrada
    }, 220); // coincide con el transition del CSS
  }, 2000); // cambia cada 2s (ajusta a gusto)
}

// ===== Vanta Globe en el hero, con colores del tema =====
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Helpers: lee variables CSS y convier­te HEX -> int
  const css = getComputedStyle(document.documentElement);
  const toInt = hex => parseInt(hex.replace('#',''), 16);

  // Colores desde tus tokens (fallback a los del diseño)
  const GREEN = (css.getPropertyValue('--green').trim() || '#64ffda');
  const NAVY  = (css.getPropertyValue('--navy') .trim() || '#0a192f');

  // Montamos en el contenedor del hero
  const heroEl = document.querySelector('.hero');
  if (!heroEl || !window.VANTA || !window.THREE) return;

  // Inicia Vanta
  const effect = VANTA.GLOBE({
    el: heroEl,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.0,
    scaleMobile: 1.0,

    // Estética: mismo verde para puntos y aristas
    color: toInt(GREEN),       // puntos
    color2: toInt(GREEN),      // líneas
    backgroundColor: toInt(NAVY),

    // Ajustes finos de look & rendimiento
    size: 0.9,                 // tamaño del “punto” (0.6–1.2)
  });

  // Limpieza opcional (si alguna vez desmontas el hero)
  window.addEventListener('beforeunload', () => {
    try { effect?.destroy(); } catch(e){}
  });
  
  // ===== Slider autoplay (Medium Series) =====
(function(){
  const slider = document.getElementById('mediumSlider');
  if(!slider) return;

  const slides = Array.from(slider.querySelectorAll('img'));
  const dots   = Array.from(slider.querySelectorAll('.slider-dots button'));
  if(slides.length === 0) return;

  // estado
  let i = 0, timer = null;
  const AUTOPLAY_MS = 3500;

  function show(n){
    i = (n + slides.length) % slides.length;
    slides.forEach((img, idx)=> img.classList.toggle('active', idx === i));
    dots.forEach((d,   idx)=> d.classList.toggle('active', idx === i));
  }

  function play(){
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    stop();
    timer = setInterval(()=> show(i+1), AUTOPLAY_MS);
  }
  function stop(){ if(timer){ clearInterval(timer); timer = null; } }

  // init
  slides[0].classList.add('active');
  dots[0]?.classList.add('active');
  play();

  // interacciones
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', play);
  document.addEventListener('visibilitychange', ()=> document.hidden ? stop() : play() );

  // navegación por dots
  dots.forEach((btn, idx)=> btn.addEventListener('click', ()=> { show(idx); play(); }));

  // teclado (izq/der) cuando el slider tiene foco
  slider.tabIndex = 0;
  slider.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowRight') { show(i+1); play(); }
    if(e.key === 'ArrowLeft')  { show(i-1); play(); }
  });
})();

