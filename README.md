# Sitio Web Personal Académico — Danny Mallitasig

Página web académica moderna, completa y de alto impacto para **Danny Mallitasig**, investigador doctoral en matemáticas en el **Laboratoire d'Analyse et de Mathématiques Appliquées (LAMA, UMR CNRS 8050)** de la **Université Paris-Est Créteil (UPEC)**, en colaboración con el **Institut Denis Poisson (Université d'Orléans)** y miembro activo de **AMARUN**.

Especialidad de investigación: **Análisis Armónico, Análisis Multifractal, Teoría Geométrica de la Medida y Ondículas**.

---

## Características Principales

1. **Soporte Trilingüe Instantáneo (i18n):**
   - Conmutación en tiempo real entre **Español**, **English** y **Français** sin recargar la página.
   - Ideal para divulgación en Ecuador (AMARUN/EPN), en Francia (LAMA/UPEC) y en la comunidad matemática internacional.

2. **Tipografía Matemática y Fórmulas KaTeX:**
   - Renderizado ultrarrápido de notación matemática LaTeX (\(f(\alpha)\), \(d_H\), \(\omega\), espacios de Besov \(B_{p,q}^s\), líderes de ondículas \(d_\lambda\)).

3. **Simulador Matemático Interactivo (Canvas HTML5):**
   - Herramienta pedagógica y visual sobre la **medida binomial multifractal** y su **espectro de singularidades \(f(\alpha)\)** mediante la transformada de Legendre.
   - Parámetros ajustables en tiempo real: probabilidad \(p\) y profundidad de iteración \(k\).

4. **Gestión de Publicaciones y Preprints con BibTeX:**
   - Filtros por categoría (*Preprints*, *Artículos*, *Notas & Surveys*).
   - Resúmenes (Abstracts) desplegables.
   - Copiador de citas en formato **BibTeX** con un solo clic y aviso flotante (Toast).

5. **Diseño Visual y Experiencia de Usuario:**
   - Modo Claro y Oscuro persistente con detección automática de preferencia del sistema.
   - Diseño adaptable a dispositivos móviles, tablets y monitores de alta resolución.
   - Paleta sobria y académica inspirada en las publicaciones científicas contemporáneas.

6. **Curriculum Vitae Académico Imprimible:**
   - Incluye una página dedicada [`cv.html`](cv.html) con estilo tipográfico tipo documento LaTeX (Garamond/Cinzel) lista para imprimir o guardar directamente en PDF (`Ctrl + P`).

---

## Estructura del Proyecto

```
danny-mallitasig-web/
├── index.html                  # Portal principal con marcado semántico y metadatos SEO/JSON-LD
├── cv.html                     # Curriculum Vitae académico formateado para visualización e impresión
├── css/
│   └── style.css               # Estilos personalizados, KaTeX, tarjetas de vidrio y print styling
├── js/
│   ├── i18n.js                 # Diccionario completo en Español, Inglés y Francés
│   ├── main.js                 # Lógica interactiva (idiomas, temas, BibTeX, filtros, eventos)
│   └── multifractal-canvas.js  # Motor de cálculo y renderizado del espectro multifractal
├── assets/
│   └── avatar.svg              # Retrato académico vectorial de alta resolución con motivos armónicos
└── README.md                   # Documentación y guía de despliegue
```

---

## Cómo Visualizarlo Localmente

El sitio está desarrollado con estándares web modernos nativos, por lo que **no requiere ningún proceso de compilación previo**.

### Opción 1: Abrir directamente
Haz doble clic sobre el archivo `index.html` o ábrelo en tu navegador preferido (Chrome, Firefox, Edge, Safari).

### Opción 2: Servidor local ligero con Python
Si tienes Python instalado:
```bash
cd danny-mallitasig-web
python -m http.server 8000
```
Luego abre en tu navegador: [http://localhost:8000](http://localhost:8000)

### Opción 3: Con Node.js
```bash
npx serve .
```

---

## Cómo Personalizar y Añadir Contenido

### 1. Añadir una nueva publicación o preprint
Abre el archivo `js/i18n.js` y busca la sección `publications.items`. Agrega una nueva entrada en cada idioma con la siguiente estructura:
```javascript
{
  id: "pub-nueva",
  type: "preprint", // o "article", "note"
  title: "Título de la publicación",
  authors: "Danny Mallitasig, Coautor A, Coautor B",
  venue: "arXiv:2609.xxxxx",
  year: "2026",
  abstract: "Resumen de la investigación...",
  bibtex: `@article{mallitasig2026nuevo,
  title={...},
  author={...},
  year={2026}
}`
}
```

### 2. Actualizar charlas o conferencias
En `js/i18n.js`, edita la lista `talks.items` agregando el evento, fecha, lugar y rol correspondiente.

---

## Guía de Despliegue en la Web

### GitHub Pages (gratuito y recomendado)

El proyecto está preparado como sitio estático: no necesita Node.js, una compilación ni un backend. El archivo `.github/workflows/pages.yml` publica automáticamente el contenido cada vez que haces push a `main`.

1. Crea un repositorio público en GitHub. Para una URL personal, puedes llamarlo `tu-usuario.github.io`; para una URL de proyecto, usa cualquier otro nombre.
2. Abre PowerShell en esta carpeta y ejecuta:
   ```bash
   git init
   git add .
   git commit -m "Publicación inicial del sitio académico"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/NOMBRE_DEL_REPOSITORIO.git
   git push -u origin main
   ```
3. En GitHub, abre **Settings > Pages** y selecciona **Source: GitHub Actions** si GitHub todavía no lo ha seleccionado automáticamente.
4. Espera a que termine el flujo **Deploy static site to GitHub Pages** en la pestaña **Actions**. La dirección aparecerá en **Settings > Pages**.

Las rutas internas (`cv.html`, `css/`, `js/` y `assets/`) son relativas, por lo que funcionan tanto en un repositorio personal como en uno de proyecto. No subas credenciales ni archivos privados al repositorio.

### 2. Alojamiento en el Servidor Universitario (LAMA / UPEC)
En los servidores de matemáticas de laboratorios franceses (como el LAMA), usualmente dispones de un directorio `~/public_html/`:
```bash
scp -r * usuario@lama.u-pec.fr:~/public_html/
```
Tu web será accesible en: `https://lama.u-pec.fr/~dmallitasig/`

---

## Contacto Institucional
- **Investigador:** Danny Mallitasig
- **Correo Electrónico:** `danny.mallitasig@u-pec.fr`
- **Laboratorio:** Laboratoire d'Analyse et de Mathématiques Appliquées (LAMA, UMR CNRS 8050)
- **Universidad:** Université Paris-Est Créteil (UPEC) & Université d'Orléans

