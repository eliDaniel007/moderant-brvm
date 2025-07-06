# 🚀 MODERANT - Plateforme de Trading Moderne

Une application web moderne pour l'analyse et la gestion de portefeuilles d'actions sur les marchés financiers africains.

## ✨ Fonctionnalités Principales

### 🔐 Authentification
- **Inscription** avec validation stricte des mots de passe
- **Connexion** sécurisée avec gestion d'état Redux
- **Mode démo** pour tester l'application sans compte
- **Indicateur de force du mot de passe** en temps réel

### 📊 Tableau de Bord
- **Vue d'ensemble** du portefeuille avec statistiques en temps réel
- **Recherche d'actions** avec filtrage dynamique
- **Sélecteur de période** (1J, 1S, 1M, 3M, 1A)
- **Actions rapides** pour ajouter, visualiser et supprimer des actions
- **Cartes interactives** avec animations et micro-interactions

### 📈 Analyse Technique
- **Graphiques interactifs** avec Chart.js
- **Sélecteur d'actions** pour analyser différentes valeurs
- **Indicateurs techniques** détaillés (RSI, MACD, etc.)
- **Recommandations** d'achat/vente/conservation
- **Historique des prix** avec visualisation graphique
- **Actions rapides** (favoris, alertes, export)

### 🔔 Alertes et Notifications
- **Système d'alertes** personnalisables
- **Notifications en temps réel** avec animations
- **Gestion des alertes actives**

### 🎨 Interface Utilisateur
- **Design moderne** avec thème sombre
- **Animations fluides** et micro-interactions
- **Responsive design** optimisé mobile/desktop
- **Composants réutilisables** avec Tailwind CSS
- **Gradients animés** et effets visuels avancés

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** avec TypeScript
- **Redux Toolkit** pour la gestion d'état
- **React Router** pour la navigation
- **Tailwind CSS** pour le styling
- **Chart.js** pour les graphiques
- **Framer Motion** pour les animations

### Architecture
- **Clean Architecture** avec séparation des couches
- **Repository Pattern** pour l'accès aux données
- **Use Case Pattern** pour la logique métier
- **Dependency Injection** avec conteneur IoC

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd moderant-brvm
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer l'application en mode développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:5173
```

## 🚀 Scripts Disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement
npm run build        # Construit l'application pour la production
npm run preview      # Prévisualise la build de production

# Tests
npm run test         # Lance les tests unitaires
npm run test:watch   # Lance les tests en mode watch

# Linting
npm run lint         # Vérifie le code avec ESLint
npm run lint:fix     # Corrige automatiquement les erreurs de linting
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base
│   ├── charts/         # Composants de graphiques
│   └── layout/         # Composants de mise en page
├── pages/              # Pages de l'application
├── features/           # Fonctionnalités Redux
├── domain/             # Logique métier (Clean Architecture)
│   ├── entities/       # Entités du domaine
│   ├── repositories/   # Interfaces des repositories
│   ├── services/       # Services du domaine
│   └── usecases/       # Cas d'usage
├── data/               # Couche données
│   ├── repositories/   # Implémentations des repositories
│   └── services/       # Services de données
├── infrastructure/     # Infrastructure (DI, config)
├── store/              # Configuration Redux
├── utils/              # Utilitaires
└── styles/             # Styles globaux
```

## 🎯 Fonctionnalités Détaillées

### Authentification
- Validation stricte des mots de passe (8+ caractères, majuscule, minuscule, chiffre, caractère spécial)
- Indicateur visuel de la force du mot de passe
- Gestion des erreurs avec messages en français
- Mode démo pour tester sans authentification

### Tableau de Bord
- Statistiques en temps réel (valeur portefeuille, actions détenues, performance, alertes)
- Tableau interactif des actions avec recherche et filtrage
- Actions rapides (visualiser, ajouter, supprimer)
- Sélecteur de période pour les données

### Analyse Technique
- Graphiques interactifs avec Chart.js
- Sélecteur d'actions pour analyser différentes valeurs
- Indicateurs techniques (RSI, MACD, etc.)
- Recommandations d'investissement
- Actions rapides (favoris, alertes, export)

### Interface Utilisateur
- Design moderne avec thème sombre
- Animations CSS personnalisées
- Micro-interactions et transitions fluides
- Responsive design optimisé
- Composants réutilisables

## 🔧 Configuration

### Variables d'Environnement
Créer un fichier `.env.local` :
```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=MODERANT
```

### Tailwind CSS
Configuration personnalisée dans `tailwind.config.js` avec :
- Couleurs personnalisées (primary, dark, etc.)
- Animations CSS personnalisées
- Composants utilitaires

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests avec couverture
npm run test:coverage

# Tests d'intégration
npm run test:integration
```

## 📱 Responsive Design

L'application est optimisée pour :
- **Mobile** : 320px - 768px
- **Tablet** : 768px - 1024px
- **Desktop** : 1024px+

## 🎨 Design System

### Couleurs
- **Primary** : Bleu (#3B82F6)
- **Dark** : Gris foncé (#0F172A)
- **Success** : Vert (#10B981)
- **Warning** : Jaune (#F59E0B)
- **Error** : Rouge (#EF4444)

### Typographie
- **Font** : Inter
- **Tailles** : xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl

### Animations
- **Fade In** : Apparition en fondu
- **Slide In** : Glissement depuis la droite
- **Hover Lift** : Élévation au survol
- **Pulse** : Pulsation pour les éléments importants

## 🔒 Sécurité

- Validation côté client et serveur
- Gestion sécurisée des mots de passe
- Protection CSRF
- Headers de sécurité

## 🚀 Déploiement

### Production
```bash
npm run build
npm run preview
```

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Déployer le dossier dist/
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

- **Email** : support@moderant.com
- **Documentation** : [docs.moderant.com](https://docs.moderant.com)
- **Issues** : [GitHub Issues](https://github.com/moderant/issues)

---

**MODERANT** - Investissez avec confiance 🚀

## 🚀 Déploiement Rapide

### Option 1: Déploiement Vercel (Recommandé)
1. Cliquez sur le bouton ci-dessous pour déployer directement sur Vercel :
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/VOTRE_USERNAME/bourseanalyse)

### Option 2: Déploiement Manuel
```bash
# Cloner le repository
git clone https://github.com/VOTRE_USERNAME/bourseanalyse.git
cd bourseanalyse

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build
```

## 📋 Prérequis
- Node.js 18+ 
- npm ou yarn

## 🛠️ Technologies Utilisées
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Charts**: Chart.js avec react-chartjs-2
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 🏗️ Architecture
Le projet suit les principes de Clean Architecture avec les couches suivantes :
- `src/domain/` - Logique métier et entités
- `src/data/` - Sources de données et repositories
- `src/presentation/` - Interface utilisateur

## 🎨 Thème UQAR
L'application utilise la palette de couleurs officielle de l'Université du Québec à Rimouski :
- **Primaire**: #005499 (bleu foncé)
- **Accent**: #00A1E4 (bleu ciel)
- **Arrière-plan**: #F8F9FA (gris très clair)
- **Texte**: #2C2C2C (gris foncé)

## 📱 Fonctionnalités
- 📊 Tableau de bord interactif
- 📈 Graphiques de prix des actions
- 🔍 Analyse technique
- 👤 Gestion des utilisateurs
- 💼 Gestion de portefeuille
- 🔔 Système d'alertes

## 🔧 Scripts Disponibles
```bash
npm run dev          # Lancer en mode développement
npm run build        # Construire pour la production
npm run preview      # Prévisualiser la build
npm run lint         # Vérifier le code
npm run start:full   # Lancer le projet complet
```

## 🌐 Déploiement
L'application est configurée pour être déployée sur Vercel avec les paramètres suivants :
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 📞 Support
Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

---
**Développé avec ❤️ pour l'Université du Québec à Rimouski**
