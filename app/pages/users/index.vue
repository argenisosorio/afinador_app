<template>
  <div>
    <GoBack />
    <h1>Users List</h1>

    <div v-if="error" class="alert alert-danger">
      Error al cargar usuarios. Inténtalo de nuevo.
    </div>

    <ul v-else>
      <li v-for="user in users_list" :key="user.id">
        {{ user.name }} 
        <NuxtLink :to="`/users/${user.id}`">Detail</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
// 1. Estado global para controlar el loader
const loader = useState('loader')

// 2. Configuramos el título de la página
useHead({
  title: 'Users',
})

// Simularemos una llamada a la API de Backend usando una API de prueba real
// 'pending' es un booleano reactivo que cambia automáticamente
const { data: response, pending, error } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  lazy: true
})

// 3. Mapeamos los resultados (JSONPlaceholder devuelve un Array directo)
const users_list = computed(() => response.value || [])

// 4. Observamos 'pending' y asignamos su valor directamente al loader
watch(pending, (newVal) => {
  loader.value = newVal
}, { immediate: true }) // immediate asegura que si empieza cargando, el loader se active de una vez
</script>
