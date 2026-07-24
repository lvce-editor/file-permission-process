#!/bin/bash

cd $(dirname "$0")
cd ..

command_exists(){
  command -v "$1" &> /dev/null
}

if ! command_exists "ncu"; then
    echo "npm-check-updates is not installed"
    npm i -g npm-check-updates
else
    echo "ncu is installed"
fi

function updateDependencies {
  echo "updating dependencies..."
  ncu -u -x @types/node -x jest -x @jest/globals -x typescript
}

                                                       updateDependencies             &&
cd packages/build                                   && updateDependencies && cd ../.. &&
cd packages/file-permission-process                 && updateDependencies && cd ../.. &&
npm install                                         &&

echo "Great Success!"

sleep 2
