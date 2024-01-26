#!/bin/sh

rm -rf ./dist/extension-bundle.zip

zip -r0 ./dist/extension-bundle.zip  \
        ./manifest.json \
        ./pages/password-manager.html \
        ./dist/extension \
        ./public/css \
        ./public/icons \
        ./public/fonts \
        ./public/js/main.js