<template>
  <div>
    <h1>Afinador de Cuerdas Automático</h1>
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
