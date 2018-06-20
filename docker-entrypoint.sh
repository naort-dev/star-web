#!/usr/bin/env bash
set -e

if [[ -z "$API_URL" ]]; then
    echo "Must provide API_URL in environment" 1>&2
    exit 1
fi

if [[ -z "$PUBLIC" ]]; then
    echo "Must provide PUBLIC in environment" 1>&2
    exit 1
fi

sed -i -r "s#(^[ \t]*API_URL:[ \t]*').*('[, \t]*$)#\1$API_URL\2#g" env.js
sed -i -r "s#(^[ \t]*loginInstaRedirectUri:[ \t]*'https://).*(/.*'[, \t]*$)#\1$PUBLIC\2#g" env.js
sed -i -r "s#(^[ \t]*signupInstaRedirectUri:[ \t]*'https://).*(/.*'[, \t]*$)#\1$PUBLIC\2#g" env.js

echo "env.js:"
cat env.js

echo "Starting main process:"
echo "    $@"
exec "$@"

