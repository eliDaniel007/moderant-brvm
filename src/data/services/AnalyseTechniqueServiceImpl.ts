import { Action, IndicateursTechniques } from '../../domain/entities/Action';
import { IAnalyseTechniqueService } from '../../domain/services/IAnalyseTechniqueService';

export class AnalyseTechniqueServiceImpl implements IAnalyseTechniqueService {
  
  calculerRSI(prix: number[], periode: number = 14): number {
    if (prix.length < periode + 1) {
      return 50; // Valeur neutre si pas assez de données
    }

    const variations = [];
    for (let i = 1; i < prix.length; i++) {
      variations.push(prix[i] - prix[i - 1]);
    }

    let gains = 0;
    let pertes = 0;

    // Calculer les gains et pertes moyens sur la période initiale
    for (let i = 0; i < periode; i++) {
      if (variations[i] > 0) {
        gains += variations[i];
      } else {
        pertes -= variations[i];
      }
    }

    let gainMoyen = gains / periode;
    let perteMoyenne = pertes / periode;

    // Calculer le RSI pour les périodes suivantes
    for (let i = periode; i < variations.length; i++) {
      const variation = variations[i];
      if (variation > 0) {
        gainMoyen = (gainMoyen * (periode - 1) + variation) / periode;
        perteMoyenne = (perteMoyenne * (periode - 1)) / periode;
      } else {
        gainMoyen = (gainMoyen * (periode - 1)) / periode;
        perteMoyenne = (perteMoyenne * (periode - 1) - variation) / periode;
      }
    }

    if (perteMoyenne === 0) {
      return 100;
    }

    const rs = gainMoyen / perteMoyenne;
    return 100 - (100 / (1 + rs));
  }

  calculerMACD(prix: number[]): { ligneMACD: number; ligneSignal: number; histogramme: number } {
    if (prix.length < 26) {
      return { ligneMACD: 0, ligneSignal: 0, histogramme: 0 };
    }

    const ema12 = this.calculerEMA(prix, 12);
    const ema26 = this.calculerEMA(prix, 26);
    
    const ligneMACD = ema12[ema12.length - 1] - ema26[ema26.length - 1];
    
    // Calculer la ligne de signal (EMA 9 de la ligne MACD)
    const valeursMACD = [];
    for (let i = 0; i < Math.min(ema12.length, ema26.length); i++) {
      valeursMACD.push(ema12[i] - ema26[i]);
    }
    
    const ligneSignal = this.calculerEMA(valeursMACD, 9)[valeursMACD.length - 1] || 0;
    const histogramme = ligneMACD - ligneSignal;

    return { ligneMACD, ligneSignal, histogramme };
  }

  calculerSMA(prix: number[], periode: number): number[] {
    const sma = [];
    for (let i = periode - 1; i < prix.length; i++) {
      const somme = prix.slice(i - periode + 1, i + 1).reduce((a, b) => a + b, 0);
      sma.push(somme / periode);
    }
    return sma;
  }

  calculerEMA(prix: number[], periode: number): number[] {
    const multiplicateur = 2 / (periode + 1);
    const ema = [prix[0]];

    for (let i = 1; i < prix.length; i++) {
      const nouvelleEMA = (prix[i] - ema[i - 1]) * multiplicateur + ema[i - 1];
      ema.push(nouvelleEMA);
    }

    return ema;
  }

  calculerBollingerBandes(prix: number[], periode: number = 20, ecartType: number = 2): {
    superieure: number[];
    moyenne: number[];
    inferieure: number[];
  } {
    const sma = this.calculerSMA(prix, periode);
    const superieure = [];
    const inferieure = [];

    for (let i = 0; i < sma.length; i++) {
      const debut = Math.max(0, prix.length - sma.length + i - periode + 1);
      const fin = prix.length - sma.length + i + 1;
      const sousEnsemble = prix.slice(debut, fin);
      
      const variance = sousEnsemble.reduce((acc, val) => acc + Math.pow(val - sma[i], 2), 0) / sousEnsemble.length;
      const ecartTypeCalcule = Math.sqrt(variance);
      
      superieure.push(sma[i] + (ecartTypeCalcule * ecartType));
      inferieure.push(sma[i] - (ecartTypeCalcule * ecartType));
    }

    return {
      superieure,
      moyenne: sma,
      inferieure
    };
  }

  analyserSignaux(action: Action, indicateurs: IndicateursTechniques): {
    type: 'achat' | 'vente' | 'neutre';
    force: number;
    description: string;
    confiance: number;
  } {
    let signauxAchat = 0;
    let signauxVente = 0;
    let totalSignaux = 0;

    // Analyse RSI
    if (indicateurs.rsi < 30) {
      signauxAchat += 2;
      totalSignaux += 2;
    } else if (indicateurs.rsi > 70) {
      signauxVente += 2;
      totalSignaux += 2;
    }

    // Analyse MACD
    if (indicateurs.macd > 0) {
      signauxAchat += 1;
      totalSignaux += 1;
    } else {
      signauxVente += 1;
      totalSignaux += 1;
    }

    // Analyse des moyennes mobiles
    if (action.dernierPrix > indicateurs.sma) {
      signauxAchat += 1;
      totalSignaux += 1;
    } else {
      signauxVente += 1;
      totalSignaux += 1;
    }

    // Analyse des bandes de Bollinger
    if (action.dernierPrix < indicateurs.bollingerBandes.inferieure) {
      signauxAchat += 1;
      totalSignaux += 1;
    } else if (action.dernierPrix > indicateurs.bollingerBandes.superieure) {
      signauxVente += 1;
      totalSignaux += 1;
    }

    const forceAchat = signauxAchat / totalSignaux;
    const forceVente = signauxVente / totalSignaux;
    const confiance = Math.max(forceAchat, forceVente);

    let type: 'achat' | 'vente' | 'neutre';
    let description: string;

    if (forceAchat > forceVente && confiance > 0.6) {
      type = 'achat';
      description = 'Signaux d\'achat détectés';
    } else if (forceVente > forceAchat && confiance > 0.6) {
      type = 'vente';
      description = 'Signaux de vente détectés';
    } else {
      type = 'neutre';
      description = 'Signaux neutres';
    }

    return {
      type,
      force: confiance,
      description,
      confiance
    };
  }

  detecterPatterns(donnees: Array<{ouverture: number; plusHaut: number; plusBas: number; cloture: number}>): string[] {
    const patterns: string[] = [];

    if (donnees.length < 3) {
      return patterns;
    }

    // Pattern Doji
    for (let i = 0; i < donnees.length; i++) {
      const chandelier = donnees[i];
      const corps = Math.abs(chandelier.cloture - chandelier.ouverture);
      const ombre = chandelier.plusHaut - chandelier.plusBas;
      
      if (corps < ombre * 0.1) {
        patterns.push('Doji');
      }
    }

    // Pattern Marteau
    for (let i = 0; i < donnees.length; i++) {
      const chandelier = donnees[i];
      const corps = Math.abs(chandelier.cloture - chandelier.ouverture);
      const ombreInferieure = Math.min(chandelier.ouverture, chandelier.cloture) - chandelier.plusBas;
      const ombreSuperieure = chandelier.plusHaut - Math.max(chandelier.ouverture, chandelier.cloture);
      
      if (ombreInferieure > corps * 2 && ombreSuperieure < corps * 0.5) {
        patterns.push('Marteau');
      }
    }

    return Array.from(new Set(patterns)); // Supprimer les doublons
  }

  calculerNiveauxSupportResistance(prix: number[]): {
    supports: number[];
    resistances: number[];
  } {
    const supports: number[] = [];
    const resistances: number[] = [];

    // Algorithme simplifié pour détecter les supports et résistances
    for (let i = 2; i < prix.length - 2; i++) {
      const prixActuel = prix[i];
      const prixPrecedent = prix[i - 1];
      const prixSuivant = prix[i + 1];
      const prixAvantPrecedent = prix[i - 2];
      const prixApresSuivant = prix[i + 2];

      // Détecter les résistances (pics)
      if (prixActuel > prixPrecedent && prixActuel > prixSuivant &&
          prixActuel > prixAvantPrecedent && prixActuel > prixApresSuivant) {
        resistances.push(prixActuel);
      }

      // Détecter les supports (creux)
      if (prixActuel < prixPrecedent && prixActuel < prixSuivant &&
          prixActuel < prixAvantPrecedent && prixActuel < prixApresSuivant) {
        supports.push(prixActuel);
      }
    }

    return { supports, resistances };
  }

  determinerTendance(prix: number[], periode: number = 20): 'haussiere' | 'baissiere' | 'laterale' {
    if (prix.length < periode) {
      return 'laterale';
    }

    const prixRecents = prix.slice(-periode);
    const sma = this.calculerSMA(prixRecents, Math.floor(periode / 2));
    
    if (sma.length < 2) {
      return 'laterale';
    }

    const pente = sma[sma.length - 1] - sma[0];
    const seuil = prixRecents[0] * 0.02; // 2% de seuil

    if (pente > seuil) {
      return 'haussiere';
    } else if (pente < -seuil) {
      return 'baissiere';
    } else {
      return 'laterale';
    }
  }

  genererRecommandations(action: Action, indicateurs: IndicateursTechniques): {
    recommandation: 'acheter' | 'vendre' | 'tenir';
    raison: string;
    niveauConfiance: number;
    prixCible: number;
    stopLoss: number;
  } {
    const signaux = this.analyserSignaux(action, indicateurs);
    const tendance = this.determinerTendance([action.dernierPrix], 20);

    let recommandation: 'acheter' | 'vendre' | 'tenir';
    let raison = '';
    let niveauConfiance = signaux.confiance;

    if (signaux.type === 'achat' && tendance !== 'baissiere') {
      recommandation = 'acheter';
      raison = 'Signaux d\'achat positifs avec tendance favorable';
      niveauConfiance = Math.min(0.9, niveauConfiance + 0.1);
    } else if (signaux.type === 'vente' && tendance !== 'haussiere') {
      recommandation = 'vendre';
      raison = 'Signaux de vente avec tendance défavorable';
      niveauConfiance = Math.min(0.9, niveauConfiance + 0.1);
    } else {
      recommandation = 'tenir';
      raison = 'Signaux mixtes, attendre une confirmation';
      niveauConfiance = 0.5;
    }

    // Calculer le prix cible et le stop loss
    const prixCible = recommandation === 'acheter' 
      ? action.dernierPrix * 1.05 // +5%
      : action.dernierPrix * 0.95; // -5%

    const stopLoss = recommandation === 'acheter'
      ? action.dernierPrix * 0.95 // -5%
      : action.dernierPrix * 1.05; // +5%

    return {
      recommandation,
      raison,
      niveauConfiance,
      prixCible,
      stopLoss
    };
  }
} 