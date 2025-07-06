export interface Action {
  symbole: string;
  nom: string;
  dernierPrix: number;
  variation: number;
  volume: number;
  variationPourcentage: number;
  prixOuverture: number;
  prixPlusHaut: number;
  prixPlusBas: number;
  capitalisation: number;
  secteur: string;
}

export interface DonneesHistoriques {
  date: string;
  prixOuverture: number;
  prixPlusHaut: number;
  prixPlusBas: number;
  prixCloture: number;
  volume: number;
}

export interface IndicateursTechniques {
  rsi: number;
  macd: number;
  sma: number;
  ema: number;
  bollingerBandes: {
    superieure: number;
    moyenne: number;
    inferieure: number;
  };
}

export interface AnalyseTechnique {
  action: Action;
  donneesHistoriques: DonneesHistoriques[];
  indicateurs: IndicateursTechniques;
  signaux: {
    type: 'achat' | 'vente' | 'neutre';
    force: number;
    description: string;
  };
} 