from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import random

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción cambia esto por la URL de tu Nuxt
    allow_methods=["*"],
    allow_headers=["*"],
)

# Variable global para mantener el estado del afinador
data = {
    "order": "",
    "frequency": 220,
    "note": "A",
}

# Decorador para manejar la ruta GET en /api
@app.get("/api")
def read_root():
    # Devolvemos el estado actual del afinador como respuesta JSON
    return {"data": data}
