<template>
  <div class="container">
    <h1 class="text-center text-white mt-4 mb-3">
      <span class="color-orange-app">
        Toca una cuerda
      </span>
      en tu instrumento
    </h1>
    <h5 class="text-lightgray text-center mt-4 mb-5">
      Toca la cuerda de tu elección y observa cómo se afina automáticamente
    </h5>
    <div class="row mb-4 mt-4">
      <div class="col-6 col-sm-6">
        <div class="card main-card">
          <div class="card-body text-center text-white">
            <button
              type="button"
              class="btn btn-primary btn-lg btn-start-detect mt-4"
            >
              <div v-if="currentNote === ''">
                <span class="text-lightgray">
                  <font-awesome-icon icon="fa-solid fa-music" />
                  No se ha detectado una cuerda
                </span>
              </div>

              <div v-else>
                <span class="text-white">
                  <span class="color-orange-app">
                    <font-awesome-icon icon="fa-solid fa-music" />
                  </span>
                  Nota: {{ currentNote }} ({{ nomenclatureNote }})
                </span>
                <br>
                <span class="text-white">
                  Cuerda detectada
                </span>
              </div>
            </button>
            <div>
              <img
                src="/images/cuerdas/4/cuatro/cuerdas_cuatro/Cuatro_Inactivo.png"
                alt="star"
                class="img-fluid mt-3 mb-3"
                width="70%"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-sm-6">
        <div class="card main-card">
          <div class="card-body text-center text-white">
            <div class="poc-wrapper">
              <div class="poc-container">
                <header>
                  <p class="subtitle">Nota: {{ currentNote }} ({{ nomenclatureNote }})</p>
                  <p class="subtitle">Frecuencia ideal: {{ idealFrequency }} Hz</p>
                  <p class="subtitle">Rango min. de frecuencia: {{ minFrequency }} Hz</p>
                  <p class="subtitle">Rango max. de frecuencia: {{ maxFrequency }} Hz</p>
                  <p class="subtitle">Frecuencia actual: {{ currentFrequency }} Hz</p>
                </header>

                <div class="tuner-container">
                  <canvas ref="tunerCanvas" width="400" height="480" />
                  <div class="frequency-display" :style="{ color: displayColor }">
                    {{ currentFrequency.toFixed(1) }} <span class="unit-text">Hz</span>
                  </div>
                  <div class="note-name">A</div>
                  <div class="tuning-status" :style="{ background: statusBg }">
                    {{ tuningStatusText }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Botón para ir a inicio -->
    <div class="text-center">
      <NuxtLink to="/" class="navbar-brand">
        <button
          type="button"
          class="btn btn-primary btn-lg btn-start-main mt-4 mb-4"
        >
          <font-awesome-icon
            icon="fa-solid fa-hand-pointer"
            class="color-orange-app"
          />
          <b>
            Presiona <span class="color-orange-app">0</span> en tu teclado para
            <span class="color-orange-app">volver a inicio</span>
          </b>
        </button>
      </NuxtLink>
    </div>
    <!-- Final del botón para ir a inicio -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

// Título de la página
useHead({ title: 'Cuatro' })

let timer = null;

// Configuración de API (NUXT_PUBLIC_API_BASE en .env)
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

// --- ESTADO REACTIVO ---
const tunerCanvas = ref(null)
const currentNote = ref('')
const nomenclatureNote = ref('')
const currentFrequency = ref(0)
const idealFrequency = ref(0)
const minFrequency = ref(0)
const maxFrequency = ref(0)

const tunerConfig = {
  targetFrequency: 220,
  minFrequency: 210,
  maxFrequency: 230,
  tolerance: 0.5,
  warningRange: 3,
  majorTicks: 10
}

// --- COMPUTED PROPERTIES (Lógica visual) ---
const deviation = computed(() => {
  // Si no hay nota o frecuencia, la desviación es 0 para reposo
  if (!currentNote.value || currentFrequency.value === 0) return 0
  return currentFrequency.value - tunerConfig.targetFrequency
})

const tuningStatusText = computed(() => {
  if (!currentNote.value) return 'EN ESPERA...'
  const absDev = Math.abs(deviation.value)
  if (absDev <= tunerConfig.tolerance) return '✓ AFINADO'
  if (absDev <= tunerConfig.warningRange) return deviation.value < 0 ? '↓ BAJO (b)' : '↑ ALTO (#)'
  return deviation.value < 0 ? '↓↓ MUY BAJO' : '↑↑ MUY ALTO'
})

const displayColor = computed(() => {
  if (!currentNote.value) return '#718096' // Color neutro en reposo
  const absDev = Math.abs(deviation.value)
  if (absDev <= tunerConfig.tolerance) return '#48bb78'
  if (absDev <= tunerConfig.warningRange) return '#f6ad55'
  return '#f56565'
})

const statusBg = computed(() => displayColor.value)

// --- LÓGICA DEL CANVAS ---
function drawTunerMeter(frequency) {
  const canvas = tunerCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, 400, 480)
  const centerX = 200, centerY = 200, radius = 160
  const startAngle = Math.PI * 0.75, endAngle = Math.PI * 2.25

  // Arco fondo
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, startAngle, endAngle)
  ctx.lineWidth = 25
  ctx.strokeStyle = '#e2e8f0'
  ctx.stroke()

  // Arco frecuencia
  const frequencyRange = tunerConfig.maxFrequency - tunerConfig.minFrequency
  // Evitar división por cero si el rango es 0
  const safeRange = frequencyRange === 0 ? 1 : frequencyRange
  const normalizedFreq = (frequency - tunerConfig.minFrequency) / safeRange

  // Limitar el ángulo para que la aguja no de vueltas locas en reposo
  const constrainedFreq = Math.max(0, Math.min(1, normalizedFreq))
  const freqAngle = startAngle + constrainedFreq * (endAngle - startAngle)

  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, startAngle, freqAngle)
  ctx.lineWidth = 25
  ctx.strokeStyle = displayColor.value
  ctx.stroke()

  // Dibujar marcas de frecuencia
  ctx.lineWidth = 2
  ctx.strokeStyle = '#718096'
  ctx.fillStyle = '#4a5568'
  ctx.font = 'bold 10px Arial'
  ctx.textAlign = 'center'

  for (let i = 0; i <= tunerConfig.majorTicks; i++) {
    const tickFreq = tunerConfig.minFrequency + (i * (frequencyRange / tunerConfig.majorTicks))
    const tickAngle = startAngle + (i / tunerConfig.majorTicks) * (endAngle - startAngle)

    ctx.beginPath()
    ctx.moveTo(
      centerX + (radius - 15) * Math.cos(tickAngle),
      centerY + (radius - 15) * Math.sin(tickAngle)
    )
    ctx.lineTo(
      centerX + (radius - 30) * Math.cos(tickAngle),
      centerY + (radius - 30) * Math.sin(tickAngle)
    )
    ctx.stroke()

    ctx.fillStyle = '#4a5568'
    ctx.fillText(
      Math.round(tickFreq),
      centerX + (radius - 45) * Math.cos(tickAngle),
      centerY + (radius - 45) * Math.sin(tickAngle)
    )
  }

  // Marca especial para el target
  const targetAngle = startAngle + ((tunerConfig.targetFrequency - tunerConfig.minFrequency) / safeRange) * (endAngle - startAngle)

  ctx.beginPath()
  ctx.moveTo(
    centerX + (radius - 15) * Math.cos(targetAngle),
    centerY + (radius - 15) * Math.sin(targetAngle)
  )
  ctx.lineTo(
    centerX + (radius - 40) * Math.cos(targetAngle),
    centerY + (radius - 40) * Math.sin(targetAngle)
  )
  ctx.lineWidth = 3
  ctx.strokeStyle = currentNote.value ? '#667eea' : 'transparent'
  ctx.stroke()

  // Aguja
  const needleX = centerX + 120 * Math.cos(freqAngle)
  const needleY = centerY + 120 * Math.sin(freqAngle)
  ctx.beginPath()
  ctx.moveTo(centerX, centerY)
  ctx.lineTo(needleX, needleY)
  ctx.lineWidth = 4
  ctx.strokeStyle = '#2d3748'
  ctx.stroke()

  // Círculo central
  ctx.beginPath()
  ctx.arc(centerX, centerY, 15, 0, Math.PI * 2)
  ctx.fillStyle = displayColor.value
  ctx.fill()
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 3
  ctx.stroke()
}

watch(currentFrequency, (newFreq) => {
  drawTunerMeter(newFreq)
})

// --- MÉTODOS ---

const updateFrequency = (freq) => {
  currentFrequency.value = Math.min(Math.max(freq, tunerConfig.minFrequency),
    tunerConfig.maxFrequency)
}

// Función para obtener datos del endpoint de FastAPI.
const readAPI = async () => {
  try {
    const response = await $fetch(`${apiBase}/`)

    if (response && response.data) {

      // Si orden es 0 volver al inicio de la app.
      if (response.data.order === 0 || response.data.order === '0') {
        navigateTo('/')
      }

      const note = response.data.note
      const frequency = response.data.frequency

      // Lógica de "Reposo": Si no hay nota o frecuencia, reseteamos a 0
      if (!note || !frequency) {
        currentNote.value = ''
        currentFrequency.value = 0
        nomenclatureNote.value = ''
        idealFrequency.value = 0
        minFrequency.value = 0
        maxFrequency.value = 0
        // Reseteamos config para que el dibujo se mantenga en el inicio
        tunerConfig.minFrequency = 0
        tunerConfig.maxFrequency = 100
        tunerConfig.targetFrequency = 0
        drawTunerMeter(0)
        return // Salimos de la función
      }

      // Si hay datos, procedemos con la actualización normal
      currentNote.value = note
      updateFrequency(frequency)

      // Mapeo de frecuencias ideales para el Cuatro Venezolano
      const noteMap = {
        'A': 220, // La
        'D': 294, // Re
        'F': 370, // Fa#
        'B': 247, // Si
      }

      const target = noteMap[note] || 0
      idealFrequency.value = target

      if (target) {
        minFrequency.value = target - 10
        maxFrequency.value = target + 10

        tunerConfig.targetFrequency = target
        tunerConfig.minFrequency = target - 10
        tunerConfig.maxFrequency = target + 10
      }

      // Mapeo de nomenclaturas de notas.
      const nomenclature_noteMap = {
        'A': 'LA',
        'D': 'RE',
        'F': 'FA#',
        'B': 'SI',
      }

      // Asignamos el valor del mapa o vacío si no existe la nota.
      nomenclatureNote.value = nomenclature_noteMap[note] || ''
    }
  } catch (e) {
    console.error('Error al conectar con la API:', e)
  }
}

// Inicialización
onMounted(() => {
  drawTunerMeter(currentFrequency.value)
  // Carga automática inicial de readAPI
  readAPI()
  // Iniciamos el ciclo de 0.5 segundos para actualizar la frecuencia
  timer = setInterval(readAPI, 500);
})

onUnmounted(() => {
  // Limpiamos el intervalo al salir del componente
  if (timer) clearInterval(timer);
});
</script>