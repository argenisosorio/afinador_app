<template>
  <div>
    <!-- El loader se muestra condicionalmente según el estado global 'loader' -->
    <Loader v-if="loader" />
    <div class="container d-flex flex-column min-vh-100">
      <Navbar />
      <main class="flex-grow-1 d-flex flex-column justify-content-center">
        <NuxtPage />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
/* Estado global para controlar la visibilidad del loader
 * Inicialmente el loader no está visible
*/
const loader = useState('loader', () => false)
</script>
