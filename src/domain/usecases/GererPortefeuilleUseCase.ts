import { Portefeuille, Position, Transaction } from '../entities/Portefeuille';
import { Action } from '../entities/Action';
import { IPortefeuilleRepository } from '../repositories/IPortefeuilleRepository';
import { IPortefeuilleService } from '../services/IPortefeuilleService';
import { IActionRepository } from '../repositories/IActionRepository';

export interface ResultatPortefeuille {
  portefeuille: Portefeuille;
  performance: {
    rendement: number;
    rendementAnnuel: number;
    volatilite: number;
    ratioSharpe: number;
    drawdownMaximum: number;
  };
  allocation: Map<string, {
    valeur: number;
    pourcentage: number;
    nombreActions: number;
  }>;
  risque: {
    beta: number;
    volatilite: number;
    var95: number;
    correlation: number;
  };
}

export class GererPortefeuilleUseCase {
  constructor(
    private portefeuilleRepository: IPortefeuilleRepository,
    private portefeuilleService: IPortefeuilleService,
    private actionRepository: IActionRepository
  ) {}

  async recupererPortefeuille(utilisateurId: string): Promise<ResultatPortefeuille | null> {
    try {
      const portefeuille = await this.portefeuilleRepository.recupererPortefeuille(utilisateurId);
      if (!portefeuille) {
        return null;
      }

      // Récupérer les prix actuels des actions
      const prixActuels = new Map<string, number>();
      for (const position of portefeuille.positions) {
        const action = await this.actionRepository.recupererActionParSymbole(position.action);
        if (action) {
          prixActuels.set(position.action, action.dernierPrix);
        }
      }

      // Calculer les performances
      const performance = this.portefeuilleService.calculerPerformance(portefeuille, 30);

      // Calculer l'allocation sectorielle
      const actions = await this.actionRepository.recupererToutesActions();
      const allocation = this.portefeuilleService.calculerAllocationSectorielle(portefeuille.positions, actions);

      // Calculer le risque
      const risque = this.portefeuilleService.calculerRisquePortefeuille(portefeuille.positions, actions);

      return {
        portefeuille,
        performance,
        allocation,
        risque
      };
    } catch (erreur) {
      throw new Error(`Erreur lors de la récupération du portefeuille: ${erreur}`);
    }
  }

  async ajouterPosition(
    utilisateurId: string,
    action: string,
    quantite: number,
    prix: number
  ): Promise<Transaction> {
    try {
      const portefeuille = await this.portefeuilleRepository.recupererPortefeuille(utilisateurId);
      if (!portefeuille) {
        throw new Error('Portefeuille non trouvé');
      }

      // Créer la transaction
      const transaction: Omit<Transaction, 'id'> = {
        portefeuilleId: portefeuille.id,
        action,
        type: 'achat',
        quantite,
        prix,
        montant: quantite * prix,
        frais: this.calculerFrais(quantite * prix),
        date: new Date().toISOString(),
        statut: 'executee'
      };

      const nouvelleTransaction = await this.portefeuilleRepository.ajouterTransaction(transaction);

      // Mettre à jour ou créer la position
      const positions = await this.portefeuilleRepository.recupererPositions(portefeuille.id);
      const positionExistante = positions.find(p => p.action === action);

      if (positionExistante) {
        // Mettre à jour la position existante
        const nouvelleQuantite = positionExistante.quantite + quantite;
        const nouveauPrixMoyen = ((positionExistante.quantite * positionExistante.prixMoyen) + (quantite * prix)) / nouvelleQuantite;
        
        await this.portefeuilleRepository.mettreAJourPosition({
          ...positionExistante,
          quantite: nouvelleQuantite,
          prixMoyen: nouveauPrixMoyen
        });
      } else {
        // Créer une nouvelle position
        await this.portefeuilleRepository.ajouterPosition({
          portefeuilleId: portefeuille.id,
          action,
          quantite,
          prixMoyen: prix,
          valeurActuelle: quantite * prix,
          plusValue: 0,
          plusValuePourcentage: 0,
          dateAchat: new Date().toISOString()
        });
      }

      return nouvelleTransaction;
    } catch (erreur) {
      throw new Error(`Erreur lors de l'ajout de la position: ${erreur}`);
    }
  }

  async vendrePosition(
    utilisateurId: string,
    action: string,
    quantite: number,
    prix: number
  ): Promise<Transaction> {
    try {
      const portefeuille = await this.portefeuilleRepository.recupererPortefeuille(utilisateurId);
      if (!portefeuille) {
        throw new Error('Portefeuille non trouvé');
      }

      const positions = await this.portefeuilleRepository.recupererPositions(portefeuille.id);
      const position = positions.find(p => p.action === action);

      if (!position || position.quantite < quantite) {
        throw new Error('Position insuffisante pour cette vente');
      }

      // Créer la transaction
      const transaction: Omit<Transaction, 'id'> = {
        portefeuilleId: portefeuille.id,
        action,
        type: 'vente',
        quantite,
        prix,
        montant: quantite * prix,
        frais: this.calculerFrais(quantite * prix),
        date: new Date().toISOString(),
        statut: 'executee'
      };

      const nouvelleTransaction = await this.portefeuilleRepository.ajouterTransaction(transaction);

      // Mettre à jour la position
      const nouvelleQuantite = position.quantite - quantite;
      if (nouvelleQuantite > 0) {
        await this.portefeuilleRepository.mettreAJourPosition({
          ...position,
          quantite: nouvelleQuantite
        });
      } else {
        // Supprimer la position si elle est vide
        await this.portefeuilleRepository.supprimerPosition(position.id);
      }

      return nouvelleTransaction;
    } catch (erreur) {
      throw new Error(`Erreur lors de la vente de la position: ${erreur}`);
    }
  }

  async simulerTransaction(
    utilisateurId: string,
    action: string,
    type: 'achat' | 'vente',
    quantite: number,
    prix: number
  ): Promise<{
    nouveauPortefeuille: Portefeuille;
    impact: {
      nouvelleValeur: number;
      nouvellePlusValue: number;
      impactAllocation: Map<string, number>;
    };
  }> {
    try {
      const portefeuille = await this.portefeuilleRepository.recupererPortefeuille(utilisateurId);
      if (!portefeuille) {
        throw new Error('Portefeuille non trouvé');
      }

      return this.portefeuilleService.simulerTransaction(portefeuille, action, type, quantite, prix);
    } catch (erreur) {
      throw new Error(`Erreur lors de la simulation de transaction: ${erreur}`);
    }
  }

  private calculerFrais(montant: number): number {
    // Calcul des frais de transaction (exemple: 0.5% du montant)
    return montant * 0.005;
  }
} 