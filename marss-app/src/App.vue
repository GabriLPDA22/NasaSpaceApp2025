<template>
  <div id="app-container">
    <NavBar /> <router-view />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'; // <-- Importa el componente
</script>

<style lang="scss">
body {
  margin: 0;
  background-color: #121212;
  font-family: sans-serif;
}

#app-container {
  min-height: 100vh;
}
</style>