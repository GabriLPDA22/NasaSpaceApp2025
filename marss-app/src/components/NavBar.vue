<script setup>
import { useRouter, useRoute } from 'vue-router'
import { Rocket } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Scenarios', path: '/scenarios' },
  { name: 'About', path: '/about' }
]

const isActive = (path) => {
  return route.path === path
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div 
        @click="router.push('/')"
        class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <Rocket :size="24" class="text-orange-400" />
        <span class="text-xl font-bold">Mars Economy</span>
      </div>

      <div class="flex gap-6">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'px-4 py-2 rounded-full transition-all duration-300',
            isActive(item.path)
              ? 'bg-white/20 text-white'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          ]"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>