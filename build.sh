#!/bin/sh

help () {
  echo "Usage: ./build.sh [-i] <EXT_FOLDER>"
  echo
  echo "Options:"
  echo "\t-i\tBuild and install"
}

build () {
  SRC=$1/
  DIST=_extensions/$1.popclipext/
  if [ -d $1 ] ; then
    mkdir -p $DIST
    cp -R $SRC $DIST
    echo "DONE!"
  else
    echo "\"$1\" must be a folder."
    exit 1
  fi
}

if [ $# -eq 0 ] ; then
  help
elif [ $# -eq 1 ] ; then
  build $1
elif [ $# -eq 2 ] && [ $1 == "-i" ] ; then
  build $2
  open $DIST
else
  help
fi
