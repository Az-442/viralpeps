#!/usr/bin/env python3
"""Check newline escaping in temp article files"""
import os

files = ['article-weight-loss.txt', 'article-skin.txt', 'article-recovery.txt', 'article-ghkcu-skin-hair.txt']

for f in files:
    path = os.path.join('/Users/time4you/viralpeps/tmp', f)
    with open(path) as fh:
        content = fh.read()
    double_bs = content.count('\\\\n')  # double backslash + n
    single_bs = content.count('\\n')   # single backslash + n (correct for TS)
    print(f'{f}: correct single \\\\n count={single_bs}, wrong double \\\\\\\\n count={double_bs}')
