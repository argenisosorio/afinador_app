<template>
  <div>
    <div class="card main-card">
      <div class="card-body text-center">
        <span class="color-orange-app note-icon-main">
          <font-awesome-icon icon="fa-solid fa-music" />
        </span>
        <h1 class="text-white">A-CORD-E</h1>
        <h4 class="text-white">Afinador de Instrumentos de Cuerdas</h4>
        <button type="button" class="btn btn-primary btn-lg btn-start-main">
          Presiona 1 para iniciar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Inicio'
})

const loader = useState('loader')

onMounted(() => {
  // Activar el loader
  loader.value = true
  // Desactivar el loader
  loader.value = false
})
</script>

<style scoped>
</style>