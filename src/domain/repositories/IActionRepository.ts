import { Action, DonneesHistoriques, IndicateursTechniques } from '../entities/Action';

export interface IActionRepository {
  // Récupérer toutes les actions BRVM
  recupererToutesActions(): Promise<Action[]>;
  
  // Récupérer une action par son symbole
  recupererActionParSymbole(symbole: string): Promise<Action | null>;
  
  // Récupérer les données historiques d'une action
  recupererDonneesHistoriques(symbole: string, periode: number): Promise<DonneesHistoriques[]>;
  
  // Calculer les indicateurs techniques
  calculerIndicateursTechniques(symbole: string, periode: number): Promise<IndicateursTechniques>;
  
  // Récupérer les actions par secteur
  recupererActionsParSecteur(secteur: string): Promise<Action[]>;
  
  // Rechercher des actions
  rechercherActions(terme: string): Promise<Action[]>;
  
  // Récupérer les actions les plus actives
  recupererActionsPlusActives(limite: number): Promise<Action[]>;
  
  // Récupérer les actions avec les plus fortes variations
  recupererActionsPlusFortesVariations(limite: number, type: 'hausse' | 'baisse'): Promise<Action[]>;
} 