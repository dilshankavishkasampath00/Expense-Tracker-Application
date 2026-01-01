#!/bin/bash

# Build the frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Start the backend
echo "Starting backend..."
cd backend
npm install
npm start
