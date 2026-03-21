<template>
  <div class="poc-wrapper">
    <div class="poc-container">
      <header>
        <div class="header-title">
          <GoBack />
          <h1>Cuatro Venezolano</h1>
        </div>
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
const deviation = computed(() => currentFrequency.value - tunerConfig.targetFrequency)

const tuningStatusText = computed(() => {
  const absDev = Math.abs(deviation.value)
  if (absDev <= tunerConfig.tolerance) return '✓ AFINADO'
  if (absDev <= tunerConfig.warningRange) return deviation.value < 0 ? '↓ BAJO (b)' : '↑ ALTO (#)'
  return deviation.value < 0 ? '↓↓ MUY BAJO' : '↑↑ MUY ALTO'
})

const displayColor = computed(() => {
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
  const normalizedFreq = (frequency - tunerConfig.minFrequency) / frequencyRange
  const freqAngle = startAngle + normalizedFreq * (endAngle - startAngle)

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

  // Marca especial para 220 Hz (target)
  const targetAngle = startAngle + ((tunerConfig.targetFrequency - tunerConfig.minFrequency) / frequencyRange) * (endAngle - startAngle)

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
  ctx.strokeStyle = '#667eea'
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
    // $fetch devuelve los datos directamente, no un objeto { data, error }
    const response = await $fetch(`${apiBase}/`)

    if (response && response.data) {
      // Accedemos directamente a la respuesta
      const note = response.data.note
      const frequency = response.data.frequency

      // Actualizamos la variable note
      if (note) currentNote.value = note
      // Actualizamos la variable frequency
      if (frequency) updateFrequency(frequency)

      // Mapeo de frecuencias ideales para el Cuatro Venezolano
      const noteMap = {
        'A': 220, // La
        'D': 294, // Re
        'F': 370, // Fa#
        'B': 247, // Si
        '': ''
      }

      const target = noteMap[note]
      idealFrequency.value = target || ''

      // Lógica de Rangos Dinámicos (minFrequency y maxFrequency)
      if (target) {
        // Establecemos el margen visual del afinador (±10 Hz)
        minFrequency.value = target - 10
        maxFrequency.value = target + 10

        /* Actualizar el objeto tunerConfig para que el Canvas sepa cuáles son
         * los nuevos límites.
         */
        tunerConfig.targetFrequency = target
        tunerConfig.minFrequency = target - 10
        tunerConfig.maxFrequency = target + 10
      } if (target == '') {
        // Establecemos el margen visual del afinador (±10 Hz)
        tunerConfig.targetFrequency = target
        minFrequency.value = 0
        maxFrequency.value = 0
      }

      // Mapeo de nomenclaturas de notas.
      const nomenclature_noteMap = {
        'A': 'LA',
        'D': 'RE',
        'F': 'FA#',
        'B': 'SI',
        '': ''
      }

      /* Asignamos el valor del mapa a la frecuencia ideal o vacío si no existe
       * la nota.
       */
      idealFrequency.value = noteMap[note] || ''

      // Asignamos el valor del mapa o vacío si no existe la nota.
      nomenclatureNote.value = nomenclature_noteMap[note] || ''
    }
  } catch (e) {
    // Los errores en $fetch se capturan en el catch
    console.error('Error al conectar con la API:', e)
    console.log('Error al conectar con FastAPI. Revisa el CORS o la conexión.')
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
