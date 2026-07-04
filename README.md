# Invitación de boda · Sandy & Edy 🤍

Invitación digital de una sola página, hecha con amor. Sitio 100 % estático
(Astro + Tailwind), pensado para abrirse desde **WhatsApp en el celular**.

**Sábado 15 de agosto de 2026 · 6:00 pm · Quinta Santiago, Humilpan, Querétaro**

---

## ✏️ Cómo editar los datos (lo único que necesitas tocar)

**TODO** el contenido editable vive en un solo archivo:

```
src/config/invitacion.ts
```

Ahí puedes cambiar, sin tocar ningún otro archivo:

| Qué | Dónde en el archivo |
|---|---|
| Nombres de los novios / iniciales | `novios` |
| Fecha y hora del evento | `fechaEvento`, `fechaTexto`, `horaTexto` |
| Padres | `padres` |
| Lugar, dirección y mapa | `recepcion` |
| Código de vestimenta y paleta | `vestimenta` |
| Mensaje de regalos | `regalos` |
| Canción | `musica` |
| Fotos del carrusel y foto del hero | `fotos`, `fotoHero` |
| Números de WhatsApp y mensaje | `whatsapp` |
| Fecha límite para confirmar | `fechaLimiteConfirmacion`, `fechaLimiteTexto` |
| Frases de cierre | `cierre` |

> 💡 Los números de WhatsApp van en formato internacional **sin signos**:
> `52` (México) + 10 dígitos. Ej. `524423523290`.

### Cambiar las fotos

1. Deja tus fotos nuevas en `public/fotos/` (idealmente en formato `.webp`).
2. Actualiza la lista `fotos` (y `fotoHero`) en `src/config/invitacion.ts`.

Para convertir/optimizar una foto a WebP (máx. 1600 px de ancho) con ffmpeg:

```bash
ffmpeg -i mi-foto.jpg -vf "scale='min(1600,iw)':-2" -c:v libwebp -quality 82 public/fotos/mi-foto.webp
```

### Cambiar la canción

Reemplaza `public/audio/cancion.mp3` (o pon otro archivo y actualiza
`musica.archivo` en el config). La música **nunca** suena sola: el invitado
la activa con el botón flotante. 🎵

---

## 🚀 Ver el sitio en tu computadora

Necesitas [Node.js](https://nodejs.org) (versión 18 o mayor).

```bash
npm install      # solo la primera vez
npm run dev      # abre http://localhost:4321/La-BODA
```

Para generar la versión final (carpeta `dist/`):

```bash
npm run build
npm run preview  # previsualiza la versión final
```

---

## 🌐 Publicar en GitHub Pages

1. **Sube este proyecto a un repositorio de GitHub.**
   - Si tu repo se llama distinto a `La-BODA`, edita el nombre en
     **`astro.config.mjs`** (variable `NOMBRE_REPO`).
2. En GitHub, ve a **Settings → Pages** y en **"Build and deployment" →
   "Source"** elige **GitHub Actions**.
3. Cada vez que hagas `push` a la rama `main`, se publica solo (gracias a
   `.github/workflows/deploy.yml`).
4. Tu invitación quedará en:
   `https://TU_USUARIO.github.io/NOMBRE_REPO/`

> Si algún día usas un dominio propio o publicas en la raíz
> (`https://TU_USUARIO.github.io/`), pon `base: "/"` en `astro.config.mjs`.

---

## 📱 Que se vea espectacular al compartir por WhatsApp

Ya está configurado el **Open Graph** (título, descripción e imagen). La imagen
de vista previa es `public/og-image.jpg`; puedes reemplazarla por otra foto de
1200×630 px si lo deseas.

---

## ✅ Qué incluye

- Portada con los nombres escritos a mano (animación de trazo) sobre la foto
  de la propuesta, con efecto Ken Burns y monograma que se ancla al hacer scroll.
- Cuenta regresiva con **confeti que se dispara cada vez que llegas a esa
  sección** (y una ráfaga grande el gran día).
- Carrusel de fotos táctil (efecto coverflow).
- Sección de padres, recepción, ubicación con mapa y botón "Cómo llegar".
- Código de vestimenta con paleta sugerida.
- Mensaje de regalos ("lluvia de sobres").
- Confirmación por WhatsApp con mini-formulario (nombre + nº de personas),
  eligiendo a quién enviar (Sandy o Edy).
- Reproductor de música opt-in (nunca autoplay).
- Diseño mobile-first, accesible y que respeta `prefers-reduced-motion`.

Hecho con 🤍 para la boda de Sandy & Edy.
