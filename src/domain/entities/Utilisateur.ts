export interface Utilisateur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  telephone: string;
  dateNaissance: string;
  pays: string;
  ville: string;
  adresse: string;
  typeCompte: 'gratuit' | 'premium' | 'professionnel';
  dateInscription: string;
  derniereConnexion: string;
  statut: 'actif' | 'inactif' | 'suspendu';
  preferences: PreferencesUtilisateur;
}

export interface PreferencesUtilisateur {
  langue: 'fr' | 'en';
  devise: 'XOF' | 'EUR' | 'USD';
  fuseauHoraire: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  theme: 'clair' | 'sombre' | 'auto';
  alertes: boolean;
  analyseTechnique: boolean;
  actualites: boolean;
}

export interface ProfilInvestisseur {
  utilisateurId: string;
  niveauRisque: 'conservateur' | 'modere' | 'agressif';
  horizonTemps: 'court' | 'moyen' | 'long';
  capitalInitial: number;
  objectifInvestissement: string;
  experience: 'debutant' | 'intermediaire' | 'expert';
  secteursPreferes: string[];
  strategies: string[];
} 