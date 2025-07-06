# 🚀 MODERANT BRVM - Guide de Démarrage Rapide

## 📋 Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Git

## 🛠️ Installation

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd moderant-brvm
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Vérifier l'architecture
```bash
npm run test
```

## 🧪 Tests d'Architecture

### Tests Automatiques
```bash
# Tests complets d'architecture
npm run test

# Tests d'architecture uniquement
npm run test:architecture

# Tests unitaires (à implémenter)
npm run test:unit

# Tests d'intégration (à implémenter)
npm run test:integration

# Tests end-to-end (à implémenter)
npm run test:e2e
```

### Tests Manuels
```bash
# Démarrer l'application
npm run dev

# Ouvrir http://localhost:3000
```

## 🏗️ Structure de l'Application

### Architecture Clean Architecture

```
src/
├── domain/                    # 🎯 Cœur métier
│   ├── entities/             # Entités métier (Action, Portefeuille, etc.)
│   ├── repositories/         # Interfaces des repositories
│   ├── services/            # Interfaces des services
│   └── usecases/            # Cas d'usage métier
├── data/                     # 📊 Accès aux données
│   ├── repositories/        # Implémentations des repositories
│   └── services/           # Implémentations des services
├── infrastructure/          # 🔧 Infrastructure
│   └── container/          # Injection de dépendances
├── presentation/            # 🎨 Interface utilisateur
│   └── components/         # Composants React
└── tests/                  # 🧪 Tests d'architecture
```

### Composants Principaux

1. **DashboardAmeliore** - Tableau de bord avec graphiques
2. **ActionsList** - Liste des actions avec filtres
3. **AnalyseTechniqueDetaillee** - Analyse technique complète
4. **DashboardAmeliorePage** - Page principale avec onglets

## 🎯 Fonctionnalités Disponibles

### ✅ Implémentées
- [x] Architecture Clean Architecture
- [x] Récupération des actions BRVM
- [x] Analyse technique (RSI, MACD, SMA, EMA)
- [x] Graphiques interactifs
- [x] Filtrage et tri des actions
- [x] Interface responsive
- [x] Tests d'architecture

### 🚧 En Cours
- [ ] Gestion du portefeuille
- [ ] Notifications en temps réel
- [ ] Mode sombre/clair
- [ ] Tests unitaires complets

### 📋 À Implémenter
- [ ] Authentification utilisateur
- [ ] API backend
- [ ] Base de données
- [ ] Tests end-to-end

## 🔧 Configuration

### Variables d'Environnement
Créer un fichier `.env.local` :
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_BRVM_API_URL=https://api.brvm.org
```

### Configuration TypeScript
- `tsconfig.json` - Configuration principale
- `tsconfig.test.json` - Configuration pour les tests

## 🚀 Démarrage Rapide

### 1. Installation Express
```bash
# Installer les dépendances
npm install

# Vérifier l'architecture
npm run test

# Démarrer l'application
npm run dev
```

### 2. Accès à l'Application
- **URL**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard-ameliore

### 3. Navigation
1. **Tableau de Bord** - Vue d'ensemble du marché
2. **Liste des Actions** - Toutes les actions BRVM
3. **Analyse Technique** - Analyse détaillée d'une action
4. **Portefeuille** - Gestion du portefeuille (à venir)

## 🧪 Tests et Validation

### Tests d'Architecture
```bash
npm run test:architecture
```

**Résultats attendus :**
```
🚀 MODERANT BRVM - Tests d'Architecture Clean Architecture
============================================================

🧪 Test de création d'action...
✅ Action créée avec succès
📊 Action: TEST - Action de Test
💰 Prix: 10 000 XOF
📈 Variation: 2.5%

🧪 Test de récupération des actions...
✅ 15 actions récupérées avec succès
📊 Première action: SONATEL - Sonatel
💰 Prix: 12 500 XOF
📈 Variation: 2.4%

🧪 Test d'analyse technique pour SONATEL...
✅ Analyse technique effectuée avec succès
📊 Tendance: haussière
🎯 Signal: achat (75%)
📈 RSI: 65.42
📊 MACD: 125.30
📉 SMA: 12 450 XOF

🎉 Tous les tests d'architecture ont réussi !
```

### Validation Manuelle
1. Ouvrir l'application
2. Naviguer entre les onglets
3. Sélectionner une action
4. Vérifier l'analyse technique
5. Tester les filtres et la recherche

## 🔍 Dépannage

### Erreurs Courantes

#### 1. Erreur de Module Material-UI
```bash
npm install @mui/material @emotion/react @emotion/styled
```

#### 2. Erreur de Chart.js
```bash
npm install chart.js react-chartjs-2
```

#### 3. Erreur TypeScript
```bash
npm install --save-dev typescript @types/node
```

#### 4. Erreur de Port
```bash
# Changer le port
npm run dev -- -p 3001
```

### Logs de Débogage
```bash
# Mode debug
DEBUG=* npm run dev

# Logs détaillés
npm run dev -- --verbose
```

## 📚 Documentation

- [Architecture Clean Architecture](./ARCHITECTURE_CLEAN.md)
- [Intégration et Tests](./INTEGRATION_ET_TESTS.md)
- [Spécifications du Projet](./SPECIFICATIONS.md)

## 🤝 Contribution

### Workflow de Développement
1. Créer une branche feature
2. Implémenter les fonctionnalités
3. Ajouter les tests
4. Vérifier l'architecture
5. Créer une pull request

### Standards de Code
- TypeScript strict
- Clean Architecture
- Tests unitaires
- Documentation en français
- Noms de variables en français

## 📞 Support

- **Email**: support@moderant-brvm.com
- **Documentation**: [Wiki du projet]
- **Issues**: [GitHub Issues]

---

**Version**: 1.0.0  
**Dernière mise à jour**: 2024  
**Équipe**: MODERANT BRVM 