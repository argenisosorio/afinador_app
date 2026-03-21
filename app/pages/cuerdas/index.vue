<template>
  <div>
    <div class="text-center">
      <h1 class="text-center text-white mt-4 mb-4">
        <b>
          ¿Cuántas <span class="color-orange-app">cuerdas</span> tiene tu
          instrumento?
        </b>
      </h1>
      <h4 class="text-lightgray mt-4 mb-4">
        Selecciona el número de cuerdas para afinar tu instrumento musical
      </h4>
    </div>
    <div class="container">
      <!-- Columnas para mostrar las opciones de cuerdas -->
      <div class="row">
        <div class="col-4 col-sm-4">
          <div class="card main-card">
            <div class="card-body text-center text-white">
              <img
                src="/images/cuerdas/4.png"
                alt="star"
                class="img-fluid mt-3 mb-3"
                width="200px"
              >
              <h4><b>4 Cuerdas</b></h4>
              <!-- Botón para entrar al 2do menú -->
              <NuxtLink to="/cuerdas/4" class="navbar-brand">
                <button
                  type="button"
                  class="btn btn-primary btn-lg btn-chords mt-2 mb-2"
                >
                  <span class="color-background-app">
                    <b>Presiona 4</b>
                  </span>
                </button>
              </NuxtLink>
              <!-- Final del botón para entrar al 2do menú -->
            </div>
          </div>
        </div>
        <div class="col-4 col-sm-4">
          <div class="card main-card">
            <div class="card-body text-center text-white">
              <img
                src="/images/cuerdas/6.png"
                alt="star"
                class="img-fluid mt-3 mb-3"
                width="200px"
              >
              <h4><b>6 Cuerdas</b></h4>
              <!-- Botón para entrar al 2do menú -->
              <NuxtLink to="/cuerdas/6" class="navbar-brand">
                <button
                  type="button"
                  class="btn btn-primary btn-lg btn-chords mt-2 mb-2"
                >
                  <span class="color-background-app">
                    <b>Presiona 6</b>
                  </span>
                </button>
              </NuxtLink>
              <!-- Final del botón para entrar al 2do menú -->
            </div>
          </div>
        </div>
        <div class="col-4 col-sm-4">
          <div class="card main-card">
            <div class="card-body text-center text-white">
              <img
                src="/images/cuerdas/8.png"
                alt="star"
                class="img-fluid mt-3 mb-3"
                width="200px"
              >
              <h4><b>8 Cuerdas</b></h4>
              <!-- Botón para entrar al 2do menú -->
              <NuxtLink to="/cuerdas/8" class="navbar-brand">
                <button
                  type="button"
                  class="btn btn-primary btn-lg btn-chords mt-2 mb-2"
                >
                  <span class="color-background-app">
                    <b>Presiona 8</b>
                  </span>
                </button>
              </NuxtLink>
              <!-- Final del botón para entrar al 2do menú -->
            </div>
          </div>
        </div>
      </div>
      <!-- Final de las columnas para mostrar las opciones de cuerdas -->
      <div class="text-center mt-2">
        <!-- Botón para entrar al menú -->
        <button
          type="button"
          class="btn btn-primary btn-lg btn-start-main mt-4 mb-5 "
        >
          <font-awesome-icon
            icon="fa-solid fa-hand-pointer"
            class="color-orange-app"
          />
          <b>Presiona <span class="color-orange-app">4, 6 o 8</span> en tu teclado</b>
        </button>
        <!-- Final del botón para entrar al menú -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

// Título de la página
useHead({title: 'Cuerdas'})

// Configuración de API (NUXT_PUBLIC_API_BASE en .env)
const config = useRuntimeConfig()
const apiBase = config.public.apiBase
// Variable para almacenar el timer del intervalo
let timer = null;

// --- MÉTODOS ---

// Función para obtener datos del endpoint de FastAPI.
const readAPI = async () => {
  try {
    // $fetch devuelve los datos directamente, no un objeto { data, error }
    const response = await $fetch(`${apiBase}/`)

    if (response.data.order === 4 || response.data.order === '4') {
      navigateTo('/cuerdas/4')
    } if (response.data.order === 6 || response.data.order === '6') {
      navigateTo('/cuerdas/6')
    } if (response.data.order === 8 || response.data.order === '8') {
      navigateTo('/cuerdas/8')
    } if (response.data.order === 0 || response.data.order === '0') {
      navigateTo('/')
    } else {
      // console.log("Esperando orden...")
    }
  } catch (e) {
    // Los errores en $fetch se capturan en el catch
    console.error('Error al conectar con la API:', e)
    console.log('Error al conectar con FastAPI. Revisa el CORS o la conexión.')
  }
}

// Inicialización
onMounted(() => {
  readAPI()
  // Iniciamos el ciclo de 0.5 segundos para actualizar la frecuencia
  timer = setInterval(readAPI, 500);
})

onUnmounted(() => {
  // Limpiamos el intervalo al salir del componente
  if (timer) clearInterval(timer);
});
</script>