<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Atom, ArrowLeft, Zap, Droplets, Wind, FlaskConical } from 'lucide-vue-next'

const router = useRouter()

const co2Level = ref(95)
const oxygenLevel = ref(5)
const carbonCollected = ref(0)
const experimentsRun = ref(0)

const isExtracting = ref(false)
const extractionProgress = ref(0)

const wasteItems = ref([
  { id: 1, name: 'EVA Cargo Bag', type: 'eva', carbonContent: 15, processed: false, icon: '🎒' },
  { id: 2, name: 'Filter Mesh', type: 'filter', carbonContent: 5, processed: false, icon: '🕸️' },
  { id: 3, name: 'Nitrile Gloves', type: 'glove', carbonContent: 3, processed: false, icon: '🧤' },
  { id: 4, name: 'Resealable Bags', type: 'bag', carbonContent: 4, processed: false, icon: '📦' },
  { id: 5, name: 'Carbon Fiber Scraps', type: 'composite', carbonContent: 20, processed: false, icon: '🧵' },
  { id: 6, name: 'Bubble Wrap', type: 'plastic', carbonContent: 2, processed: false, icon: '🫧' }
])

const products = ref([
  {
    id: 'filter',
    name: 'Air Filter System',
    carbonNeeded: 10,
    wasteTypes: ['filter', 'eva'],
    created: false,
    icon: '💨',
    benefit: 'Purifies habitat air'
  },
  {
    id: 'tools',
    name: 'Carbon Tools Set',
    carbonNeeded: 25,
    wasteTypes: ['composite', 'eva'],
    created: false,
    icon: '🔧',
    benefit: 'Durable maintenance tools'
  },
  {
    id: 'container',
    name: 'Lab Container',
    carbonNeeded: 15,
    wasteTypes: ['bag', 'glove'],
    created: false,
    icon: '🧪',
    benefit: 'Secure sample storage'
  },
  {
    id: 'shield',
    name: 'Radiation Shield',
    carbonNeeded: 30,
    wasteTypes: ['composite', 'filter'],
    created: false,
    icon: '🛡️',
    benefit: 'Protects sensitive equipment'
  }
])

const extractOxygen = () => {
  if (isExtracting.value) return
  
  isExtracting.value = true
  extractionProgress.value = 0
  
  const interval = setInterval(() => {
    extractionProgress.value += 2
    
    if (extractionProgress.value >= 100) {
      clearInterval(interval)
      
      // Update levels
      co2Level.value = Math.max(0, co2Level.value - 10)
      oxygenLevel.value = Math.min(100, oxygenLevel.value + 8)
      carbonCollected.value += 5
      experimentsRun.value += 1
      
      isExtracting.value = false
      extractionProgress.value = 0
    }
  }, 50)
}

const processWaste = (item) => {
  if (!item.processed) {
    item.processed = true
    carbonCollected.value += item.carbonContent
  }
}

const createProduct = (product) => {
  if (product.created) return
  
  const hasCarbon = carbonCollected.value >= product.carbonNeeded
  const hasWaste = product.wasteTypes.every(type =>
    wasteItems.value.some(w => w.type === type && w.processed)
  )
  
  if (hasCarbon && hasWaste) {
    product.created = true
    carbonCollected.value -= product.carbonNeeded
  }
}

const canCreateProduct = (product) => {
  const hasCarbon = carbonCollected.value >= product.carbonNeeded
  const hasWaste = product.wasteTypes.every(type =>
    wasteItems.value.some(w => w.type === type && w.processed)
  )
  return hasCarbon && hasWaste && !product.created
}

const totalProductsCreated = computed(() => {
  return products.value.filter(p => p.created).length
})

const atmosphereQuality = computed(() => {
  if (oxygenLevel.value >= 20) return { label: 'Excellent', color: 'text-green-400' }
  if (oxygenLevel.value >= 10) return { label: 'Good', color: 'text-blue-400' }
  return { label: 'Needs Work', color: 'text-yellow-400' }
})
</script>

<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Header -->
    <section class="relative py-12 px-6 bg-gradient-to-b from-blue-950/30 to-black border-b border-white/10">
      <div class="max-w-7xl mx-auto">
        <button
          @click="router.push('/scenarios')"
          class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft :size="20" />
          Back to Scenarios
        </button>

        <div class="flex items-start gap-6">
          <div class="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600">
            <Atom :size="48" />
          </div>
          <div class="flex-1">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Daring Discoveries</h1>
            <p class="text-xl text-gray-400 mb-4">
              Your oxygen extraction experiments are complete. Now you have surplus carbon and EVA waste. 
              Let's put them to good use!
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Dashboard -->
    <section class="py-8 px-6 bg-gradient-to-b from-black to-blue-950/10">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-4 gap-6">
          <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div class="flex items-center gap-3 mb-2">
              <Wind :size="20" class="text-red-400" />
              <span class="text-sm text-gray-400">CO₂ Level</span>
            </div>
            <div class="text-3xl font-bold text-red-400">{{ co2Level }}%</div>
            <div class="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                class="h-full bg-red-500 transition-all duration-500"
                :style="{ width: co2Level + '%' }"
              />
            </div>
          </div>

          <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div class="flex items-center gap-3 mb-2">
              <Zap :size="20" class="text-blue-400" />
              <span class="text-sm text-gray-400">O₂ Level</span>
            </div>
            <div :class="['text-3xl font-bold', atmosphereQuality.color]">{{ oxygenLevel }}%</div>
            <div class="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                class="h-full bg-blue-500 transition-all duration-500"
                :style="{ width: oxygenLevel + '%' }"
              />
            </div>
          </div>

          <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div class="flex items-center gap-3 mb-2">
              <FlaskConical :size="20" class="text-purple-400" />
              <span class="text-sm text-gray-400">Carbon Collected</span>
            </div>
            <div class="text-3xl font-bold text-purple-400">{{ carbonCollected }} kg</div>
            <div class="text-xs text-gray-500 mt-2">From {{ experimentsRun }} experiments</div>
          </div>

          <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div class="flex items-center gap-3 mb-2">
              <Atom :size="20" class="text-cyan-400" />
              <span class="text-sm text-gray-400">Products Created</span>
            </div>
            <div class="text-3xl font-bold text-cyan-400">{{ totalProductsCreated }}/{{ products.length }}</div>
            <div class="text-xs text-gray-500 mt-2">Research progress</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Left: Oxygen Extraction -->
          <div class="lg:col-span-1">
            <h2 class="text-2xl font-bold mb-4">O₂ Extraction Lab</h2>
            <p class="text-sm text-gray-400 mb-6">Extract oxygen from Mars atmosphere (95% CO₂)</p>

            <div class="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-2xl p-6 mb-6">
              <div class="text-center mb-6">
                <div class="text-6xl mb-4">🔬</div>
                <div class="text-sm text-gray-400 mb-2">Atmosphere Quality</div>
                <div :class="['text-2xl font-bold', atmosphereQuality.color]">
                  {{ atmosphereQuality.label }}
                </div>
              </div>

              <button
                @click="extractOxygen"
                :disabled="isExtracting"
                :class="[
                  'w-full px-6 py-4 rounded-xl font-semibold transition-all duration-300',
                  isExtracting
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:scale-105 shadow-xl shadow-blue-500/50'
                ]"
              >
                {{ isExtracting ? 'Extracting...' : 'Run Extraction' }}
              </button>

              <div v-if="isExtracting" class="mt-4">
                <div class="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-100"
                    :style="{ width: extractionProgress + '%' }"
                  />
                </div>
                <p class="text-xs text-center text-gray-400 mt-2">Processing... {{ extractionProgress }}%</p>
              </div>

              <div class="mt-6 space-y-2 text-sm">
                <div class="flex justify-between text-gray-400">
                  <span>CO₂ Reduced:</span>
                  <span class="text-red-400">-10%</span>
                </div>
                <div class="flex justify-between text-gray-400">
                  <span>O₂ Produced:</span>
                  <span class="text-blue-400">+8%</span>
                </div>
                <div class="flex justify-between text-gray-400">
                  <span>Carbon Surplus:</span>
                  <span class="text-purple-400">+5 kg</span>
                </div>
              </div>
            </div>

            <!-- Waste Processing -->
            <h3 class="text-xl font-bold mb-4">Process Lab Waste</h3>
            <p class="text-sm text-gray-400 mb-4">Extract carbon from experimental waste</p>

            <div class="space-y-3">
              <div
                v-for="item in wasteItems"
                :key="item.id"
                @click="processWaste(item)"
                :class="[
                  'p-4 rounded-xl border-2 transition-all duration-300',
                  item.processed
                    ? 'bg-purple-500/20 border-purple-500 opacity-60'
                    : 'bg-white/5 border-white/10 hover:border-cyan-500 cursor-pointer hover:scale-105'
                ]"
              >
                <div class="flex items-center gap-3">
                  <div class="text-3xl">{{ item.icon }}</div>
                  <div class="flex-1">
                    <div class="font-semibold">{{ item.name }}</div>
                    <div class="text-xs text-gray-400">{{ item.type }} • {{ item.carbonContent }} kg carbon</div>
                  </div>
                  <div v-if="item.processed" class="text-green-400">✓</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Middle: Products -->
          <div class="lg:col-span-2">
            <h2 class="text-2xl font-bold mb-4">Create Products</h2>
            <p class="text-sm text-gray-400 mb-6">Use carbon and processed waste to manufacture new items</p>

            <div class="grid md:grid-cols-2 gap-6">
              <div
                v-for="product in products"
                :key="product.id"
                @click="createProduct(product)"
                :class="[
                  'p-6 rounded-2xl border-2 transition-all duration-300',
                  product.created
                    ? 'bg-green-500/20 border-green-500'
                    : canCreateProduct(product)
                    ? 'bg-cyan-500/10 border-cyan-500 cursor-pointer hover:scale-105'
                    : 'bg-white/5 border-white/10 opacity-60'
                ]"
              >
                <div class="text-center mb-4">
                  <div class="text-6xl mb-3">{{ product.icon }}</div>
                  <h3 class="text-xl font-bold mb-2">{{ product.name }}</h3>
                  <p class="text-sm text-gray-400">{{ product.benefit }}</p>
                </div>

                <div class="space-y-3">
                  <div>
                    <div class="text-xs text-gray-500 mb-2">Carbon Required:</div>
                    <div class="flex items-center gap-2">
                      <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          :class="[
                            'h-full transition-all duration-500',
                            carbonCollected >= product.carbonNeeded ? 'bg-purple-500' : 'bg-gray-600'
                          ]"
                          :style="{ width: Math.min(100, (carbonCollected / product.carbonNeeded) * 100) + '%' }"
                        />
                      </div>
                      <span class="text-xs text-gray-400">{{ product.carbonNeeded }} kg</span>
                    </div>
                  </div>

                  <div>
                    <div class="text-xs text-gray-500 mb-2">Required Waste:</div>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="(type, idx) in product.wasteTypes"
                        :key="idx"
                        :class="[
                          'px-2 py-1 rounded-full text-xs',
                          wasteItems.some(w => w.type === type && w.processed)
                            ? 'bg-cyan-500/30 text-cyan-300'
                            : 'bg-white/10 text-gray-500'
                        ]"
                      >
                        {{ type }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="mt-4 text-center">
                  <div v-if="product.created" class="text-sm text-green-400 font-semibold">
                    ✓ Successfully created!
                  </div>
                  <div v-else-if="canCreateProduct(product)" class="text-sm text-cyan-400 font-semibold animate-pulse">
                    Click to manufacture →
                  </div>
                </div>
              </div>
            </div>

            <!-- Success Message -->
            <div v-if="totalProductsCreated === products.length" class="mt-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-3xl p-8 text-center animate-fadeIn">
              <div class="text-6xl mb-4">🎉</div>
              <h3 class="text-3xl font-bold mb-3">Research Complete!</h3>
              <p class="text-lg mb-6">You've successfully converted all waste into valuable scientific equipment!</p>
              <button
                @click="router.push('/scenarios')"
                class="px-8 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Explore More Scenarios
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}
</style>