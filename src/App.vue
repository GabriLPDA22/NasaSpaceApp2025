<template>
  <div id="app-container">
    <NavBar />
    <router-view />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Scroll to top cuando cambia la ruta
watch(
  () => router.currentRoute.value.path,
  () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Scroll suave
    });
  }
);
</script>

<style lang="scss">
body {
  margin: 0;
  background-color: #121212; // Fondo negro base
  font-family: sans-serif;
  color: #E0E0E0; // Color de texto por defecto para toda la app

  // Efecto de fondo de estrellas
  background-image:
    radial-gradient(white, rgba(255, 255, 255, 0) 2px),
    radial-gradient(white, rgba(255, 255, 255, 0) 1px),
    radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,0) 1px);
  background-size:
    1000px 1000px,
    400px 400px,
    150px 150px;
  background-position:
    -500px -500px,
    -200px -200px,
    -75px -75px;
  background-attachment: fixed;
}

#app-container {
  min-height: 100vh;
}

/* --- ESTILOS PARA EL SCROLLBAR PERSONALIZADO --- */

/* Para Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #0B3D91 #1E1E1E; /* Color del thumb y del track */
}

/* Para Chrome, Safari, Edge, etc. */
::-webkit-scrollbar {
  width: 8px; /* Ancho del scrollbar */
}

::-webkit-scrollbar-track {
  background: #1E1E1E; /* Color del fondo del scrollbar (el track) */
}

::-webkit-scrollbar-thumb {
  background-color: #0B3D91; /* Color del manejador (el thumb) */
  border-radius: 20px; /* Bordes redondeados */
  border: 2px solid #1E1E1E; /* Un pequeño borde del mismo color que el track */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #1E63E1; /* Un azul más claro al pasar el ratón */
}
</style>