# 🚀 Guide de Déploiement - BourseAnalyse

## 📋 Prérequis
- Compte GitHub
- Compte Vercel (gratuit)
- Node.js 18+ installé localement

## 🔄 Étape 1: Préparation du Repository GitHub

### 1.1 Initialiser Git (si pas déjà fait)
```bash
cd moderant-brvm
git init
git add .
git commit -m "Initial commit - BourseAnalyse application"
```

### 1.2 Créer un nouveau repository sur GitHub
1. Allez sur [GitHub.com](https://github.com)
2. Cliquez sur "New repository"
3. Nommez-le `bourseanalyse`
4. **Ne pas** initialiser avec README (nous en avons déjà un)
5. Cliquez sur "Create repository"

### 1.3 Connecter le repository local à GitHub
```bash
git remote add origin https://github.com/VOTRE_USERNAME/bourseanalyse.git
git branch -M main
git push -u origin main
```

## 🌐 Étape 2: Déploiement sur Vercel

### 2.1 Méthode 1: Déploiement via l'interface Vercel (Recommandé)

1. **Connectez-vous à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec votre compte GitHub

2. **Importer le projet**
   - Cliquez sur "New Project"
   - Sélectionnez votre repository `bourseanalyse`
   - Vercel détectera automatiquement que c'est un projet Vite

3. **Configuration automatique**
   - **Framework Preset**: Vite (détecté automatiquement)
   - **Build Command**: `npm run build` (par défaut)
   - **Output Directory**: `dist` (par défaut)
   - **Install Command**: `npm install` (par défaut)

4. **Variables d'environnement** (si nécessaire)
   - Ajoutez vos variables d'environnement dans l'onglet "Environment Variables"
   - Exemple: `VITE_API_URL=https://votre-api.com`

5. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez 2-3 minutes pour le déploiement

### 2.2 Méthode 2: Déploiement via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Suivre les instructions interactives
# - Sélectionner le scope
# - Confirmer le nom du projet
# - Confirmer la configuration
```

## 🔧 Étape 3: Configuration Post-Déploiement

### 3.1 Domaine personnalisé (optionnel)
1. Dans votre dashboard Vercel
2. Allez dans "Settings" > "Domains"
3. Ajoutez votre domaine personnalisé
4. Suivez les instructions DNS

### 3.2 Variables d'environnement
Si votre application utilise des variables d'environnement :

1. Dans Vercel Dashboard > Settings > Environment Variables
2. Ajoutez vos variables :
   ```
   VITE_API_URL=https://votre-api.com
   VITE_APP_NAME=BourseAnalyse
   ```

### 3.3 Redéploiement automatique
- Chaque push sur la branche `main` déclenchera automatiquement un nouveau déploiement
- Vous pouvez configurer des branches de preview pour les tests

## 📱 Étape 4: Partage du Lien

### 4.1 Lien de production
Votre application sera accessible à :
```
https://bourseanalyse.vercel.app
```
(ou votre domaine personnalisé si configuré)

### 4.2 Lien de preview
Pour chaque pull request, Vercel génère automatiquement un lien de preview :
```
https://bourseanalyse-git-feature-branch.vercel.app
```

## 🔄 Étape 5: Mise à jour et Maintenance

### 5.1 Mettre à jour l'application
```bash
# Faire vos modifications
git add .
git commit -m "Nouvelle fonctionnalité"
git push origin main
# Vercel déploiera automatiquement
```

### 5.2 Vérifier les déploiements
- Dashboard Vercel > "Deployments"
- Voir l'historique des déploiements
- Vérifier les logs en cas d'erreur

## 🛠️ Dépannage

### Problème: Build échoue
1. Vérifiez les logs dans Vercel Dashboard
2. Testez localement : `npm run build`
3. Vérifiez les dépendances dans `package.json`

### Problème: Variables d'environnement
1. Vérifiez que les variables commencent par `VITE_`
2. Redéployez après avoir ajouté des variables

### Problème: Routing
1. Vérifiez que `vercel.json` est configuré correctement
2. Assurez-vous que React Router est configuré pour le mode Hash ou Browser

## 📊 Monitoring

### Analytics Vercel
- Vercel Analytics inclus gratuitement
- Voir les performances et l'utilisation

### Logs
- Dashboard Vercel > "Functions" pour voir les logs
- Logs en temps réel disponibles

## 🔒 Sécurité

### Headers de sécurité
Le fichier `vercel.json` inclut déjà :
- Protection XSS
- Protection contre le clickjacking
- Headers de sécurité de base

### Variables sensibles
- Ne jamais commiter de secrets dans le code
- Utiliser les variables d'environnement Vercel

---

## 🎉 Félicitations !

Votre application BourseAnalyse est maintenant déployée et accessible en ligne ! 

**Lien de votre application**: `https://bourseanalyse.vercel.app`

Vous pouvez maintenant partager ce lien avec quiconque souhaite voir votre projet.

---

*Dernière mise à jour: $(date)* 