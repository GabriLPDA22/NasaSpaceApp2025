<template>
  <div class="rover-photos-view">
    <header class="header">
      <h1>🛰️ Explorador de Fotos del Rover de Marte</h1>
      <p>Selecciona una fecha para ver las imágenes capturadas por el rover Curiosity.</p>
    </header>

    <div class="controls">
      <label for="date-picker">Selecciona una fecha:</label>
      <input type="date" id="date-picker" v-model="selectedDate" />
      <button @click="fetchPhotos" :disabled="isLoading">
        {{ isLoading ? 'Buscando...' : 'Buscar Fotos' }}
      </button>
    </div>

    <div v-if="isLoading" class="feedback-message">
      <p>Cargando imágenes desde Marte... 👨‍🚀</p>
    </div>

    <div v-else-if="error" class="feedback-message error">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="photos.length > 0" class="photo-grid">
      <div v-for="photo in photos" :key="photo.id" class="photo-card">
        <img :src="photo.img_src" :alt="'Foto del rover en Marte tomada por la cámara ' + photo.camera.name" />
        <div class="photo-info">
          <p><strong>Cámara:</strong> {{ photo.camera.full_name }}</p>
          <p><strong>Fecha terrestre:</strong> {{ photo.earth_date }}</p>
        </div>
      </div>
    </div>

    <div v-else-if="hasSearched" class="feedback-message">
      <p>No se encontraron fotos para la fecha seleccionada. Intenta con otra.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// --- ESTADO REACTIVO ---
// Guardaremos las fotos en un array
const photos = ref([]);
// Para la fecha seleccionada por el usuario. La inicializamos con una fecha que sabemos que tiene fotos.
const selectedDate = ref('2015-06-03');
// Para saber si estamos cargando datos
const isLoading = ref(false);
// Para guardar cualquier mensaje de error
const error = ref(null);
// Para saber si ya se ha realizado una búsqueda
const hasSearched = ref(false);

// --- LÓGICA ---
// Función asíncrona para llamar a la API de la NASA
const fetchPhotos = async () => {
  // Validamos que se haya seleccionado una fecha
  if (!selectedDate.value) {
    error.value = "Por favor, selecciona una fecha.";
    return;
  }
  
  // Reiniciamos el estado antes de cada búsqueda
  isLoading.value = true;
  hasSearched.value = true;
  error.value = null;
  photos.value = [];

  // Usamos la API KEY de demostración. ¡Recuerda obtener la tuya para un uso más extensivo!
  const apiKey = 'DEMO_KEY';
  const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${selectedDate.value}&api_key=${apiKey}`;

  try {
    // Hacemos la petición con axios
    const response = await axios.get(apiUrl);
    // Guardamos las fotos en nuestro estado reactivo
    photos.value = response.data.photos;
  } catch (err) {
    // Si ocurre un error, lo guardamos para mostrarlo en la interfaz
    console.error("Error al obtener las fotos:", err);
    error.value = "Hubo un problema al conectar con la API de la NASA. Por favor, inténtalo de nuevo más tarde.";
  } finally {
    // Al finalizar (ya sea con éxito o error), dejamos de cargar
    isLoading.value = false;
  }
};

// onMounted es un "hook" de Vue que se ejecuta cuando el componente se ha cargado.
// Hacemos una búsqueda inicial para que el usuario vea contenido al entrar.
onMounted(() => {
  fetchPhotos();
});
</script>

<style lang="scss" scoped>
// --- VARIABLES DE COLOR INSPIRADAS EN LA NASA ---
$nasa-blue: #0B3D91;
$nasa-red: #FC3D21;
$dark-bg: #121212;
$light-text: #E0E0E0;
$card-bg: #1E1E1E;
$border-color: #333;

.rover-photos-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: $light-text;
}

.header {
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    color: white;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    color: darken($light-text, 20%);
  }
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: $card-bg;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid $border-color;

  label {
    font-weight: bold;
  }

  input[type="date"] {
    background-color: $dark-bg;
    color: $light-text;
    border: 1px solid $border-color;
    padding: 0.5rem;
    border-radius: 4px;
    font-family: inherit;
  }

  button {
    background-color: $nasa-blue;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: lighten($nasa-blue, 10%);
    }

    &:disabled {
      background-color: #555;
      cursor: not-allowed;
    }
  }
}

.feedback-message {
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
  background-color: $card-bg;
  border-radius: 8px;

  &.error {
    color: $nasa-red;
    font-weight: bold;
  }
}

.photo-grid {
  display: grid;
  // Creamos columnas flexibles que se adaptan al tamaño de la pantalla
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.photo-card {
  background-color: $card-bg;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid $border-color;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: cover; // Asegura que la imagen cubra el espacio sin deformarse
    display: block;
  }

  .photo-info {
    padding: 1rem;

    p {
      margin: 0.5rem 0;
    }
  }
}
</style>