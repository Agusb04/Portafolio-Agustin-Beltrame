import type { PortfolioData } from "@/types/portfolio";

/**
 * Single source of truth for all portfolio content.
 * CONSTITUTION II: content is fully decoupled from presentation.
 * Every validation rule from data-model.md applies: 3-6 featured projects,
 * 2-4 keyFeatures, 2-8 tags, at least one of repoUrl/demoUrl per project,
 * all user-visible content in English (FR-015).
 */
export const portfolioData: PortfolioData = {
  profile: {
    name: "Agustín Beltrame",
    role: "Computer Engineering Student / Software Developer",
    headline:
      "Computer Engineering Student at UBA (FIUBA) | Backend Development | Systems Programming | Software Architecture",
    bio: "I'm a Computer Engineering student at the University of Buenos Aires (UBA/FIUBA), interested in software engineering, systems programming, and software architecture. I enjoy building maintainable and scalable solutions, working with algorithms, backend development, and databases.",
    location: "Buenos Aires, Argentina",
    avatarUrl: "/avatar.webp",
    cvUrl: "/cv.pdf",
    availableForWork: true,
    languages: ["Spanish (Native)", "English (B2)", "Portuguese (Basic)"],
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
      title: "Pedilo-Después — Food Delivery Platform",
      description:
        "A delivery platform connecting customers and local shops, solving order management with a responsive web app and a mobile app.",
      keyFeatures: [
        "REST API to manage orders and users",
        "Responsive web interface and mobile app",
        "QR code and geolocation integration",
        "Data persistence with MySQL",
      ],
      tags: ["Full Stack", "REST API", "Mobile", "MySQL"],
      repoUrl: "https://github.com/Agusb04/Pedilo-Despues",
      featured: true,
      order: 1,
    },
    {
      id: "algueiza-flight-system",
      title: "Algueiza Flight System",
      description:
        "A flight information processing system focused on efficient data representation and fast operations over large collections.",
      keyFeatures: [
        "Domain modeling of flight information",
        "Efficient use of data structures",
        "Operations over collections and relationships between entities",
      ],
      tags: ["Go", "Algorithms", "Data Structures"],
      repoUrl: "https://github.com/Agusb04/Algueiza-Flight-System",
      featured: true,
      order: 2,
    },
    {
      id: "flycombi",
      title: "FlyCombi — Flight Route Planner",
      description:
        "A tool to model flight networks and compute routes, using graph algorithms to find shortest paths and visualize journeys.",
      keyFeatures: [
        "Network modeling with graphs",
        "Shortest-path computation between cities",
        "Route export in KML format",
      ],
      tags: ["Python", "Graphs", "Shortest Path", "KML"],
      repoUrl: "https://github.com/Agusb04/FlyCombi",
      featured: true,
      order: 3,
    },
    {
      id: "yet-another-battle-city",
      title: "Yet Another Battle City",
      description:
        "A tank-combat game inspired on the classic Battle City, built with clear separation of responsibilities and an MVC architecture.",
      keyFeatures: [
        "Model-View-Controller architecture",
        "Graphical interface built with JavaFX",
        "Enemy AI behaviors",
        "Automated testing with JUnit and local multiplayer support",
      ],
      tags: ["Java", "OOP", "MVC", "Testing", "Game Development"],
      repoUrl: "https://github.com/Agusb04/Yet-Another-Battle-City",
      featured: true,
      order: 4,
    },
    {
      id: "psa-marketing-campaigns",
      title: "PSA — Marketing Campaign Management System",
      description:
        "An application to manage marketing campaigns and leads, decoupling backend logic from the web interface through a REST API.",
      keyFeatures: [
        "Backend developed with Spring Boot",
        "Web interface with React and TypeScript",
        "Persistence with PostgreSQL",
        "Deployment with Docker and Render",
      ],
      tags: ["Full Stack", "Java", "Spring Boot", "React", "PostgreSQL"],
      repoUrl: "https://github.com/Agusb04/PSA-backend",
      extraLinks: [
        {
          label: "Frontend Repo",
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
      label: "Visit Agustín's GitHub profile",
      icon: "Github",
    },
    {
      id: "linkedin",
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/agustin-beltrame-3009063a3/",
      label: "Connect with Agustín on LinkedIn",
      icon: "Linkedin",
    },
    {
      id: "email",
      platform: "Email",
      url: "mailto:agusbeltrame04@gmail.com",
      label: "Email Agustín directly",
      isEmail: true,
      emailAddress: "agusbeltrame04@gmail.com",
      icon: "Mail",
    },
  ],
  meta: {
    siteUrl: "https://agustinbeltrame.dev",
    siteName: "Agustín Beltrame",
    defaultTitle:
      "Agustín Beltrame — Computer Engineering Student / Software Developer",
    description:
      "Portfolio of Agustín Beltrame, computer engineering student at UBA and software developer focused on backend, systems programming and software architecture.",
    keywords: [
      "Agustín Beltrame",
      "Computer Engineering",
      "Software Developer",
      "Backend Development",
      "Systems Programming",
      "UBA",
      "Portfolio",
    ],
    author: "Agustín Beltrame",
    ogImage: "/og-image.png",
  },
};
