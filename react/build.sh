#! /bin/bash

defaultPackageFolderName="build"
newPackageFolderName="react_build"
targetFileName="index"
expressFolderPath="../express"
htmlToJadeConverter="node_modules/html2jade/cli.js"

function buildPackage() {
    echo -e "\nStart building package\n"

    # build react app
    npm run build

    # delete old folder
    if [ -e "./${newPackageFolderName}" ]; then
        rm -r "./${newPackageFolderName}"
    fi

    # rename folder
    mv "./${defaultPackageFolderName}" "./${newPackageFolderName}"

    echo -e "\nFinish building package\n"
}

function integratePackage() {
    echo -e "\nStart integrating package\n"

    # copy folder to express
    if [ -e "./${expressFolderPath}/${newPackageFolderName}/" ]; then
        rm -r "./${expressFolderPath}/${newPackageFolderName}/"
    fi
    cp -r "./${newPackageFolderName}/" "./${expressFolderPath}/"

    # transform .html to .jade and copy to express
    ./${htmlToJadeConverter} "./${newPackageFolderName}/${targetFileName}.html"
    cp "./${newPackageFolderName}/${targetFileName}.jade" "./${expressFolderPath}/views/${targetFileName}.jade"

    echo -e "\nFinish integrating package\n"
}

### main scripts ###

# exit when any command fails
set -e

buildPackage
integratePackage
