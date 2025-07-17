#!/bin/bash

echo "🍯 Honey Business App - Free Deployment Script"
echo "=============================================="

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not set!"
    echo "Please set your Neon database URL first:"
    echo "export DATABASE_URL=your_neon_database_url_here"
    exit 1
fi

echo "✅ DATABASE_URL is set"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Import data to new database
echo "📊 Importing data to new database..."
node import-data.js

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "Your app is now live and completely free!"