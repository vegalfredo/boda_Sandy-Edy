# CLAUDE.md — Invitación de Boda Digital

> **Misión:** Construir la invitación de boda web más impresionante, elegante y emotiva jamás vista. No es una página web: es una experiencia. Cada persona que la abra debe sentir que recibió algo hecho a mano, con amor, solo para ella.

---

## 0. Estado actual (lo que YA está construido)

> Esta sección refleja lo implementado. Las secciones 1–9 son la especificación
> de diseño original y siguen siendo la referencia de estilo.

- **Novios:** Sandy & Edy — **sábado 15 de agosto de 2026, 18:00**, Quinta Santiago, Humilpan, Querétaro.
- **Stack elegido:** **Astro + Tailwind** (estático). Dependencias: `astro`, `@astrojs/tailwind`, `tailwindcss`, `canvas-confetti`, `swiper`. Nada más — al añadir features, **no instalar tecnologías nuevas** sin pedirlo.
- **Repositorio:** `github.com/vegalfredo/boda_Sandy-Edy` (rama `main`). Deploy automático con `.github/workflows/deploy.yml`.
- **PUBLICADO Y EN LÍNEA** ✅ (desde 2026-07-04): `https://vegalfredo.github.io/boda_Sandy-Edy/` responde HTTP 200. Pages ya está activado con **Source = GitHub Actions** (Settings → Pages). Cada `git push` a `main` republica solo. En `astro.config.mjs`: `base: "/boda_Sandy-Edy"`, `site: "https://vegalfredo.github.io"`. Si cambia el nombre del repo, actualizar `NOMBRE_REPO` ahí.
- **Fuente única de datos:** `src/config/invitacion.ts` (regla de oro — todo lo editable vive ahí, incluidas leyendas del carrusel en `fotos[].pie`).
- **Assets:** originales en `img/*.jpeg` y `Para Siempre.mp3` (raíz). Optimizados en `public/fotos/*.webp` (ffmpeg, q82, máx 1600px) y `public/audio/cancion.mp3`. **No hay ImageMagick/cwebp: usar ffmpeg** para convertir imágenes. Open Graph = `public/og-image.jpg` (foto de la pareja, 1200×630).
- **Secciones implementadas:** Hero (nombres con trazo animado + Ken Burns + monograma anclado), Cuenta regresiva, Carrusel, Padres/Recepción, Ubicación, Vestimenta, Regalos, RSVP, Cierre, Footer, música opt-in y nav hamburguesa.
- **Decisiones del usuario ya tomadas:**
  - **Confeti** en la cuenta regresiva se dispara **cada vez que se hace scroll a esa sección** (se re-arma al salir del viewport), no solo al llegar a cero. Colores de la paleta.
  - **Carrusel** = **álbum tipo baraja de cartas** (Swiper `EffectCards`) con marco Polaroid y leyenda manuscrita por foto. El coverflow clásico fue descartado por "genérico".
  - **Miniatura de WhatsApp (OG)** = la foto de la pareja (no un ramo). Es lo más personal. Solo carga una vez el sitio está publicado; WhatsApp cachea la vista previa.
  - **Glow en el Hero:** "Sandy & Edy" (SVG) y "Nos casamos" llevan resplandor multicapa (blanco cálido + halo dorado) que respira, estilo efecto Glow de After Effects. El glow del SVG va en el contenedor `.nombres-svg` (no en `.trazo`) para no romper la animación de trazo/relleno. Respeta `prefers-reduced-motion` (brillo sí, latido no).
  - **Mensajes de invitados ocultos hasta la boda:** se puede (buzón externo tipo Formspree/Google Forms), pero el usuario decidió **NO** implementarlo — el sitio se queda 100% estático sin formularios de recados.
- **Verificación visual:** con `playwright-core` + Chrome local headless. El script `.mjs` debe correr **desde la raíz del proyecto** (para resolver `node_modules`) y la ruta de Chrome lleva backslashes dobles.

---

## 1. Contexto del proyecto

- **Tipo:** Invitación de boda digital de una sola página (one-page, scroll vertical narrativo).
- **Idioma:** Todo el contenido, comentarios de UI y textos van **en español** (español neutro latinoamericano, tono cálido y elegante, tuteo o "ustedes" según el contexto de los invitados).
- **Hosting:** Repositorio de GitHub + **GitHub Pages** (sitio 100% estático, sin backend).
- **Audiencia:** Invitados de todas las edades que abrirán el enlace principalmente **desde WhatsApp en su teléfono**. Mobile-first es ley, no sugerencia.

### Datos que el usuario proporcionará (usar placeholders mientras tanto)
Cuando falte información, usa placeholders claros y centralizados (ver sección 6) y **pregunta al usuario** antes de inventar datos reales:

- Nombres de los novios
- Fecha y hora de la ceremonia y recepción
- Nombre y dirección exacta del salón (+ link de Google Maps)
- Número de WhatsApp para confirmaciones
- Fotos de la pareja (para hero y carruseles)
- Canción elegida (archivo de audio con derechos o pista libre de regalías)
- Código de vestimenta específico
- Fecha límite de confirmación
- (Opcional) Mesa de regalos, hashtag, itinerario, padrinos

---

## 2. Stack tecnológico

Elegir lo mejor, pero compatible con GitHub Pages (build estático):

| Capa | Tecnología | Por qué |
|---|---|---|
| Framework | **Astro** (con islas de React) o **Vite + React** | Salida estática ultraligera, ideal para Pages |
| Estilos | **Tailwind CSS** + CSS custom properties para el sistema de diseño | Rapidez + tokens propios |
| Animaciones | **Framer Motion** (micro-interacciones y reveals) + **GSAP con ScrollTrigger** para la coreografía de scroll | Lo mejor de ambos mundos |
| Carruseles | **Swiper.js** (efecto coverflow / creative / parallax) o **Embla Carousel** | Táctil, fluido, mobile-first |
| Audio | API nativa `<audio>` + control custom (nada de reproductores feos por defecto) | Control total del diseño |
| Cuenta regresiva | Lógica propia en JS (sin librerías pesadas) con `Intl.DateTimeFormat` | Ligereza |
| Fuentes | Google Fonts con `preload` + `font-display: swap` | Rendimiento |
| Iconos | Lucide o SVGs propios | Consistencia |
| Deploy | GitHub Actions → GitHub Pages | Automático en cada push |

**Reglas duras:**
- Cero backend. Cero base de datos. Todo estático.
- Configurar `base` correctamente en Astro/Vite para que funcione en `usuario.github.io/repo/`.
- Peso total objetivo: **< 2 MB en la carga inicial** (imágenes lazy, audio se descarga solo si el usuario activa la música).

---

## 3. Dirección de diseño

**Concepto:** "Una carta de amor que se despliega". La página se revela como si abrieras un sobre: cada sección aparece con intención, como capítulos de una historia.

### Paleta (proponer al usuario, ajustable)
Elegante, romántica, NO genérica. Evitar el combo cliché crema + terracota. Propuesta inicial:
- `--tinta`: #1C1B2E (azul noche profundo, casi negro — textos)
- `--marfil`: #FAF7F0 (fondo principal)
- `--champagne`: #C9A96A (dorado apagado — acentos, líneas, botones)
- `--polvo`: #A8B5C4 (azul polvo — detalles secundarios)
- `--vino`: #6E2B3A (borgoña — momentos de énfasis, hover)

### Tipografía
- **Display:** una serif de alto contraste o una caligráfica fina para los nombres de los novios (ej. *Cormorant Garamond*, *Ovo*, o una script elegante como *Pinyon Script* SOLO para los nombres).
- **Cuerpo:** sans humanista legible (*Jost*, *Outfit* o *Figtree*).
- Escala tipográfica clara; los nombres de los novios son el elemento tipográfico más grande y memorable de toda la página.

### Elemento firma (lo que nadie olvidará)
El **hero**: pantalla completa con los nombres de los novios que se "escriben" con animación de trazo (SVG stroke animation, como tinta sobre papel), sobre una foto de la pareja con un sutil efecto Ken Burns, y un monograma de iniciales que luego reaparece como sello en cada sección. Al hacer scroll, el monograma se encoge y se ancla como marca de agua.

### Motion design (coreografía, no ruido)
- **Carga inicial:** secuencia orquestada — fondo → foto → trazo de los nombres → fecha → indicador de scroll (flecha que respira).
- **Scroll:** cada sección entra con reveals suaves (fade + translate, stagger en elementos hijos) vía GSAP ScrollTrigger. Parallax sutil en fotos.
- **Botones:** micro-interacciones en TODOS — hover con relleno líquido o borde que se dibuja, tap con scale suave (0.97), ripple dorado sutil.
- **Cuenta regresiva:** los dígitos hacen flip o slide al cambiar.
- **Respetar `prefers-reduced-motion`:** versión con fades simples, sin parallax.

---

## 4. Secciones de la página (en orden)

1. **Hero / Portada** — Nombres animados, fecha, foto de fondo, monograma, botón flotante de música.
2. **Cuenta regresiva** — Días : Horas : Minutos : Segundos hasta la ceremonia. Diseño de dígitos grandes y elegantes. Cuando llegue a cero: mensaje "¡Hoy es el gran día!" con confeti sutil (canvas-confetti, una sola ráfaga).
3. **Nuestra historia** *(opcional, si el usuario da contenido)* — Timeline breve con fotos.
4. **Carrusel de fotos** — Swiper con efecto coverflow o creative, gestos táctiles, autoplay lento pausable, indicadores elegantes. Fotos con `loading="lazy"`, formatos AVIF/WebP con fallback, bordes redondeados suaves y sombra fina.
5. **Ceremonia y Recepción** — Tarjetas con hora, lugar y dirección de cada evento.
6. **Ubicación** — Mapa embebido (iframe de Google Maps, lazy-load al acercarse al viewport) + botón **"Cómo llegar"** que abre `https://maps.google.com/?q=...` (y `geo:` en Android / Apple Maps en iOS si es sencillo detectarlo).
7. **Código de vestimenta** — Sección visual: título (ej. "Formal / Etiqueta"), iconografía o ilustración sutil, paleta de colores sugerida (círculos de color), y si aplica, colores reservados para la novia/cortejo ("por favor evitar blanco").
8. **Confirmación (RSVP) por WhatsApp** — El CTA más importante de la página (ver sección 5).
9. **Cierre** — Frase emotiva, monograma, "Te esperamos", y de nuevo el botón de confirmar.
10. **Footer discreto** — "Hecho con ❤️ para nuestra boda".

Navegación: menú fijo minimalista (o botón hamburguesa en móvil) con scroll suave a cada sección, opcional pero recomendado.

---

## 5. Funcionalidades clave (especificación)

### 🎵 Música (opt-in obligatorio)
- **NUNCA reproducir automáticamente.** Los navegadores lo bloquean y es mala experiencia.
- Al cargar, mostrar una invitación sutil: botón flotante con icono de nota musical + tooltip "Toca para escuchar nuestra canción" (aparece una vez, luego se oculta).
- Botón flotante persistente (esquina inferior o superior derecha) con dos estados animados: reproduciendo (ecualizador de barras animado o disco girando) / pausado.
- El audio se carga con `preload="none"` — solo descarga al primer play.
- Volumen con fade-in suave al iniciar y fade-out al pausar.
- Recordar la elección durante la sesión (variable en memoria; si se usa localStorage, degradar con try/catch).

### ⏳ Cuenta regresiva
- Fecha objetivo en la configuración central (sección 6), con zona horaria explícita del evento.
- Actualización cada segundo con `setInterval`, limpieza correcta del intervalo.
- Etiquetas en español: Días / Horas / Minutos / Segundos (singular/plural correcto: "1 Día").

### 💬 Confirmación vía WhatsApp
- Botón grande, hermoso, imposible de ignorar: "Confirmar asistencia".
- Abre `https://wa.me/<NUMERO>?text=<MENSAJE_CODIFICADO>` con mensaje pre-llenado en español, por ejemplo:
  > "¡Hola! Soy ____. Confirmo mi asistencia a la boda de {Novia} y {Novio} el {fecha}. Asistiremos __ persona(s). 🤍"
- Codificar el mensaje con `encodeURIComponent`.
- Opcional (si el usuario quiere): mini-formulario previo (nombre + nº de acompañantes) que arma el mensaje dinámicamente antes de abrir WhatsApp. Sin backend: WhatsApp ES el backend.
- Incluir también fecha límite de confirmación visible junto al botón.

### 🗺️ Ubicación
- Nombre del salón, dirección completa, iframe de mapa con estilo (borde redondeado, sombra) y botón "Cómo llegar".
- Si hay dos sedes (iglesia + salón), mostrar ambas.

### 👗 Código de vestimenta
- Contenido claro y visual. Placeholder: "Vestimenta formal".

---

## 6. Arquitectura del código

```
/
├── CLAUDE.md                  ← este archivo
├── src/
│   ├── config/
│   │   └── invitacion.ts      ← ÚNICA fuente de verdad de todos los datos
│   ├── components/            ← Hero, Countdown, Carrusel, Rsvp, Mapa, DressCode, MusicToggle...
│   ├── styles/                ← tokens.css (paleta, tipografía), global.css
│   ├── assets/                ← fotos optimizadas, audio, monograma SVG
│   └── pages/index.astro      ← composición de secciones
├── public/                    ← favicon, og-image
└── .github/workflows/deploy.yml
```

**Regla de oro:** TODOS los datos editables (nombres, fechas, número de WhatsApp, dirección, textos, rutas de fotos, canción) viven en `src/config/invitacion.ts` con tipos y comentarios en español. El usuario debe poder personalizar todo editando **un solo archivo**, sin tocar componentes.

```ts
// Ejemplo de estructura del config
export const invitacion = {
  novios: { ella: "NOMBRE_ELLA", el: "NOMBRE_EL", iniciales: "X & X" },
  fechaEvento: "2026-12-31T18:00:00-06:00", // ISO con zona horaria
  whatsapp: { numero: "521XXXXXXXXXX", mensajeBase: "..." },
  ceremonia: { lugar: "...", direccion: "...", hora: "...", mapsUrl: "..." },
  recepcion: { lugar: "...", direccion: "...", hora: "...", mapsUrl: "..." },
  vestimenta: { codigo: "Formal", detalle: "...", coloresEvitar: ["blanco"] },
  musica: { archivo: "/audio/cancion.mp3", titulo: "..." },
  fotos: ["/fotos/01.webp", "..."],
  fechaLimiteConfirmacion: "2026-12-01",
};
```

---

## 7. Calidad no negociable

- **Mobile-first real:** diseñar primero a 375px; probar a 320, 768, 1024, 1440. Botones táctiles ≥ 44px. Sin scroll horizontal jamás.
- **Rendimiento:** Lighthouse ≥ 90 en móvil. Imágenes en WebP/AVIF, `srcset`, lazy-load. Fuentes con preload. JS mínimo.
- **Accesibilidad:** contraste AA, `alt` en todas las fotos, foco visible, HTML semántico, `aria-label` en botones de icono (música, flechas del carrusel), `prefers-reduced-motion`.
- **SEO / compartir:** `<title>`, meta description, y **Open Graph completo** (og:image con foto de la pareja + nombres + fecha) para que el enlace se vea espectacular al compartirlo por WhatsApp.
- **Compatibilidad:** iOS Safari, Chrome Android, y navegadores in-app de WhatsApp/Instagram (probar especialmente el audio ahí).

---

## 8. Flujo de trabajo esperado de Claude Code

1. **Preguntar primero:** al iniciar, pedir al usuario los datos de la sección 1 que ya tenga. Si faltan, avanzar con placeholders evidentes (ej. `«NOMBRE DE LA NOVIA»`) y dejar una lista de pendientes.
2. **Proponer el sistema de diseño** (paleta, tipografías, concepto) en 5 líneas antes de codificar; ajustar si el usuario opina.
3. Inicializar el proyecto, configurar deploy a GitHub Pages desde el día uno.
4. Construir sección por sección en el orden de la sección 4, con commits atómicos y mensajes en español ("feat: hero con animación de trazo en los nombres").
5. Optimizar toda foto que el usuario suba (convertir a WebP, redimensionar a máx. 1600px de ancho).
6. Al final: checklist de la sección 7 + instrucciones en el README (en español) de cómo editar `invitacion.ts` y cómo publicar.

## 9. Qué NO hacer

- ❌ Autoplay de audio.
- ❌ Librerías pesadas innecesarias (nada de jQuery, nada de Bootstrap).
- ❌ Diseño genérico de plantilla: si algo se ve como "la típica invitación digital", rediseñarlo.
- ❌ Animaciones que mareen o bloqueen el scroll en móvil.
- ❌ Datos hardcodeados fuera de `invitacion.ts`.
- ❌ Inventar nombres, fechas o direcciones reales sin confirmar con el usuario.
