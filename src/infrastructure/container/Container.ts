import { IActionRepository } from '../../domain/repositories/IActionRepository';
import { IAnalyseTechniqueService } from '../../domain/services/IAnalyseTechniqueService';

import { ActionRepositoryImpl } from '../../data/repositories/ActionRepositoryImpl';
import { AnalyseTechniqueServiceImpl } from '../../data/services/AnalyseTechniqueServiceImpl';

import { RecupererActionsUseCase } from '../../domain/usecases/RecupererActionsUseCase';
import { AnalyserActionUseCase } from '../../domain/usecases/AnalyserActionUseCase';

export class Container {
  private static instance: Container;
  private services: Map<string, unknown> = new Map();

  private constructor() {
    this.initialiserServices();
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private initialiserServices(): void {
    // Services
    this.services.set('IAnalyseTechniqueService', new AnalyseTechniqueServiceImpl());

    // Repositories
    this.services.set('IActionRepository', new ActionRepositoryImpl(
      this.get<IAnalyseTechniqueService>('IAnalyseTechniqueService')
    ));

    // Use Cases
    this.services.set('RecupererActionsUseCase', new RecupererActionsUseCase(
      this.get<IActionRepository>('IActionRepository')
    ));

    this.services.set('AnalyserActionUseCase', new AnalyserActionUseCase(
      this.get<IActionRepository>('IActionRepository'),
      this.get<IAnalyseTechniqueService>('IAnalyseTechniqueService')
    ));
  }

  public get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} non trouvé dans le conteneur`);
    }
    return service as T;
  }

  public register<T>(serviceName: string, implementation: T): void {
    this.services.set(serviceName, implementation);
  }

  // Méthodes utilitaires pour récupérer les use cases
  public getRecupererActionsUseCase(): RecupererActionsUseCase {
    return this.get<RecupererActionsUseCase>('RecupererActionsUseCase');
  }

  public getAnalyserActionUseCase(): AnalyserActionUseCase {
    return this.get<AnalyserActionUseCase>('AnalyserActionUseCase');
  }
} 