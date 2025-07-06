const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage du projet MODERANT...\n');

// Configuration
const config = {
  frontend: {
    cwd: path.join(__dirname, '..'),
    command: 'npm',
    args: ['run', 'dev']
  },
  backend: {
    cwd: path.join(__dirname, '..', '..', 'backend'),
    command: 'python',
    args: ['manage.py', 'runserver']
  }
};

// Fonction pour démarrer un processus
function demarrerProcessus(nom, config) {
  console.log(`📡 Démarrage du serveur ${nom}...`);
  
  const processus = spawn(config.command, config.args, {
    cwd: config.cwd,
    stdio: 'pipe',
    shell: true
  });

  processus.stdout.on('data', (data) => {
    console.log(`[${nom}] ${data.toString().trim()}`);
  });

  processus.stderr.on('data', (data) => {
    console.error(`[${nom}] ERREUR: ${data.toString().trim()}`);
  });

  processus.on('close', (code) => {
    console.log(`[${nom}] Processus terminé avec le code ${code}`);
  });

  processus.on('error', (error) => {
    console.error(`[${nom}] Erreur de démarrage:`, error.message);
  });

  return processus;
}

// Démarrer les deux serveurs
const frontendProcess = demarrerProcessus('Frontend (React)', config.frontend);
const backendProcess = demarrerProcessus('Backend (Django)', config.backend);

// Gestion de l'arrêt propre
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt des serveurs...');
  frontendProcess.kill('SIGINT');
  backendProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Arrêt des serveurs...');
  frontendProcess.kill('SIGTERM');
  backendProcess.kill('SIGTERM');
  process.exit(0);
});

console.log('\n✅ Les serveurs sont en cours de démarrage...');
console.log('📱 Frontend: http://localhost:5184');
console.log('🔧 Backend: http://127.0.0.1:8000');
console.log('\n💡 Appuyez sur Ctrl+C pour arrêter les serveurs\n'); 