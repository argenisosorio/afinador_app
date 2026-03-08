<template>
  <div>
    <div class="text-center">
      <h1 class="text-center text-white mt-4 mb-4">
        <b>
          ¿Cuántas <span class="color-orange-app">cuerdas</span> tiene tu
          instrumento?
        </b>
      </h1>
      <h4 class="text-lightgray mt-4 mb-4">
        Selecciona el número de cuerdas para afinar tu instrumento musical
      </h4>
    </div>
    <div class="container">
      <!-- Columnas para mostrar las opciones de cuerdas -->
      <div class="row">
        <div class="col-4 col-sm-4">
          <div class="card main-card">
            <div class="card-body text-center text-white">
              <img
                src="/images/cuerdas/4.png"
                alt="star"
                class="img-fluid mt-3 mb-3"
                width="200px"
              >
              <h4><b>4 Cuerdas</b></h4>
              <!-- Botón para entrar al 2do menú -->
              <button
                type="button"
                class="btn btn-primary btn-lg btn-start-main mt-2 mb-2"
              >
                <font-awesome-icon
                  icon="fa-solid fa-hand-pointer"
                  class="color-orange-app"
                />
                Presiona <span class="color-orange-app"><b>4</b></span>
              </button>
              <!-- Final del botón para entrar al 2do menú -->
            </div>
          </div>
        </div>
        <div class="col-4 col-sm-4">
          <div class="card main-card">
            <div class="card-body text-center text-white">
              <img
                src="/images/cuerdas/6.png"
                alt="star"
                class="img-fluid mt-3 mb-3"
                width="200px"
              >
              <h4><b>6 Cuerdas</b></h4>
              <!-- Botón para entrar al 2do menú -->
              <button
                type="button"
                class="btn btn-primary btn-lg btn-start-main mt-2 mb-2"
              >
                <font-awesome-icon
                  icon="fa-solid fa-hand-pointer"
                  class="color-orange-app"
                />
                Presiona <span class="color-orange-app"><b>6</b></span>
              </button>
              <!-- Final del botón para entrar al 2do menú -->
            </div>
          </div>
        </div>
        <div class="col-4 col-sm-4">
          <div class="card main-card">
            <div class="card-body text-center text-white">
              <img
                src="/images/cuerdas/8.png"
                alt="star"
                class="img-fluid mt-3 mb-3"
                width="200px"
              >
              <h4><b>8 Cuerdas</b></h4>
              <!-- Botón para entrar al 2do menú -->
              <button
                type="button"
                class="btn btn-primary btn-lg btn-start-main mt-2 mb-2"
              >
                <font-awesome-icon
                  icon="fa-solid fa-hand-pointer"
                  class="color-orange-app"
                />
                Presiona <span class="color-orange-app"><b>8</b></span>
              </button>
              <!-- Final del botón para entrar al 2do menú -->
            </div>
          </div>
        </div>
      </div>
      <!-- Final de las columnas para mostrar las opciones de cuerdas -->
      <div class="text-center mt-2">
        <!-- Botón para entrar al menú -->
        <button
          type="button"
          class="btn btn-primary btn-lg btn-start-main mt-4 mb-5 "
        >
          <font-awesome-icon
            icon="fa-solid fa-hand-pointer"
            class="color-orange-app"
          />
          <b>Presiona <span class="color-orange-app">4, 5 o 8</span> en tu teclado</b>
        </button>
        <!-- Final del botón para entrar al menú -->
      </div>
    </div>
    
  </div>
</template>

<script setup>
useHead({
  title: 'Cuerdas'
})
</script>
