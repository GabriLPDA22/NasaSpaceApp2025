<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Boxes, PartyPopper, Atom, ArrowRight, Recycle } from 'lucide-vue-next'

const router = useRouter()

const scenarios = [
  {
    id: 'residence',
    title: 'Residence Renovations',
    route: '/scenarios/residence',
    color: 'from-orange-500 to-red-600',
    icon: Boxes,
    description: 'Transform habitat packaging and aluminum structures into useful materials for daily life on Mars.',
    challenge: 'After inflating your habitat, you have aluminum frames, foam packaging, and bubble wrap. What can you do with them?',
    materials: ['Aluminum Structures', 'Foam Packaging', 'Polymer Composites', 'Bubble Wrap'],
    potentialOutputs: ['Insulation Panels', 'Storage Containers', 'Tool Handles', 'Furniture Components'],
    impact: 'High',
    difficulty: 'Medium'
  },
  {
    id: 'celebration',
    title: 'Cosmic Celebrations',
    route: '/scenarios/celebration',
    color: 'from-purple-500 to-pink-600',
    icon: PartyPopper,
    description: 'Recycle everyday items into party supplies and decorations to celebrate special moments.',
    challenge: 'A crew member is celebrating a birthday. You have clothing, food pouches, and thermal wraps. How do you create a party?',
    materials: ['Clothing Fabrics', 'Food Pouches', 'Thermal Wraps', 'Drink Pouches'],
    potentialOutputs: ['Decorations', 'Party Hats', 'Banners', 'Table Settings'],
    impact: 'Medium',
    difficulty: 'Low'
  },
  {
    id: 'discovery',
    title: 'Daring Discoveries',
    route: '/scenarios/discovery',
    color: 'from-blue-500 to-cyan-600',
    icon: Atom,
    description: 'Reuse oxygen extraction equipment and surplus carbon from CO2 processing experiments.',
    challenge: 'Your oxygen extraction experiments are complete. You have EVA waste, carbon surplus, and filter mesh. What now?',
    materials: ['EVA Waste', 'Carbon Surplus', 'Filter Mesh', 'Nitrile Gloves'],
    potentialOutputs: ['Carbon Tools', 'Air Filters', 'Lab Equipment', 'Protective Gear'],
    impact: 'High',
    difficulty: 'High'
  }
]

const selectedScenario = ref(null)

const selectScenario = (scenario) => {
  selectedScenario.value = selectedScenario.value?.id === scenario.id ? null : scenario
}

const navigateToScenario = (route) => {
  router.push(route)
}

const getDifficultyColor = (difficulty) => {
  const colors = {
    'Low': 'text-green-400',
    'Medium': 'text-yellow-400',
    'High': 'text-red-400'
  }
  return colors[difficulty] || 'text-gray-400'
}
</script>

<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Header -->
    <section class="relative py-20 px-6 bg-gradient-to-b from-red-950/30 to-black">
      <div class="max-w-6xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full mb-6">
          <Recycle :size="20" class="text-orange-400" />
          <span class="text-sm">Recycling Scenarios</span>
        </div>
        
        <h1 class="text-5xl md:text-7xl font-bold mb-6">
          Choose Your
          <span class="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
            Challenge
          </span>
        </h1>
        
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
          Each scenario presents unique opportunities to transform waste into valuable resources. 
          Select a scenario to dive deep into the recycling process.
        </p>
      </div>
    </section>

    <!-- Scenarios Grid -->
    <section class="py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="space-y-8">
          <div
            v-for="(scenario, index) in scenarios"
            :key="scenario.id"
            class="group"
          >
            <div
              @click="selectScenario(scenario)"
              :class="[
                'relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 cursor-pointer transition-all duration-500',
                selectedScenario?.id === scenario.id ? 'border-white/30 scale-[1.02]' : 'hover:border-white/20 hover:scale-[1.01]'
              ]"
            >
              <div :class="`absolute inset-0 bg-gradient-to-br ${scenario.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`" />
              
              <div class="relative z-10">
                <div class="flex flex-col md:flex-row gap-8 items-start">
                  <!-- Icon & Title -->
                  <div class="flex-shrink-0">
                    <div :class="`inline-flex p-6 rounded-2xl bg-gradient-to-br ${scenario.color}`">
                      <component :is="scenario.icon" :size="48" />
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="flex-1">
                    <div class="flex items-start justify-between mb-4">
                      <div>
                        <h3 class="text-3xl font-bold mb-2">{{ scenario.title }}</h3>
                        <p class="text-gray-400">{{ scenario.description }}</p>
                      </div>
                      <div class="flex gap-3">
                        <span :class="['px-3 py-1 rounded-full text-xs font-medium', getDifficultyColor(scenario.difficulty), 'bg-white/10']">
                          {{ scenario.difficulty }}
                        </span>
                        <span class="px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400">
                          {{ scenario.impact }} Impact
                        </span>
                      </div>
                    </div>

                    <!-- Challenge -->
                    <div class="bg-white/5 rounded-2xl p-6 mb-6">
                      <div class="text-sm text-orange-400 font-semibold mb-2">THE CHALLENGE</div>
                      <p class="text-gray-300">{{ scenario.challenge }}</p>
                    </div>

                    <!-- Materials & Outputs Grid -->
                    <div v-if="selectedScenario?.id === scenario.id" class="grid md:grid-cols-2 gap-6 mb-6 animate-fadeIn">
                      <!-- Input Materials -->
                      <div>
                        <div class="text-sm text-gray-500 mb-3 flex items-center gap-2">
                          <span class="w-2 h-2 bg-red-400 rounded-full"></span>
                          INPUT MATERIALS
                        </div>
                        <div class="flex flex-wrap gap-2">
                          <span 
                            v-for="(material, idx) in scenario.materials"
                            :key="idx"
                            class="px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
                          >
                            {{ material }}
                          </span>
                        </div>
                      </div>

                      <!-- Potential Outputs -->
                      <div>
                        <div class="text-sm text-gray-500 mb-3 flex items-center gap-2">
                          <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                          POTENTIAL OUTPUTS
                        </div>
                        <div class="flex flex-wrap gap-2">
                          <span 
                            v-for="(output, idx) in scenario.potentialOutputs"
                            :key="idx"
                            :class="`px-4 py-2 bg-gradient-to-r ${scenario.color} rounded-full text-sm font-medium hover:scale-105 transition-transform`"
                          >
                            {{ output }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- CTA Button -->
                    <button
                      @click.stop="navigateToScenario(scenario.route)"
                      :class="`px-8 py-4 bg-gradient-to-r ${scenario.color} rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-2xl inline-flex items-center gap-2`"
                    >
                      Start {{ scenario.title }}
                      <ArrowRight :size="20" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 px-6 bg-gradient-to-b from-black to-red-950/20">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">By The Numbers</h2>
          <p class="text-gray-400">Impact of effective waste recycling on Mars</p>
        </div>

        <div class="grid md:grid-cols-4 gap-6">
          <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div class="text-3xl font-bold text-orange-400 mb-2">85%</div>
            <div class="text-sm text-gray-400">Recyclable Materials</div>
          </div>
          <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div class="text-3xl font-bold text-green-400 mb-2">10,710 kg</div>
            <div class="text-sm text-gray-400">Potential Recovery</div>
          </div>
          <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div class="text-3xl font-bold text-blue-400 mb-2">3 Years</div>
            <div class="text-sm text-gray-400">Mission Duration</div>
          </div>
          <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div class="text-3xl font-bold text-purple-400 mb-2">100%</div>
            <div class="text-sm text-gray-400">Sustainability Goal</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>