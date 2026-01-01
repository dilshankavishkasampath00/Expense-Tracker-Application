#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🏗️  Building frontend...');
try {
  execSync('npm --prefix ./frontend run build', { stdio: 'inherit' });
  console.log('✅ Frontend built successfully');
} catch (error) {
  console.error('❌ Frontend build failed:', error.message);
  process.exit(1);
}

console.log('\n🚀 Starting backend server...');
require('./backend/server.js');
