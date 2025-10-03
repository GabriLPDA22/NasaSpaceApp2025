<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Rocket, ChevronDown, Recycle, Sparkles, Boxes, PartyPopper, Atom } from 'lucide-vue-next'

const router = useRouter()
const scrollY = ref(0)

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scenarios = [
  {
    id: 'residence',
    title: 'Residence Renovations',
    route: '/scenarios/residence',
    color: 'from-orange-500 to-red-600',
    icon: Boxes,
    description: 'Transform habitat packaging and structures'
  },
  {
    id: 'celebration',
    title: 'Cosmic Celebrations',
    route: '/scenarios/celebration',
    color: 'from-purple-500 to-pink-600',
    icon: PartyPopper,
    description: 'Recycle everyday items into party supplies'
  },
  {
    id: 'discovery',
    title: 'Daring Discoveries',
    route: '/scenarios/discovery',
    color: 'from-blue-500 to-cyan-600',
    icon: Atom,
    description: 'Reuse oxygen extraction equipment'
  }
]

const navigateToScenario = (route) => {
  router.push(route)
}

const stats = [
  { value: '12,600 kg', label: 'Total Waste', icon: '🗑️' },
  { value: '1,095 days', label: 'Mission Duration', icon: '📅' },
  { value: '8 people', label: 'Crew Size', icon: '👥' }
]
</script>

<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        class="absolute inset-0 bg-gradient-to-b from-red-950 via-orange-950 to-black"
        :style="{
          transform: `scale(${1 + scrollY * 0.0005})`,
          opacity: 1 - scrollY * 0.001
        }"
      >
        <!-- Estrellas animadas -->
        <div class="absolute inset-0 opacity-20">
          <div
            v-for="i in 50"
            :key="i"
            class="absolute bg-white rounded-full star"
            :style="{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's'
            }"
          />
        </div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 text-center px-6 max-w-5xl">
        <div 
          class="mb-8 inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20"
          :style="{
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: 1 - scrollY * 0.003
          }"
        >
          <Rocket :size="20" class="text-orange-400" />
          <span class="text-sm font-medium">NASA Space Apps Challenge 2024</span>
        </div>

        <h1 
          class="text-6xl md:text-8xl font-bold mb-6 leading-tight"
          :style="{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: 1 - scrollY * 0.003
          }"
        >
          Mars Circular
          <br />
          <span class="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
            Economy
          </span>
        </h1>

        <p 
          class="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          :style="{
            transform: `translateY(${scrollY * 0.2}px)`,
            opacity: 1 - scrollY * 0.003
          }"
        >
          Converting <span class="text-orange-400 font-bold">12,600 kg</span> of waste 
          into sustainable resources for a 3-year Mars mission
        </p>

        <div 
          class="flex gap-4 justify-center flex-wrap"
          :style="{
            transform: `translateY(${scrollY * 0.1}px)`,
            opacity: 1 - scrollY * 0.003
          }"
        >
          <button 
            @click="$router.push('/scenarios')"
            class="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-2xl shadow-orange-500/50"
          >
            Explore System
          </button>
          <button 
            @click="$router.push('/about')"
            class="px-8 py-4 bg-white/10 backdrop-blur-lg rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            View Data
          </button>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown :size="32" class="text-white/60" />
      </div>
    </section>

    <!-- Challenge Section -->
    <section class="min-h-screen flex items-center justify-center py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-5xl md:text-6xl font-bold mb-6">
            The Challenge
          </h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            On Mars, every kilogram matters. We can't afford to waste resources 
            when the nearest supply depot is 225 million kilometers away.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div 
            v-for="(stat, i) in stats"
            :key="i"
            class="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 cursor-pointer"
          >
            <div class="text-5xl mb-4">{{ stat.icon }}</div>
            <div class="text-4xl font-bold text-orange-400 mb-2">{{ stat.value }}</div>
            <div class="text-gray-400">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Scenarios -->
    <section class="py-20 px-6 bg-gradient-to-b from-black to-red-950/20">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-5xl md:text-6xl font-bold mb-6">
          Three Scenarios
        </h2>
        <p class="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
          Choose a scenario to explore the recycling process
        </p>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="scenario in scenarios"
            :key="scenario.id"
            @click="navigateToScenario(scenario.route)"
            class="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-white/30 cursor-pointer transition-all duration-500 hover:scale-105"
          >
            <div :class="`absolute inset-0 bg-gradient-to-br ${scenario.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`" />
            
            <div class="relative z-10">
              <div :class="`inline-flex p-4 rounded-2xl bg-gradient-to-br ${scenario.color} mb-6`">
                <component :is="scenario.icon" :size="32" />
              </div>
              <h3 class="text-2xl font-bold mb-4">{{ scenario.title }}</h3>
              <p class="text-gray-400 mb-6">{{ scenario.description }}</p>
              <button :class="`mt-6 px-6 py-3 bg-gradient-to-r ${scenario.color} rounded-full text-sm font-medium transition-all duration-300 w-full hover:scale-105`">
                Explore →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-6 border-t border-white/10">
      <div class="max-w-6xl mx-auto text-center">
        <div class="flex items-center justify-center gap-2 mb-4">
          <Rocket :size="24" class="text-orange-400" />
          <span class="text-xl font-bold">Mars Circular Economy</span>
        </div>
        <p class="text-gray-500">
          NASA Space Apps Challenge 2024 · Jezero Crater Mission
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

.star {
  animation: twinkle 3s infinite;
}
</style>