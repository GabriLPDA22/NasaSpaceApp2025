<template>
  <div class="rover-photos-view">
    <header class="header">
      <h1>🛰️ Explorador de Fotos del Rover de Marte</h1>
      <p>Selecciona una fecha y filtra por cámara para explorar las imágenes del rover Curiosity.</p>
    </header>

    <div class="controls">
      <div class="filter-group">
        <label>Fecha:</label>
        <button class="date-display-button" @click="isCalendarOpen = true">
          {{ formattedDate }}
        </button>
      </div>
      <div class="filter-group">
        <label for="camera-select">Cámara:</label>
        <select id="camera-select" v-model="selectedCamera">
          <option value="">Todas</option>
          <option v-for="camera in cameras" :key="camera.abbr" :value="camera.abbr">
            {{ camera.name }}
          </option>
        </select>
      </div>
    </div>

    <CalendarModal
      v-if="isCalendarOpen"
      :initial-date="selectedDate"
      @close="isCalendarOpen = false"
      @date-selected="updateDate"
    />

    <div v-if="isLoading" class="feedback-message">
      <p>Cargando imágenes desde Marte... 👨‍🚀</p>
    </div>
    <div v-else-if="error" class="feedback-message error">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="photos.length > 0">
      <div class="photo-grid">
        <div v-for="photo in photos" :key="photo.id" class="photo-card">
          <img :src="photo.img_src" :alt="'Foto del rover en Marte tomada por la cámara ' + photo.camera.name" />
          <div class="photo-info">
            <p><strong>Cámara:</strong> {{ photo.camera.full_name }}</p>
            <p><strong>Fecha terrestre:</strong> {{ photo.earth_date }}</p>
          </div>
        </div>
      </div>
      
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1 || isLoading" class="nav-button">&laquo;</button>
        <button 
          v-for="pageNumber in paginationNumbers" 
          :key="pageNumber"
          @click="goToPage(pageNumber)"
          class="page-number"
          :class="{ active: pageNumber === currentPage }"
        >
          {{ pageNumber }}
        </button>
        <button @click="nextPage" :disabled="isLastPage || isLoading" class="nav-button">&raquo;</button>
      </div>
    </div>
    <div v-else-if="hasSearched" class="feedback-message">
      <p>No se encontraron fotos con los filtros seleccionados.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router'; 
import CalendarModal from '../components/CalendarModal.vue';

const route = useRoute();

// --- ESTADO ---
const photos = ref([]);
const selectedDate = ref('2017-12-15');
const isLoading = ref(false);
const error = ref(null);
const hasSearched = ref(false);
const selectedCamera = ref('');
const currentPage = ref(1);
const isLastPage = ref(false);
const isCalendarOpen = ref(false);
const PHOTOS_PER_PAGE = 12;
const cameras = ref([ { abbr: 'FHAZ', name: 'Front Hazard' }, { abbr: 'RHAZ', name: 'Rear Hazard' }, { abbr: 'MAST', name: 'Mast Camera' }, { abbr: 'CHEMCAM', name: 'ChemCam' }, { abbr: 'MAHLI', name: 'MAHLI' }, { abbr: 'MARDI', name: 'MARDI' }, { abbr: 'NAVCAM', name: 'NavCam' } ]);

const formattedDate = computed(() => {
  const date = new Date(selectedDate.value + 'T00:00:00');
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
});

// --- LÓGICA ---
watch([selectedDate, selectedCamera], () => {
  searchPhotos();
});

const paginationNumbers = computed(() => {
  const windowSize = 5;
  const start = Math.max(1, currentPage.value - Math.floor(windowSize / 2));
  const numbers = [];
  for(let i = 0; i < windowSize; i++) {
    const page = start + i;
    if (isLastPage.value && page > currentPage.value) {
        break;
    }
    numbers.push(page);
  }
  return numbers;
});

const goToPage = (pageNumber) => {
  if (pageNumber === currentPage.value) return;
  currentPage.value = pageNumber;
  fetchPhotos();
};

const fetchPhotos = async () => {
  isLoading.value = true;
  error.value = null;
  const apiKey = 'NCVkqcCVoHJEsgWC5CxoNKul6BS53GfhLmpSYXzj';
  let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${selectedDate.value}&page=${currentPage.value}&api_key=${apiKey}`;
  
  if (selectedCamera.value) {
    apiUrl += `&camera=${selectedCamera.value}`;
  }

  try {
    const response = await axios.get(apiUrl);
    photos.value = response.data.photos.slice(0, PHOTOS_PER_PAGE);
    isLastPage.value = response.data.photos.length < 25;
  } catch (err) {
    console.error("Error al obtener las fotos:", err);
    error.value = "Hubo un problema al conectar con la API. Intenta de nuevo.";
    photos.value = [];
  } finally {
    isLoading.value = false;
  }
};

const searchPhotos = () => {
  currentPage.value = 1;
  hasSearched.value = true;
  fetchPhotos();
};

const nextPage = () => {
  if (!isLastPage.value) {
    currentPage.value++;
    fetchPhotos();
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchPhotos();
  }
};

const updateDate = (newDate) => {
  selectedDate.value = newDate;
  isCalendarOpen.value = false;
};

onMounted(() => {
    if (route.query.date) {
        selectedDate.value = route.query.date;
    }
    if (route.query.camera) {
        selectedCamera.value = route.query.camera;
    }
    
    hasSearched.value = true;
    
    if (!route.query.date && !route.query.camera) {
        fetchPhotos();
    }
});
</script>

<style lang="scss" scoped>
$nasa-blue: #0B3D91;
$nasa-red: #FC3D21;
$dark-bg: #121212;
$light-text: #E0E0E0;
$card-bg: #1E1E1E;
$border-color: #333;

.rover-photos-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: $light-text;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  h1 { 
    font-size: 1.8rem;
    color: white;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1rem;
    color: darken($light-text, 20%);
  }
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: $card-bg;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid $border-color;

  .filter-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    width: 100%;
  }

  label {
    font-weight: bold;
  }
  
  select, .date-display-button {
    width: 100%;
    background-color: $dark-bg;
    color: $light-text;
    border: 1px solid $border-color;
    padding: 0.75rem;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
    text-align: left;
  }
  
  .date-display-button {
    cursor: pointer;
  }
}

.feedback-message {
  text-align: center;
  font-size: 1.1rem;
  padding: 2rem 1rem;
  background-color: $card-bg;
  border-radius: 8px;
  &.error {
    color: $nasa-red;
    font-weight: bold;
  }
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.photo-card {
  background-color: $card-bg;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid $border-color;
  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    display: block;
  }
  .photo-info {
    padding: 1rem;
    p {
      margin: 0.5rem 0;
      font-size: 0.9rem;
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;

  .nav-button, .page-number {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: $card-bg;
    color: $light-text;
    border: 1px solid $border-color;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s, border-color 0.2s;

    &:hover:not(:disabled) {
      background-color: darken($nasa-blue, 15%);
      border-color: $nasa-blue;
    }

    &:disabled {
      background-color: $card-bg;
      color: #666;
      cursor: not-allowed;
      border-color: #444;
    }
  }

  .page-number.active {
    background-color: $nasa-blue;
    border-color: lighten($nasa-blue, 10%);
    color: white;
  }
}

@media (min-width: 768px) {
  .rover-photos-view {
    padding: 2rem;
  }
  .header {
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.1rem;
    }
  }
  .controls {
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    gap: 1.5rem;
    
    .filter-group {
      flex-direction: column;
      flex-grow: 0;
    }
    
    button:not(.date-display-button), select, .date-display-button {
      width: auto;
      min-width: 180px;
    }
  }
  .photo-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .photo-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>