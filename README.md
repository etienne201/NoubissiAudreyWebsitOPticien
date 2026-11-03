# Audrey Noubissi — Espace Conseil en Optique-Lunetterie (Douala)

Application web progressive (PWA) haut de gamme pour **Audrey Noubissi (Noubissie)**, opticienne-lunetière à Douala (Cameroun), forte de plus de 3 ans d'expérience pratique sur le terrain (initiée par sa mère) et d'une formation supérieure en **BTS Opticien-Lunetier**.

## Architecture & Technologies

- **Framework** : Next.js 15 (App Router), React 19, TypeScript strict (`tsc --noEmit`)
- **Design System** : Tailwind CSS (palette Nuit, Ivoire, Sauge, Or Champagne), typographies locales `Fraunces` (serif éditorial) et `Manrope` (sans-serif haute lisibilité), animations accessibles `Framer Motion` (`reducedMotion="user"`)
- **Moteurs Métier Optique** :
  - [`src/config/site.ts`](./src/config/site.ts) : Source unique de vérité (identité, horaires Africa/Douala, catalogue de montures avec dimensions normées, géométries de verres, indices de réfraction 1.50 / 1.60 / 1.67-1.74, traitements et FAQ déontologique).
  - [`src/lib/optical-advisor.ts`](./src/lib/optical-advisor.ts) : Moteur d'accompagnement et de diagnostic optique en 4 étapes (usages, inconforts ressentis, situation d'ordonnance, préférences de style et budget/assurance) avec orientation déontologique vers l'ophtalmologiste lorsque nécessaire.
  - [`src/lib/chatbot-engine.ts`](./src/lib/chatbot-engine.ts) & [`src/app/api/chat/route.ts`](./src/app/api/chat/route.ts) : Assistant conversationnel spécialisé en optique-lunetterie avec mémoire multi-tours, triage d'urgence médicale, parcours fatigue écrans, explication des avantages/limites des verres et passerelle optionnelle vers Gemini / OpenAI avec fallback déterministe local.
- **PWA & Résilience Mobile** : Manifeste Web App, Service Worker (`public/sw.js`) avec cache des actifs critiques et page de secours hors-ligne (`/offline`).

## Installation et développement

```bash
pnpm install
pnpm dev          # Serveur de développement sur http://localhost:3000
```

## Vérification & Qualité

```bash
pnpm lint         # Vérification statique TypeScript (tsc --noEmit)
pnpm test         # Suite de tests unitaires et d'intégration (Vitest)
pnpm build        # Build de production Next.js
```

##Variables d'environnement (optionnelles)

- `NEXT_PUBLIC_SITE_URL` : URL canonique de production (ex. `https://audrey-noubissi.com`)
- `GEMINI_API_KEY` ou `OPENAI_API_KEY` : Clé API optionnelle côté serveur pour enrichir l'assistant conversationnel `/api/chat`. Sans clé configurée, le moteur optique interne (`ChatbotEngine`) assure 100 % des réponses de manière autonome et instantanée.

## Déontologie médicale

L'application distingue strictement les actes médicaux réservés au **médecin ophtalmologiste** (diagnostic des pathologies oculaires, examen médical de la réfraction et prescription d'ordonnance) du rôle de conseil, de visagisme, de choix des verres, de prise de mesures pupillaires et d'ajustage exercé par l'**opticienne-lunetière**.
