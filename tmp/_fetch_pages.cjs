const { execSync } = require('child_process');
const fs = require('fs');
const slugs = [
  'reta-pen-20-mg','reta-pen-40-mg','ahk-50mg','bac-water-10ml','bpc-10mg',
  'ipamorelin-10mg','ghk-cu-50mg','mots-c-10mg','nad-100mg','reta-20mg',
  'reta-40mg','selank-10mg','semax-10mg','ss-31-10mg','tb-500-10mg','tesamorelin-10mg'
];
const base='https://www.apex-pharma.co.uk';
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36';
const out=[];
for (const s of slugs){
  const url=`${base}/product/${s}/`;
  try{
    const html=execSync(`curl -sL -A "${UA}" "${url}"`,{maxBuffer:50*1024*1024}).toString();
    fs.writeFileSync(`/Users/time4you/viralpeps/tmp/_pp_${s}.html`,html);
    const og=(html.match(/property="og:image"\s+content="([^"]+)"/)||html.match(/property="og:image" content="([^"]+)"/)||[])[1]||'';
    const title=(html.match(/<title>([^<]*)<\/title>/)||[])[1]||'';
    const large=(html.match(/class="wp-post-image[^"]*"[^>]*src="([^"]+)"/)||[])[1]||'';
    out.push({s,title:title.trim(),og:og,large:large});
  }catch(e){out.push({s,err:String(e).slice(0,120)});}
}
console.log(JSON.stringify(out,null,1));
