#!/usr/bin/env bash
set -e
pwd=`pwd`; cd "${0%/*}"

id=$(docker create ${REGISTRY}base-node${BASE_IMAGE_TAG})
last_package=$(mktemp)
docker cp $id:/starsona/package.json ${last_package}
docker rm $id
if cmp -s ../package.json ${last_package}; then
    echo "base-node image is up to date"
else
    echo "base-node image is out of date, must rebuild base images"
    exit 1
fi
rm ${last_package}

rm -rf ../dist
docker build -f dockerfiles/web-node --tag ${REGISTRY}web-node${IMAGE_TAG} --build-arg REGISTRY=${REGISTRY} --build-arg BASE_IMAGE_TAG=${BASE_IMAGE_TAG} ..
id=$(docker create ${REGISTRY}web-node${IMAGE_TAG})
docker cp $id:/starsona/dist ..
docker build -f dockerfiles/web-nginx-${DEPLOYMENT_TYPE:-swarm} --tag ${REGISTRY}web-nginx-${DEPLOYMENT_TYPE:-swarm}${IMAGE_TAG} --build-arg REGISTRY=${REGISTRY} --build-arg BASE_IMAGE_TAG=${BASE_IMAGE_TAG} ..

cd $pwd

