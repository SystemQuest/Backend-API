#!/usr/bin/env node

const crypto = require('crypto');

console.log('🔐 Generating secrets for Vercel deployment...\n');

// Generate NEXTAUTH_SECRET (32 bytes base64)
const nextauthSecret = crypto.randomBytes(32).toString('base64');
console.log('NEXTAUTH_SECRET:');
console.log(nextauthSecret);
console.log('');

// Generate JWT_SECRET (32 bytes base64)
const jwtSecret = crypto.randomBytes(32).toString('base64');
console.log('JWT_SECRET:');
console.log(jwtSecret);
console.log('');

// Generate ENCRYPTION_KEY (32 bytes base64)
const encryptionKey = crypto.randomBytes(32).toString('base64');
console.log('ENCRYPTION_KEY:');
console.log(encryptionKey);
console.log('');

console.log('📋 Copy these to your Vercel environment variables:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log(`NEXTAUTH_SECRET="${nextauthSecret}"`);
console.log(`JWT_SECRET="${jwtSecret}"`);
console.log(`ENCRYPTION_KEY="${encryptionKey}"`);
console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log('⚠️  Important:');
console.log('   - Keep these secrets safe and never commit them to Git');
console.log('   - Use different secrets for development and production');
console.log('   - Store them in Vercel dashboard under Settings > Environment Variables');
console.log('');
