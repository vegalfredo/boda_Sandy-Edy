// ══════════════════════════════════════════════════════════════════
//  ✦  ÚNICA FUENTE DE VERDAD  ✦
//  Edita SOLO este archivo para personalizar toda la invitación.
//  No hace falta tocar ningún componente.
// ══════════════════════════════════════════════════════════════════

export const invitacion = {
  // ── Los novios ──────────────────────────────────────────────────
  novios: {
    ella: "Sandy",
    el: "Edy",
    iniciales: "S & E", // aparece como monograma / sello
  },

  // ── Fecha y hora del evento (ISO con zona horaria de México) ─────
  // Querétaro = UTC−06:00 (Tiempo del Centro de México).
  // Formato: AAAA-MM-DDThh:mm:ss-06:00
  fechaEvento: "2026-08-15T18:00:00-06:00",
  // Textos legibles (por si quieres controlarlos a mano):
  fechaTexto: "Sábado 15 de Agosto de 2026",
  horaTexto: "6:00 pm",

  // ── Padres ──────────────────────────────────────────────────────
  padres: {
    novia: ["Ma. del Carmen Aguirre García", "Gildardo Casique Rosas"],
    novio: ["Graciela Arpero Ramírez", "Rafael Vázquez Aguilar"],
  },

  // ── Recepción (sede única) ──────────────────────────────────────
  recepcion: {
    lugar: "Quinta Santiago",
    direccion: "Humilpan, Querétaro",
    hora: "6:00 pm",
    // Link corto de Google Maps que compartió la pareja:
    mapsUrl: "https://maps.app.goo.gl/CgNbt3y4ugNrvKoJ6",
    // Consulta para el iframe y el botón "Cómo llegar":
    mapsQuery: "Quinta Santiago, Humilpan, Querétaro",
  },

  // ── Código de vestimenta ────────────────────────────────────────
  vestimenta: {
    codigo: "Formal / Cocktail",
    detalle:
      "Queremos verte elegante y cómodo para celebrar toda la noche. Ellas: vestido de cóctel o largo. Ellos: traje.",
    // Colores reservados para la novia (por favor evitar):
    coloresEvitar: ["Blanco", "Beige / Hueso"],
    // Paleta sugerida para inspirar a los invitados (hex):
    paletaSugerida: ["#6E2B3A", "#2A2438", "#A8B5C4", "#C9A96A", "#3E5641"],
  },

  // ── Mesa de regalos ─────────────────────────────────────────────
  regalos: {
    titulo: "Lluvia de sobres",
    mensaje:
      "¡Ya tenemos la casa llena de amor y sartenes! Si desean hacernos un regalo, un sobrecito con efectivo nos vendría de maravilla para nuestra luna de miel.",
  },

  // ── Música (opt-in, nunca autoplay) ─────────────────────────────
  musica: {
    archivo: "audio/cancion.mp3", // ruta relativa a /public (se le antepone base)
    titulo: "Para Siempre",
  },

  // ── Fotos del carrusel (relativas a /public) ────────────────────
  // "pie" es la leyenda manuscrita que aparece bajo cada foto (estilo Polaroid).
  fotos: [
    { src: "fotos/1.webp", alt: "Sandy y Edy en la playa durante la propuesta", pie: "La pregunta" },
    { src: "fotos/5.webp", alt: "Sandy y Edy brindando entre palmeras", pie: "Un brindis por nosotros" },
    { src: "fotos/2.webp", alt: "Sandy y Edy abrazados frente al atardecer", pie: "Al caer el sol" },
    { src: "fotos/4.webp", alt: "Retrato de Sandy y Edy entre flores de cerezo", pie: "Para siempre" },
    { src: "fotos/3.webp", alt: "Sandy y Edy tomados de la mano al atardecer", pie: "El sí" },
  ],

  // Foto principal del Hero (fondo a pantalla completa):
  fotoHero: "fotos/1.webp",

  // ── Confirmación por WhatsApp ───────────────────────────────────
  // Números en formato internacional SIN signos: 52 + 10 dígitos.
  whatsapp: {
    contactos: [
      { nombre: "Sandy", numero: "524423523290" },
      { nombre: "Edy", numero: "524111042658" },
    ],
    // {nombre} se reemplaza con lo que escriba el invitado en el formulario.
    // {personas} se reemplaza con el número de asistentes.
    mensajeBase:
      "¡Hola! Soy {nombre}. Confirmo mi asistencia a la boda de Sandy y Edy el sábado 15 de agosto de 2026. Asistiremos {personas}. 🤍",
  },

  // Fecha límite para confirmar (AAAA-MM-DD) + texto legible:
  fechaLimiteConfirmacion: "2026-07-15",
  fechaLimiteTexto: "15 de julio de 2026",

  // ── Textos de cierre ────────────────────────────────────────────
  cierre: {
    frase: "Y así comienza para siempre.",
    despedida: "Te esperamos",
  },
} as const;

export type Invitacion = typeof invitacion;
