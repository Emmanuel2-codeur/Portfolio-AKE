// Icônes Iconify : jeu « logos » = couleurs de marque officielles
export const DEV_SKILLS = [
  { icon: 'logos:html-5',          label: 'HTML5',        color: '#e34c26' },
  { icon: 'logos:css-3',           label: 'CSS3',         color: '#2965f1' },
  { icon: 'logos:javascript',      label: 'JavaScript',   color: '#f7df1e' },
  { icon: 'logos:react',           label: 'React JS',     color: '#61dafb' },
  { icon: 'logos:java',            label: 'Java',         color: '#f89820' },
  { icon: 'logos:php',             label: 'PHP',          color: '#777bb4' },
  { icon: 'logos:c-sharp',         label: 'C#',           color: '#9b4f96' },
  { icon: 'noto:artist-palette',   label: 'UX/UI',        color: '#ff4d8d' },
  { icon: 'logos:bootstrap',       label: 'Bootstrap',    color: '#7952b3' },
  { icon: 'logos:tailwindcss-icon',label: 'Tailwind CSS', color: '#38bdf8' },
  { icon: 'logos:mysql-icon',      label: 'MySQL',        color: '#00758f' },
  { icon: 'logos:nodejs-icon',     label: 'Node.js',      color: '#68a063' },
  { icon: 'logos:vue',             label: 'Vue.js',       color: '#42b883' },
]

export const TOOLS = [
  { icon: 'logos:figma',              label: 'Figma',         color: '#f24e1e' },
  { icon: 'simple-icons:canva',       label: 'Canva',         color: '#00c4cc', mono: true },
  { icon: 'logos:adobe-photoshop',    label: 'Photoshop',     color: '#31a8ff' },
  { icon: 'logos:visual-studio-code', label: 'VS Code',       color: '#007acc' },
  { icon: 'logos:visual-studio',      label: 'Visual Studio', color: '#8661c5' },
  { icon: 'logos:git-icon',           label: 'Git / GitHub',  color: '#f05032' },
  { icon: 'simple-icons:phpmyadmin',  label: 'phpMyAdmin',    color: '#6c78af', mono: true },
  { icon: 'ph:tree-structure-duotone',label: 'StarUML',       color: '#0ea5e9', mono: true },
  { icon: 'logos:docker-icon',        label: 'Docker',        color: '#2496ed' },
]

// Bandeau défilant sous le hero
export const MARQUEE = [
  { icon: 'logos:react',            label: 'React' },
  { icon: 'logos:javascript',       label: 'JavaScript' },
  { icon: 'logos:vue',              label: 'Vue.js' },
  { icon: 'logos:nodejs-icon',      label: 'Node.js' },
  { icon: 'logos:php',              label: 'PHP' },
  { icon: 'logos:java',             label: 'Java' },
  { icon: 'logos:c-sharp',          label: 'C#' },
  { icon: 'logos:mysql-icon',       label: 'MySQL' },
  { icon: 'logos:tailwindcss-icon', label: 'Tailwind CSS' },
  { icon: 'logos:figma',            label: 'Figma' },
  { icon: 'logos:git-icon',         label: 'Git' },
  { icon: 'logos:docker-icon',      label: 'Docker' },
]

// Réseaux : icônes sobres, la couleur de marque apparaît au survol
export const SOCIALS = [
  { icon: 'ph:linkedin-logo-bold',  href: 'https://www.linkedin.com/in/emmanuel-adande-3b1432300/', label: 'LinkedIn',  color: '#0a66c2' },
  { icon: 'ph:github-logo-bold',    href: 'https://github.com/Emmanuel2-codeur',                    label: 'GitHub',    color: 'rgb(var(--ink))' },
  { icon: 'ph:whatsapp-logo-bold',  href: 'https://wa.me/22896470752',                              label: 'WhatsApp',  color: '#25d366' },
  { icon: 'ph:instagram-logo-bold', href: 'https://www.instagram.com/emmanuel__228',                label: 'Instagram', color: '#e4405f' },
  { icon: 'ph:facebook-logo-bold',  href: 'https://www.facebook.com/share/12H8rA8UTGx/?mibextid=wwXIfr', label: 'Facebook', color: '#1877f2' },
]

export const SERVICE_ICONS = [
  'ph:browsers-fill', 'ph:desktop-fill', 'ph:device-mobile-fill',
  'ph:pen-nib-fill', 'ph:database-fill', 'ph:wrench-fill',
]

export const PROJECTS = [
  { type: 'web',     img: 'assets/img/photo3.webp', link: 'https://bataille-des-charos.vercel.app',
    tags: ['logos:react', 'logos:tailwindcss-icon', 'logos:framer', 'logos:supabase-icon'] },
  { type: 'web',     img: 'assets/img/photo4.webp', link: 'https://innovapdf.onrender.com',
    tags: ['logos:laravel', 'logos:vue', 'logos:typescript-icon', 'logos:tailwindcss-icon'] },
  { type: 'desktop', img: 'assets/img/photo5.webp', link: 'https://github.com/zaks-web/RESERVATIONDESALLE.git',
    tags: ['logos:c-sharp'] },
  { type: 'desktop', img: 'assets/img/photo6.webp', link: 'https://github.com/Emmanuel2-codeur/club-video-java',
    tags: ['logos:java'] },
  { type: 'web',     img: 'assets/img/photo7.webp', link: 'https://github.com/max-dev-max/Projet_de_vente_en_ligne',
    tags: ['logos:html-5', 'logos:css-3', 'logos:javascript', 'logos:spring-icon', 'logos:postgresql'] },
  { type: 'web',     img: 'assets/img/photo8.webp', link: 'https://portfolio-ake.vercel.app',
    tags: ['logos:react', 'logos:tailwindcss-icon', 'logos:greensock-icon', 'logos:vitejs'] },
]
