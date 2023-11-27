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
  echo "\t./build.sh [-p | -y | -j | -sj | -sy | -i | -r] <EXT_NAME>"
  echo "\t./build.sh -h"
  echo
  echo "Options:"
  echo "\t-p\tCreate extension from plist template."
  echo "\t-y\tCreate extension from yaml template."
  echo "\t-j\tCreate extension from json template."
  echo "\t-sj\tCreate snippet extension from JavaScript snippet template."
  echo "\t-st\tCreate snippet extension from TypeScript snippet template."
  echo "\t-sy\tCreate snippet extension from yaml snippet template."
  echo "\t-i\tBuild and Install extension."
  echo "\t-r\tRemove Extension and SOURCE!!!"
  echo "\t-h\tShow help."
  echo ""
  exit 0
}

SRC_ROOT="src/"
DIST_ROOT="dist/"
TEMP_ROOT="templates"

JS_EXT=".js"
TS_EXT=".ts"
YAML_EXT=".yaml"
SNIPPET_EXT=".popcliptxt"
EXT=".popclipext"
EXTz="${EXT}z"

die() {
  echo $1
  exit 1
}

# create extension by template
create_package() {
  SRC=$2
  if [ $1 == "p" ]; then
    TYPE=Plist
  elif [ $1 == "y" ]; then
    TYPE=Yaml
  elif [ $1 == "j" ]; then
    TYPE=JSON
  fi
  TMP=$TEMP_ROOT/$TYPE
  if [ -f $SRC_ROOT/$SRC.* ] || [ -d $SRC_ROOT$SRC ]; then
    die "The extension \"$SRC\" already exists!"
  else
    cp -R $TMP/ $SRC_ROOT$SRC/
    echo "Extension \"$SRC\" has been created."
    echo "You can edit it now."
  fi
}

# create snippet extension by template
create_snippet() {
  if [ $1 == "t" ]; then
    TYPE=$TS_EXT
  elif [ $1 == "j" ]; then
    TYPE=$JS_EXT
  elif [ $1 == "y" ]; then
    TYPE=$YAML_EXT
  fi
  SRC=$2
  FILE_NAME=$SRC$TYPE
  TMP=$TEMP_ROOT/_Snippets/template$TYPE
  if [ -f $SRC_ROOT$SRC.* ] || [ -d $SRC_ROOT$SRC ]; then
    die "The extension \"$SRC\" already exists!"
  else
    cp $TMP $SRC_ROOT$FILE_NAME
    echo "Extension \"$FILE_NAME\" has been created."
    echo "You can edit it now."
  fi
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
  elif [ -f $SRC_ROOT$SRC$JS_EXT ]; then
    cp $SRC_ROOT$SRC$JS_EXT $DIST_ROOT$SRC$SNIPPET_EXT
    echo Snippet Extension \"$SRC\" build successfully!
    echo You can try to install it in \"$DIST_ROOT$SRC$SNIPPET_EXT\"
  elif [ -f $SRC_ROOT$SRC$TS_EXT ]; then
    cp $SRC_ROOT$SRC$TS_EXT $DIST_ROOT$SRC$SNIPPET_EXT
    echo Snippet Extension \"$SRC\" build successfully!
    echo You can try to install it in \"$DIST_ROOT$SRC$SNIPPET_EXT\"
  elif [ -f $SRC_ROOT$SRC$YAML_EXT ]; then
    cp $SRC_ROOT$SRC$YAML_EXT $DIST_ROOT$SRC$SNIPPET_EXT
    echo Snippet Extension \"$SRC\" build successfully!
    echo You can try to install it in \"$DIST_ROOT$SRC$SNIPPET_EXT\"
  else
    die "The extension \"$SRC\" does not exist."
  fi
}

remove() {
  SRC=$1
  read -p "Are you sure to remove \"$SRC\"? [y/N]" CONFIRM
  while true; do
    case $CONFIRM in
    [yY]*)
      rm -rf $SRC_ROOT$SRC $SRC_ROOT$SRC.* $DIST_ROOT$SRC.*
      echo "Extension \"$SRC\" has been removed."
      ;;
    [nN]* | *) ;;
    esac
    exit 0
  done
}

[ $# -eq 0 ] && help

while getopts "p:y:j:s:i:r:h" opts; do
  case $opts in
  p | y | j)
    create_package $opts $2
    exit 0
    ;;
  s)
    create_snippet $OPTARG $2
    exit 0
    ;;
  i)
    build $OPTARG
    if [ -f $SRC$EXTz ]; then
      open $SRC$EXTz
    elif [ -f $SRC$SNIPPET_EXT ]; then
      open $SRC$SNIPPET_EXT
    else
      die "Build failed!"
    fi
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
