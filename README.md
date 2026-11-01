# Portfolio Emmanuel ADANDE — v2

React 18 · Vite · Tailwind CSS 3 · GSAP · Lenis · Iconify · Geist · i18next (FR/EN)

## Démarrage

```bash
npm install
npm run dev        # développement
npm run build      # production → dist/
npm run preview
```

## Direction visuelle (v2)

- **Sobre et professionnel** : fond gris clair / graphite, **une seule couleur d'accent** (bleu cobalt), aucun dégradé.
- **Police unique : Geist** (auto-hébergée via Fontsource). Pour en changer : `tailwind.config.js` (fontFamily) + l'import dans `src/main.jsx`.
- **Architecture** : Accueil (nom géant + portrait rectangulaire) → bandeau de technos → Projets (filtres Web / Desktop) → Services (6, avec illustrations SVG) → À propos (éditeur de code animé)  → Compétences → Contact.
- **Animations GSAP** : intro, titres masqués, portrait qui s'ouvre en rideau, bandeau infini, cascade des cartes, compteurs, barre de progression. Défilement fluide Lenis. Désactivé si `prefers-reduced-motion`.
- **Icônes Iconify** : couleurs de marque pour les technos, Phosphor pour l'interface.
- **Thème** : clair/sombre, choix mémorisé (sinon préférence du système).
- Traductions en source unique (`src/locales`), images en WebP.

## Structure

```
src/
  components/   Hero, Marquee, Work, Services, About, Skills, Contact, Navbar, Footer, Loader…
  data/techs.js Technologies, orbites, réseaux sociaux, projets (images, liens, tags)
  hooks/        useReveal (apparitions au scroll), useMagnetic
  lib/          smooth.js (Lenis + ScrollTrigger), asset.js
  locales/      fr.json, en.json
```

## Personnalisation rapide

- **Bandeau de technos** : `MARQUEE` dans `src/data/techs.js`.
- **Services** : textes dans `services.items` (fr.json / en.json), icônes dans `SERVICE_ICONS`, illustrations dans `src/components/ServiceArt.jsx` (même ordre).
- **Titre d'accueil** : `home.headline_a` (texte foncé) et `home.headline_b` (texte atténué) dans les fichiers de langue.
- **Avatar de l'en-tête** : `public/assets/img/avatar.webp`.
- **Projets** : ajouter l'entrée dans `PROJECTS` (techs.js, avec `type: 'web'` ou `'desktop'`) **et** dans `work.projects` des deux fichiers de langue (même ordre).
- **Couleur d'accent** : variable `--accent` dans `src/index.css` (clair et sombre).
- **EmailJS** : copier `.env.example` en `.env` pour utiliser vos propres identifiants.
- **Portrait d'accueil** : `public/assets/img/photo1.webp` (format 4:5).
