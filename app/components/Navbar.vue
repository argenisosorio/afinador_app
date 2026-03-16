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
        <nav aria-label="breadcrumb" class="navbar-text mb-0 mt-2 mt-lg-0 me-3">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <NuxtLink to="/" class="text-white text-decoration-none">
                <font-awesome-icon icon="fa-solid fa-house" />
                <b class="ms-1">Inicio</b>
              </NuxtLink>
            </li>
            <li
              v-for="(crumb, index) in breadcrumbs"
              :key="index" class="breadcrumb-item"
            >
              <NuxtLink
                v-if="index !== breadcrumbs.length - 1"
                :to="crumb.to" class="text-white text-decoration-none"
              >
                <b>{{ crumb.label }}</b>
              </NuxtLink>
              <b v-else class="text-white-50" aria-current="page">
                {{ crumb.label }}
              </b>
            </li>
          </ol>
        </nav>
        <NuxtLink to="/" class="navbar-brand ms-3">
          <button
            type="button"
            class="btn btn-primary btn-lg btn-start-reload"
          >
            <span class="navbar-text text-white">
              <span class="color-orange-app icon-fa-arrow-rotate-right">
                <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" />
              </span>
              <b class="ml-2">Reiniciar (Presiona 0)</b>
            </span>
          </button>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

/* Propiedad computada que genera la ruta del breadcrumb y la etiqueta a mostrar
*  en función de la URL actual.
*/
const breadcrumbs = computed(() => {
  // Obtenemos los segmentos de la URL actual
  const pathArray = route.path.split('/').filter(p => p)
  const crumbs = []
  let path = ''

  // Iteramos sobre cada segmento para construir la ruta y la etiqueta
  pathArray.forEach((segment) => {
    path += `/${segment}`
    // Reemplazamos guiones por espacios y capitalizamos la primera letra
    let label = segment.replace(/-/g, ' ')
    label = label.charAt(0).toUpperCase() + label.slice(1)

    // Mapeo especial para mostrar "Instrumentos de Cuerdas" en vez de "Cuerdas"
    if (label === 'Cuerdas') {
        label = 'Instrumentos de Cuerdas'
    }

    // Agregamos el objeto de breadcrumb al array.
    crumbs.push({
      to: path,
      label: label
    })
  })

  return crumbs
})
</script>
