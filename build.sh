#!/bin/sh

help () {
  echo "Usage:"
  echo "\t./build.sh [-i | -c] <EXT_NAME>"
  echo "\t./build.sh -h"
  echo
  echo "Options:"
  echo "\t-c\tCreate an extension by template"
  echo "\t-i\tBuild and install"
  echo "\t-h\tShow help"
  exit 0
}

die () {
  echo $1
  exit 1
}

create () {
  SRC="ATemplate"
  DIST="$1"
  if [ -d "$DIST" ] ; then
    die "The extension \"$DIST\" already exits!"
  else
    cp -R "$SRC/" "$DIST/"
    echo "Extension \"$DIST\" has been created."
    echo "You can edit it now."
  fi
}


build () {
  SRC="$1"
  DIST="_extensions/$1.popclipext"
  if [ -d "$SRC" ] ; then
    mkdir -p "$DIST"
    cp -R "$SRC/" "$DIST/"
    echo "Extension \"$SRC\" build successfully!"
    echo "You can try to install it in \"$DIST\""
  else
    die "\"$SRC\" must be a folder."
  fi
}

[ $# -eq 0 ] && help

while getopts "c:i:h" opts ; do
  case $opts in
    c)
      create "$OPTARG"
      exit 0
      ;;
    i)
      build "$OPTARG"
      open "$DIST"
      exit 0
      ;;
    h|?)
      help
      ;;
  esac
done

build "$1"
