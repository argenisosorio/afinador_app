<template>
  <div class="mb-3">
    <nav class="navbar navbar-expand-lg border-bottom">
      <div class="container-fluid">
        <div class="navbar-nav flex-row">
          <NuxtLink class="nav-link me-3" to="/">
            <font-awesome-icon icon="fa-solid fa-house" />
            Inicio
          </NuxtLink>
          <NuxtLink class="nav-link" to="/cuatro">Cuatro Venezolano</NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
a {
  color: gray;
  text-decoration: none;
  font-weight: bold;
}

.router-link-active {
  color: blue !important;
}
</style>
