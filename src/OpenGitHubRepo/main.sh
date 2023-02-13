TEXT_TRIM="$(echo "${POPCLIP_TEXT}" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"
open https://github.com/$TEXT_TRIM
