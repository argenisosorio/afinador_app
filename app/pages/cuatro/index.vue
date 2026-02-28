<template>
  <div>
    <h1><GoBack />Cuatro Venezolano</h1>

    <div class="text-center">
      <p>Nota A (LA) - Frecuencia ideal: 220 Hz</p>
    </div>
    
    <div class="tuner-container">
        <canvas ref="tunerCanvas" width="400" height="400" />
        <div class="frequency-display" :style="{ color: displayColor }">{{ currentFrequency.toFixed(1) }}</div>
        <div class="unit">Hz</div>
        <div class="note-name">A</div>
        <div class="tuning-status" :style="{ background: statusBg }">{{ tuningStatusText }}</div>
    </div>

    <div class="json-data-panel">
        <h3>Datos de prueba (JSON)</h3>
        <div class="json-input">
            <textarea v-model="jsonText" rows="8" placeholder="Pega aquí tu JSON..." />
            <button class="btn-json" @click="processCustomJSON">
                Procesar JSON
            </button>
            <button class="btn-json btn-random" @click="generateRandomFrequency">
                Generar aleatorio
            </button>
        </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

useHead({ title: 'Cuatro Venezolano' })

// --- ESTADO REACTIVO ---
const tunerCanvas = ref(null)
const currentFrequency = ref(220)
const jsonText = ref(JSON.stringify({
  "guitar_tuner": {
    "frequency": 219.3,
    "note": "A",
    "octave": 3,
    "accuracy": 0.87
  }
}, null, 2))

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
    
    ctx.clearRect(0, 0, 400, 400)
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

    // (Aquí iría el resto de tu lógica de dibujo de marcas y aguja usando ctx...)
    // Aguja
    const needleX = centerX + 120 * Math.cos(freqAngle)
    const needleY = centerY + 120 * Math.sin(freqAngle)
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(needleX, needleY)
    ctx.lineWidth = 4
    ctx.strokeStyle = '#2d3748'
    ctx.stroke()
}

// --- MÉTODOS ---
const updateFrequency = (freq) => {
    currentFrequency.value = Math.min(Math.max(freq, tunerConfig.minFrequency), tunerConfig.maxFrequency)
    drawTunerMeter(currentFrequency.value)
}

const processCustomJSON = () => {
    try {
        const data = JSON.parse(jsonText.value)
        const freq = data.guitar_tuner?.frequency || data.frequency || data.value
        if (freq) updateFrequency(freq)
    } catch (e) {
        alert('JSON inválido', e.message)
    }
}

const generateRandomFrequency = () => {
    const randomFreq = tunerConfig.minFrequency + (Math.random() * (tunerConfig.maxFrequency - tunerConfig.minFrequency))
    updateFrequency(randomFreq)
}

// Inicialización
onMounted(() => {
    updateFrequency(tunerConfig.targetFrequency)
})
</script>