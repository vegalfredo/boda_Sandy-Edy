import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// ─────────────────────────────────────────────────────────────
// CONFIGURACIÓN DE PUBLICACIÓN (GitHub Pages)
// Si publicas en  https://TU_USUARIO.github.io/NOMBRE_REPO/
// deja `base` con el nombre EXACTO de tu repositorio.
// Si publicas en un dominio propio o en la raíz del usuario
// (https://TU_USUARIO.github.io/), pon  base: "/".
// ─────────────────────────────────────────────────────────────
const NOMBRE_REPO = "boda_Sandy-Edy"; // ← cámbialo si tu repo se llama distinto

export default defineConfig({
  site: "https://vegalfredo.github.io",
  base: `/${NOMBRE_REPO}`,
  trailingSlash: "ignore",
  integrations: [tailwind({ applyBaseStyles: false })],
  build: { assets: "_assets" },
});
