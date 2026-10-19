#!/bin/sh
# Verifica que el dominio salga solo de PUBLIC_SITE_URL: construye con uno de prueba y busca el de respaldo.
set -e
PUBLIC_SITE_URL=https://dominio-de-prueba.example npx astro build >/dev/null
if grep -rq "escucha.mayia.mx" dist; then echo "FALLA: el dominio de respaldo aparece en dist"; exit 1; fi
grep -q "https://dominio-de-prueba.example/monitoreo-de-medios" dist/sitemap.xml || { echo "FALLA: sitemap sin dominio de prueba"; exit 1; }
echo "OK: el dominio cambia solo con PUBLIC_SITE_URL"
