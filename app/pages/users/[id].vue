<template>
  <div>
    <GoBack />
    <div v-if="pending">Loading details...</div>
    
    <div v-else-if="error">
      <p>Error: User with ID: was not found {{ userId }}</p>
    </div>

    <div v-else>
      <h1>Profile from: {{ user.name }}</h1>
      <div >
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>City:</strong> {{ user.address?.city }}</p>
        <p><strong>Company:</strong> {{ user.company?.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'User detail',
})

// Obtenemos el ID desde la URL
const route = useRoute()
const userId = route.params.id

// Pedimos solo los datos de ese usuario específico
const { data: user, pending, error } = await useFetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
</script>

<style scoped>
</style>
