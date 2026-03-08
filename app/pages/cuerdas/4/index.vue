<template>
  <div>
    <div class="text-center">
      <h1 class="text-center text-white mt-4 mb-4">
        <b>
          4 cuerdas
        </b>
      </h1>
    </div>
    <div class="container">
      <!-- Columnas para mostrar las opciones de cuerdas -->
      <div class="row">
        <div class="col-4 col-sm-4">
          <!-- Cuatro -->
          <div class="card main-card">
            <div class="card-body text-center text-white">
              <img
                src="/images/cuerdas/4/cuatro.png"
                alt="star"
                class="img-fluid mt-3 mb-3"
                width="200px"
              >
              <h4><b>Cuatro</b></h4>
              <!-- Botón para entrar al 2do menú -->
              <NuxtLink to="/cuerdas/4/cuatro" class="navbar-brand">
                <button
                  type="button"
                  class="btn btn-primary btn-lg btn-chords mt-2 mb-2"
                >
                  <span class="color-background-app">
                    <b>Presiona 1</b>
                  </span>
                </button>
              </NuxtLink>
              <!-- Final del botón para entrar al 2do menú -->
            </div>
          </div>
          <!-- Final de Cuatro -->
        </div>
        <div class="col-4 col-sm-4">
          <!-- Ukelele -->
          <div class="card main-card">
            <div class="card-body text-center text-white">
              <img
                src="/images/cuerdas/4/ukelele.png"
                alt="star"
                class="img-fluid mt-3 mb-3"
                width="200px"
              >
              <h4><b>Ukelele</b></h4>
              <!-- Botón para entrar al 2do menú -->
              <NuxtLink to="/cuerdas/4/ukelele" class="navbar-brand">
                <button
                  type="button"
                  class="btn btn-primary btn-lg btn-chords mt-2 mb-2"
                >
                  <span class="color-background-app">
                    <b>Presiona 2</b>
                  </span>
                </button>
              </NuxtLink>
              <!-- Final del botón para entrar al 2do menú -->
            </div>
          </div>
          <!-- Final de Ukelele -->
        </div>
        <div class="col-4 col-sm-4">
          <!-- Banjo -->
          <div class="card main-card">
            <div class="card-body text-center text-white">
              <img
                src="/images/cuerdas/4/banjo.png"
                alt="star"
                class="img-fluid mt-3 mb-3"
                width="200px"
              >
              <h4><b>Banjo</b></h4>
              <!-- Botón para entrar al 2do menú -->
              <NuxtLink to="/cuerdas/4/banjo" class="navbar-brand">
                <button
                  type="button"
                  class="btn btn-primary btn-lg btn-chords mt-2 mb-2"
                >
                  <span class="color-background-app">
                    <b>Presiona 3</b>
                  </span>
                </button>
              </NuxtLink>
              <!-- Final del botón para entrar al 2do menú -->
            </div>
          </div>
          <!-- Final de Banjo -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

// Título de la página
useHead({title: '4 Cuerdas'})

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

    if (response.data.order === 141) {
      navigateTo('/cuerdas/4/cuatro')
    } if (response.data.order === 142) {
      navigateTo('/cuerdas/4/ukelele')
    } if (response.data.order === 143) {
      navigateTo('/cuerdas/4/banjo')
    } if (response.data.order === 0 || response.data.order === '') {
      navigateTo('/')
    } else {
      console.log("Esperando orden...")
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