import { Action, IndicateursTechniques, DonneesHistoriques } from '../entities/Action';
import { IActionRepository } from '../repositories/IActionRepository';
import { IAnalyseTechniqueService } from '../services/IAnalyseTechniqueService';

export interface ResultatAnalyse {
  action: Action;
  donneesHistoriques: DonneesHistoriques[];
  indicateurs: IndicateursTechniques;
  signaux: {
    type: 'achat' | 'vente' | 'neutre';
    force: number;
    description: string;
    confiance: number;
  };
  recommandations: {
    recommandation: 'acheter' | 'vendre' | 'tenir';
    raison: string;
    niveauConfiance: number;
    prixCible: number;
    stopLoss: number;
  };
  tendance: 'haussiere' | 'baissiere' | 'laterale';
  niveaux: {
    supports: number[];
    resistances: number[];
  };
  patterns: string[];
}

export class AnalyserActionUseCase {
  constructor(
    private actionRepository: IActionRepository,
    private analyseTechniqueService: IAnalyseTechniqueService
  ) {}

  async executer(symbole: string, periode: number = 30): Promise<ResultatAnalyse> {
    try {
      // Récupérer l'action
      const action = await this.actionRepository.recupererActionParSymbole(symbole);
      if (!action) {
        throw new Error(`Action ${symbole} non trouvée`);
      }

      // Récupérer les données historiques
      const donneesHistoriques = await this.actionRepository.recupererDonneesHistoriques(symbole, periode);

      // Calculer les indicateurs techniques
      const indicateurs = await this.actionRepository.calculerIndicateursTechniques(symbole, periode);

      // Extraire les prix de clôture pour l'analyse
      const prixCloture = donneesHistoriques.map(d => d.prixCloture);

      // Analyser les signaux
      const signaux = this.analyseTechniqueService.analyserSignaux(action, indicateurs);

      // Générer les recommandations
      const recommandations = this.analyseTechniqueService.genererRecommandations(action, indicateurs);

      // Déterminer la tendance
      const tendance = this.analyseTechniqueService.determinerTendance(prixCloture, periode);

      // Calculer les niveaux de support et résistance
      const niveaux = this.analyseTechniqueService.calculerNiveauxSupportResistance(prixCloture);

      // Détecter les patterns
      const patterns = this.analyseTechniqueService.detecterPatterns(
        donneesHistoriques.map(d => ({
          ouverture: d.prixOuverture,
          plusHaut: d.prixPlusHaut,
          plusBas: d.prixPlusBas,
          cloture: d.prixCloture
        }))
      );

      return {
        action,
        donneesHistoriques,
        indicateurs,
        signaux,
        recommandations,
        tendance,
        niveaux,
        patterns
      };
    } catch (erreur) {
      throw new Error(`Erreur lors de l'analyse de l'action ${symbole}: ${erreur}`);
    }
  }

  async executerAnalyseComplete(symbole: string): Promise<ResultatAnalyse> {
    // Analyse avec une période plus longue pour une vue complète
    return this.executer(symbole, 90);
  }

  async executerAnalyseCourte(symbole: string): Promise<ResultatAnalyse> {
    // Analyse avec une période courte pour le trading
    return this.executer(symbole, 14);
  }
} 