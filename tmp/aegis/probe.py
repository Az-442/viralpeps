#!/usr/bin/env python3
import zlib, struct, sys

def png_pixels(path):
    d = open(path, 'rb').read()
    assert d[:8] == b'\x89PNG\r\n\x1a\n'
    pos = 8; idat = b''; w = h = None
    while pos < len(d):
        ln = struct.unpack('>I', d[pos:pos+4])[0]
        typ = d[pos+4:pos+8]
        data = d[pos+8:pos+8+ln]
        if typ == b'IHDR':
            w, h = struct.unpack('>II', data[:8])
            bd = data[8]
        elif typ == b'IDAT':
            idat += data
        pos += 12 + ln
    raw = zlib.decompress(idat)
    ch = 4 if bd == 6 else 3
    stride = w * ch
    # sample top-left and centre-ish 3x3 average excluding transparent via alpha
    # iterate a subset for avg colour where alpha>200
    import statistics
    from collections import Counter
    pix = Counter()
    step = max(1, w//60)
    steprow = max(1, h//40)
    stride_full = stride + 1
    for y in range(0, h, steprow):
        row = raw[y*stride_full:(y+1)*stride_full]
        for x in range(0, w, step):
            o = x*ch
            if ch == 4:
                a = row[o+3]
                if a < 200: continue
                r,g,b = row[o], row[o+1], row[o+2]
            else:
                r,g,b = row[o], row[o+1], row[o+2]
            # quantise
            key = (r//24, g//24, b//24)
            pix[key]+=1
    total = sum(pix.values())
    print("WxH", w, h, "chan", ch)
    top = pix.most_common(12)
    for k,c in top:
        r,g,b=[v*24+12 for v in k]
        print("  col (~%d,%d,%d) count %d (%.1f%%)" % (r,g,b,c, 100*c/total))

png_pixels(sys.argv[1])
