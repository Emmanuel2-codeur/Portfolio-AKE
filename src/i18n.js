/**
 * i18n — Configuration i18next avec react-i18next
 * Traductions embarquées (pas de HTTP backend) pour fiabilité maximale.
 * Détection : localStorage d'abord, puis langue du navigateur.
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const fr = {
  nav: { home:'Accueil', about:'À propos', skills:'Compétences', work:'Projets', contact:'Contact' },
  home: {
    greeting: 'Salut,',
    iam: 'Je suis',
    name: 'Emmanuel',
    job: 'Développeur & Designer',
    cta: 'Mon CV',
    badge_exp: "Ans d'expérience",
    badge_projects: 'Projets réalisés',
  },
  about: {
    title: 'À propos',
    subtitle: 'Je suis Emmanuel ADANDE',
    text: "Passionné par les innovations technologiques et le design visuel, je suis un développeur et designer dédié à la création des applications sur mesure. Je crée des expériences numériques complètes qui allient une architecture logicielle robuste aux interfaces utilisateur élégantes. Spécialisé dans les technologies modernes comme React.js, C# et Java, je conçois des solutions performantes et visuellement marquantes. Mon approche fusionne la rigueur informatique avec une esthétique minimaliste pour transformer des concepts complexes en produits digitaux intuitifs.",
    years: "Années d'exp.",
    projects: 'Projets',
    technologies: 'Technologies',
  },
  skills: {
    title: 'Compétences',
    subtitle: 'Compétences professionnelles',
    text: 'Des technologies modernes pour des projets web et desktop ambitieux.',
    tools: 'Outils',
    mastered: 'maîtrisées',
    tech_count: '8+ Technologies',
  },
  work: {
    title: 'Projets',
    view: 'Voir le projet',
    projects: [
      { title: 'Bataille des charos',
        desc: "Application web complète développée pour organiser et suivre un tournoi communautaire de Free Fire : inscription des joueurs, répartition en poules, programmation des matchs, classement en temps réel et bracket final. Le site inclut un espace public (accueil, poules, classement, annonces) et un panneau d'administration avancé avec tableau de bord statistique, recherche intelligente de joueurs, journal d'audit et système d'alertes de sécurité automatisé.Stack technique : React, Tailwind CSS, Framer Motion, Supabase (base de données, authentification, temps réel, stockage)."

      },
      {
        title: 'Réservation de Salle',
        desc: "Développement Frontend (C#) : Conception en équipe de l'interface d'une application bureau de gestion et réservation de salles (réunions, conférences), incluant un tableau de bord administrateur.",
      },
      {
        title: 'Projet Club Vidéo',
        desc: "Développement Java : Création d'une application bureau de suivi des ventes (cassettes), incluant une gestion sécurisée des accès par profils (employé / administrateur).",
      },
      {
        title: 'Assigame',
        desc: "Contribution au développement d'une application e-commerce. Conception de l'interface client (HTML/CSS/JS) et intégration avec Java Spring Boot, adossée à PostgreSQL.",
      },
      {
        title: 'Portfolio',
        desc: "Développement Frontend (React.js) : Création d'un site portfolio personnel pour présenter mes compétences, projets et expériences professionnelles. Le site est conçu pour être responsive et optimisé pour les performances, avec une navigation fluide et des animations interactives."
      }
    ],
  },
  contact: {
    title: 'Contact',
    headline: 'Travaillons ensemble.',
    sub: "Vous avez un projet en tête ? N'hésitez pas à me contacter.",
    name: 'Votre nom',
    email: 'Votre email',
    msg: 'Votre message...',
    send: 'Envoyer',
    sending: 'Envoi en cours...',
    success: '✅ Message envoyé avec succès !',
    error: "❌ Erreur lors de l'envoi. Réessayez.",
    info_email: 'eadande2@gmail.com',
    info_phone: '+228 96 47 07 52',
    info_location: 'Lomé, Togo',
  },
  footer: { copy: '© Emmanuel ADANDE. Tous droits réservés.' },
}

const en = {
  nav: { home:'Home', about:'About', skills:'Skills', work:'Projects', contact:'Contact' },
  home: {
    greeting: 'Hi there,',
    iam: 'I am',
    name: 'Emmanuel',
    job: 'Developer & Designer',
    cta: 'My CV',
    badge_exp: 'Years of experience',
    badge_projects: 'Projects done',
  },
  about: {
    title: 'About',
    subtitle: 'I am Emmanuel ADANDE',
    text: 'Passionate about technological innovation and visual design, I am a developer and designer dedicated to creating custom applications. I create comprehensive digital experiences that combine robust software architecture with elegant user interfaces. Specializing in modern technologies like React.js, C#, and Java, I design high-performing, visually striking solutions. My approach merges programming rigor with a minimalist aesthetic to transform complex concepts into intuitive digital products.',
    years: 'Years exp.',
    projects: 'Projects',
    technologies: 'Technologies',
  },
  skills: {
    title: 'Skills',
    subtitle: 'Professional Skills',
    text: 'Modern technologies to build ambitious web and desktop projects.',
    tools: 'Tools',
    mastered: 'mastered',
    tech_count: '8+ Technologies',
  },
  work: {
    title: 'Projects',
    view: 'View project',
    projects: [
      {
        title: 'Bataille des charos',
        desc: " Full-stack web application developed to organize and track a community Free Fire tournament: player registration, group allocation, match scheduling, real-time ranking, and final bracket. The site includes a public area (home, groups, ranking, announcements) and an advanced admin panel with a statistical dashboard, smart player search, audit log, and automated security alert system. Tech stack: React, Tailwind CSS, Framer Motion, Supabase (database, authentication, real-time, storage)."
      },
      {
        title: 'Room Booking System',
        desc: "Frontend Development (C#): Collaborated on the UI design for a desktop room management and booking application (meetings, conferences), including an admin dashboard.",
      },
      {
        title: 'Club Video Project',
        desc: "Java Development: Built a desktop sales-tracking app for video cassettes, with secure role-based access control (employee / admin).",
      },
      {
        title: 'Assigame',
        desc: "Contributed to an e-commerce application. Designed the client interface (HTML/CSS/JS) and integrated it with a Java Spring Boot backend backed by PostgreSQL.",
      },
      {
        title: 'Portfolio',
        desc: "Frontend Development (React.js): Created a personal portfolio website to showcase skills, projects, and professional experiences. The site is designed to be responsive and optimized for performance, with smooth navigation and interactive animations."
      }
    ],
  },
  contact: {
    title: 'Contact',
    headline: "Let's work together.",
    sub: "Have a project in mind? Feel free to reach out — I'd love to hear from you.",
    name: 'Your name',
    email: 'Your email',
    msg: 'Your message...',
    send: 'Send',
    sending: 'Sending...',
    success: '✅ Message sent successfully!',
    error: '❌ Failed to send. Please try again.',
    info_email: 'eadande2@gmail.com',
    info_phone: '+228 96 47 07 52',
    info_location: 'Lomé, Togo',
  },
  footer: { copy: '© Emmanuel ADANDE. All rights reserved.' },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'portfolio-lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  })

export default i18n
