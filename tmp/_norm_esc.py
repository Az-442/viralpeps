#!/usr/bin/env python3
"""Normalise over-escaped backslash runs in a TS fragment: \\{2,}n -> \\n (literal), same for quotes.

Per the Day-18/19 notes: collapse to a LITERAL backslash + char (r'\\n'), never to a real newline.
"""
import re
import sys


def normalise(raw: bytes) -> tuple[bytes, int]:
    fixed = 0

    def repl(m):
        nonlocal fixed
        fixed += 1
        return b'\\' + m.group(1)

    # 2+ backslashes before n / ' / " -> single backslash before that char
    out = re.sub(rb'\\{2,}([n\'"])', repl, raw)
    return out, fixed


if __name__ == '__main__':
    path = sys.argv[1]
    raw = open(path, 'rb').read()
    out, n = normalise(raw)
    if n:
        open(path, 'wb').write(out)
    print(f'{path}: normalised {n} over-escaped run(s); size {len(raw)} -> {len(out)}')
