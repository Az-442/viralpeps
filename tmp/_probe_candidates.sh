#!/bin/bash
for d in healiuspeptides.com peptidesdistro.co.uk peptideglobal.co.uk kaltbergpeptides.co.uk novavitality.co.uk pondokpeptides.com everbluepeptides.com researchpeptideshop.uk armapeptides.com; do
  code=$(curl -s -o /tmp/_hd.html -w "%{http_code}" -L --max-time 20 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" "https://$d/")
  title=$(grep -o "<title>[^<]*</title>" /tmp/_hd.html | head -1 | sed 's/<[^>]*>//g')
  size=$(wc -c < /tmp/_hd.html | tr -d ' ')
  echo "$d | HTTP $code | bytes $size | $title"
done
