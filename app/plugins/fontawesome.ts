import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUser,
  faHouse,
  faArrowLeft,
  faMusic,
  faHandPointer
} from '@fortawesome/free-solid-svg-icons' // Importa los iconos que necesites

// Esto evita que FontAwesome inserte su propio CSS automáticamente, 
// permitiendo que Nuxt lo maneje mejor y evitando saltos visuales (FOUC).
config.autoAddCss = false

// Añade los iconos a la librería
library.add(faUser, faHouse, faArrowLeft, faMusic, faHandPointer)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})