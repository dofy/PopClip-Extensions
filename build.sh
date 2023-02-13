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

SRC_ROOT="src/"
DIST_ROOT="dist/"
TEMP_ROOT="templates/"

EXT=".popclipext"
EXTz="${EXT}z"

die() {
  echo $1
  exit 1
}

# create extension by template
create() {
  if [ -d $SRC_ROOT$SRC ]; then
    die "The extension \"$SRC\" already exits!"
  else
    cp -R $TMP/ $SRC_ROOT$SRC/
    echo "Extension \"$SRC\" has been created."
    echo "You can edit it now."
  fi
}

# create extension by plist template
create_p() {
  SRC=$1
  TMP=$TEMP_ROOT/Plist
  create
}

# create extension by yaml template
create_y() {
  SRC=$1
  TMP=$TEMP_ROOT/Yaml
  create
}

# create extension by json template
create_j() {
  SRC=$1
  TMP=$TEMP_ROOT/JSON
  create
}

build() {
  SRC=$1
  if [ -d $SRC_ROOT$SRC ]; then
    rm -rf $DIST_ROOT$SRC$EXT $DIST_ROOT$SRC$EXTz
    mkdir -p $DIST_ROOT$SRC$EXT
    cp -R $SRC_ROOT$SRC/ $DIST_ROOT$SRC$EXT/
    cd $DIST_ROOT
    zip -r -m -q $SRC$EXTz $SRC$EXT
    echo Extension \"$SRC\" build successfully!
    echo You can try to install it in \"$DIST_ROOT$SRC$EXTz\"
  else
    die \"$SRC\"\ must\ be\ a\ folder.
  fi
}

remove() {
  SRC=$1
  read -p "Are you sure to remove \"$SRC\"? [y/N]" CONFIRM
  while true; do
    case $CONFIRM in
    [yY]*)
      rm -rf $SRC_ROOT$SRC $DIST_ROOT$SRC$EXT $DIST_ROOT$SRC$EXTz
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
    open $SRC$EXTz
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
