<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { PartyPopper, ArrowLeft, Sparkles, Gift, Users } from 'lucide-vue-next'

const router = useRouter()

const materials = ref([
  { id: 1, name: 'Old T-Shirt', type: 'fabric', color: '#ff6b6b', used: false, icon: '👕' },
  { id: 2, name: 'Food Pouch', type: 'pouch', color: '#4ecdc4', used: false, icon: '🍱' },
  { id: 3, name: 'Thermal Wrap', type: 'wrap', color: '#ffe66d', used: false, icon: '🧊' },
  { id: 4, name: 'Drink Pouch', type: 'pouch', color: '#95e1d3', used: false, icon: '🧃' },
  { id: 5, name: 'Washcloth', type: 'fabric', color: '#f38181', used: false, icon: '🧻' },
  { id: 6, name: 'Plastic Wrap', type: 'wrap', color: '#aa96da', used: false, icon: '📦' }
])

const decorations = ref([])
const currentDragging = ref(null)

const partyItems = [
  { id: 'banner', name: 'Birthday Banner', materials: ['fabric', 'wrap'], icon: '🎊', created: false },
  { id: 'hat', name: 'Party Hat', materials: ['pouch'], icon: '🎩', created: false },
  { id: 'streamers', name: 'Streamers', materials: ['wrap', 'pouch'], icon: '🎀', created: false },
  { id: 'garland', name: 'Garland', materials: ['fabric'], icon: '🎈', created: false },
  { id: 'tablecloth', name: 'Tablecloth', materials: ['fabric', 'wrap'], icon: '🍽️', created: false },
  { id: 'confetti', name: 'Confetti', materials: ['pouch'], icon: '✨', created: false }
]

const unusedMaterials = computed(() => materials.value.filter(m => !m.used))
const usedMaterials = computed(() => materials.value.filter(m => m.used))

const partyProgress = computed(() => {
  const created = partyItems.filter(p => p.created).length
  return Math.round((created / partyItems.length) * 100)
})

const startDrag = (material) => {
  currentDragging.value = material
}

const createDecoration = (item) => {
  if (item.created) return

  const availableTypes = unusedMaterials.value.map(m => m.type)
  const canCreate = item.materials.every(type => availableTypes.includes(type))

  if (canCreate) {
    // Mark materials as used
    item.materials.forEach(neededType => {
      const material = materials.value.find(m => m.type === neededType && !m.used)
      if (material) {
        material.used = true
      }
    })

    item.created = true
    
    // Add to decorations display
    decorations.value.push({
      ...item,
      x: Math.random() * 80,
      y: Math.random() * 80
    })
  }
}

const resetMaterial = (material) => {
  material.used = false
  
  // Check if any created item needs to be uncreated
  partyItems.forEach(item => {
    if (item.created) {
      const stillHasMaterials = item.materials.every(type => 
        materials.value.some(m => m.type === type && m.used)
      )
      if (!stillHasMaterials) {
        item.created = false
        decorations.value = decorations.value.filter(d => d.id !== item.id)
      }
    }
  })
}

const crewMembers = [
  { name: 'Commander Sarah', emoji: '👩‍🚀', mood: 'excited' },
  { name: 'Dr. Martinez', emoji: '👨‍🚀', mood: 'happy' },
  { name: 'Engineer Kim', emoji: '👩‍🚀', mood: 'cheerful' },
  { name: 'Specialist Alex', emoji: '👨‍🚀', mood: 'celebrating' }
]
</script>

<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Header -->
    <section class="relative py-12 px-6 bg-gradient-to-b from-purple-950/30 to-black border-b border-white/10">
      <div class="max-w-7xl mx-auto">
        <button
          @click="router.push('/scenarios')"
          class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft :size="20" />
          Back to Scenarios
        </button>

        <div class="flex items-start gap-6">
          <div class="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600">
            <PartyPopper :size="48" />
          </div>
          <div class="flex-1">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Cosmic Celebrations</h1>
            <p class="text-xl text-gray-400 mb-4">
              It's Commander Sarah's birthday! Let's create a memorable party using only recycled materials from around the habitat.
            </p>
            <div class="flex gap-4 flex-wrap">
              <div class="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Sparkles :size="16" class="text-purple-400" />
                <span class="text-sm">Party Progress: {{ partyProgress }}%</span>
              </div>
              <div class="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Gift :size="16" class="text-pink-400" />
                <span class="text-sm">Items Created: {{ decorations.length }}/{{ partyItems.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12 px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Progress Bar -->
        <div class="mb-12">
          <div class="h-4 bg-white/10 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-purple-500 to-pink-600 transition-all duration-500 flex items-center justify-end pr-2"
              :style="{ width: partyProgress + '%' }"
            >
              <Sparkles v-if="partyProgress > 10" :size="12" class="text-white" />
            </div>
          </div>
          <p class="text-sm text-gray-400 mt-2 text-center">Create all party items to celebrate!</p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Left: Available Materials -->
          <div class="lg:col-span-1">
            <h2 class="text-2xl font-bold mb-4">Available Materials</h2>
            <p class="text-sm text-gray-400 mb-6">Click materials to use them in party items</p>

            <div class="space-y-3">
              <div
                v-for="material in unusedMaterials"
                :key="material.id"
                class="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-purple-500/50 transition-all cursor-pointer hover:scale-105"
                :style="{ borderColor: material.color + '40' }"
              >
                <div class="flex items-center gap-3">
                  <div class="text-3xl">{{ material.icon }}</div>
                  <div class="flex-1">
                    <div class="font-semibold">{{ material.name }}</div>
                    <div class="text-xs text-gray-400">Type: {{ material.type }}</div>
                  </div>
                  <div 
                    class="w-4 h-4 rounded-full"
                    :style="{ backgroundColor: material.color }"
                  ></div>
                </div>
              </div>

              <div v-if="unusedMaterials.length === 0" class="text-center py-8 text-gray-500">
                <div class="text-4xl mb-2">✅</div>
                <div class="text-sm">All materials used!</div>
              </div>
            </div>

            <!-- Used Materials -->
            <div v-if="usedMaterials.length > 0" class="mt-8">
              <h3 class="text-lg font-bold mb-4 text-gray-400">Used Materials</h3>
              <div class="space-y-2">
                <div
                  v-for="material in usedMaterials"
                  :key="material.id"
                  @click="resetMaterial(material)"
                  class="p-3 bg-white/5 border border-green-500/30 rounded-lg cursor-pointer hover:bg-white/10 transition-all text-sm opacity-60 hover:opacity-100"
                >
                  <div class="flex items-center gap-2">
                    <div class="text-xl">{{ material.icon }}</div>
                    <div class="flex-1">{{ material.name }}</div>
                    <div class="text-xs text-green-400">✓ Used</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Middle: Party Items to Create -->
          <div class="lg:col-span-1">
            <h2 class="text-2xl font-bold mb-4">Party Items</h2>
            <p class="text-sm text-gray-400 mb-6">Click to create when you have the right materials</p>

            <div class="space-y-4">
              <div
                v-for="item in partyItems"
                :key="item.id"
                @click="createDecoration(item)"
                :class="[
                  'p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer',
                  item.created
                    ? 'bg-green-500/20 border-green-500'
                    : 'bg-white/5 border-white/10 hover:border-purple-500 hover:scale-105'
                ]"
              >
                <div class="flex items-start gap-4">
                  <div class="text-4xl">{{ item.icon }}</div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold mb-2">{{ item.name }}</h3>
                    <div class="text-xs text-gray-500 mb-2">Requires:</div>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="(mat, idx) in item.materials"
                        :key="idx"
                        :class="[
                          'px-2 py-1 rounded-full text-xs',
                          unusedMaterials.some(m => m.type === mat)
                            ? 'bg-purple-500/30 text-purple-300'
                            : 'bg-white/10 text-gray-500'
                        ]"
                      >
                        {{ mat }}
                      </span>
                    </div>
                    <div v-if="item.created" class="mt-3 text-sm text-green-400 font-semibold">
                      ✓ Created!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Party Room Preview -->
          <div class="lg:col-span-1">
            <h2 class="text-2xl font-bold mb-4">Party Room</h2>
            <p class="text-sm text-gray-400 mb-6">See your decorations come to life!</p>

            <div class="relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-purple-500/30 rounded-2xl p-8 min-h-[500px] overflow-hidden">
              <!-- Background stars -->
              <div class="absolute inset-0">
                <div
                  v-for="i in 20"
                  :key="'star-' + i"
                  class="absolute bg-white rounded-full star"
                  :style="{
                    width: Math.random() * 2 + 1 + 'px',
                    height: Math.random() * 2 + 1 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 2 + 's'
                  }"
                />
              </div>

              <!-- Decorations -->
              <div class="relative z-10">
                <div
                  v-for="(deco, idx) in decorations"
                  :key="idx"
                  class="absolute text-5xl animate-fadeIn cursor-pointer hover:scale-125 transition-transform"
                  :style="{
                    top: deco.y + '%',
                    left: deco.x + '%',
                    animationDelay: idx * 0.1 + 's'
                  }"
                >
                  {{ deco.icon }}
                </div>
              </div>

              <!-- Crew Members -->
              <div class="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-20">
                <div
                  v-for="(crew, idx) in crewMembers"
                  :key="idx"
                  class="text-center animate-bounce"
                  :style="{ animationDelay: idx * 0.2 + 's' }"
                >
                  <div class="text-4xl mb-1">{{ crew.emoji }}</div>
                  <div class="text-xs text-gray-400">{{ crew.name }}</div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-if="decorations.length === 0" class="absolute inset-0 flex items-center justify-center text-gray-500">
                <div class="text-center">
                  <div class="text-6xl mb-4">🎈</div>
                  <p class="text-sm">Create party items to see them here!</p>
                </div>
              </div>
            </div>

            <!-- Party Complete -->
            <div v-if="partyProgress === 100" class="mt-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-center animate-fadeIn">
              <div class="text-5xl mb-3">🎉</div>
              <h3 class="text-2xl font-bold mb-2">Party Complete!</h3>
              <p class="text-sm mb-4">You've created an amazing celebration from recycled materials!</p>
              <button
                @click="router.push('/scenarios')"
                class="px-6 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Try Another Scenario
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Crew Reactions -->
    <section class="py-12 px-6 bg-gradient-to-b from-black to-purple-950/20">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">Crew Reactions</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div
            v-for="(crew, idx) in crewMembers"
            :key="idx"
            class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:scale-105 transition-transform"
          >
            <div class="text-5xl mb-3">{{ crew.emoji }}</div>
            <div class="font-semibold mb-2">{{ crew.name }}</div>
            <div class="text-xs text-gray-400">{{ crew.mood }}</div>
            <div class="mt-3 text-2xl">
              {{ partyProgress >= 100 ? '🎊' : partyProgress >= 50 ? '😊' : '🙂' }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

.star {
  animation: twinkle 2s infinite;
}
</style>