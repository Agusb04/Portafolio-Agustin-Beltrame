import type { PortfolioData } from "@/types/portfolio";

/**
 * Single source of truth for all portfolio content.
 * CONSTITUTION II: content is fully decoupled from presentation.
 * Every user-visible text field is localised (ES/EN).
 */
export const portfolioData: PortfolioData = {
  profile: {
    name: "Agustín Beltrame",
    role: {
      es: "Estudiante de Ingeniería Informática | Desarrollador de Software",
      en: "Computer Engineering Student | Software Developer",
    },
    headline: {
      es: "Estudiante de Ingeniería Informática en UBA (FIUBA) interesado en desarrollo backend, programación de sistemas y diseño de software.",
      en: "Computer Engineering student at UBA (FIUBA) interested in backend development, systems programming, and software design.",
    },
    bio: {
      es: "Disfruto resolver problemas complejos, entender cómo funcionan los sistemas por dentro y construir software confiable y mantenible. Me interesa especialmente el desarrollo backend, las estructuras de datos y los algoritmos, y busco diseñar soluciones eficientes y escalables. También estoy explorando el desarrollo asistido por IA y el Desarrollo Guiado por Especificaciones para mejorar mi flujo de trabajo de ingeniería. Me gusta aprender nuevas tecnologías mediante proyectos prácticos y aplicar buenas prácticas de testing, documentación y trabajo en equipo.",
      en: "I enjoy solving complex problems, understanding how systems work under the hood, and building reliable, maintainable software. I'm particularly interested in backend development, data structures and algorithms, and I aim to design efficient and scalable solutions. I'm also exploring AI-assisted development and Spec-Driven Development to improve my engineering workflow. I like learning new technologies through hands-on projects and applying good testing, documentation and teamwork practices.",
    },
    location: "Buenos Aires, Argentina",
    avatarUrl: "/avatar.webp",
    cvUrl: "/cv.pdf",
    availableForWork: true,
    languages: {
      es: ["Español (Nativo)", "Inglés (B2)", "Portugués (Básico)"],
      en: ["Spanish (Native)", "English (B2)", "Portuguese (Basic)"],
    },
    coreTechnologies: [
      "C++",
      "Python",
      "Go",
      "TypeScript",
      "React",
      "Spring Boot",
      "PostgreSQL",
      "Docker",
    ],
  },
  projects: [
    {
      id: "pedilo-despues",
      title: {
        es: "Pedilo-Después — Plataforma de Delivery",
        en: "Pedilo-Después — Food Delivery Platform",
      },
      description: {
        es: "Una plataforma de delivery que conecta clientes con comercios locales, resolviendo la gestión de pedidos con una app web responsive y una app móvil.",
        en: "A delivery platform connecting customers and local shops, solving order management with a responsive web app and a mobile app.",
      },
      keyFeatures: {
        es: [
          "API REST para gestionar pedidos y usuarios",
          "Interfaz web responsive y app móvil",
          "Integración de códigos QR y geolocalización",
          "Persistencia de datos con MySQL",
        ],
        en: [
          "REST API to manage orders and users",
          "Responsive web interface and mobile app",
          "QR code and geolocation integration",
          "Data persistence with MySQL",
        ],
      },
      tags: ["Full Stack", "REST API", "Mobile", "MySQL"],
      repoUrl: "https://github.com/Agusb04/Pedilo-Despues",
      featured: true,
      order: 1,
    },
    {
      id: "algueiza-flight-system",
      title: {
        es: "Algueiza Flight System",
        en: "Algueiza Flight System",
      },
      description: {
        es: "Un sistema de procesamiento de información de vuelos enfocado en una representación eficiente de los datos y operaciones rápidas sobre grandes colecciones.",
        en: "A flight information processing system focused on efficient data representation and fast operations over large collections.",
      },
      keyFeatures: {
        es: [
          "Modelado del dominio de información de vuelos",
          "Uso eficiente de estructuras de datos",
          "Operaciones sobre colecciones y relaciones entre entidades",
        ],
        en: [
          "Domain modeling of flight information",
          "Efficient use of data structures",
          "Operations over collections and relationships between entities",
        ],
      },
      tags: ["Go", "Algorithms", "Data Structures"],
      repoUrl: "https://github.com/Agusb04/Algueiza-Flight-System",
      featured: true,
      order: 2,
    },
    {
      id: "flycombi",
      title: {
        es: "FlyCombi — Planificador de Rutas de Vuelo",
        en: "FlyCombi — Flight Route Planner",
      },
      description: {
        es: "Una herramienta para modelar redes de vuelos y calcular rutas, usando algoritmos de grafos para encontrar caminos mínimos y visualizar trayectos.",
        en: "A tool to model flight networks and compute routes, using graph algorithms to find shortest paths and visualize journeys.",
      },
      keyFeatures: {
        es: [
          "Modelado de redes con grafos",
          "Cálculo de caminos mínimos entre ciudades",
          "Exportación de rutas en formato KML",
        ],
        en: [
          "Network modeling with graphs",
          "Shortest-path computation between cities",
          "Route export in KML format",
        ],
      },
      tags: ["Python", "Graphs", "Shortest Path", "KML"],
      repoUrl: "https://github.com/Agusb04/FlyCombi",
      featured: true,
      order: 3,
    },
    {
      id: "yet-another-battle-city",
      title: {
        es: "Yet Another Battle City",
        en: "Yet Another Battle City",
      },
      description: {
        es: "Un juego de combate de tanques inspirado en el clásico Battle City, construido con una clara separación de responsabilidades y una arquitectura MVC.",
        en: "A tank-combat game inspired on the classic Battle City, built with clear separation of responsibilities and an MVC architecture.",
      },
      keyFeatures: {
        es: [
          "Arquitectura Modelo-Vista-Controlador",
          "Interfaz gráfica construida con JavaFX",
          "Comportamientos de IA para enemigos",
          "Pruebas automatizadas con JUnit y soporte multijugador local",
        ],
        en: [
          "Model-View-Controller architecture",
          "Graphical interface built with JavaFX",
          "Enemy AI behaviors",
          "Automated testing with JUnit and local multiplayer support",
        ],
      },
      tags: ["Java", "OOP", "MVC", "Testing", "Game Development"],
      repoUrl: "https://github.com/Agusb04/Yet-Another-Battle-City",
      featured: true,
      order: 4,
    },
    {
      id: "psa-marketing-campaigns",
      title: {
        es: "PSA — Sistema de Gestión de Campañas de Marketing",
        en: "PSA — Marketing Campaign Management System",
      },
      description: {
        es: "Una aplicación para gestionar campañas de marketing y leads, desacoplando la lógica del backend de la interfaz web mediante una API REST.",
        en: "An application to manage marketing campaigns and leads, decoupling backend logic from the web interface through a REST API.",
      },
      keyFeatures: {
        es: [
          "Backend desarrollado con Spring Boot",
          "Interfaz web con React y TypeScript",
          "Persistencia con PostgreSQL",
          "Despliegue con Docker y Render",
        ],
        en: [
          "Backend developed with Spring Boot",
          "Web interface with React and TypeScript",
          "Persistence with PostgreSQL",
          "Deployment with Docker and Render",
        ],
      },
      tags: ["Full Stack", "Java", "Spring Boot", "React", "PostgreSQL"],
      repoUrl: "https://github.com/Agusb04/PSA-backend",
      extraLinks: [
        {
          label: {
            es: "Repositorio del Frontend",
            en: "Frontend Repo",
          },
          url: "https://github.com/Agusb04/PSA-Frontend",
          icon: "Github",
        },
      ],
      featured: true,
      order: 5,
    },
  ],
  socialLinks: [
    {
      id: "github",
      platform: "GitHub",
      url: "https://github.com/Agusb04",
      label: {
        es: "Visitar el perfil de GitHub de Agustín",
        en: "Visit Agustín's GitHub profile",
      },
      icon: "Github",
    },
    {
      id: "linkedin",
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/agustin-beltrame-3009063a3/",
      label: {
        es: "Conectar con Agustín en LinkedIn",
        en: "Connect with Agustín on LinkedIn",
      },
      icon: "Linkedin",
    },
    {
      id: "email",
      platform: "Email",
      url: "mailto:agusbeltrame04@gmail.com",
      label: {
        es: "Escribirle directamente a Agustín",
        en: "Email Agustín directly",
      },
      isEmail: true,
      emailAddress: "agusbeltrame04@gmail.com",
      icon: "Mail",
    },
  ],
  meta: {
    siteUrl: "https://agusb04.github.io/Portafolio-Agustin-Beltrame/",
    siteName: "Agustín Beltrame",
    defaultTitle: {
      es: "Agustín Beltrame | Desarrollador de Software",
      en: "Agustín Beltrame | Software Developer",
    },
    description: {
      es: "Portafolio de Agustín Beltrame, estudiante de Ingeniería Informática en UBA y desarrollador backend enfocado en programación de sistemas.",
      en: "Portfolio of Agustín Beltrame, computer engineering student at UBA and backend developer focused on systems programming.",
    },
    keywords: {
      es: [
        "Agustín Beltrame",
        "Ingeniería Informática",
        "Desarrollador de Software",
        "Desarrollo Backend",
        "Programación de Sistemas",
        "UBA",
        "Portafolio",
      ],
      en: [
        "Agustín Beltrame",
        "Computer Engineering",
        "Software Developer",
        "Backend Development",
        "Systems Programming",
        "UBA",
        "Portfolio",
      ],
    },
    author: "Agustín Beltrame",
    ogImage:
      "https://agusb04.github.io/Portafolio-Agustin-Beltrame/og-image.png",
  },
  education: [
    {
      id: "fiuba-computer-engineering",
      institution: {
        es: "Universidad de Buenos Aires (UBA) — FIUBA",
        en: "University of Buenos Aires (UBA) — FIUBA",
      },
      degree: {
        es: "Ingeniería Informática",
        en: "Computer Engineering",
      },
      startDate: "2023",
      endDate: null,
      status: "in-progress",
      description: {
        es: "Formación universitaria en ciencias de la computación, sistemas operativos, algoritmos, estructuras de datos y desarrollo de software, con proyectos prácticos que aplican buenas prácticas de ingeniería y trabajo en equipo.",
        en: "University education in computer science, operating systems, algorithms, data structures and software development, with hands-on projects that apply good engineering practices and teamwork.",
      },
      order: 1,
    },
    {
      id: "cambridge-english-b2",
      institution: {
        es: "Cambridge English",
        en: "Cambridge English",
      },
      degree: {
        es: "First Certificate in English (B2)",
        en: "First Certificate in English (B2)",
      },
      startDate: "2022",
      endDate: "2022",
      status: "completed",
      description: {
        es: "Aprobado con Grado B — CEFR B2 (puntaje 177). Certificación internacional que acredita un nivel avanzado de inglés para contextos académicos y profesionales.",
        en: "Passed at Grade B — CEFR B2 (score 177). International certification that proves an advanced level of English for academic and professional contexts.",
      },
      certifications: [
        {
          id: "cambridge-english-b2-certificate",
          name: {
            es: "First Certificate in English (B2)",
            en: "First Certificate in English (B2)",
          },
          issuer: {
            es: "Cambridge English",
            en: "Cambridge English",
          },
          date: "2022",
          imageUrl: "/certifications/cambridge-b2.webp",
        },
      ],
      order: 2,
    },
  ],
};
