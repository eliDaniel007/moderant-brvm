import { Action } from '../entities/Action';
import { IActionRepository } from '../repositories/IActionRepository';

export class RecupererActionsUseCase {
  constructor(private actionRepository: IActionRepository) {}

  async executer(): Promise<Action[]> {
    try {
      return await this.actionRepository.recupererToutesActions();
    } catch (erreur) {
      throw new Error(`Erreur lors de la récupération des actions: ${erreur}`);
    }
  }

  async executerParSymbole(symbole: string): Promise<Action | null> {
    try {
      return await this.actionRepository.recupererActionParSymbole(symbole);
    } catch (erreur) {
      throw new Error(`Erreur lors de la récupération de l'action ${symbole}: ${erreur}`);
    }
  }

  async executerParSecteur(secteur: string): Promise<Action[]> {
    try {
      return await this.actionRepository.recupererActionsParSecteur(secteur);
    } catch (erreur) {
      throw new Error(`Erreur lors de la récupération des actions du secteur ${secteur}: ${erreur}`);
    }
  }

  async executerRecherche(terme: string): Promise<Action[]> {
    try {
      return await this.actionRepository.rechercherActions(terme);
    } catch (erreur) {
      throw new Error(`Erreur lors de la recherche d'actions: ${erreur}`);
    }
  }

  async executerPlusActives(limite: number): Promise<Action[]> {
    try {
      return await this.actionRepository.recupererActionsPlusActives(limite);
    } catch (erreur) {
      throw new Error(`Erreur lors de la récupération des actions les plus actives: ${erreur}`);
    }
  }

  async executerPlusFortesVariations(limite: number, type: 'hausse' | 'baisse'): Promise<Action[]> {
    try {
      return await this.actionRepository.recupererActionsPlusFortesVariations(limite, type);
    } catch (erreur) {
      throw new Error(`Erreur lors de la récupération des actions avec les plus fortes variations: ${erreur}`);
    }
  }
} 