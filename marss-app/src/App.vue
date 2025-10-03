<template>
  <div id="app-container">
    <router-view /> </div>
</template>

<script setup>
// No se necesita lógica aquí para este caso simple
</script>

<style lang="scss">
// Estilos globales muy básicos
body {
  margin: 0;
  background-color: #121212; // Un fondo oscuro para toda la página
  font-family: sans-serif;
}

#app-container {
  min-height: 100vh;
}
</style>