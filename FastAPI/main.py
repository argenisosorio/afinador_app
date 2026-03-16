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
    "frequency": 220.0,
    # "minFrequency": 210,
    # "maxFrequency": 230,
    "note": "A",
    "octave": 3,
    "accuracy": 0.87
}

async def update_frequency():
    """Tarea en segundo plano que incrementa la frecuencia de 2 en 2"""
    # Inicializamos en 210
    data["frequency"] = 210.0

    while True:
        # Esperamos 0.5 segundo antes de la siguiente actualización
        await asyncio.sleep(0.5)

        # Calculamos el siguiente valor sumando 5
        nueva_frecuencia = data["frequency"] + 2

        # Si supera los 230, reiniciamos a 210
        if nueva_frecuencia > 230:
            data["frequency"] = 210.0
        else:
            data["frequency"] = nueva_frecuencia

        # Opcional: actualizar el accuracy para que varíe un poco
        data["accuracy"] = round(random.uniform(0.9, 0.99), 2)

        print(f"Frecuencia actualizada: {data['frequency']}") # Debug en consola

# Decoramos la función de inicio para que se ejecute al arrancar el servidor
@app.on_event("startup")
async def startup_event():
    # Iniciamos la tarea sin bloquear el inicio del servidor
    asyncio.create_task(update_frequency())

# Decorador para manejar la ruta GET en /api
@app.get("/api")
def read_root():
    # Devolvemos el estado actual del afinador como respuesta JSON
    return {"data": data}
