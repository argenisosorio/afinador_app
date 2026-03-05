from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción cambia esto por la URL de tu Nuxt
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
def read_root():
    return {
        "guitar_tuner": {
            "frequency": 220.0,
            "note": "A",
            "octave": 3,
            "accuracy": 0.87
        }
    }
