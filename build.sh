#!/bin/sh

help() {
  echo "Usage:"
  echo "\t./build.sh [-p | -y | -i | -r] <EXT_NAME>"
  echo "\t./build.sh -h"
  echo
  echo "Options:"
  echo "\t-p\tCreate an extension by plist template."
  echo "\t-y\tCreate an extension by yaml template."
  echo "\t-i\tBuild and install extension."
  echo "\t-r\tRemove extension and source!!!"
  echo "\t-h\tShow help."
  exit 0
}

die() {
  echo $1
  exit 1
}

create_p() {
  TMP="Template_Plist"
  SRC="$1"
  if [ -d "$SRC" ]; then
    die "The extension \"$SRC\" already exits!"
  else
    cp -R "$TMP/" "$SRC/"
    echo "Extension \"$SRC\" has been created."
    echo "You can edit it now."
  fi
}

create_y() {
  TMP="Template_Yaml"
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
    rm -rf "$EXT"
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

while getopts "p:y:i:r:h" opts; do
  case $opts in
  p)
    create_p "$OPTARG"
    exit 0
    ;;
  y)
    create_y "$OPTARG"
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
