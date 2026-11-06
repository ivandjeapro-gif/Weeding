# 💍 NORBÉ & ERICKA — Invitation de Mariage Interactive

Une invitation de mariage web avec **grande porte de célébration animée** : le visiteur touche la porte, les deux vantails s'ouvrent dans une lumière dorée, et l'invitation complète se révèle dans une pluie de pétales de roses.

**📅 Le grand jour : 21 novembre 2026 — Agnibilékrou (Côte d'Ivoire)**

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| 🚪 Grande porte de célébration | Porte double en bois gravé (initiales **N** & **E**), poignées dorées en forme d'alliances, cadre doré en arche |
| 🖱️ Ouverture animée | Au clic (ou **Entrée** au clavier), les vantails pivotent en 3D, la lumière jaillit, des étincelles dorées s'envolent |
| 💌 Invitation fidèle | Versets bibliques (Hébreux 3:4 & Ecclésiaste 4:12), unions civile et religieuse, décor floral terracotta / olive / doré |
| ⏳ Compte à rebours | Temps réel avant le 21 novembre 2026 à 09h30 |
| 🗓️ Programme de la journée | 09h30 Mairie d'Agnibilékrou · 12h00 Temple du Salut · 14h00 Réception dans la cour de l'église |
| 🌹 Pluie de pétales | Pétales de roses animés (terracotta, crème, olive) pendant toute la lecture |
| 🔁 Bouton « Revoir l'ouverture » | Pour rejouer l'animation de la porte à volonté |
| ♿ Accessibilité | Navigation clavier, `aria-label`, mode `prefers-reduced-motion` |
| 📱 Responsive | Conçu mobile d'abord, parfait sur téléphone et ordinateur |

## 🛠️ Stack technique

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 4** + animations CSS 3D (`perspective`, `rotateY`)
- Polices élégantes : *Cormorant Garamond*, *Great Vibes*, *Montserrat* (Google Fonts)
- Ornements floraux 100 % SVG faits main (roses, lauriers, alliances, rubans dorés)

## 🚀 Lancer le projet

```bash
bun install      # ou npm install
bun run dev      # ou npm run dev
```

Ouvrir http://localhost:3000 — puis… **touchez la porte !** 🚪✨

## 📤 Publier sur GitHub

```bash
# 1. Créer un dépôt vide sur https://github.com/new (ex. invitation-mariage-norbe-ericka)
# 2. Relier puis pousser :
git remote add origin https://github.com/<votre-pseudo>/invitation-mariage-norbe-ericka.git
git branch -M main
git push -u origin main
```

## 🌍 Mettre en ligne (partage aux invités)

Le plus simple : importer le dépôt sur [Vercel](https://vercel.com) (gratuit) — `Next.js` est détecté automatiquement, aucune configuration requise. Vous obtenez un lien du type `https://invitation-mariage-norbe-ericka.vercel.app` à envoyer aux invités.

---

*Avec tout notre amour — Norbé & Ericka* 💛
