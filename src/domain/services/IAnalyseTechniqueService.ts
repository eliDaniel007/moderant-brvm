import { Action, IndicateursTechniques } from '../entities/Action';

export interface IAnalyseTechniqueService {
  // Calcul des indicateurs techniques
  calculerRSI(prix: number[], periode?: number): number;
  calculerMACD(prix: number[]): { ligneMACD: number; ligneSignal: number; histogramme: number };
  calculerSMA(prix: number[], periode: number): number[];
  calculerEMA(prix: number[], periode: number): number[];
  calculerBollingerBandes(prix: number[], periode?: number, ecartType?: number): {
    superieure: number[];
    moyenne: number[];
    inferieure: number[];
  };
  
  // Analyse des signaux
  analyserSignaux(action: Action, indicateurs: IndicateursTechniques): {
    type: 'achat' | 'vente' | 'neutre';
    force: number;
    description: string;
    confiance: number;
  };
  
  // Patterns de chandeliers
  detecterPatterns(donnees: Array<{ouverture: number; plusHaut: number; plusBas: number; cloture: number}>): string[];
  
  // Support et résistance
  calculerNiveauxSupportResistance(prix: number[]): {
    supports: number[];
    resistances: number[];
  };
  
  // Analyse de tendance
  determinerTendance(prix: number[], periode?: number): 'haussiere' | 'baissiere' | 'laterale';
  
  // Recommandations
  genererRecommandations(action: Action, indicateurs: IndicateursTechniques): {
    recommandation: 'acheter' | 'vendre' | 'tenir';
    raison: string;
    niveauConfiance: number;
    prixCible: number;
    stopLoss: number;
  };
} 