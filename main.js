// Canvas particle network
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };
const PARTICLE_COUNT = 120;
const LINK_DIST = 120;

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize); resize();

function Particle(){
  this.x = Math.random()*canvas.width;
  this.y = Math.random()*canvas.height;
  this.vx = (Math.random() - 0.5) * 0.6;
  this.vy = (Math.random() - 0.5) * 0.6;
  this.r = 1.4 + Math.random()*1.1;
}
Particle.prototype.update = function(){
  this.x += this.vx; this.y += this.vy;
  if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
  if(this.y < 0 || this.y > canvas.height) this.vy *= -1;
}
Particle.prototype.draw = function(){
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
  ctx.fillStyle = '#a5b4fc';
  ctx.fill();
}

function init(){
  particles = Array.from({length: PARTICLE_COUNT}, () => new Particle());
}
init();

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // glow background
  const grad = ctx.createRadialGradient(mouse.x||canvas.width*0.6, mouse.y||canvas.height*0.3, 10, canvas.width/2, canvas.height/2, Math.max(canvas.width, canvas.height));
  grad.addColorStop(0, 'rgba(0,209,255,0.06)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad; ctx.fillRect(0,0,canvas.width,canvas.height);

  for(let p of particles){ p.update(); p.draw(); }
  // links
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.hypot(dx, dy);
      if(d < LINK_DIST){
        ctx.strokeStyle = `rgba(0,209,255, ${1 - d/LINK_DIST})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
  }
  // mouse links
  if(mouse.x !== null){
    for(let p of particles){
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d = Math.hypot(dx, dy);
      if(d < LINK_DIST){
        ctx.strokeStyle = `rgba(96,165,250, ${1 - d/LINK_DIST})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('mouseleave', () => { mouse.x = mouse.y = null; });

// Typed effect
const typedEl = document.querySelector('.typed');
const phrases = [
  'Impact evaluations with causal rigor.',
  'Explainable AI for policy decisions.',
  'Dashboards that drive action.',
  'Clean, reliable, reproducible data.'
];
let pi = 0, ci = 0, deleting = false;
function type(){
  const p = phrases[pi];
  if(!deleting){
    ci++; typedEl.textContent = p.slice(0,ci);
    if(ci === p.length){ deleting = true; setTimeout(type, 1200); return; }
  }else{
    ci--; typedEl.textContent = p.slice(0,ci);
    if(ci === 0){ deleting = false; pi = (pi+1)%phrases.length; }
  }
  setTimeout(type, deleting ? 30 : 50);
}
type();

// Theme toggle
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  toggle.textContent = document.documentElement.classList.contains('light') ? '🌞' : '🌙';
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
