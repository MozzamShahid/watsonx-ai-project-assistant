import sys

print("Python version:", sys.version)
print("Python executable:", sys.executable)

try:
    import uvicorn
    print("Uvicorn imported successfully")
except ImportError as e:
    print("Error importing uvicorn:", str(e))

try:
    import fastapi
    print("FastAPI imported successfully")
except ImportError as e:
    print("Error importing fastapi:", str(e))

print("Python path:")
for path in sys.path:
    print(path)