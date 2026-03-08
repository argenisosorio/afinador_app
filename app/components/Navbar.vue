<template>
  <div class="mb-3">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <NuxtLink to="/" class="navbar-brand">
        <span class="color-orange-app">
          <font-awesome-icon icon="fa-solid fa-music" />
        </span>
        <span class="text-white">
          Afinador de Instrumentos
        </span>
      </NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"/>
      </button>
      <div id="navbarText" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"/>
        <span class="navbar-text text-white">
          <font-awesome-icon icon="fa-solid fa-house" />
          <b>Inicio</b>
        </span>
        <NuxtLink to="/" class="navbar-brand ms-3">
          <button
            type="button"
            class="btn btn-primary btn-lg btn-start-reload"
          >
            <span class="navbar-text text-white">
              <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" />
              <b class="ml-2">Reiniciar (Presiona 0)</b>
            </span>
          </button>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<style scoped>
a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
}

.router-link-active {
  color: blue !important;
}
</style>
