try:
    from PIL import Image
    print("Pillow OK")
except ImportError:
    print("Pillow not installed")
