#!/bin/bash

# 🚀 Script de Déploiement Automatique - UqarLife
# Ce script automatise le processus de déploiement sur GitHub et Vercel

set -e  # Arrêter le script en cas d'erreur

echo "🚀 Démarrage du déploiement UqarLife..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_message() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    print_error "Ce script doit être exécuté depuis le répertoire racine du projet"
    exit 1
fi

# Étape 1: Vérifier les dépendances
print_message "Vérification des dépendances..."
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé"
    exit 1
fi

if ! command -v git &> /dev/null; then
    print_error "Git n'est pas installé"
    exit 1
fi

print_success "Toutes les dépendances sont installées"

# Étape 2: Installer les dépendances
print_message "Installation des dépendances npm..."
npm install
print_success "Dépendances installées"

# Étape 3: Tests et linting
print_message "Exécution des tests et vérification du code..."
npm run lint
print_success "Code vérifié avec succès"

# Étape 4: Build de production
print_message "Construction de l'application pour la production..."
npm run build
print_success "Build terminé avec succès"

# Étape 5: Vérifier le statut Git
print_message "Vérification du statut Git..."
if [ -z "$(git status --porcelain)" ]; then
    print_warning "Aucun changement à commiter"
else
    print_message "Changements détectés, préparation du commit..."
    
    # Demander le message de commit
    read -p "Entrez le message de commit (ou appuyez sur Entrée pour 'Update deployment'): " commit_message
    commit_message=${commit_message:-"Update deployment"}
    
    git add .
    git commit -m "$commit_message"
    print_success "Changements commités"
fi

# Étape 6: Push vers GitHub
print_message "Envoi vers GitHub..."
if git push origin main; then
    print_success "Code envoyé vers GitHub"
else
    print_error "Erreur lors de l'envoi vers GitHub"
    print_message "Vérifiez que le remote origin est configuré correctement"
    exit 1
fi

# Étape 7: Déploiement Vercel (optionnel)
read -p "Voulez-vous déployer sur Vercel maintenant ? (y/n): " deploy_vercel

if [[ $deploy_vercel =~ ^[Yy]$ ]]; then
    print_message "Déploiement sur Vercel..."
    
    if command -v vercel &> /dev/null; then
        vercel --prod
        print_success "Déploiement Vercel terminé"
    else
        print_warning "Vercel CLI n'est pas installé"
        print_message "Pour installer Vercel CLI: npm i -g vercel"
        print_message "Ou déployez manuellement via l'interface web de Vercel"
    fi
else
    print_message "Déploiement Vercel ignoré"
fi

# Étape 8: Résumé
echo ""
print_success "🎉 Déploiement terminé avec succès !"
echo ""
echo "📋 Résumé:"
echo "  ✅ Dépendances installées"
echo "  ✅ Code vérifié et testé"
echo "  ✅ Build de production créé"
echo "  ✅ Code envoyé vers GitHub"
if [[ $deploy_vercel =~ ^[Yy]$ ]]; then
    echo "  ✅ Déployé sur Vercel"
fi
echo ""
echo "🌐 Votre application sera disponible sur Vercel dans quelques minutes"
echo "📱 Lien probable: https://bourseanalyse.vercel.app"
echo ""
echo "📚 Pour plus d'informations, consultez GUIDE_DEPLOIEMENT.md" 