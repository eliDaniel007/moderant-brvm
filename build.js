#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Démarrage du build personnalisé...');

try {
  // Supprimer le dossier dist s'il existe
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
    console.log('✅ Dossier dist supprimé');
  }

  // Lancer Vite build directement (sans TypeScript check)
  console.log('📦 Construction avec Vite...');
  execSync('npx vite build', { 
    stdio: 'inherit',
    env: { ...process.env, SKIP_TYPE_CHECK: 'true' }
  });

  console.log('✅ Build terminé avec succès !');
  process.exit(0);
} catch (error) {
  console.error('❌ Erreur lors du build:', error.message);
  process.exit(1);
} 