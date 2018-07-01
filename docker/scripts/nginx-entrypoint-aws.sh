#!/usr/bin/env bash
set -e

if [[ -z "$API_URL" ]]; then
    echo "Must provide API_URL in environment" 1>&2
    exit 1
fi

if [[ -z "$DOMAIN_NAME" ]]; then
    echo "Must provide DOMAIN_NAME in environment" 1>&2
    exit 1
fi

sed -i -r "s#(^[ \t]*API_URL:[ \t]*').*('[, \t]*$)#\1$API_URL\2#g" env.js
sed -i -r "s#(^[ \t]*loginInstaRedirectUri:[ \t]*'https://).*(/.*'[, \t]*$)#\1$DOMAIN_NAME\2#g" env.js
sed -i -r "s#(^[ \t]*signupInstaRedirectUri:[ \t]*'https://).*(/.*'[, \t]*$)#\1$DOMAIN_NAME\2#g" env.js
echo "env.js:"
cat env.js

echo "Starting main process:"
echo "    $@"
exec "$@"

