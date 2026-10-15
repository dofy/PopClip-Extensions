#!/bin/sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
SRC_ROOT="$SCRIPT_DIR/src"
DIST_ROOT="$SCRIPT_DIR/dist"
TEMPLATE_ROOT="$SCRIPT_DIR/templates"

PACKAGE_SUFFIX=".popclipext"
PACKAGE_ZIP_SUFFIX=".popclipextz"
SNIPPET_SUFFIX=".popcliptxt"
MAX_FILES=100
MAX_FILE_BYTES=1048576
MAX_TOTAL_BYTES=2097152

STAGE_DIR=
LAST_OUTPUT=

say() {
  printf '%s\n' "$*"
}

die() {
  printf 'Error: %s\n' "$*" >&2
  exit 1
}

usage() {
  cat <<'EOF'
Build and manage PopClip extensions and snippets.

Usage:
  ./build.sh                         Interactive menu
  ./build.sh NAME                    Build a package or snippet
  ./build.sh build NAME              Build a package or snippet
  ./build.sh install NAME            Build and install a package or snippet
  ./build.sh create-package FORMAT NAME
  ./build.sh create-snippet FORMAT NAME
  ./build.sh remove NAME             Remove source and generated files

Legacy options are also supported:
  -p NAME    Create a Plist package from the template
  -y NAME    Create a YAML package from the template
  -j NAME    Create a JSON package from the template
  -m NAME    Create a module package from the template
  -J NAME    Create a JavaScript snippet
  -T NAME    Create a TypeScript snippet
  -Y NAME    Create a YAML snippet
  -i NAME    Build and install
  -r NAME    Remove source and generated files
  -h         Show this help

Package formats: plist, yaml, json, module
Snippet formats: javascript, typescript, yaml
EOF
}

cleanup_stage() {
  if [ -n "${STAGE_DIR:-}" ] && [ -d "$STAGE_DIR" ]; then
    rm -rf "$STAGE_DIR"
  fi
  STAGE_DIR=
}

trap cleanup_stage EXIT HUP INT TERM

require_name() {
  name=$1
  case "$name" in
    ""|.*|*[!A-Za-z0-9._-]*)
      die "Invalid name '$name'. Use letters, numbers, dots, hyphens, or underscores."
      ;;
  esac
}

require_args() {
  expected=$1
  shift
  if [ "$#" -ne "$expected" ]; then
    die "Expected $expected argument(s), received $#"
  fi
}

source_exists_for_name() {
  name=$1
  for candidate in \
    "$SRC_ROOT/$name$PACKAGE_SUFFIX" \
    "$SRC_ROOT/$name.js" \
    "$SRC_ROOT/$name.ts" \
    "$SRC_ROOT/$name.yaml" \
    "$SRC_ROOT/$name.yml" \
    "$SRC_ROOT/$name.json" \
    "$SRC_ROOT/$name.applescript" \
    "$SRC_ROOT/$name$SNIPPET_SUFFIX"; do
    if [ -e "$candidate" ]; then
      return 0
    fi
  done
  return 1
}

template_for_package_format() {
  case "$1" in
    p|plist) printf '%s\n' "Plist" ;;
    y|yaml) printf '%s\n' "Yaml" ;;
    j|json) printf '%s\n' "JSON" ;;
    m|module) printf '%s\n' "module" ;;
    *) die "Unknown package format '$1'" ;;
  esac
}

template_for_snippet_format() {
  case "$1" in
    J|javascript|js) printf '%s\n' "template.js" ;;
    T|typescript|ts) printf '%s\n' "template.ts" ;;
    Y|yaml) printf '%s\n' "template.yaml" ;;
    *) die "Unknown snippet format '$1'" ;;
  esac
}

create_package() {
  format=$1
  name=$2
  require_name "$name"
  template_dir=$(template_for_package_format "$format")
  target="$SRC_ROOT/$name$PACKAGE_SUFFIX"

  if source_exists_for_name "$name"; then
    die "A source with the name '$name' already exists."
  fi

  mkdir -p "$target"
  cp -R "$TEMPLATE_ROOT/$template_dir/." "$target/"
  say "Created package source: $target"
}

create_snippet() {
  format=$1
  name=$2
  require_name "$name"
  template_file=$(template_for_snippet_format "$format")
  case "$template_file" in
    template.js) extension=".js" ;;
    template.ts) extension=".ts" ;;
    template.yaml) extension=".yaml" ;;
  esac
  target="$SRC_ROOT/$name$extension"

  if source_exists_for_name "$name"; then
    die "A source with the name '$name' already exists."
  fi

  cp "$TEMPLATE_ROOT/_Snippets/$template_file" "$target"
  say "Created snippet source: $target"
}

validate_package() {
  package_dir=$1
  config_count=$(find "$package_dir" -maxdepth 1 -type f -name 'Config*' -print | awk 'NF { count++ } END { print count + 0 }')
  [ "$config_count" -eq 1 ] || die "Package must contain exactly one Config file at its root."

  stats=$(find "$package_dir" -type f -exec wc -c {} \; | awk '
    { files += 1; total += $1; if ($1 > largest) largest = $1 }
    END { print files + 0, total + 0, largest + 0 }
  ')
  set -- $stats
  file_count=$1
  total_bytes=$2
  largest_bytes=$3

  [ "$file_count" -le "$MAX_FILES" ] || die "Package has $file_count files; maximum is $MAX_FILES."
  [ "$largest_bytes" -le "$MAX_FILE_BYTES" ] || die "A package file is $largest_bytes bytes; maximum is $MAX_FILE_BYTES."
  [ "$total_bytes" -le "$MAX_TOTAL_BYTES" ] || die "Package is $total_bytes bytes; maximum is $MAX_TOTAL_BYTES."
}

copy_visible_files() {
  source_dir=$1
  destination_dir=$2
  (
    cd "$source_dir" || exit 1
    find . -type f ! -path '*/.*' ! -path '*/_*' -exec sh -c '
      destination_root=$1
      shift
      for source_file do
        relative_file=${source_file#./}
        destination_file="$destination_root/$relative_file"
        mkdir -p "$(dirname "$destination_file")"
        cp "$source_file" "$destination_file"
      done
    ' popclip-copy "$destination_dir" {} +
  )
}

build_package() {
  name=$1
  require_name "$name"
  source_dir="$SRC_ROOT/$name$PACKAGE_SUFFIX"
  [ -d "$source_dir" ] || die "Package source not found: $source_dir"
  command -v zip >/dev/null 2>&1 || die "The zip command is required."

  mkdir -p "$DIST_ROOT"
  STAGE_DIR=$(mktemp -d "${TMPDIR:-/tmp}/popclip-build.XXXXXX")
  staged_package="$STAGE_DIR/$name$PACKAGE_SUFFIX"
  mkdir -p "$staged_package"

  copy_visible_files "$source_dir" "$staged_package"
  validate_package "$staged_package"

  output="$DIST_ROOT/$name$PACKAGE_ZIP_SUFFIX"
  rm -f "$output"
  (
    cd "$STAGE_DIR" || exit 1
    zip -qr "$output" "$name$PACKAGE_SUFFIX"
  )
  cleanup_stage
  LAST_OUTPUT=$output
  say "Built package: $output"
}

build_snippet() {
  name=$1
  require_name "$name"
  source_file=
  for extension in .js .ts .yaml .yml .applescript .popcliptxt; do
    if [ -f "$SRC_ROOT/$name$extension" ]; then
      source_file="$SRC_ROOT/$name$extension"
      break
    fi
  done
  [ -n "$source_file" ] || die "Snippet source not found for '$name'."

  mkdir -p "$DIST_ROOT"
  output="$DIST_ROOT/$name$SNIPPET_SUFFIX"
  cp "$source_file" "$output"
  LAST_OUTPUT=$output
  say "Built snippet: $output"
}

build_target() {
  name=$1
  if [ -d "$SRC_ROOT/$name$PACKAGE_SUFFIX" ]; then
    build_package "$name"
  else
    build_snippet "$name"
  fi
}

install_target() {
  name=$1
  build_target "$name"
  command -v open >/dev/null 2>&1 || die "The macOS open command is required."
  # PopClip deletes .popclipextz files after installation. Open a temporary
  # copy so the distributable remains in dist. Do not remove this directory
  # on exit: macOS open hands the file to PopClip asynchronously.
  install_dir=$(mktemp -d "${TMPDIR:-/tmp}/popclip-install.XXXXXX")
  install_file="$install_dir/$(basename "$LAST_OUTPUT")"
  cp "$LAST_OUTPUT" "$install_file"
  if ! open "$install_file"; then
    rm -rf "$install_dir"
    die "Could not open the temporary installation copy."
  fi
  say "Opened temporary copy for installation; retained: $LAST_OUTPUT"
}

remove_target() {
  name=$1
  require_name "$name"
  say "This removes source and generated files for '$name'."
  printf 'Continue? [y/N] '
  IFS= read -r answer
  case "$answer" in
    [yY]|[yY][eE][sS]) ;;
    *) say "Cancelled."; return 0 ;;
  esac

  rm -rf "$SRC_ROOT/$name$PACKAGE_SUFFIX"
  for extension in .js .ts .yaml .yml .json .applescript; do
    rm -f "$SRC_ROOT/$name$extension"
  done
  rm -f "$DIST_ROOT/$name$PACKAGE_ZIP_SUFFIX" "$DIST_ROOT/$name$SNIPPET_SUFFIX"
  say "Removed '$name'."
}

list_packages() {
  find "$SRC_ROOT" -mindepth 1 -maxdepth 1 -type d -name "*$PACKAGE_SUFFIX" \
    -exec basename {} \; | sort
}

list_snippets() {
  for source_file in "$SRC_ROOT"/*.js "$SRC_ROOT"/*.ts "$SRC_ROOT"/*.yaml "$SRC_ROOT"/*.yml "$SRC_ROOT"/*.applescript "$SRC_ROOT"/*.popcliptxt; do
    [ -f "$source_file" ] || continue
    basename "$source_file"
  done | sed 's/\.[^.]*$//' | sort -u
}

choose_from_list() {
  title=$1
  values=$2
  [ -n "$values" ] || die "No $title available."
  say "" >&2
  say "$title:" >&2
  printf '%s\n' "$values" | awk '{ printf "  %d) %s\n", NR, $0 }' >&2
  printf 'Choose a number: ' >&2
  IFS= read -r choice
  case "$choice" in
    ''|*[!0-9]) die "Please choose a number." ;;
  esac
  selected=$(printf '%s\n' "$values" | awk -v number="$choice" 'NR == number { print; exit }')
  [ -n "$selected" ] || die "Invalid selection."
  printf '%s\n' "$selected"
}

choose_package_name() {
  choose_from_list "packages" "$(list_packages)"
}

choose_snippet_name() {
  choose_from_list "snippets" "$(list_snippets)"
}

choose_package_format() {
  say "Package format:" >&2
  say "  1) YAML" >&2
  say "  2) JSON" >&2
  say "  3) Plist" >&2
  say "  4) Module (YAML + TypeScript)" >&2
  printf 'Choose a number: ' >&2
  IFS= read -r choice
  case "$choice" in
    1) printf '%s\n' yaml ;;
    2) printf '%s\n' json ;;
    3) printf '%s\n' plist ;;
    4) printf '%s\n' module ;;
    *) die "Invalid package format." ;;
  esac
}

choose_snippet_format() {
  say "Snippet format:" >&2
  say "  1) JavaScript" >&2
  say "  2) TypeScript" >&2
  say "  3) YAML" >&2
  printf 'Choose a number: ' >&2
  IFS= read -r choice
  case "$choice" in
    1) printf '%s\n' javascript ;;
    2) printf '%s\n' typescript ;;
    3) printf '%s\n' yaml ;;
    *) die "Invalid snippet format." ;;
  esac
}

interactive_menu() {
  while :; do
    say ""
    say "PopClip Extensions"
    say "  1) Build a package"
    say "  2) Build and install a package"
    say "  3) Build a snippet"
    say "  4) Build and install a snippet"
    say "  5) Create a package from a template"
    say "  6) Create a snippet from a template"
    say "  7) Remove source and generated files"
    say "  q) Quit"
    printf 'Choose an action: '
    IFS= read -r action || exit 0
    case "$action" in
      1) name=$(choose_package_name); build_package "$name" ;;
      2) name=$(choose_package_name); install_target "$name" ;;
      3) name=$(choose_snippet_name); build_snippet "$name" ;;
      4) name=$(choose_snippet_name); install_target "$name" ;;
      5)
        printf 'New package name: '
        IFS= read -r name
        format=$(choose_package_format)
        create_package "$format" "$name"
        ;;
      6)
        printf 'New snippet name: '
        IFS= read -r name
        format=$(choose_snippet_format)
        create_snippet "$format" "$name"
        ;;
      7)
        printf 'Name to remove: '
        IFS= read -r name
        remove_target "$name"
        ;;
      q|Q) exit 0 ;;
      *) say "Unknown action." >&2 ;;
    esac
  done
}

if [ "$#" -eq 0 ]; then
  interactive_menu
  exit 0
fi

command_name=$1
shift
case "$command_name" in
  -h|--help|help)
    require_args 0 "$@"
    usage
    ;;
  build|--build)
    require_args 1 "$@"
    build_target "$1"
    ;;
  install|--install|-i)
    require_args 1 "$@"
    install_target "$1"
    ;;
  remove|--remove|-r)
    require_args 1 "$@"
    remove_target "$1"
    ;;
  create-package)
    require_args 2 "$@"
    create_package "$1" "$2"
    ;;
  create-snippet)
    require_args 2 "$@"
    create_snippet "$1" "$2"
    ;;
  -p|-y|-j|-m)
    require_args 1 "$@"
    create_package "${command_name#-}" "$1"
    ;;
  -J|-T|-Y)
    require_args 1 "$@"
    create_snippet "${command_name#-}" "$1"
    ;;
  *)
    require_args 0 "$@"
    build_target "$command_name"
    ;;
esac
