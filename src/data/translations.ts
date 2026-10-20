import type { Locale, UITranslations } from "@/types/portfolio";

export const translations: Record<Locale, UITranslations> = {
  es: {
    nav: {
      about: "Sobre mí",
      projects: "Proyectos",
      education: "Educación",
      contact: "Contacto",
    },
    hero: {
      availableForWork: "Disponible para trabajar",
      languages: "Idiomas:",
      downloadResume: "Descargar CV",
      contactMe: "Contáctame",
    },
    projects: {
      title: "Proyectos Destacados",
      subtitle:
        "Una selección de trabajos clave — problema, solución, aspectos destacados y tecnologías.",
      viewRepo: "Código Fuente",
      liveDemo: "Demo en Vivo",
    },
    education: {
      title: "Educación",
      subtitle: "Formación académica y certificaciones profesionales.",
      inProgress: "En curso",
      completed: "Completada",
      viewCertification: "Ver Certificación",
      certificationModalClose: "Cerrar",
      certificationLoadError:
        "No se pudo cargar la imagen de la certificación.",
    },
    contact: {
      title: "Ponete en Contacto",
      subtitle:
        "Abierto a nuevas oportunidades y colaboraciones interesantes — escribime directamente.",
      copyEmail: "Copiar email",
      copyEmailAria: "Copiar dirección de email al portapapeles",
      emailCopied: "¡Copiado!",
      emailCopiedStatus: "¡Email copiado al portapapeles!",
      copyFailed:
        "Tu navegador bloqueó la copia — seleccioná la dirección manualmente o usá el enlace de email.",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      builtWith: "Hecho con Next.js, TypeScript & Tailwind CSS",
    },
    lang: {
      toggle: "Cambiar idioma",
    },
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      availableForWork: "Available for work",
      languages: "Languages:",
      downloadResume: "Download Resume / CV",
      contactMe: "Contact Me",
    },
    projects: {
      title: "Featured Projects",
      subtitle:
        "A curated selection of key work — problem, solution, highlights and stack.",
      viewRepo: "Source Code",
      liveDemo: "Live Demo",
    },
    education: {
      title: "Education",
      subtitle: "Academic background and professional certifications.",
      inProgress: "In progress",
      completed: "Completed",
      viewCertification: "View Certification",
      certificationModalClose: "Close",
      certificationLoadError: "The certification image could not be loaded.",
    },
    contact: {
      title: "Get in Touch",
      subtitle:
        "Open to new opportunities and interesting collaborations — reach out directly.",
      copyEmail: "Copy email",
      copyEmailAria: "Copy email address to clipboard",
      emailCopied: "Copied!",
      emailCopiedStatus: "Email copied to clipboard!",
      copyFailed:
        "Copying is blocked by your browser — select the address manually or use the email link.",
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Built with Next.js, TypeScript & Tailwind CSS",
    },
    lang: {
      toggle: "Change language",
    },
  },
};
