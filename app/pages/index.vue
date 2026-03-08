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
