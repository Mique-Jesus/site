# Miguel Á. Jesús Correa — Portfolio (Data & AI for Public Value)

Sitio web profesional y portafolio de **Miguel A. Jesús**, analista de datos y especialista en evaluación que aplica IA y métodos cuantitativos a integridad, justicia y desarrollo.  
El sitio es **bilingüe (ES/EN)**, tiene **modo claro/oscuro**, **fondo interactivo** (canvas), **timeline** de experiencia y **descarga de CV**.

🟢 Demo: https://mique-jesus.github.io/miguel-website/

---

## Características
- 🎛️ **Modo claro/oscuro** con persistencia (localStorage).
- 🌐 **Selector de idioma EN/ES** (traducción instantánea vía `data-i18n`).
- 🕸️ **Fondo interactivo** tipo red de partículas (Canvas).
- 🕑 **Línea de tiempo** de experiencia.
- ⌨️ **Efecto typing** en el hero (frases bilingües).
- 📄 **Descarga de CV** en PDF.
- 📱 **Responsive** (HTML/CSS puro, sin frameworks).

---

## Estructura del proyecto
/ (raíz del repo)
├─ index.html
├─ styles.css
├─ main.js
└─ Miguel_Jesus_CV_2025.pdf

---

## Cómo desplegar en GitHub Pages
1. Sube/actualiza `index.html`, `styles.css`, `main.js` y `Miguel_Jesus_CV_2025.pdf` en la **raíz** del repo.
2. Ve a **Settings → Pages**.
3. En **Build and deployment**: Source = **Deploy from a branch**.
4. Branch = **main** y carpeta **/** (root). Guarda.
5. Espera 1–2 minutos y visita la URL del demo.

> Si ves texto “plano”, revisa que las rutas en `index.html` apunten a `styles.css` y `main.js` en la **raíz**.

---

## Personalización
- **Nombre, claim, enlaces**: editar en `index.html` (sección `<header>` y `#home`).
- **Frases del typing**: arreglo `phrases` en `main.js` (en `en` y `es`).
- **Textos EN/ES**: claves `i18n` en `main.js` y atributos `data-i18n` en `index.html`.
- **Colores/estilos**: variables CSS en `styles.css` (`:root` y `:root.light`).
- **CV**: reemplazar `Miguel_Jesus_CV_2025.pdf` manteniendo el mismo nombre o actualiza el `href`.

---

## Añadir sección “Proyectos” (opcional)
1. En `index.html`, debajo de “Selected Writings”, agrega un `<section id="projects">` con tarjetas.
2. Estilos: reutiliza `.card` y `.tags` de `styles.css`.
3. (Opcional) Agrega logos/imágenes y links a Medium, GitHub o demos.

> Si lo deseas, puedo entregarte un bloque prearmado de tarjetas con hover/tecnologías.

---

## Accesibilidad y rendimiento
- Contrastes verificados en oscuro y claro.
- Semántica básica (`<section>`, `<nav>`, `<h1>-<h3>`).
- Sin dependencias externas pesadas; solo Google Fonts.

---

## Tecnologías
- **HTML5**, **CSS3**, **JavaScript** (Canvas).
- Sin frameworks; fácil de mantener y versionar.

---

## Troubleshooting
- **No carga el estilo/JS**: confirma que `index.html` referencia `styles.css` y `main.js` en la raíz.
- **Cambios no se ven**: haz *hard refresh* (Ctrl/Cmd + F5) o limpia caché.
- **Página no publica**: revisa Settings → Pages (branch/carpeta correctos).

---

## Licencia
MIT. Puedes usar y adaptar el código con atribución.

---

## Contacto
- Email: miguel.jesus.cor@gmail.com  
- Links: https://linktr.ee/mique.jesus
