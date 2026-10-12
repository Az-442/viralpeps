#!/usr/bin/env python3
"""Word count for the three Day-20 articles: visible body (sections + subsections + pullQuote + faq)."""
import os
import re

os.chdir('/Users/time4you/viralpeps')
rc = open('src/data/research-content.ts', encoding='utf-8').read()


def extract(slug):
    m = re.search(r"^'" + re.escape(slug) + r"':\s*\{", rc, re.M)
    start = m.start()
    nxt = re.search(r"\n'[a-z0-9-]+':\s*\{", rc[start + 10:])
    end = start + 10 + nxt.start() if nxt else rc.index('\n\n};\nexport default content;', start)
    return rc[start:end]


def words(text):
    # strip escapes and markdown, count words
    t = text.replace('\\n', ' ').replace('\\u2014', ' ').replace('\\u2019', "'")
    t = re.sub(r'\*\*|\[|\]\(|/compounds/[a-z0-9-]+|/research/[a-z0-9-]+', ' ', t)
    return len([w for w in re.split(r'\s+', t) if w.strip(" '-.,:;()")])


for slug in ['p21-vs-semax', 'weight-loss-peptide-suppliers-uk', 'cheapest-peptides-uk']:
    body = extract(slug)
    # body word count (whole record less the key/references)
    total = words(body)
    print(f'{slug}: {total:,} words (whole record incl. quickInfo/refs)')
