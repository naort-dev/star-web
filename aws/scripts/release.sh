#!/bin/bash
set -e

git config --global user.email "build@starsona.com"
git config --global user.name "Starsona Build"

cwd=$(pwd)
cd $(mktemp -d)
git clone -n -b $GIT_BRANCH $1 .
git fetch --tags

last_tag=$(git describe --abbrev=0 --tags 2>/dev/null || true)
commit_id=$(git rev-list -n 1 $last_tag)
echo 'Latest commit: ' $commit_id
echo 'Codebuild commit: ' ${CODEBUILD_RESOLVED_SOURCE_VERSION}
if [ "$commit_id" != "${CODEBUILD_RESOLVED_SOURCE_VERSION}" ]; then
    echo 'Not the latest build, exiting'
    exit 1
fi

version=$(echo $last_tag | grep -o '[^-]*$')
let major_max=$(echo $version | cut -d. -f1)
let minor_max=$(echo $version | cut -d. -f2)
let patch_max=$(echo $version | cut -d. -f3)

echo 'Latest version:' $major_max'.'$minor_max'.'$patch_max
echo 'Hotfix branch:' $major_max'.'$minor_max off $major_max'.'$minor_max'.'$patch_max
git checkout -b $major_max'.'$minor_max $major_max'.'$minor_max'.'$patch_max

echo 'Push new branch to remote'
git push origin $major_max'.'$minor_max

echo 'Update web-hotfix stack'
aws --region $AWS_DEFAULT_REGION cloudformation update-stack --stack-name web-hotfix --template-body file://$cwd/aws/cloudformation/hotfix.yml --parameters ParameterKey=GitBranch,ParameterValue=$major_max'.'$minor_max

git checkout $GIT_BRANCH

let minor_max=(minor_max+1)
patch_max=0

echo 'Switching to new version:' $major_max'.'$minor_max'.'$patch_max
git tag -a $major_max.$minor_max.$patch_max $last_tag -m "Version $major_max.$minor_max.$patch_max"

echo 'Push tag to remote'
git push origin $major_max.$minor_max.$patch_max

rm -rf $(pwd)
cd -
