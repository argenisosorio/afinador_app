<template>
  <div class="mb-3">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="/">
          <span class="color-orange-app">
            <font-awesome-icon icon="fa-solid fa-music" />
          </span>
          <span class="text-white">
            Afinador de Instrumentos
          </span>
        </a>
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
            Inicio
          </span>
        </div>
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
