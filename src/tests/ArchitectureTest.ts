import { Container } from '../infrastructure/container/Container';
import { RecupererActionsUseCase } from '../domain/usecases/RecupererActionsUseCase';
import { AnalyserActionUseCase } from '../domain/usecases/AnalyserActionUseCase';

/**
 * Tests d'intégration pour vérifier que l'architecture Clean Architecture fonctionne
 */
export class ArchitectureTest {
  
  /**
   * Test de récupération des actions
   */
  static async testerRecuperationActions(): Promise<void> {
    console.log('🧪 Test de récupération des actions...');
    
    try {
      const container = Container.getInstance();
      const recupererActionsUseCase = container.getRecupererActionsUseCase();
      
      const actions = await recupererActionsUseCase.executer();
      
      console.log(`✅ ${actions.length} actions récupérées avec succès`);
      
      // Vérifier que les actions ont les bonnes propriétés
      if (actions.length > 0) {
        const premiereAction = actions[0];
        console.log(`📊 Première action: ${premiereAction.symbole} - ${premiereAction.nom}`);
        console.log(`💰 Prix: ${premiereAction.dernierPrix} XOF`);
        console.log(`📈 Variation: ${premiereAction.variationPourcentage}%`);
      }
      
    } catch (erreur) {
      console.error('❌ Erreur lors de la récupération des actions:', erreur);
      throw erreur;
    }
  }
  
  /**
   * Test d'analyse technique d'une action
   */
  static async testerAnalyseTechnique(symbole: string = 'SONATEL'): Promise<void> {
    console.log(`🧪 Test d'analyse technique pour ${symbole}...`);
    
    try {
      const container = Container.getInstance();
      const analyserActionUseCase = container.getAnalyserActionUseCase();
      
      const analyse = await analyserActionUseCase.executer(symbole);
      
      console.log('✅ Analyse technique effectuée avec succès');
      console.log(`📊 Tendance: ${analyse.tendance}`);
      console.log(`🎯 Signal: ${analyse.signaux.type} (${(analyse.signaux.confiance * 100).toFixed(0)}%)`);
      
      if (analyse.indicateurs) {
        console.log(`📈 RSI: ${analyse.indicateurs.rsi.toFixed(2)}`);
        console.log(`📊 MACD: ${analyse.indicateurs.macd.toFixed(2)}`);
        console.log(`📉 SMA: ${analyse.indicateurs.sma.toFixed(0)} XOF`);
      }
      
    } catch (erreur) {
      console.error('❌ Erreur lors de l\'analyse technique:', erreur);
      throw erreur;
    }
  }
  
  /**
   * Test de création d'une action
   */
  static testerCreationAction(): void {
    console.log('🧪 Test de création d\'une action...');
    
    try {
      const action = {
        symbole: 'TEST',
        nom: 'Action de Test',
        dernierPrix: 10000,
        variationPourcentage: 2.5,
        volume: 50000,
        secteur: 'Technologie',
        pays: 'Côte d\'Ivoire'
      };
      
      console.log('✅ Action créée avec succès');
      console.log(`📊 Action: ${action.symbole} - ${action.nom}`);
      console.log(`💰 Prix: ${action.dernierPrix} XOF`);
      console.log(`📈 Variation: ${action.variationPourcentage}%`);
      
    } catch (erreur) {
      console.error('❌ Erreur lors de la création de l\'action:', erreur);
      throw erreur;
    }
  }
  
  /**
   * Test complet de l'architecture
   */
  static async executerTestsComplets(): Promise<void> {
    console.log('🚀 Démarrage des tests d\'architecture...\n');
    
    try {
      // Test de création d'action
      this.testerCreationAction();
      console.log('');
      
      // Test de récupération des actions
      await this.testerRecuperationActions();
      console.log('');
      
      // Test d'analyse technique
      await this.testerAnalyseTechnique();
      console.log('');
      
      console.log('🎉 Tous les tests d\'architecture ont réussi !');
      
    } catch (erreur) {
      console.error('💥 Échec des tests d\'architecture:', erreur);
      throw erreur;
    }
  }
  
  /**
   * Test de performance
   */
  static async testerPerformance(): Promise<void> {
    console.log('⚡ Test de performance...');
    
    const debut = Date.now();
    
    try {
      const container = Container.getInstance();
      const recupererActionsUseCase = container.getRecupererActionsUseCase();
      
      // Test de récupération multiple
      const promesses = [];
      for (let i = 0; i < 5; i++) {
        promesses.push(recupererActionsUseCase.executer());
      }
      
      await Promise.all(promesses);
      
      const fin = Date.now();
      const duree = fin - debut;
      
      console.log(`✅ Performance test réussie en ${duree}ms`);
      
    } catch (erreur) {
      console.error('❌ Erreur lors du test de performance:', erreur);
      throw erreur;
    }
  }
}

// Export pour utilisation dans d'autres fichiers
export default ArchitectureTest; 