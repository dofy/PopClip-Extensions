#!/bin/sh

help() {
  echo "    //   ) )                   //   ) )                "
  echo "   //___/ /  ___      ___     //        // ( )  ___    "
  echo "  / ____ / //   ) ) //   ) ) //        // / / //   ) ) "
  echo " //       //   / / //___/ / //        // / / //___/ /  "
  echo "//       ((___/ / //       ((____/ / // / / //         "
  echo ""
  echo "Create / Build / Remove the PopClip extension"
  echo
  echo "Usage:"
  echo "\t./build.sh <EXT_NAME>"
  echo "\t./build.sh [-p | -y | -j | -i | -r] <EXT_NAME>"
  echo "\t./build.sh -h"
  echo
  echo "Options:"
  echo "\t-p\tCreate an extension by plist template."
  echo "\t-y\tCreate an extension by yaml template."
  echo "\t-j\tCreate an extension by json template."
  echo "\t-i\tBuild and install extension."
  echo "\t-r\tRemove extension and source!!!"
  echo "\t-h\tShow help."
  echo ""
  exit 0
}

die() {
  echo $1
  exit 1
}

# create extension by plist template
create_p() {
  SRC=$1
  TMP=_Template_Plist
  if [ -d $SRC ]; then
    die "The extension \"$SRC\" already exits!"
  else
    cp -R $TMP/ $SRC/
    echo "Extension \"$SRC\" has been created."
    echo "You can edit it now."
  fi
}

# create extension by yaml template
create_y() {
  SRC=$1
  TMP=_Template_Yaml
  if [ -d $SRC ]; then
    die "The extension \"$SRC\" already exits!"
  else
    cp -R $TMP/ $SRC/
    echo "Extension \"$SRC\" has been created."
    echo "You can edit it now."
  fi
}

# create extension by json template
create_j() {
  SRC=$1
  TMP=_Template_JSON
  if [ -d $SRC ]; then
    die "The extension \"$SRC\" already exits!"
  else
    cp -R $TMP/ $SRC/
    echo "Extension \"$SRC\" has been created."
    echo "You can edit it now."
  fi
}

build() {
  SRC=$1
  FOLDER=_extensions/
  EXT=$1.popclipext
  if [ -d $SRC ]; then
    rm -rf $FOLDER$EXT $FOLDER${EXT}z
    mkdir -p $FOLDER$EXT
    cp -R $SRC/ $FOLDER$EXT/
    cd $FOLDER
    zip -r -m -q ${EXT}z $EXT
    echo Extension \"$SRC\" build successfully!
    echo You can try to install it in \"$FOLDER${EXT}z\"
  else
    die \"$SRC\"\ must\ be\ a\ folder.
  fi
}

remove() {
  SRC=$1
  EXT=_extensions/$1.popclipext
  read -p "Are you sure to remove \"$SRC\"? [y/N]" CONFIRM
  while true; do
    case $CONFIRM in
    [yY]*)
      rm -rf $SRC $EXT ${EXT}z
      echo "Extension \"$SRC\" has been removed."
      ;;
    [nN]* | *) ;;

    esac
    exit 0
  done
}

[ $# -eq 0 ] && help

while getopts "p:y:j:i:r:h" opts; do
  case $opts in
  p)
    create_p $OPTARG
    exit 0
    ;;
  y)
    create_y $OPTARG
    exit 0
    ;;
  j)
    create_j $OPTARG
    exit 0
    ;;
  i)
    build $OPTARG
    open ${EXT}z
    exit 0
    ;;
  r)
    remove $OPTARG
    exit 0
    ;;
  h | ?)
    help
    ;;
  esac
done

build $1
