<template>
  <div class="poc-wrapper">
    <div class="poc-container">
      <header>
        <div class="header-title">
          <GoBack />
          <h1>Cuatro Venezolano</h1>
        </div>
        <p class="subtitle">Nota A (LA) - Frecuencia ideal: 220 Hz</p>
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

      <div class="json-data-panel">
        <h3>Datos de prueba (JSON)</h3>
        <div class="json-input">
          <textarea 
            v-model="jsonText" 
            rows="8" 
            placeholder="Pega aquí tu JSON o carga desde la API..." 
          />
          <div class="button-group">
            <button
              class="btn-json"
              style="background: #667eea"
              @click="fetchTunerData"
            >
              Cargar de API
            </button>
            <button class="btn-json" @click="processCustomJSON">
              Procesar JSON
            </button>
            <button class="btn-json btn-random" @click="generateRandomFrequency">
              Generar aleatorio
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'

// Título de la página
useHead({ title: 'Cuatro Venezolano' })

// 1. Configuración de API (NUXT_PUBLIC_API_BASE en .env)
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

// --- ESTADO REACTIVO ---
const tunerCanvas = ref(null)
const currentFrequency = ref(220)
const jsonText = ref('')

const tunerConfig = {
  targetFrequency: 220,
  minFrequency: 210,
  maxFrequency: 230,
  tolerance: 0.5,
  warningRange: 3,
  majorTicks: 10
}

// --- COMPUTED PROPERTIES ---
const deviation = computed(() => currentFrequency.value - tunerConfig.targetFrequency)

const tuningStatusText = computed(() => {
  const absDev = Math.abs(deviation.value)
  if (absDev <= tunerConfig.tolerance) return '✓ AFINADO'
  if (absDev <= tunerConfig.warningRange) return deviation.value < 0 ? '↓ BAJO (b)' : '↑ ALTO (#)'
  return deviation.value < 0 ? '↓↓ MUY BAJO' : '↑↑ MUY ALTO'
})

const displayColor = computed(() => {
  const absDev = Math.abs(deviation.value)
  if (absDev <= tunerConfig.tolerance) return '#48bb78' // Verde
  if (absDev <= tunerConfig.warningRange) return '#f6ad55' // Naranja
  return '#f56565' // Rojo
})

const statusBg = computed(() => displayColor.value)

// --- LÓGICA DE LA API ---
const fetchTunerData = async () => {
  try {
    // Realiza la petición al endpoint de FastAPI
    const { data, error } = await useFetch(`${apiBase}/`)
    
    if (error.value) {
      console.error('Error al conectar con la API:', error.value)
      console.log('Error al conectar con FastAPI. Revisa el CORS.')
      return
    }

    if (data.value) {
      // Actualiza el editor de texto y la frecuencia
      jsonText.value = JSON.stringify(data.value, null, 2)
      const freq = data.value.guitar_tuner?.frequency || data.value.frequency
      if (freq) updateFrequency(freq)
    }
  } catch (e) {
    console.error('Error en fetch:', e)
  }
}

// --- LÓGICA DEL CANVAS ---
function drawTunerMeter(frequency) {
  const canvas = tunerCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, 400, 480)
  const centerX = 200, centerY = 200, radius = 160
  const startAngle = Math.PI * 0.75, endAngle = Math.PI * 2.25

  // Arco de fondo (Gris)
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, startAngle, endAngle)
  ctx.lineWidth = 25
  ctx.strokeStyle = '#e2e8f0'
  ctx.stroke()

  // Arco de progreso (Color dinámico)
  const frequencyRange = tunerConfig.maxFrequency - tunerConfig.minFrequency
  const normalizedFreq = (frequency - tunerConfig.minFrequency) / frequencyRange
  const freqAngle = startAngle + normalizedFreq * (endAngle - startAngle)

  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, startAngle, freqAngle)
  ctx.lineWidth = 25
  ctx.strokeStyle = displayColor.value
  ctx.stroke()

  // Dibujar marcas (Ticks)
  ctx.lineWidth = 2
  ctx.strokeStyle = '#718096'
  ctx.font = 'bold 10px Arial'
  ctx.textAlign = 'center'

  for (let i = 0; i <= tunerConfig.majorTicks; i++) {
    const tickFreq = tunerConfig.minFrequency + (i * (frequencyRange / tunerConfig.majorTicks))
    const tickAngle = startAngle + (i / tunerConfig.majorTicks) * (endAngle - startAngle)

    ctx.beginPath()
    ctx.moveTo(centerX + (radius - 15) * Math.cos(tickAngle), centerY + (radius - 15) * Math.sin(tickAngle))
    ctx.lineTo(centerX + (radius - 30) * Math.cos(tickAngle), centerY + (radius - 30) * Math.sin(tickAngle))
    ctx.stroke()

    ctx.fillStyle = '#4a5568'
    ctx.fillText(Math.round(tickFreq), centerX + (radius - 45) * Math.cos(tickAngle), centerY + (radius - 45) * Math.sin(tickAngle))
  }

  // Aguja principal
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

// --- MÉTODOS ---
const updateFrequency = (freq) => {
  currentFrequency.value = Math.min(Math.max(freq, tunerConfig.minFrequency), tunerConfig.maxFrequency)
}

const processCustomJSON = () => {
  try {
    const data = JSON.parse(jsonText.value)
    const freq = data.guitar_tuner?.frequency || data.frequency || data.value
    if (freq) updateFrequency(freq)
    else console.log('No se encontró una frecuencia válida')
  } catch (e) {
    console.error('JSON inválido:', e)
  }
}

const generateRandomFrequency = () => {
  const randomFreq = tunerConfig.minFrequency + (Math.random() * (tunerConfig.maxFrequency - tunerConfig.minFrequency))
  updateFrequency(randomFreq)
}

// --- CICLO DE VIDA ---
onMounted(() => {
  drawTunerMeter(currentFrequency.value)
  fetchTunerData() // Carga automática inicial
})

// Observador para redibujar el canvas cuando cambie la frecuencia
watch(currentFrequency, (newFreq) => {
  drawTunerMeter(newFreq)
})
</script>
