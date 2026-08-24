#!/usr/bin/env python3
"""Fix double-backslash n to single-backslash n in temp article files"""
import os

files = ['article-skin.txt', 'article-recovery.txt', 'article-ghkcu-skin-hair.txt']

for f in files:
    path = os.path.join('/Users/time4you/viralpeps/tmp', f)
    with open(path) as fh:
        content = fh.read()
    
    # Replace \\n (two backslashes + n) with \n (one backslash + n)
    # In the file, \\n is literal backslash backslash n (4 bytes)
    # \n in the Python string is an actual newline
    # \\n in the file is backslash + n (2 bytes)
    fixed = content.replace('\\\\n', '\\n')
    
    changes = content.count('\\\\n')
    print(f'{f}: fixed {changes} occurrences')
    
    with open(path, 'w') as fh:
        fh.write(fixed)
