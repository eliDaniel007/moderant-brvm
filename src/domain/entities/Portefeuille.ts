export interface Position {
  id: string;
  portefeuilleId: string;
  action: string;
  quantite: number;
  prixMoyen: number;
  valeurActuelle: number;
  plusValue: number;
  plusValuePourcentage: number;
  dateAchat: string;
}

export interface Portefeuille {
  id: string;
  utilisateurId: string;
  nom: string;
  positions: Position[];
  valeurTotale: number;
  plusValueTotale: number;
  plusValuePourcentage: number;
  rendement: number;
  dateCreation: string;
  dateModification: string;
}

export interface Transaction {
  id: string;
  portefeuilleId: string;
  action: string;
  type: 'achat' | 'vente';
  quantite: number;
  prix: number;
  montant: number;
  frais: number;
  date: string;
  statut: 'en_cours' | 'executee' | 'annulee';
}

export interface Alerte {
  id: string;
  utilisateurId: string;
  action: string;
  type: 'prix' | 'volume' | 'indicateur';
  condition: 'superieur' | 'inferieur' | 'egal';
  valeur: number;
  active: boolean;
  dateCreation: string;
} 