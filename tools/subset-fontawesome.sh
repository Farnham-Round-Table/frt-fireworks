#!/usr/bin/env bash
# Rebuilds the small Font Awesome files in public/webfonts from the full fonts in tools/fontawesome.
# Run this after using a new icon on the site: add its name to the lists below, then run
#   pip install fonttools brotli && tools/subset-fontawesome.sh
set -euo pipefail
cd "$(dirname "$0")/.."
SOLID="video masks-theater utensils clock ticket circle-question map-location-dot arrow-up-right-from-square fire guitar fire-burner burst drum fire-flame-curved handshake image"
BRANDS="facebook square-instagram"
codes() { # $1 = icon names; prints U+ codepoints taken from the Font Awesome CSS
  for n in $1; do
    grep -h -A2 -m1 -E "^\.fa-$n \{" public/css/fontawesome.css public/css/brands.css | grep -oE '\\[0-9a-f]+' | head -1 | sed -E 's/^\\/U+/'
  done | paste -sd, -
}
pyftsubset tools/fontawesome/fa-solid-900.woff2 --unicodes="$(codes "$SOLID")" --flavor=woff2 --layout-features='' --output-file=public/webfonts/fa-solid-900.woff2
pyftsubset tools/fontawesome/fa-brands-400.woff2 --unicodes="$(codes "$BRANDS")" --flavor=woff2 --layout-features='' --output-file=public/webfonts/fa-brands-400.woff2
