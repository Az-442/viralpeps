#!/usr/bin/env python3
"""Report any tracked change in the repo since a given window (for concurrent-job awareness)."""
import subprocess, datetime

def run(*a):
    return subprocess.run(a, cwd='/Users/time4you/viralpeps', capture_output=True, text=True).stdout

log = run('git', 'log', '--since=6.hours.ago', '--pretty=%h|%an|%cd|%s', '--date=format:%H:%M')
print("=== commits in last 6h on main ===")
print(log or "  (none)")

print("\n=== working tree (tracked) ===")
print(run('git', 'status', '--porcelain', '--untracked-files=no') or "  clean")

print("\n=== untracked, excluding scripts/ ===")
for line in run('git', 'status', '--porcelain').splitlines():
    if line.startswith('??'):
        print('  ', line)
