<template>
  <div class="mb-3">
    <nav class="navbar navbar-expand-lg border-bottom">
      <div class="container-fluid">
        <div class="navbar-nav flex-row">
          <NuxtLink class="nav-link me-3" to="/">Home</NuxtLink>
          <NuxtLink class="nav-link" to="/users">Users</NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
a {
  color: red;
  text-decoration: none;
  font-weight: bold;
}

.router-link-active {
  color: #00dc82 !important;
  text-decoration: underline;
}
</style>