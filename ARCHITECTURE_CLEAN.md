# Architecture Clean Architecture - MODERANT BRVM

## Vue d'ensemble

Ce projet a été restructuré selon les principes de Clean Architecture pour améliorer la maintenabilité, la testabilité et la scalabilité de l'application.

## Structure des couches

### 1. Domain (Cœur métier)
**Emplacement :** `src/domain/`

#### Entités (`entities/`)
- `Action.ts` - Représente une action boursière avec ses propriétés
- `Portefeuille.ts` - Représente le portefeuille d'un utilisateur
- `Utilisateur.ts` - Représente un utilisateur de l'application

#### Interfaces des repositories (`repositories/`)
- `IActionRepository.ts` - Interface pour la gestion des actions
- `IPortefeuilleRepository.ts` - Interface pour la gestion des portefeuilles
- `IUtilisateurRepository.ts` - Interface pour la gestion des utilisateurs

#### Interfaces des services (`services/`)
- `IAnalyseTechniqueService.ts` - Interface pour l'analyse technique
- `IPortefeuilleService.ts` - Interface pour la gestion des portefeuilles

#### Cas d'utilisation (`usecases/`)
- `RecupererActionsUseCase.ts` - Récupération des actions BRVM
- `AnalyserActionUseCase.ts` - Analyse technique d'une action
- `GererPortefeuilleUseCase.ts` - Gestion des portefeuilles

### 2. Data (Couche de données)
**Emplacement :** `src/data/`

#### Implémentations des repositories (`repositories/`)
- `ActionRepositoryImpl.ts` - Implémentation concrète du repository des actions

#### Implémentations des services (`services/`)
- `AnalyseTechniqueServiceImpl.ts` - Implémentation concrète du service d'analyse technique

### 3. Infrastructure
**Emplacement :** `src/infrastructure/`

#### Conteneur de dépendances (`container/`)
- `Container.ts` - Conteneur IoC pour l'injection de dépendances

### 4. Presentation (Couche de présentation)
**Emplacement :** `src/presentation/`

#### Composants React (`components/`)
- `ActionsList.tsx` - Composant pour afficher la liste des actions

## Principes appliqués

### 1. Séparation des responsabilités
- **Domain** : Contient uniquement la logique métier
- **Data** : Gère l'accès aux données externes
- **Infrastructure** : Fournit les services techniques
- **Presentation** : Gère l'interface utilisateur

### 2. Inversion de dépendances
- Les couches externes dépendent des interfaces définies dans le Domain
- Le Domain ne dépend d'aucune couche externe

### 3. Injection de dépendances
- Utilisation d'un conteneur IoC pour gérer les dépendances
- Facilite les tests et la maintenance

## Avantages de cette architecture

### 1. Testabilité
- Chaque couche peut être testée indépendamment
- Possibilité de mocker les dépendances facilement
- Tests unitaires plus simples à écrire

### 2. Maintenabilité
- Code organisé et structuré
- Responsabilités clairement séparées
- Modifications localisées

### 3. Scalabilité
- Ajout de nouvelles fonctionnalités facilité
- Remplacement d'implémentations sans impact sur le reste
- Évolution indépendante des couches

### 4. Indépendance des frameworks
- Le Domain est indépendant de React, Material-UI, etc.
- Possibilité de changer de framework UI sans impact sur la logique métier

## Utilisation

### 1. Récupération d'actions
```typescript
const container = Container.getInstance();
const recupererActionsUseCase = container.getRecupererActionsUseCase();
const actions = await recupererActionsUseCase.executer();
```

### 2. Analyse d'une action
```typescript
const analyserActionUseCase = container.getAnalyserActionUseCase();
const analyse = await analyserActionUseCase.executer('SONATEL');
```

### 3. Dans un composant React
```typescript
import { Container } from '../../infrastructure/container/Container';
import { RecupererActionsUseCase } from '../../domain/usecases/RecupererActionsUseCase';

const ActionsList: React.FC = () => {
  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    const chargerActions = async () => {
      const container = Container.getInstance();
      const useCase = container.getRecupererActionsUseCase();
      const actionsRecuperees = await useCase.executer();
      setActions(actionsRecuperees);
    };
    
    chargerActions();
  }, []);

  // Rendu du composant...
};
```

## Prochaines étapes

### 1. Implémentation des repositories manquants
- `PortefeuilleRepositoryImpl.ts`
- `UtilisateurRepositoryImpl.ts`

### 2. Implémentation des services manquants
- `PortefeuilleServiceImpl.ts`

### 3. Ajout de nouveaux cas d'utilisation
- Authentification
- Gestion des alertes
- Notifications

### 4. Tests
- Tests unitaires pour chaque couche
- Tests d'intégration
- Tests end-to-end

### 5. Documentation
- Documentation des APIs
- Guides d'utilisation
- Exemples de code

## Conventions de nommage

### Variables et fonctions (camelCase)
- `recupererActions()`
- `calculerRSI()`
- `formaterPrix()`

### Classes et interfaces (PascalCase)
- `ActionRepositoryImpl`
- `RecupererActionsUseCase`
- `IActionRepository`

### Fichiers
- `ActionRepositoryImpl.ts`
- `RecupererActionsUseCase.ts`
- `ActionsList.tsx`

## Dépendances

### Domain
- Aucune dépendance externe

### Data
- `domain/` (interfaces et entités)

### Infrastructure
- `domain/` (interfaces)
- `data/` (implémentations)

### Presentation
- `domain/` (entités et use cases)
- `infrastructure/` (container)
- React et Material-UI (framework UI) 