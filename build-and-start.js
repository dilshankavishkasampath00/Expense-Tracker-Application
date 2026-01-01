#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('📦 Installing backend dependencies...');
try {
  execSync('npm --prefix ./backend install', { stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.error('❌ Backend install failed:', error.message);
  process.exit(1);
}

console.log('\n🏗️  Building frontend...');
try {
  execSync('npm --prefix ./frontend run build', { stdio: 'inherit' });
  console.log('✅ Frontend built successfully');
} catch (error) {
  console.error('⚠️  Frontend build failed (continuing anyway):', error.message);
}

console.log('\n🚀 Starting backend server...');
require('./backend/server.js');
