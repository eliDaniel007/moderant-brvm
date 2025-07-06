import { Portefeuille, Position, Transaction, Alerte } from '../entities/Portefeuille';

export interface IPortefeuilleRepository {
  // Portefeuille
  recupererPortefeuille(utilisateurId: string): Promise<Portefeuille | null>;
  creerPortefeuille(portefeuille: Omit<Portefeuille, 'id' | 'dateCreation' | 'dateModification'>): Promise<Portefeuille>;
  mettreAJourPortefeuille(portefeuille: Portefeuille): Promise<Portefeuille>;
  supprimerPortefeuille(portefeuilleId: string): Promise<void>;
  
  // Positions
  recupererPositions(portefeuilleId: string): Promise<Position[]>;
  ajouterPosition(position: Omit<Position, 'id'>): Promise<Position>;
  mettreAJourPosition(position: Position): Promise<Position>;
  supprimerPosition(positionId: string): Promise<void>;
  
  // Transactions
  recupererTransactions(portefeuilleId: string, limite?: number): Promise<Transaction[]>;
  ajouterTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction>;
  mettreAJourTransaction(transaction: Transaction): Promise<Transaction>;
  supprimerTransaction(transactionId: string): Promise<void>;
  
  // Alertes
  recupererAlertes(utilisateurId: string): Promise<Alerte[]>;
  ajouterAlerte(alerte: Omit<Alerte, 'id' | 'dateCreation'>): Promise<Alerte>;
  mettreAJourAlerte(alerte: Alerte): Promise<Alerte>;
  supprimerAlerte(alerteId: string): Promise<void>;
  activerDesactiverAlerte(alerteId: string, active: boolean): Promise<void>;
} 