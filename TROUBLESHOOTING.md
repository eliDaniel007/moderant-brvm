# Guide de Dépannage - MODERANT

## Problèmes CORS (Cross-Origin Resource Sharing)

### Symptômes
- Erreur dans la console : `Access to XMLHttpRequest at 'http://127.0.0.1:8000/api/v1/check-auth/' from origin 'http://localhost:5184' has been blocked by CORS policy`
- Le composant NetworkError affiche une notification jaune

### Solutions

#### 1. Démarrer le serveur Django Backend

```bash
# Naviguer vers le dossier backend
cd backend

# Activer l'environnement virtuel (si pas déjà fait)
# Sur Windows :
venv\Scripts\activate
# Sur macOS/Linux :
source venv/bin/activate

# Démarrer le serveur Django
python manage.py runserver
```

**Vérification** : Le serveur doit afficher :
```
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
January 19, 2024 - 15:30:00
Django version 5.2.3, using settings 'moderant_backend.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

#### 2. Vérifier la configuration CORS

Le fichier `backend/moderant_backend/settings.py` doit contenir :

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    # ... autres ports
    "http://localhost:5184",
    "http://127.0.0.1:5184",
]

CORS_ALLOW_CREDENTIALS = True
```

#### 3. Redémarrer le serveur après modification

Après toute modification de `settings.py`, redémarrez le serveur Django :
```bash
# Arrêter avec Ctrl+C, puis redémarrer
python manage.py runserver
```

## Problèmes de Données Mock

### Symptômes
- Erreur : `Cannot read properties of undefined (reading 'toFixed')`
- Pages qui ne s'affichent pas correctement

### Solutions

#### 1. Vérifier la structure des données

Les interfaces TypeScript dans `src/data/mockData.ts` doivent correspondre à l'utilisation dans les composants.

#### 2. Redémarrer le serveur de développement

```bash
# Dans le dossier moderant-brvm
npm run dev
# ou
yarn dev
```

## Problèmes de Connexion Internet

### Symptômes
- Erreur : `Failed to fetch`
- Notification rouge "Connexion Internet perdue"

### Solutions

1. Vérifier votre connexion Internet
2. Vérifier que vous n'êtes pas en mode hors ligne
3. Redémarrer votre navigateur

## Problèmes de Ports

### Symptômes
- Erreur : `EADDRINUSE` (port déjà utilisé)
- Impossible de démarrer le serveur

### Solutions

#### Pour le Frontend (Vite)
```bash
# Arrêter tous les processus sur le port
# Sur Windows :
netstat -ano | findstr :5184
taskkill /PID <PID> /F

# Puis redémarrer
npm run dev
```

#### Pour le Backend (Django)
```bash
# Arrêter le serveur avec Ctrl+C
# Puis redémarrer
python manage.py runserver
```

## Problèmes de Dépendances

### Symptômes
- Erreurs d'import
- Modules non trouvés

### Solutions

#### Frontend
```bash
cd moderant-brvm
npm install
# ou
yarn install
```

#### Backend
```bash
cd backend
pip install -r requirements.txt
# ou si pas de requirements.txt
pip install django djangorestframework django-cors-headers python-decouple
```

## Problèmes de Base de Données

### Symptômes
- Erreurs de migration
- Tables manquantes

### Solutions

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

## Vérification Complète

### Checklist de Démarrage

1. **Backend Django** :
   - [ ] Serveur démarré sur http://127.0.0.1:8000
   - [ ] Pas d'erreurs dans la console Django
   - [ ] Migrations appliquées

2. **Frontend React** :
   - [ ] Serveur Vite démarré (généralement sur http://localhost:5184)
   - [ ] Pas d'erreurs dans la console du navigateur
   - [ ] Toutes les dépendances installées

3. **Réseau** :
   - [ ] Connexion Internet active
   - [ ] Pas de pare-feu bloquant les ports
   - [ ] CORS configuré correctement

### Test de Connexion

Ouvrez votre navigateur et testez :
- Frontend : http://localhost:5184
- Backend : http://127.0.0.1:8000/admin

## Support

Si les problèmes persistent :

1. Vérifiez les logs dans la console du navigateur (F12)
2. Vérifiez les logs du serveur Django
3. Redémarrez tous les serveurs
4. Vérifiez que vous utilisez les bonnes versions des dépendances

## Commandes Utiles

```bash
# Vérifier les processus sur un port (Windows)
netstat -ano | findstr :8000

# Vérifier les processus sur un port (macOS/Linux)
lsof -i :8000

# Nettoyer le cache npm
npm cache clean --force

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
``` 