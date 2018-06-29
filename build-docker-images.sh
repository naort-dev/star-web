#!/usr/bin/env bash
set -e

docker build -f docker/dockerfiles/web-node --tag ${REGISTRY}web-node${IMAGE_TAG} --build-arg REGISTRY=${REGISTRY} --build-arg BASE_IMAGE_TAG=${BASE_IMAGE_TAG} .
id=$(docker create ${REGISTRY}web-node${IMAGE_TAG})
docker cp $id:/starsona/dist .
docker build -f docker/dockerfiles/web-nginx-${DEPLOYMENT_TYPE:-swarm} --tag ${REGISTRY}web-nginx-${DEPLOYMENT_TYPE:-swarm}${IMAGE_TAG} --build-arg REGISTRY=${REGISTRY} --build-arg BASE_IMAGE_TAG=${BASE_IMAGE_TAG} .


