// Canvas particle network + features
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

function init(){ particles = Array.from({length: PARTICLE_COUNT}, () => new Particle()); }
init();

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const grad = ctx.createRadialGradient(mouse.x||canvas.width*0.6, mouse.y||canvas.height*0.3, 10, canvas.width/2, canvas.height/2, Math.max(canvas.width, canvas.height));
  grad.addColorStop(0, 'rgba(0,209,255,0.06)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad; ctx.fillRect(0,0,canvas.width,canvas.height);

  for(let p of particles){ p.update(); p.draw(); }
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.hypot(dx, dy);
      if(d < LINK_DIST){
        ctx.strokeStyle = `rgba(0,209,255, ${1 - d/LINK_DIST})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
  }

  if(mouse.x !== null){
    for(let p of particles){
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d = Math.hypot(dx, dy);
      if(d < LINK_DIST){
        ctx.strokeStyle = `rgba(96,165,250, ${1 - d/LINK_DIST})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
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
const phrases = {
  en: [
    'Impact evaluations with causal rigor.',
    'Explainable AI for policy decisions.',
    'Dashboards that drive action.',
    'Clean, reliable, reproducible data.'
  ],
  es: [
    'Evaluaciones de impacto con rigor causal.',
    'IA explicable para decisiones públicas.',
    'Tableros que impulsan la acción.',
    'Datos limpios, confiables y reproducibles.'
  ]
};
let lang = (localStorage.getItem('lang') || 'en');
let pi = 0, ci = 0, deleting = false;
function type(){
  const p = phrases[lang][pi];
  if(!deleting){
    ci++; typedEl.textContent = p.slice(0,ci);
    if(ci === p.length){ deleting = true; setTimeout(type, 1200); return; }
  }else{
    ci--; typedEl.textContent = p.slice(0,ci);
    if(ci === 0){ deleting = false; pi = (pi+1)%phrases[lang].length; }
  }
  setTimeout(type, deleting ? 30 : 50);
}
type();

// Theme toggle (light/dark)
const toggle = document.getElementById('themeToggle');
function applyTheme(){
  if(localStorage.getItem('theme') === 'light'){
    document.documentElement.classList.add('light');
    toggle.textContent = '🌞';
  }else{
    document.documentElement.classList.remove('light');
    toggle.textContent = '🌙';
  }
}
toggle.addEventListener('click', () => {
  const next = localStorage.getItem('theme') === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme();
});
applyTheme();

// i18n (EN/ES)
const i18n = {
  en: {
    "brand":"Miguel A. Jesús","actions.cv":"Download CV",
    "hero.title":"Data & AI for Public Value",
    "hero.lead":"I build data products and evaluation systems for integrity, justice, and development.",
    "hero.cta1":"Experience","hero.cta2":"Writing","hero.cta3":"Contact",
    "meta.location":"Lima, Peru",
    "focus.title":"Focus Areas","focus.a":"Impact Evaluation & MERL","focus.b":"Applied AI & Analytics","focus.c":"Public Integrity & Justice","focus.d":"Data Visualization",
    "toolbox.title":"Toolbox","exp.title":"Experience","now":"Now",
    "exp.1.role":"Senior Consultant — Public Prosecutor's Office (Peru)",
    "exp.1.a":"Designed and implemented evaluation methodologies, including AI to improve performance measurement for 5,000+ prosecutorial staff nationwide.",
    "exp.1.b":"Built performance evaluation systems for the General Secretariat administrative staff.",
    "exp.1.c":"Led CICME interdepartmental coordination on data management and dissemination for justice services.",
    "exp.2.role":"Integrity Specialist — USAID / Chemonics",
    "exp.2.a":"Supported implementation of the Public Integrity Model and evaluated via the Preventive Capacity Index.",
    "exp.2.b":"Designed quant & qual instruments for the Transparent Public Investment (TPI) project.",
    "exp.2.c":"Co-authored technical guides, reports, and methodologies for regional partners.",
    "exp.3.role":"Technical Specialist — Judicial Branch (Peru)",
    "exp.3.a":"Produced statistical productivity/efficiency reports; identified improvements in 60%+ of courts.",
    "exp.3.b":"Developed quantitative methodologies; groundwork for non-jurisdictional performance evaluation.",
    "exp.3.c":"Led a Tech Innovation Lab; 80% delivery of software/app initiatives.",
    "exp.3.d":"Pushed upgrades to the Project Registration & Tracking System; 75% of proposals adopted.",
    "exp.4.role":"Quantitative Consultant — Presidency of the Council of Ministers (Peru)",
    "exp.4.a":"Analyzed monthly data from 100+ entities for National Integrity Policy compliance.",
    "exp.4.b":"Built Tableau dashboards reaching 300+ users.",
    "exp.4.c":"Co-developed Preventive Capacity Index methodology and a national web tool (100% deployed).",
    "exp.4.d":"Audited the national SQL database on Sworn Statements; proposed data-quality actions.",
    "exp.5.role":"Technical Analyst — Presidency of the Council of Ministers (Peru)",
    "exp.5.a":"Produced statistical reports on investment budget transfers for ministers and governors.",
    "exp.5.b":"Automated consistency checks with VBA for reporting pipelines.",
    "exp.6.role":"Quantitative Consultant — Ministry of Labor and Employment Promotion",
    "exp.6.a":"Optimized audit mobility scheduling with geospatial analysis (+15% audits; significant fuel savings).",
    "exp.6.b":"Identified procurement cost overruns (>US$100k savings).",
    "exp.7.role":"Research Assistant — IMA GO!","exp.7.a":"Led a 20+ team for market study surveys and sped up data entry by 20%.",
    "exp.8.role":"Programs & Projects Assistant — NDI (Washington, D.C.)",
    "exp.8.a":"Supported training programs for political organizations and vulnerable populations across the Andes.",
    "exp.8.b":"Built statistical evaluations that lifted participant satisfaction by 25%.",
    "exp.8.c":"Facilitated cooperation projects with government agencies and civil society.",
    "edu.title":"Education",
    "edu.1.title":"Master in Data Management & Analysis (in process)","edu.1.inst":"University of Buenos Aires (UBA), 2023–2025","edu.1.desc":"Econometrics, data mining, AI, and advanced data management in organizations.",
    "edu.2.title":"Diploma in Applied Statistics","edu.2.inst":"Pontifical Catholic University of Peru (PUCP), 2017–2018",
    "edu.3.title":"Bachelor in Political Science","edu.3.inst":"National University of San Marcos (UNMSM), 2011–2016","edu.3.desc":"Quantitative profile; thesis graded outstanding.",
    "certs.title":"Certifications","certs.1":"IBM Data Science Professional (2023)","certs.2":"IELTS Academic (British Council, 2023)",
    "skills.title":"Skills","skills.prompt":"Prompt Engineering","skills.langs":"Languages: Spanish (native), English (advanced), Portuguese (basic).",
    "writing.title":"Selected Writings","writing.1":"Beyond Ideology: Classifying Congressional Votes with Linear Discriminant Analysis (LDA)","writing.2":"Linear or Platform: Unraveling the OpenAI Business Model","writing.3":"Working with SQLite Databases in Python","writing.more":"More on",
    "teach.title":"Teaching","teach.1":"Lecturer — UNMSM (Mar–Apr 2025): Indicators in Public Policy; AI in Public Policy.","teach.2":"Instructor — Periférica Academy (2018): Statistics & Research Methods (PUCP freshmen).","teach.3":"Teaching Assistant — UNMSM (2017): Project Programming, practice sessions.",
    "contact.title":"Contact","contact.cta":"Email me","contact.links":"All links",
    "footer":"Built with HTML, CSS & JavaScript. Hosted on GitHub Pages."
  },
  es: {
    "brand":"Miguel A. Jesús","actions.cv":"Descargar CV",
    "hero.title":"Datos e IA para el valor público",
    "hero.lead":"Construyo productos de datos y sistemas de evaluación para integridad, justicia y desarrollo.",
    "hero.cta1":"Experiencia","hero.cta2":"Publicaciones","hero.cta3":"Contacto",
    "meta.location":"Lima, Perú",
    "focus.title":"Áreas de enfoque","focus.a":"Evaluación de impacto y MEL","focus.b":"IA aplicada y analítica","focus.c":"Integridad pública y justicia","focus.d":"Visualización de datos",
    "toolbox.title":"Caja de herramientas","exp.title":"Experiencia","now":"Actualidad",
    "exp.1.role":"Consultor Senior — Ministerio Público (Perú)",
    "exp.1.a":"Diseñé e implementé metodologías de evaluación, incluyendo IA para mejorar la medición del desempeño de 5,000+ fiscales a nivel nacional.",
    "exp.1.b":"Construí sistemas de evaluación de desempeño para personal administrativo de la Secretaría General.",
    "exp.1.c":"Lideré la coordinación interinstitucional del CICME en gestión y difusión de datos para servicios de justicia.",
    "exp.2.role":"Especialista en Integridad — USAID / Chemonics",
    "exp.2.a":"Apoyé la implementación del Modelo de Integridad Pública y su evaluación mediante el Índice de Capacidad Preventiva.",
    "exp.2.b":"Diseñé instrumentos cuantitativos y cualitativos para el proyecto de Inversión Pública Transparente (IPT).",
    "exp.2.c":"Coautor de guías técnicas, informes y metodologías para socios regionales.",
    "exp.3.role":"Especialista Técnico — Poder Judicial (Perú)",
    "exp.3.a":"Elaboré reportes de productividad/eficiencia; identifiqué mejoras en 60%+ de órganos jurisdiccionales.",
    "exp.3.b":"Desarrollé metodologías cuantitativas; base para la evaluación del desempeño no jurisdiccional.",
    "exp.3.c":"Lideré un Laboratorio de Innovación Tecnológica; 80% de iniciativas de software/app entregadas.",
    "exp.3.d":"Impulsé mejoras al Sistema de Registro y Seguimiento de Proyectos; 75% de propuestas adoptadas.",
    "exp.4.role":"Consultor Cuantitativo — Presidencia del Consejo de Ministros (Perú)",
    "exp.4.a":"Analicé datos mensuales de 100+ entidades para el cumplimiento de la Política Nacional de Integridad.",
    "exp.4.b":"Construí tableros en Tableau para 300+ usuarios.",
    "exp.4.c":"Codesarrollé la metodología del Índice de Capacidad Preventiva y una herramienta web nacional (100% desplegada).",
    "exp.4.d":"Audité la base SQL nacional de Declaraciones Juradas; propuse acciones de calidad de datos.",
    "exp.5.role":"Analista Técnico — Presidencia del Consejo de Ministros (Perú)",
    "exp.5.a":"Elaboré reportes de transferencias presupuestales de inversión para ministros y gobernadores.",
    "exp.5.b":"Automaticé validaciones de consistencia con VBA para los pipelines de reporte.",
    "exp.6.role":"Consultor Cuantitativo — Ministerio de Trabajo y Promoción del Empleo",
    "exp.6.a":"Optimicé rutas de auditorías con análisis geoespacial (+15% auditorías; ahorro significativo de combustible).",
    "exp.6.b":"Identifiqué sobrecostos en adquisiciones (>US$100k de ahorro).",
    "exp.7.role":"Asistente de Investigación — IMA GO!","exp.7.a":"Lideré un equipo de 20+ y aceleré el ingreso de datos en 20%.",
    "exp.8.role":"Asistente de Programas y Proyectos — NDI (Washington, D.C.)",
    "exp.8.a":"Apoyé programas de capacitación para organizaciones políticas y poblaciones vulnerables en los Andes.",
    "exp.8.b":"Construí evaluaciones estadísticas que elevaron la satisfacción en 25%.",
    "exp.8.c":"Facilité proyectos de cooperación con entidades públicas y sociedad civil.",
    "edu.title":"Educación",
    "edu.1.title":"Maestría en Gestión y Análisis de Datos (en curso)","edu.1.inst":"Universidad de Buenos Aires (UBA), 2023–2025","edu.1.desc":"Econometría, minería de datos, IA y gestión avanzada de datos en organizaciones.",
    "edu.2.title":"Diplomado en Estadística Aplicada","edu.2.inst":"Pontificia Universidad Católica del Perú (PUCP), 2017–2018",
    "edu.3.title":"Bachiller en Ciencia Política","edu.3.inst":"Universidad Nacional Mayor de San Marcos (UNMSM), 2011–2016","edu.3.desc":"Perfil cuantitativo; tesis sobresaliente.",
    "certs.title":"Certificaciones","certs.1":"IBM Data Science Professional (2023)","certs.2":"IELTS Academic (British Council, 2023)",
    "skills.title":"Habilidades","skills.prompt":"Ingeniería de prompts","skills.langs":"Idiomas: Español (nativo), Inglés (avanzado), Portugués (básico).",
    "writing.title":"Publicaciones seleccionadas","writing.1":"Más allá de la ideología: clasificación de votos congresales con Análisis Discriminante Lineal (LDA)","writing.2":"¿Lineal o plataforma? Desentrañando el modelo de negocio de OpenAI","writing.3":"Trabajando con bases SQLite en Python","writing.more":"Más en",
    "teach.title":"Docencia","teach.1":"Docente — UNMSM (mar–abr 2025): Indicadores en Políticas Públicas; IA en Políticas Públicas.","teach.2":"Instructor — Academia Periférica (2018): Estadística y Metodología (PUCP).","teach.3":"Jefe de Prácticas — UNMSM (2017): Programación de Proyectos.",
    "contact.title":"Contacto","contact.cta":"Escríbeme","contact.links":"Todos los enlaces",
    "footer":"Construido con HTML, CSS y JavaScript. Hospedado en GitHub Pages."
  }
};

function applyLang(next){
  lang = next || lang;
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(i18n[lang][key] !== undefined){ el.innerHTML = i18n[lang][key]; }
  });
  document.getElementById('langToggle').textContent = lang.toUpperCase();
}
applyLang(lang);

document.getElementById('langToggle').addEventListener('click', () => {
  applyLang(lang === 'en' ? 'es' : 'en');
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
