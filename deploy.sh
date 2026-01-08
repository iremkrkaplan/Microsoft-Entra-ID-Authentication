#!/bin/bash

# Azure App Service Deployment Script
# Usage: ./deploy.sh <resource-group> <app-service-name>

RESOURCE_GROUP=$1
APP_SERVICE_NAME=$2

if [ -z "$RESOURCE_GROUP" ] || [ -z "$APP_SERVICE_NAME" ]; then
    echo "Usage: ./deploy.sh <resource-group> <app-service-name>"
    echo "Example: ./deploy.sh Irem-HW-Entra-RG irem-hw-entra-app"
    exit 1
fi

echo "Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

echo "Creating deployment package..."
cd dist
zip -r ../deploy.zip . > /dev/null
cd ..

echo "Deploying to Azure App Service..."
az webapp deployment source config-zip \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_SERVICE_NAME" \
    --src deploy.zip

if [ $? -eq 0 ]; then
    echo "Deployment successful!"
    echo "Cleaning up..."
    rm deploy.zip
    echo "Done!"
else
    echo "Deployment failed!"
    exit 1
fi

