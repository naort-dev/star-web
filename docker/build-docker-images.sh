#!/usr/bin/env bash
set -e
pwd=`pwd`; cd "${0%/*}"

docker build -f dockerfiles/web-node --tag ${REGISTRY}web-node${IMAGE_TAG} --build-arg REGISTRY=${REGISTRY} --build-arg BASE_IMAGE_TAG=${BASE_IMAGE_TAG} ..
id=$(docker create ${REGISTRY}web-node${IMAGE_TAG})
docker cp $id:/starsona/dist .
docker build -f dockerfiles/web-nginx-${DEPLOYMENT_TYPE:-swarm} --tag ${REGISTRY}web-nginx-${DEPLOYMENT_TYPE:-swarm}${IMAGE_TAG} --build-arg REGISTRY=${REGISTRY} --build-arg BASE_IMAGE_TAG=${BASE_IMAGE_TAG} ..

cd $pwd

