<script setup>
import { useRouter } from 'vue-router'
import { Rocket, Globe, Users, Target, ArrowLeft, ExternalLink, Github } from 'lucide-vue-next'

const router = useRouter()

const teamMembers = [
  { role: 'Lead Developer', name: 'Your Name', emoji: '👨‍💻' },
  { role: 'UI/UX Designer', name: 'Team Member', emoji: '🎨' },
  { role: 'Data Scientist', name: 'Team Member', emoji: '📊' },
  { role: 'Systems Engineer', name: 'Team Member', emoji: '⚙️' }
]

const keyFeatures = [
  {
    icon: '♻️',
    title: 'Circular Economy',
    description: 'Complete waste-to-resource transformation system for Mars missions'
  },
  {
    icon: '🎮',
    title: 'Interactive Learning',
    description: 'Hands-on scenarios to understand recycling processes'
  },
  {
    icon: '📊',
    title: 'Real Data',
    description: 'Based on NASA research and Mars mission specifications'
  },
  {
    icon: '🚀',
    title: 'Scalable Solution',
    description: 'Adaptable for different mission durations and crew sizes'
  }
]

const resources = [
  {
    title: 'NASA Mars Facts',
    url: 'https://mars.nasa.gov/all-about-mars/facts/',
    description: 'Official data about Mars atmosphere and conditions'
  },
  {
    title: 'Jezero Crater',
    url: 'https://mars.nasa.gov/mars2020/mission/where-is-perseverance/',
    description: 'Landing site information and exploration data'
  },
  {
    title: 'Space Apps Challenge',
    url: 'https://www.spaceappschallenge.org/',
    description: 'NASA International Space Apps Challenge'
  }
]
</script>

<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Header -->
    <section class="relative py-20 px-6 bg-gradient-to-b from-orange-950/30 to-black">
      <div class="max-w-6xl mx-auto">
        <button
          @click="router.push('/')"
          class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft :size="20" />
          Back to Home
        </button>

        <div class="text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full mb-6">
            <Globe :size="20" class="text-orange-400" />
            <span class="text-sm">About Our Project</span>
          </div>

          <h1 class="text-5xl md:text-7xl font-bold mb-6">
            Mars Circular
            <span class="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
              Economy
            </span>
          </h1>

          <p class="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            An interactive solution for sustainable waste management on Mars, 
            created for the NASA Space Apps Challenge 2024
          </p>

          <div class="flex gap-4 justify-center flex-wrap">
            
              href="https://github.com"
              target="_blank"
              class="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 transition-all"
            >
              <Github :size="20" />
              View on GitHub
            </a>
            
              href="https://www.spaceappschallenge.org/"
              target="_blank"
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full hover:scale-105 transition-transform"
            >
              <ExternalLink :size="20" />
              Space Apps Challenge
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Statement -->
    <section class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full mb-6">
              <Target :size="20" class="text-orange-400" />
              <span class="text-sm text-orange-400">Our Mission</span>
            </div>
            <h2 class="text-4xl font-bold mb-6">Sustainable Living Beyond Earth</h2>
            <p class="text-gray-400 mb-4">
              Our project addresses one of the most critical challenges for long-duration Mars missions: 
              managing 12,600 kg of inorganic waste accumulated over a 3-year mission with an 8-person crew.
            </p>
            <p class="text-gray-400 mb-4">
              Through interactive scenarios based on real NASA data, we demonstrate how waste can be 
              transformed into valuable resources, creating a truly circular economy on Mars.
            </p>
            <p class="text-gray-400">
              Located at Jezero Crater, our system maximizes resource recovery while minimizing energy 
              and water consumption.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-2xl p-6 border border-orange-500/30">
              <div class="text-4xl mb-3">🗑️</div>
              <div class="text-3xl font-bold text-orange-400 mb-2">12,600 kg</div>
              <div class="text-sm text-gray-400">Total Waste</div>
            </div>
            <div class="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-2xl p-6 border border-blue-500/30">
              <div class="text-4xl mb-3">♻️</div>
              <div class="text-3xl font-bold text-blue-400 mb-2">85%</div>
              <div class="text-sm text-gray-400">Recyclable</div>
            </div>
            <div class="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl p-6 border border-green-500/30">
              <div class="text-4xl mb-3">⏱️</div>
              <div class="text-3xl font-bold text-green-400 mb-2">1,095</div>
              <div class="text-sm text-gray-400">Mission Days</div>
            </div>
            <div class="bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30">
              <div class="text-4xl mb-3">👥</div>
              <div class="text-3xl font-bold text-purple-400 mb-2">8</div>
              <div class="text-sm text-gray-400">Crew Size</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Features -->
    <section class="py-20 px-6 bg-gradient-to-b from-black to-red-950/20">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Key Features</h2>
          <p class="text-gray-400">What makes our solution unique</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(feature, idx) in keyFeatures"
            :key="idx"
            class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-orange-500/50 transition-all hover:scale-105"
          >
            <div class="text-5xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-gray-400">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- The Team -->
    <section class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full mb-6">
            <Users :size="20" class="text-orange-400" />
            <span class="text-sm">Meet The Team</span>
          </div>
          <h2 class="text-4xl font-bold mb-4">The Minds Behind the Mission</h2>
          <p class="text-gray-400">Passionate about space exploration and sustainability</p>
        </div>

        <div class="grid md:grid-cols-4 gap-6">
          <div
            v-for="(member, idx) in teamMembers"
            :key="idx"
            class="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center hover:scale-105 transition-transform"
          >
            <div class="text-6xl mb-4">{{ member.emoji }}</div>
            <div class="text-sm text-orange-400 mb-2">{{ member.role }}</div>
            <div class="font-semibold">{{ member.name }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Resources -->
    <section class="py-20 px-6 bg-gradient-to-b from-black to-orange-950/20">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Resources & References</h2>
          <p class="text-gray-400">Data sources and inspirations for this project</p>
        </div>

        <div class="space-y-4">
          
            v-for="(resource, idx) in resources"
            :key="idx"
            :href="resource.url"
            target="_blank"
            class="flex items-center justify-between p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all group"
          >
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                {{ resource.title }}
              </h3>
              <p class="text-sm text-gray-400">{{ resource.description }}</p>
            </div>
            <ExternalLink :size="24" class="text-gray-400 group-hover:text-orange-400 transition-colors" />
          </a>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div class="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-12">
          <Rocket :size="64" class="mx-auto mb-6" />
          <h2 class="text-4xl font-bold mb-4">Ready to Explore?</h2>
          <p class="text-xl mb-8 opacity-90">
            Dive into our interactive scenarios and discover how waste becomes treasure on Mars
          </p>
          <button
            @click="router.push('/scenarios')"
            class="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:scale-105 transition-transform"
          >
            Start Your Mission
          </button>
        </div>
      </div>
    </section>
  </div>
</template>