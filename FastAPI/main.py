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
tuner_data = {
    "frequency": 220.0,
    "note": "A",
    "octave": 3,
    "accuracy": 0.87
}

async def update_frequency():
    """Tarea en segundo plano que actualiza la frecuencia cada 2 segundos"""
    while True:
        # Generamos el valor random entre 210 y 230
        tuner_data["frequency"] = round(random.uniform(210, 230), 2)
        # Opcional: podrías actualizar el accuracy también para que se vea real
        tuner_data["accuracy"] = round(random.uniform(0.8, 0.99), 2)

        # Esperamos 2 segundos antes de la próxima actualización
        await asyncio.sleep(2)

# Decoramos la función de inicio para que se ejecute al arrancar el servidor
@app.on_event("startup")
async def startup_event():
    # Iniciamos la tarea sin bloquear el inicio del servidor
    asyncio.create_task(update_frequency())

# Decorador para manejar la ruta GET en /api
@app.get("/api")
def read_root():
    # Devolvemos el estado actual del afinador como respuesta JSON
    return {"guitar_tuner": tuner_data}
