<template>
  <div class="poc-wrapper">
    <div class="poc-container">
      <header>
        <div class="header-title">
          <GoBack />
          <h1>Cuatro Venezolano</h1>
        </div>
        <!-- tunerConfig.targetFrequency es reactivo, se actualizará automáticamente si cambia su valor -->
        <p class="subtitle">Nota A (LA) - Frecuencia ideal: {{ tunerConfig.targetFrequency }} Hz</p>
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
import { ref, reactive, onMounted, onUnmounted, computed, watch } from 'vue'

// Título de la página
useHead({ title: 'Cuatro Venezolano' })

let timer = null;

// Configuración de API (NUXT_PUBLIC_API_BASE en .env)
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

// --- ESTADO REACTIVO ---
const tunerCanvas = ref(null)
const currentFrequency = ref(210)
const jsonText = ref('')

// tunerConfig es un objeto reactivo. Al usar reactive(), Vue rastreará
// los cambios en cualquiera de sus propiedades (como targetFrequency)
// y actualizará automáticamente la interfaz de usuario donde se utilicen.
const tunerConfig = reactive({
  targetFrequency: 220,
  minFrequency: 210,
  maxFrequency: 230,
  tolerance: 0.5,
  warningRange: 3,
  majorTicks: 10
})

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
  currentFrequency.value = Math.min(Math.max(freq, tunerConfig.minFrequency), tunerConfig.maxFrequency)
}

// Función para obtener datos del endpoint de FastAPI.
const fetchTunerData = async () => {
  try {
    // $fetch devuelve los datos directamente, no un objeto { data, error }
    const response = await $fetch(`${apiBase}/`)

    if (response) {
      // Actualiza el editor de texto y la frecuencia
      jsonText.value = JSON.stringify(response, null, 2)

      // Accedemos directamente a la respuesta
      const freq = response.data?.frequency || response.frequency
      if (freq) updateFrequency(freq)
    }
  } catch (e) {
    // Los errores en $fetch se capturan en el catch
    console.error('Error al conectar con la API:', e)
    console.log('Error al conectar con FastAPI. Revisa el CORS o la conexión.')
  }
}

// Función que maneja el "Short Polling" recursivo (setTimeout en lugar de setInterval).
// A diferencia de setInterval, esto asegura que la próxima petición solo se programe
// UNA VEZ que la petición HTTP actual haya terminado, evitando la saturación y
// acumulación de llamadas en la red si el servidor de FastAPI tarda en responder.
const pollData = async () => {
  await fetchTunerData() // Esperamos a que la petición termine y procese los datos
  timer = setTimeout(pollData, 500) // Se programa la siguiente llamada en 500ms
}

// Inicialización
onMounted(() => {
  drawTunerMeter(currentFrequency.value)
  // Iniciamos el ciclo recursivo
  pollData()
})

onUnmounted(() => {
  // Limpiamos el temporizador pendiente al salir del componente
  // para evitar peticiones "fantasma" en el fondo y ahorrar en memoria.
  if (timer) clearTimeout(timer);
});
</script>
