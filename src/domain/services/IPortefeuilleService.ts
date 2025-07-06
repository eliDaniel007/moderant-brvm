import { Portefeuille, Position, Transaction } from '../entities/Portefeuille';
import { Action } from '../entities/Action';

export interface IPortefeuilleService {
  // Gestion du portefeuille
  calculerValeurPortefeuille(positions: Position[], prixActuels: Map<string, number>): {
    valeurTotale: number;
    plusValue: number;
    plusValuePourcentage: number;
  };
  
  // Calcul des performances
  calculerPerformance(portefeuille: Portefeuille, periode: number): {
    rendement: number;
    rendementAnnuel: number;
    volatilite: number;
    ratioSharpe: number;
    drawdownMaximum: number;
  };
  
  // Allocation d'actifs
  calculerAllocationSectorielle(positions: Position[], actions: Action[]): Map<string, {
    valeur: number;
    pourcentage: number;
    nombreActions: number;
  }>;
  
  // Gestion des risques
  calculerRisquePortefeuille(positions: Position[], actions: Action[]): {
    beta: number;
    volatilite: number;
    var95: number; // Value at Risk 95%
    correlation: number;
  };
  
  // Optimisation
  optimiserPortefeuille(
    capital: number,
    profilRisque: 'conservateur' | 'modere' | 'agressif',
    actions: Action[]
  ): {
    allocations: Map<string, number>;
    rendementAttendu: number;
    risqueAttendu: number;
  };
  
  // Rebalancement
  calculerRebalancement(
    portefeuille: Portefeuille,
    allocationsCibles: Map<string, number>
  ): Transaction[];
  
  // Simulation
  simulerTransaction(
    portefeuille: Portefeuille,
    action: string,
    type: 'achat' | 'vente',
    quantite: number,
    prix: number
  ): {
    nouveauPortefeuille: Portefeuille;
    impact: {
      nouvelleValeur: number;
      nouvellePlusValue: number;
      impactAllocation: Map<string, number>;
    };
  };
} 