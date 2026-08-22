import shutil, sys
print("python:", sys.version)
for tool in ["cwebp", "ffmpeg", "convert", "magick", "sips"]:
    print(tool, "->", shutil.which(tool))
try:
    from PIL import Image
    print("PIL available:", Image.__version__)
except Exception as e:
    print("PIL NOT available:", e)
