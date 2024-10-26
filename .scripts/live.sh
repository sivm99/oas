#!/bin/bash
set -e

echo "===== Starting the Deployment Process ====="

echo "Step 1: Pulling the latest changes from the Git repository..."
git pull

if [ $? -eq 0 ]; then
    echo "Git pull was successful."
else
    echo "Git pull failed, attempting force pull..."
    git fetch --all
    git reset --hard origin/$(git rev-parse --abbrev-ref HEAD)
    git pull
    if [ $? -eq 0 ]; then
        echo "Force pull was successful."
    else
        echo "Force pull was not successful. Deployment cannot continue."
        exit 1
    fi
fi

echo "Step 2: Building the Docker image..."
if docker compose build oas-next; then
    echo "Docker build was successful."
else
    echo "Docker build failed. Keeping the previous stable version running."
    exit 1
fi

echo "Step 3: Checking Docker Compose status..."
if [ $(docker compose ps | grep -c "Up") -eq 0 ]; then
    echo "Docker Compose is not running. Initiating a fresh deployment..."
    docker system prune -f
    docker compose up -d --build
else
    echo "Docker Compose is running. Initiating rolling deployment..."
    echo "Bringing down one service at a time to reduce downtime."

    # Update the oas-next service with no downtime
    docker compose up -d --no-deps --build oas-next
    echo "oas-next service is updated successfully with minimum downtime."

    # Optionally, you can update other services similarly if needed
    # docker compose up -d --no-deps --build other-service

    echo "Cleaning up unused Docker resources..."
    docker system prune -f

    echo "All services are up and running with the latest build."
fi

echo "===== Deployment was successful ====="
