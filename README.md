<h1>Afinador de Cuerdas Automático</h1>

.....

<h2>Prerrequisitos</h2>

```
Node.js >= v20.20.0
npm
Python 3.12.X
FastAPI
```

<h3>Configuración del Backend (FastAPI)</h3>

Crear un entorno virtual con Python 3:

```
$ sudo apt install python3-venv
```

Crear el entorno virtual:

```
$ python3 -m venv FastAPI
```

Activar el entorno virtual:

```
$ source FastAPI/bin/activate
```

Instalación de fastapi dentro del entorno virtual:

```
(FastAPI) $ pip install "fastapi[standard]"
```

Abre una nueva terminal y navega al directorio del afinador_app/FastAPI:

```
$ cd FastAPI
```

Ejecuta el servidor de FastAPI:

```
$ fastapi dev main.py
```

Prueba tu API, Una vez que el servidor esté corriendo, puedes ver los resultados
en http://127.0.0.1:8000. Verás el JSON.

<h3>Configuración del Frontend (Nuxt)</h3>

Abre una nueva terminal y navega al directorio del afinador_app:

```
$ cd afinador_app
```

Instala las dependencias de Node.js:

```
$ npm install
```

Crea tu archivo de configuración local:

```
$ cp .env_example .env
```

Inicia el servidor de desarrollo de Nuxt:

```
$ npm run dev
```

La aplicación Nuxt estará disponible en http://localhost:3000/

Notas de desarrollo
===================

Órdenes del backend para navegar en la app:

```
0 /
1 /cuerdas
    4 /cuerdas/4
        1 /cuerdas/4/cuatro
        2 /cuerdas/4/ukelele
        3 /cuerdas/4/banjo
    6 /cuerdas/6
    8 /cuerdas/8
```
