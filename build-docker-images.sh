#!/usr/bin/env bash
set -e

docker build -f docker/dockerfiles/web-nginx-${DEPLOYMENT_TYPE:-swarm} --tag ${REGISTRY}web-nginx-${DEPLOYMENT_TYPE:-swarm}${IMAGE_TAG} --build-arg REGISTRY=${REGISTRY} --build-arg IMAGE_TAG=${IMAGE_TAG} .
docker build -f docker/dockerfiles/web-node --tag ${REGISTRY}web-node${IMAGE_TAG} --build-arg REGISTRY=${REGISTRY} --build-arg IMAGE_TAG=${IMAGE_TAG} .

