<template>
  <div>
    <div class="card main-card">
      <div class="card-body text-center">
        <span class="color-orange-app note-icon-main">
          <font-awesome-icon icon="fa-solid fa-music" class="mt-4" />
        </span>
        <h1 class="text-white"><b>A-CORD-E</b></h1>
        <h4 class="text-lightgray mt-4">Afinador de Instrumentos de Cuerdas</h4>
        <!-- Botón para entrar al menú -->
        <NuxtLink to="/cuerdas" class="navbar-brand">
          <button
            type="button"
            class="btn btn-primary btn-lg btn-start-main mt-4 mb-4"
          >
            <font-awesome-icon
              icon="fa-solid fa-hand-pointer"
              class="color-orange-app"
            />
            <b>Presiona <span class="color-orange-app">1</span> para iniciar</b>
          </button>
        </NuxtLink>
        <!-- Final del botón para entrar al menú -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

// Título de la página
useHead({title: 'Inicio'})

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

    if (response.data.order === 1 || response.data.order === '1') {
      navigateTo('/cuerdas')
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