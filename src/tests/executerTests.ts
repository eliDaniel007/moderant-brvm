import ArchitectureTest from './ArchitectureTest';

/**
 * Script principal pour exécuter tous les tests d'architecture
 */
async function executerTests(): Promise<void> {
  console.log('🚀 MODERANT BRVM - Tests d\'Architecture Clean Architecture');
  console.log('=' .repeat(60));
  
  try {
    // Exécuter tous les tests
    await ArchitectureTest.executerTestsComplets();
    
    console.log('\n' + '=' .repeat(60));
    console.log('✅ Tous les tests ont été exécutés avec succès !');
    console.log('🎯 L\'architecture Clean Architecture fonctionne correctement.');
    
  } catch (erreur) {
    console.error('\n' + '=' .repeat(60));
    console.error('❌ Échec des tests d\'architecture');
    console.error('🔍 Détails de l\'erreur:', erreur);
    process.exit(1);
  }
}

// Exécuter les tests si ce fichier est appelé directement
if (require.main === module) {
  executerTests();
}

export default executerTests; 