# Audrey Noubissi, opticienne à Douala

Portfolio vitrine : Next.js (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide.
Aucun backend, aucune base de données, aucun formulaire : le contact passe par WhatsApp (`https://wa.me/237657268355`) avec des messages préremplis.

## Installation et développement (pnpm)

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Qualité

```bash
pnpm lint         # vérification TypeScript
pnpm test         # tests des liens WhatsApp et des horaires
pnpm build        # build de production
pnpm start        # lance le build en local
```

## Où modifier les informations

Tout est dans `src/config/site.ts` : textes, horaires (`schedule`), services, assurances (`insurers`), messages WhatsApp, adresse, réseaux sociaux, portrait et photos de la galerie. Les champs vides ne sont pas affichés.

- Ajouter un jour d'ouverture : ajouter une ligne dans `schedule` (0 = dimanche … 6 = samedi).
- Ajouter des photos : les placer dans `public/images/` puis les déclarer dans `galleryPhotos`.
- Le badge Ouvert / Fermé utilise le fuseau `Africa/Douala`.

## Déploiement sur Vercel

1. Pousser le projet sur GitHub.
2. Sur vercel.com : **Add New > Project**, importer le dépôt (Vercel détecte Next.js et pnpm).
3. Ajouter la variable d'environnement `NEXT_PUBLIC_SITE_URL` avec l'URL finale (ex. `https://www.audreynoubissi.com`), puis déployer.
4. Associer le nom de domaine, puis soumettre `https://votre-domaine/sitemap.xml` dans Google Search Console.

HTTPS est fourni par Vercel. Le site est installable sur l'écran d'accueil (PWA : manifeste et icônes). Ce n'est pas une application native.

## Identité visuelle

Logo vectoriel dans `public/brand/` (horizontal, horizontal sur fond sombre, compact). Les polices sont intégrées dans `src/app/fonts/` (Fraunces et Manrope, licence SIL OFL).
Les SVG utilisent des polices système de secours : pour des fichiers d'impression, convertir le texte en tracés dans un éditeur vectoriel.

## Informations à fournir par Audrey

1. Adresse exacte ou quartier à Douala, et lien Google Maps (`address`, `mapsUrl`).
2. Autres jours d'ouverture, si elle en a (seuls lundi et samedi sont affichés).
3. Confirmation des services affichés (ajustement, entretien, réparations, lentilles de contact, accessoires). Examens de vue : non mentionnés tant que la qualification n'est pas confirmée.
4. Comment fonctionne la prise en charge par les assurances Escoma, Zenith, WTW et Olea, pour préciser le texte.
5. Photos autorisées (produits, espace de travail) et portrait.
6. Livraison, moyens de paiement, réseaux sociaux (Facebook, Instagram, TikTok).
7. Hébergeur et éditeur pour les mentions légales (actuellement : Vercel Inc.).
8. Nom de domaine définitif.
