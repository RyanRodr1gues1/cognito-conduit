#!/bin/bash

# Google Cloud Platform Deployment Script
# Chatbot Admin Panel - Production Deployment

set -e  # Exit on any error

echo "🚀 Starting deployment to Google Cloud Platform..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID=${PROJECT_ID:-""}
REGION=${REGION:-"us-central1"}
SERVICE_NAME=${SERVICE_NAME:-"chatbot-admin"}

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ Google Cloud SDK not found. Please install it first.${NC}"
    echo "Visit: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if PROJECT_ID is set
if [ -z "$PROJECT_ID" ]; then
    echo -e "${YELLOW}⚠️  PROJECT_ID not set. Please set it:${NC}"
    echo "export PROJECT_ID=your-project-id"
    echo "Or run: gcloud config set project your-project-id"
    exit 1
fi

echo -e "${BLUE}📋 Deployment Configuration:${NC}"
echo "  Project ID: $PROJECT_ID"
echo "  Region: $REGION"
echo "  Service: $SERVICE_NAME"
echo ""

# Authenticate with gcloud (if not already authenticated)
echo -e "${BLUE}🔐 Checking authentication...${NC}"
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${YELLOW}⚠️  Not authenticated. Please run:${NC}"
    echo "gcloud auth login"
    exit 1
fi

# Set the project
echo -e "${BLUE}🎯 Setting project...${NC}"
gcloud config set project $PROJECT_ID

# Enable required APIs
echo -e "${BLUE}🔧 Enabling required APIs...${NC}"
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# Build the application
echo -e "${BLUE}🔨 Building application...${NC}"
npm install
npm run build

# Deploy to App Engine
echo -e "${BLUE}🚀 Deploying to App Engine...${NC}"
gcloud app deploy app.yaml --quiet --promote

# Get the deployed URL
echo -e "${BLUE}🌐 Getting deployment URL...${NC}"
URL=$(gcloud app describe --format="value(defaultHostname)")

echo ""
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌍 Your application is available at: https://$URL${NC}"
echo ""
echo -e "${BLUE}📊 Useful commands:${NC}"
echo "  View logs: gcloud app logs tail -s default"
echo "  Open app: gcloud app browse"
echo "  View versions: gcloud app versions list"
echo ""

# Optional: Open the application in browser
read -p "Open the application in your browser? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    gcloud app browse
fi