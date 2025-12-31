#!/bin/bash
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SERVICE_NAME="${SERVICE_NAME:-web-app}"
GCP_PROJECT_ID="${GCP_PROJECT_ID}"
GCP_REGION="${GCP_REGION:-us-central1}"
ARTIFACT_REGISTRY_REPO="${ARTIFACT_REGISTRY_REPO:-docker-repo}"
IMAGE_TAG="${CI_COMMIT_SHA:-latest}"

if [ -z "$GCP_PROJECT_ID" ]; then
  echo -e "${RED}GCP_PROJECT_ID is not set${NC}"
  exit 1
fi

case "$CI_COMMIT_BRANCH" in
  green-test)
    REVISION_TAG="green-test"
    TRAFFIC_MODE="none"
    ;;
  green-deploy)
    REVISION_TAG="green-deploy"
    TRAFFIC_MODE="canary"
    ;;
  blue-prod)
    REVISION_TAG="blue-prod"
    TRAFFIC_MODE="prod"
    ;;
  *)
    echo -e "${RED}Unsupported branch${NC}"
    exit 1
    ;;
esac

IMAGE_URL="${GCP_REGION}-docker.pkg.dev/${GCP_PROJECT_ID}/${ARTIFACT_REGISTRY_REPO}/${SERVICE_NAME}:${IMAGE_TAG}"

echo -e "${GREEN}Deploying revision${NC}"
echo "Service: $SERVICE_NAME"
echo "Tag: $REVISION_TAG"
echo "Traffic mode: $TRAFFIC_MODE"

gcloud config set project "$GCP_PROJECT_ID"

# 1️⃣ Deploy revision safely
gcloud run deploy "$SERVICE_NAME" \
  --image="$IMAGE_URL" \
  --tag="$REVISION_TAG" \
  --no-traffic \
  --region="$GCP_REGION" \
  --platform=managed \
  --allow-unauthenticated \
  --port=8080 \
  --memory=512Mi \
  --cpu=1 \
  --quiet

# 2️⃣ Traffic control
if [ "$TRAFFIC_MODE" = "canary" ]; then
  echo -e "${YELLOW}Applying 10% canary traffic${NC}"
  gcloud run services update-traffic "$SERVICE_NAME" \
    --to-tags=green-deploy=10,blue-prod=90 \
    --region="$GCP_REGION"

elif [ "$TRAFFIC_MODE" = "prod" ]; then
  echo -e "${YELLOW}Shifting 100% traffic to production${NC}"
  gcloud run services update-traffic "$SERVICE_NAME" \
    --to-tags=blue-prod=100 \
    --region="$GCP_REGION"
else
  echo -e "${YELLOW}No traffic change (green-test)${NC}"
fi

echo -e "${GREEN}Deployment completed successfully${NC}"
