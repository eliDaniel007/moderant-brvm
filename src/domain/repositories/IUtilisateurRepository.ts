import { Utilisateur, ProfilInvestisseur } from '../entities/Utilisateur';

export interface IUtilisateurRepository {
  // Utilisateur
  recupererUtilisateurParId(id: string): Promise<Utilisateur | null>;
  recupererUtilisateurParEmail(email: string): Promise<Utilisateur | null>;
  creerUtilisateur(utilisateur: Omit<Utilisateur, 'id' | 'dateInscription' | 'derniereConnexion'>): Promise<Utilisateur>;
  mettreAJourUtilisateur(utilisateur: Utilisateur): Promise<Utilisateur>;
  supprimerUtilisateur(utilisateurId: string): Promise<void>;
  changerMotDePasse(utilisateurId: string, nouveauMotDePasse: string): Promise<void>;
  mettreAJourDerniereConnexion(utilisateurId: string): Promise<void>;
  
  // Authentification
  verifierMotDePasse(email: string, motDePasse: string): Promise<boolean>;
  genererTokenAuthentification(utilisateurId: string): Promise<string>;
  verifierTokenAuthentification(token: string): Promise<string | null>;
  
  // Profil investisseur
  recupererProfilInvestisseur(utilisateurId: string): Promise<ProfilInvestisseur | null>;
  creerProfilInvestisseur(profil: ProfilInvestisseur): Promise<ProfilInvestisseur>;
  mettreAJourProfilInvestisseur(profil: ProfilInvestisseur): Promise<ProfilInvestisseur>;
  
  // Gestion des comptes
  activerCompte(utilisateurId: string): Promise<void>;
  desactiverCompte(utilisateurId: string): Promise<void>;
  suspendreCompte(utilisateurId: string, raison: string): Promise<void>;
  changerTypeCompte(utilisateurId: string, nouveauType: Utilisateur['typeCompte']): Promise<void>;
} 