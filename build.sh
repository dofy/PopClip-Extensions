#!/bin/sh

help () {
  echo "Usage:"
  echo "\t./build.sh [-i] <EXT_FOLDER>"
  echo "\t./build.sh -h"
  echo
  echo "Options:"
  echo "\t-i\tBuild and install"
  echo "\t-h\tShow help"
  exit 0
}

build () {
  SRC="$1"
  DIST="_extensions/$1.popclipext"
  if [ -d "$SRC" ] ; then
    mkdir -p "$DIST"
    cp -R "$SRC/" "$DIST/"
    echo "Extensions \"$SRC\" builded successfully!"
  else
    echo "\"$SRC\" must be a folder."
    exit 1
  fi
}

[ $# -eq 0 ] && help

while getopts "i:h" opts ; do
  case $opts in
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
