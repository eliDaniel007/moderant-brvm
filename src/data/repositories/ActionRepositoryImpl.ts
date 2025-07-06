import { Action, DonneesHistoriques, IndicateursTechniques } from '../../domain/entities/Action';
import { IActionRepository } from '../../domain/repositories/IActionRepository';
import { IAnalyseTechniqueService } from '../../domain/services/IAnalyseTechniqueService';

interface DonneesBrutesAction {
  symbol: string;
  name: string;
  lastPrice: string;
  variation: string;
  volume: string;
}

interface DonneesHistoriquesBrutes {
  date: string;
  open?: number;
  high?: number;
  low?: number;
  close: number;
  volume?: number;
}

export class ActionRepositoryImpl implements IActionRepository {
  constructor(private analyseTechniqueService: IAnalyseTechniqueService) {}

  async recupererToutesActions(): Promise<Action[]> {
    try {
      const response = await fetch('http://localhost:3001/api/brvm/cours');
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const donneesBrutes = await response.json() as DonneesBrutesAction[];
      return donneesBrutes.map((action) => this.transformerDonneesBrutes(action));
    } catch (erreur) {
      console.error('Erreur lors de la récupération des actions:', erreur);
      throw new Error('Impossible de récupérer les actions BRVM');
    }
  }

  async recupererActionParSymbole(symbole: string): Promise<Action | null> {
    try {
      const actions = await this.recupererToutesActions();
      return actions.find(action => action.symbole === symbole.toUpperCase()) || null;
    } catch (erreur) {
      console.error(`Erreur lors de la récupération de l'action ${symbole}:`, erreur);
      throw new Error(`Impossible de récupérer l'action ${symbole}`);
    }
  }

  async recupererDonneesHistoriques(symbole: string): Promise<DonneesHistoriques[]> {
    try {
      const response = await fetch(`http://localhost:3001/api/brvm/${symbole}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const donnees = await response.json() as { prices: DonneesHistoriquesBrutes[] };
      return donnees.prices.map((prix) => ({
        date: prix.date,
        prixOuverture: prix.open || prix.close,
        prixPlusHaut: prix.high || prix.close,
        prixPlusBas: prix.low || prix.close,
        prixCloture: prix.close,
        volume: prix.volume || 0
      }));
    } catch (erreur) {
      console.error(`Erreur lors de la récupération des données historiques pour ${symbole}:`, erreur);
      throw new Error(`Impossible de récupérer les données historiques pour ${symbole}`);
    }
  }

  async calculerIndicateursTechniques(symbole: string): Promise<IndicateursTechniques> {
    try {
      const donneesHistoriques = await this.recupererDonneesHistoriques(symbole);
      const prixCloture = donneesHistoriques.map(d => d.prixCloture);

      const rsi = this.analyseTechniqueService.calculerRSI(prixCloture);
      const macd = this.analyseTechniqueService.calculerMACD(prixCloture);
      const sma = this.analyseTechniqueService.calculerSMA(prixCloture, 20);
      const ema = this.analyseTechniqueService.calculerEMA(prixCloture, 20);
      const bollingerBandes = this.analyseTechniqueService.calculerBollingerBandes(prixCloture);

      return {
        rsi,
        macd: macd.ligneMACD,
        sma: sma[sma.length - 1] || 0,
        ema: ema[ema.length - 1] || 0,
        bollingerBandes: {
          superieure: bollingerBandes.superieure[bollingerBandes.superieure.length - 1] || 0,
          moyenne: bollingerBandes.moyenne[bollingerBandes.moyenne.length - 1] || 0,
          inferieure: bollingerBandes.inferieure[bollingerBandes.inferieure.length - 1] || 0
        }
      };
    } catch (erreur) {
      console.error(`Erreur lors du calcul des indicateurs techniques pour ${symbole}:`, erreur);
      throw new Error(`Impossible de calculer les indicateurs techniques pour ${symbole}`);
    }
  }

  async recupererActionsParSecteur(secteur: string): Promise<Action[]> {
    try {
      const actions = await this.recupererToutesActions();
      return actions.filter(action => action.secteur.toLowerCase() === secteur.toLowerCase());
    } catch (erreur) {
      console.error(`Erreur lors de la récupération des actions du secteur ${secteur}:`, erreur);
      throw new Error(`Impossible de récupérer les actions du secteur ${secteur}`);
    }
  }

  async rechercherActions(terme: string): Promise<Action[]> {
    try {
      const actions = await this.recupererToutesActions();
      const termeRecherche = terme.toLowerCase();
      
      return actions.filter(action => 
        action.symbole.toLowerCase().includes(termeRecherche) ||
        action.nom.toLowerCase().includes(termeRecherche) ||
        action.secteur.toLowerCase().includes(termeRecherche)
      );
    } catch (erreur) {
      console.error(`Erreur lors de la recherche d'actions avec le terme ${terme}:`, erreur);
      throw new Error(`Impossible de rechercher les actions avec le terme ${terme}`);
    }
  }

  async recupererActionsPlusActives(limite: number): Promise<Action[]> {
    try {
      const actions = await this.recupererToutesActions();
      return actions
        .sort((a, b) => b.volume - a.volume)
        .slice(0, limite);
    } catch (erreur) {
      console.error('Erreur lors de la récupération des actions les plus actives:', erreur);
      throw new Error('Impossible de récupérer les actions les plus actives');
    }
  }

  async recupererActionsPlusFortesVariations(limite: number, type: 'hausse' | 'baisse'): Promise<Action[]> {
    try {
      const actions = await this.recupererToutesActions();
      const actionsFiltrees = type === 'hausse' 
        ? actions.filter(a => a.variationPourcentage > 0)
        : actions.filter(a => a.variationPourcentage < 0);
      
      return actionsFiltrees
        .sort((a, b) => Math.abs(b.variationPourcentage) - Math.abs(a.variationPourcentage))
        .slice(0, limite);
    } catch (erreur) {
      console.error(`Erreur lors de la récupération des actions avec les plus fortes variations (${type}):`, erreur);
      throw new Error(`Impossible de récupérer les actions avec les plus fortes variations (${type})`);
    }
  }

  private transformerDonneesBrutes(donneesBrutes: DonneesBrutesAction): Action {
    return {
      symbole: donneesBrutes.symbol || '',
      nom: donneesBrutes.name || '',
      dernierPrix: parseFloat(donneesBrutes.lastPrice) || 0,
      variation: parseFloat(donneesBrutes.variation) || 0,
      volume: parseInt(donneesBrutes.volume) || 0,
      variationPourcentage: this.calculerVariationPourcentage(donneesBrutes.variation),
      prixOuverture: parseFloat(donneesBrutes.lastPrice) || 0, // Données simulées
      prixPlusHaut: parseFloat(donneesBrutes.lastPrice) * 1.02 || 0, // Données simulées
      prixPlusBas: parseFloat(donneesBrutes.lastPrice) * 0.98 || 0, // Données simulées
      capitalisation: parseFloat(donneesBrutes.lastPrice) * (parseInt(donneesBrutes.volume) || 1000000) || 0,
      secteur: this.determinerSecteur(donneesBrutes.symbol || '')
    };
  }

  private calculerVariationPourcentage(variation: string): number {
    const valeur = parseFloat(variation);
    return isNaN(valeur) ? 0 : valeur;
  }

  private determinerSecteur(symbole: string): string {
    // Logique simplifiée pour déterminer le secteur basée sur le symbole
    const secteurs: { [key: string]: string } = {
      'SONATEL': 'Télécommunications',
      'ORABANK': 'Banque',
      'ECOBANK': 'Banque',
      'BOLLORE': 'Transport',
      'SGB': 'Banque',
      'NSIA': 'Assurance',
      'CICA': 'Assurance',
      'SIVOM': 'Industrie',
      'SOGUIPAMI': 'Pétrole'
    };
    
    return secteurs[symbole] || 'Autre';
  }
} 