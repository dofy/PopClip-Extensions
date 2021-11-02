#!/bin/sh

help() {
  echo "Usage:"
  echo "\t./build.sh [-c | -i | -r] <EXT_NAME>"
  echo "\t./build.sh -h"
  echo
  echo "Options:"
  echo "\t-c\tCreate an extension by template."
  echo "\t-i\tBuild and install extension."
  echo "\t-r\tRemove extension and source!!!"
  echo "\t-h\tShow help."
  exit 0
}

die() {
  echo $1
  exit 1
}

create() {
  TMP="ATemplate"
  SRC="$1"
  if [ -d "$SRC" ]; then
    die "The extension \"$SRC\" already exits!"
  else
    cp -R "$TMP/" "$SRC/"
    echo "Extension \"$SRC\" has been created."
    echo "You can edit it now."
  fi
}

build() {
  SRC="$1"
  EXT="_extensions/$1.popclipext"
  if [ -d "$SRC" ]; then
    mkdir -p "$EXT"
    cp -R "$SRC/" "$EXT/"
    echo "Extension \"$SRC\" build successfully!"
    echo "You can try to install it in \"$EXT\""
  else
    die "\"$SRC\" must be a folder."
  fi
}

remove() {
  SRC="$1"
  EXT="_extensions/$1.popclipext"
  read -p "Are you sure to remove \"$SRC\"? [y/N]" CONFIRM
  while true; do
    case $CONFIRM in
    [yY]*)
      rm -rf "$SRC" "$EXT"
      echo "Extension \"$SRC\" has been removed."
      ;;
    [nN]* | *) ;;

    esac
    exit 0
  done
}

[ $# -eq 0 ] && help

while getopts "c:i:r:h" opts; do
  case $opts in
  c)
    create "$OPTARG"
    exit 0
    ;;
  i)
    build "$OPTARG"
    open "$EXT"
    exit 0
    ;;
  r)
    remove "$OPTARG"
    exit 0
    ;;
  h | ?)
    help
    ;;
  esac
done

build "$1"
