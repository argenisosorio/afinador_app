<template>
  <div>
    <!-- El loader se muestra condicionalmente según el estado global 'loader' -->
    <Loader v-if="loader" />
    <!-- Aplicamos flex de columna y altura mínima del 100% de la ventana (min-vh-100) para poder centrar -->
    <div class="container d-flex flex-column min-vh-100">
      <Navbar />
      <!-- flex-grow-1 empuja el Header hacia arriba y el Footer hacia abajo. -->
      <!-- d-flex y justify-content-center centran el componente `<NuxtPage>` verticalmente en el centro -->
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
