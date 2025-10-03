<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Boxes, ArrowLeft, Trash2, Package, Zap, Droplets, CheckCircle } from 'lucide-vue-next'

const router = useRouter()

const availableMaterials = ref([
  { id: 1, name: 'Aluminum Frame', type: 'metal', weight: 15, selected: false, icon: '🔩' },
  { id: 2, name: 'Foam Packaging', type: 'foam', weight: 3, selected: false, icon: '📦' },
  { id: 3, name: 'Polymer Composites', type: 'plastic', weight: 8, selected: false, icon: '🧪' },
  { id: 4, name: 'Bubble Wrap', type: 'plastic', weight: 2, selected: false, icon: '🫧' },
  { id: 5, name: 'Carbon Fiber', type: 'composite', weight: 5, selected: false, icon: '🧵' },
  { id: 6, name: 'Air Cushions', type: 'plastic', weight: 1, selected: false, icon: '💨' }
])

const products = ref([
  {
    id: 'insulation',
    name: 'Insulation Panels',
    requiredMaterials: ['foam', 'plastic'],
    requiredWeight: 5,
    output: 'Wall insulation for habitat',
    energyUsed: 20,
    waterUsed: 2,
    created: false
  },
  {
    id: 'storage',
    name: 'Storage Container',
    requiredMaterials: ['metal', 'plastic'],
    requiredWeight: 10,
    output: 'Airtight storage unit',
    energyUsed: 35,
    waterUsed: 5,
    created: false
  },
  {
    id: 'tools',
    name: 'Tool Handles',
    requiredMaterials: ['metal', 'composite'],
    requiredWeight: 8,
    output: 'Durable tool handles (x5)',
    energyUsed: 15,
    waterUsed: 1,
    created: false
  },
  {
    id: 'furniture',
    name: 'Shelf Unit',
    requiredMaterials: ['metal', 'composite', 'plastic'],
    requiredWeight: 15,
    output: 'Modular shelf system',
    energyUsed: 40,
    waterUsed: 3,
    created: false
  }
])

const selectedMaterials = computed(() => {
  return availableMaterials.value.filter(m => m.selected)
})

const totalWeight = computed(() => {
  return selectedMaterials.value.reduce((sum, m) => sum + m.weight, 0)
})

const selectedTypes = computed(() => {
  return [...new Set(selectedMaterials.value.map(m => m.type))]
})

const canCreateProduct = (product) => {
  const hasRequiredTypes = product.requiredMaterials.every(type => 
    selectedTypes.value.includes(type)
  )
  const hasRequiredWeight = totalWeight.value >= product.requiredWeight
  return hasRequiredTypes && hasRequiredWeight && !product.created
}

const createProduct = (product) => {
  if (canCreateProduct(product)) {
    product.created = true
    // Reset selections
    availableMaterials.value.forEach(m => m.selected = false)
  }
}

const toggleMaterial = (material) => {
  material.selected = !material.selected
}

const totalEnergyUsed = computed(() => {
  return products.value.filter(p => p.created).reduce((sum, p) => sum + p.energyUsed, 0)
})

const totalWaterUsed = computed(() => {
  return products.value.filter(p => p.created).reduce((sum, p) => sum + p.waterUsed, 0)
})

const completedProducts = computed(() => {
  return products.value.filter(p => p.created).length
})
</script>

<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Header -->
    <section class="relative py-12 px-6 bg-gradient-to-b from-orange-950/30 to-black border-b border-white/10">
      <div class="max-w-7xl mx-auto">
        <button
          @click="router.push('/scenarios')"
          class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft :size="20" />
          Back to Scenarios
        </button>

        <div class="flex items-start gap-6">
          <div class="inline-flex p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600">
            <Boxes :size="48" />
          </div>
          <div class="flex-1">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Residence Renovations</h1>
            <p class="text-xl text-gray-400 mb-4">
              Your habitat is inflated and secured. Now you have leftover packaging and structural materials. 
              Let's transform them into useful items!
            </p>
            <div class="flex gap-4 flex-wrap">
              <div class="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Zap :size="16" class="text-yellow-400" />
                <span class="text-sm">Energy Used: {{ totalEnergyUsed }} kW</span>
              </div>
              <div class="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Droplets :size="16" class="text-blue-400" />
                <span class="text-sm">Water Used: {{ totalWaterUsed }} L</span>
              </div>
              <div class="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full">
                <CheckCircle :size="16" class="text-green-400" />
                <span class="text-sm">Completed: {{ completedProducts }}/{{ products.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Left: Available Materials -->
          <div>
            <div class="mb-6">
              <h2 class="text-2xl font-bold mb-2">Available Materials</h2>
              <p class="text-gray-400">Select materials to combine and create new products</p>
              <div class="mt-4 flex gap-4">
                <div class="px-4 py-2 bg-white/5 rounded-lg">
                  <span class="text-sm text-gray-400">Selected:</span>
                  <span class="text-orange-400 font-bold ml-2">{{ selectedMaterials.length }}</span>
                </div>
                <div class="px-4 py-2 bg-white/5 rounded-lg">
                  <span class="text-sm text-gray-400">Total Weight:</span>
                  <span class="text-orange-400 font-bold ml-2">{{ totalWeight }} kg</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="material in availableMaterials"
                :key="material.id"
                @click="toggleMaterial(material)"
                :class="[
                  'p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300',
                  material.selected
                    ? 'bg-gradient-to-br from-orange-500/20 to-red-600/20 border-orange-500 scale-95'
                    : 'bg-white/5 border-white/10 hover:border-white/30 hover:scale-105'
                ]"
              >
                <div class="text-4xl mb-3">{{ material.icon }}</div>
                <div class="font-semibold mb-1">{{ material.name }}</div>
                <div class="text-sm text-gray-400 mb-2">{{ material.type }}</div>
                <div class="text-xs text-orange-400">{{ material.weight }} kg</div>
              </div>
            </div>
          </div>

          <!-- Right: Products -->
          <div>
            <div class="mb-6">
              <h2 class="text-2xl font-bold mb-2">Create Products</h2>
              <p class="text-gray-400">Combine the right materials to manufacture useful items</p>
            </div>

            <div class="space-y-4">
              <div
                v-for="product in products"
                :key="product.id"
                :class="[
                  'p-6 rounded-2xl border transition-all duration-300',
                  product.created
                    ? 'bg-green-500/20 border-green-500'
                    : canCreateProduct(product)
                    ? 'bg-orange-500/10 border-orange-500 cursor-pointer hover:scale-102'
                    : 'bg-white/5 border-white/10 opacity-60'
                ]"
                @click="createProduct(product)"
              >
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <h3 class="text-xl font-bold mb-2 flex items-center gap-2">
                      {{ product.name }}
                      <CheckCircle v-if="product.created" :size="20" class="text-green-400" />
                    </h3>
                    <p class="text-sm text-gray-400 mb-3">{{ product.output }}</p>
                  </div>
                </div>

                <div class="space-y-2 mb-4">
                  <div class="text-xs text-gray-500 mb-1">Required Materials:</div>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(type, idx) in product.requiredMaterials"
                      :key="idx"
                      :class="[
                        'px-3 py-1 rounded-full text-xs',
                        selectedTypes.includes(type)
                          ? 'bg-orange-500/30 text-orange-300'
                          : 'bg-white/10 text-gray-400'
                      ]"
                    >
                      {{ type }}
                    </span>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">
                    Min. Weight: {{ product.requiredWeight }} kg
                  </div>
                </div>

                <div class="flex gap-4 text-xs text-gray-400">
                  <div class="flex items-center gap-1">
                    <Zap :size="14" class="text-yellow-400" />
                    {{ product.energyUsed }} kW
                  </div>
                  <div class="flex items-center gap-1">
                    <Droplets :size="14" class="text-blue-400" />
                    {{ product.waterUsed }} L
                  </div>
                </div>

                <div v-if="!product.created && canCreateProduct(product)" class="mt-4">
                  <div class="text-sm text-orange-400 font-semibold animate-pulse">
                    ✓ Ready to manufacture! Click to create
                  </div>
                </div>

                <div v-if="product.created" class="mt-4">
                  <div class="text-sm text-green-400 font-semibold">
                    ✓ Successfully created!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="completedProducts === products.length" class="mt-12 text-center">
          <div class="inline-block bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 animate-fadeIn">
            <div class="text-5xl mb-4">🎉</div>
            <h3 class="text-3xl font-bold mb-2">Mission Accomplished!</h3>
            <p class="text-gray-200 mb-6">You've successfully recycled all materials into useful products!</p>
            <button
              @click="router.push('/scenarios')"
              class="px-8 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Try Another Scenario
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}
</style>