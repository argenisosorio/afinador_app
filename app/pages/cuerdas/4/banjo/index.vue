<template>
  <div>
    <div class="text-center">
      <h1 class="text-center text-white mt-4 mb-4">
        <b>
          Futuro desarrollo...
        </b>
      </h1>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

// Título de la página
useHead({title: 'Banjo'})

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

    if (response.data.order === 0 || response.data.order === '0') {
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