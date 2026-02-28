<script setup>
// Usamos el router de Nuxt para acceder al historial de navegación
const router = useRouter()

const goBack = () => {
  // .back() funciona exactamente como el botón "atrás" del navegador
  router.back()
}
</script>

<template>
    <a href="#" class="btn-back" @click.prevent="goBack">
      <font-awesome-icon icon="fa-solid fa-arrow-left" />
    </a>
</template>

<style scoped>
.btn-back {
  display: inline-block;
  padding: 0.5rem 1rem;
  color: #000000;
  border-radius: 0.375rem;
  text-decoration: none;
}
</style>
