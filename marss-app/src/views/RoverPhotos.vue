<template>
  <div class="rover-photos-view">
    <div class="stars-background">
      <div class="stars-layer stars-small"></div>
      <div class="stars-layer stars-medium"></div>
      <div class="stars-layer stars-large"></div>
    </div>

    <button 
      v-if="milestoneInfo && !showMissionModal" 
      @click="showMissionModal = true" 
      class="mission-info-trigger"
      title="Ver información de la misión"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <path d="M12 16V12M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span class="trigger-text">Info de Misión</span>
    </button>

    <div v-if="milestoneInfo && showMissionModal" class="context-modal">
      <button @click="showMissionModal = false" class="close-modal-btn">&times;</button>
      
      <div class="modal-header">
        <div class="modal-badge">MISIÓN ACTIVA</div>
        <h4>Contexto de la Misión</h4>
        <h3>{{ milestoneInfo.title }}</h3>
      </div>

      <div class="modal-content-section">
        <p>{{ milestoneInfo.description }}</p>

        <div class="modal-stats">
          <div class="stat-item">
            <div class="stat-icon">☀️</div>
            <div class="stat-content">
              <span class="stat-label">Sol de la Misión</span>
              <span class="stat-value">{{ milestoneInfo.sol }}</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">🛣️</div>
            <div class="stat-content">
              <span class="stat-label">Distancia Recorrida</span>
              <span class="stat-value">{{ milestoneInfo.distance }}</span>
            </div>
          </div>
        </div>

        <a :href="milestoneInfo.link" target="_blank" rel="noopener noreferrer" class="more-info-btn">
          <span>Saber Más en NASA.gov</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>

    <header class="header">
      <div class="header-badge">EXPLORADOR DE MISIÓN</div>
      <h1>
        <span class="title-main">Curiosity Mars Rover</span>
        <span class="title-sub">Archivo Fotográfico</span>
      </h1>
      <p class="header-description">
        Accede al archivo completo de imágenes capturadas por el rover Curiosity en la superficie de Marte. 
        Filtra por fecha y cámara para explorar miles de fotografías del Planeta Rojo.
      </p>
    </header>

    <div class="controls-container">
      <div class="controls">
        <div class="filter-group">
          <label>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
              <path d="M14 2V6M6 2V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M3 8H17" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            Fecha de Captura
          </label>
          <button class="date-display-button" @click="isCalendarOpen = true">
            <span>{{ formattedDate }}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div class="filter-group">
          <label for="camera-select">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="10" cy="11" r="3" stroke="currentColor" stroke-width="1.5"/>
              <path d="M7 5L8 3H12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Sistema de Cámara
          </label>
          <select id="camera-select" v-model="selectedCamera">
            <option value="">Todas las Cámaras</option>
            <option v-for="camera in cameras" :key="camera.abbr" :value="camera.abbr">
              {{ camera.name }} ({{ camera.abbr }})
            </option>
          </select>
        </div>
      </div>

      <div class="results-info" v-if="photos.length > 0">
        <div class="results-count">
          <span class="count-number">{{ photos.length }}</span>
          <span class="count-label">imágenes cargadas</span>
        </div>
        <div class="results-meta">
          Página {{ currentPage }} {{ isLastPage ? '(última)' : '' }}
        </div>
      </div>
    </div>

    <CalendarModal
      v-if="isCalendarOpen"
      :initial-date="selectedDate"
      @close="isCalendarOpen = false"
      @date-selected="updateDate"
    />

    <div v-if="isLoading" class="feedback-message loading">
      <div class="loading-animation">
        <div class="rover-icon">🛰️</div>
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <p>Transmitiendo datos desde Marte...</p>
    </div>

    <div v-else-if="error" class="feedback-message error">
      <div class="error-icon">⚠️</div>
      <p>{{ error }}</p>
      <button @click="fetchPhotos" class="retry-button">Reintentar Conexión</button>
    </div>

    <div v-else-if="photos.length > 0" class="content-section">
      <div class="photo-grid">
        <div 
          v-for="(photo, index) in photos" 
          :key="photo.id" 
          class="photo-card"
          :style="{ animationDelay: `${index * 0.05}s` }"
        >
          <div class="photo-wrapper" @click="openLightbox(photo)">
            <img :src="photo.img_src" :alt="`Foto del rover en Marte - ${photo.camera.full_name}`" loading="lazy" />
            <div class="photo-overlay">
              <div class="overlay-content">
                <div class="camera-badge">{{ photo.camera.name }}</div>
                <button class="view-full-btn" @click.stop="openLightbox(photo)">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4L10 16M4 10L16 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="photo-info">
            <div class="info-row">
              <span class="info-label">Instrumento</span>
              <span class="info-value">{{ photo.camera.full_name }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Fecha</span>
              <span class="info-value">{{ formatDateShort(photo.earth_date) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <button
          @click="previousPage"
          :disabled="currentPage === 1 || isLoading"
          class="pagination-btn pagination-prev"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Anterior</span>
        </button>

        <div class="pagination-numbers">
          <button
            v-for="pageNumber in paginationNumbers"
            :key="pageNumber"
            @click="goToPage(pageNumber)"
            class="page-number"
            :class="{ active: pageNumber === currentPage }"
          >
            {{ pageNumber }}
          </button>
        </div>

        <button
          @click="nextPage"
          :disabled="isLastPage || isLoading"
          class="pagination-btn pagination-next"
        >
          <span>Siguiente</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 4L14 10L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div v-else-if="hasSearched" class="feedback-message empty">
      <div class="empty-icon">🔍</div>
      <h3>No se encontraron imágenes</h3>
      <p>No hay fotografías disponibles para la fecha y filtros seleccionados.</p>
      <button @click="resetFilters" class="reset-button">Restablecer Filtros</button>
    </div>

    <div v-if="expandedPhoto" class="lightbox-backdrop" @click="closeLightbox">
      <button @click="closeLightbox" class="lightbox-close">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M24 8L8 24M8 8L24 24" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </button>
      
      <div class="lightbox-content" @click.stop>
        <div class="lightbox-image-container">
          <img :src="expandedPhoto.img_src" :alt="`Foto expandida del rover`" />
        </div>
        
        <div class="lightbox-info">
          <div class="info-header">
            <div class="camera-name">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="13" r="3.5" stroke="currentColor" stroke-width="2"/>
                <path d="M8 6L9.5 3H14.5L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>{{ expandedPhoto.camera.full_name }}</span>
            </div>
            <div class="photo-id">ID: {{ expandedPhoto.id }}</div>
          </div>
          
          <div class="info-details">
            <div class="detail-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="3" width="16" height="15" rx="2" stroke="currentColor" stroke-width="1.5"/>
                <path d="M14 2V5M6 2V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M2 8H18" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              <div>
                <span class="detail-label">Fecha terrestre</span>
                <span class="detail-value">{{ expandedPhoto.earth_date }}</span>
              </div>
            </div>
            
            <div class="detail-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/>
                <path d="M10 6V10L13 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <div>
                <span class="detail-label">Sol marciano</span>
                <span class="detail-value">{{ expandedPhoto.sol }}</span>
              </div>
            </div>
            
            <div class="detail-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L13 6L18 7L14 11L15 17L10 14L5 17L6 11L2 7L7 6L10 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
              <div>
                <span class="detail-label">Rover</span>
                <span class="detail-value">{{ expandedPhoto.rover.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router'; 
import CalendarModal from '../components/CalendarModal.vue';

const route = useRoute();

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
const milestoneInfo = ref(null);
const showMissionModal = ref(false);
const expandedPhoto = ref(null); // Para el lightbox

const cameras = ref([
  { abbr: 'FHAZ', name: 'Front Hazard' },
  { abbr: 'RHAZ', name: 'Rear Hazard' },
  { abbr: 'MAST', name: 'Mast Camera' },
  { abbr: 'CHEMCAM', name: 'ChemCam' },
  { abbr: 'MAHLI', name: 'MAHLI' },
  { abbr: 'MARDI', name: 'MARDI' },
  { abbr: 'NAVCAM', name: 'NavCam' },
]);

const formattedDate = computed(() => {
  const date = new Date(selectedDate.value + 'T00:00:00');
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
});

const formatDateShort = (dateString) => {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

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

const goToPage = async (pageNumber) => {
  if (pageNumber === currentPage.value) return;
  currentPage.value = pageNumber;
  await fetchPhotos();
  
  // Scroll inmediato y luego suave
  await nextTick();
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
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
    error.value = "Error de comunicación con el servidor de la NASA. Verifica tu conexión.";
    photos.value = [];
  } finally {
    isLoading.value = false;
  }
};

const searchPhotos = async () => {
  currentPage.value = 1;
  hasSearched.value = true;
  await fetchPhotos();
  
  // Scroll hasta arriba
  await nextTick();
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
};

const nextPage = async () => {
  if (!isLastPage.value) {
    currentPage.value++;
    await fetchPhotos();
    
    // Scroll hasta arriba
    await nextTick();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }
};

const previousPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    await fetchPhotos();
    
    // Scroll hasta arriba
    await nextTick();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }
};

const updateDate = (newDate) => {
  selectedDate.value = newDate;
  isCalendarOpen.value = false;
};

const resetFilters = () => {
  selectedDate.value = '2017-12-15';
  selectedCamera.value = '';
};

const openLightbox = (photo) => {
  expandedPhoto.value = photo;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  expandedPhoto.value = null;
  document.body.style.overflow = '';
};

onMounted(() => {
  if (route.query.title) {
    milestoneInfo.value = {
      title: route.query.title,
      description: route.query.description,
      sol: route.query.sol,
      distance: route.query.distance,
      link: route.query.link,
    };
    // No abrimos el modal automáticamente
    showMissionModal.value = false;
  }

  if (route.query.date) {
    selectedDate.value = route.query.date;
  }

  if (route.query.camera) {
    selectedCamera.value = route.query.camera;
  } else if (route.query.date) {
    selectedCamera.value = '';
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
$space-black: #000000;
$card-bg: rgba(20, 20, 30, 0.85);
$border-color: rgba(255, 255, 255, 0.1);
$text-primary: #FFFFFF;
$text-secondary: rgba(255, 255, 255, 0.7);
$text-tertiary: rgba(255, 255, 255, 0.5);

// FONDO ESPACIAL CON ESTRELLAS
.stars-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  z-index: -1;
}

.stars-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: repeat;
}

.stars-small {
  background-image: 
    radial-gradient(2px 2px at 20px 30px, white, transparent),
    radial-gradient(2px 2px at 60px 70px, white, transparent),
    radial-gradient(1px 1px at 50px 50px, white, transparent),
    radial-gradient(1px 1px at 130px 80px, white, transparent),
    radial-gradient(2px 2px at 90px 10px, white, transparent);
  background-size: 200px 200px;
  animation: twinkle 3s ease-in-out infinite;
}

.stars-medium {
  background-image: 
    radial-gradient(3px 3px at 100px 150px, rgba(255,255,255,0.8), transparent),
    radial-gradient(2px 2px at 180px 80px, rgba(255,255,255,0.8), transparent);
  background-size: 300px 300px;
  animation: twinkle 4s ease-in-out infinite 1s;
}

.stars-large {
  background-image: 
    radial-gradient(4px 4px at 250px 100px, rgba(255,255,255,0.6), transparent),
    radial-gradient(3px 3px at 350px 200px, rgba(255,255,255,0.6), transparent);
  background-size: 400px 400px;
  animation: twinkle 5s ease-in-out infinite 2s;
}

@keyframes twinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

// CONTENEDOR PRINCIPAL
.rover-photos-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif;
  color: $text-primary;
  position: relative;
  min-height: 100vh;
}

// BOTÓN FLOTANTE DE INFO DE MISIÓN
.mission-info-trigger {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, rgba(11, 61, 145, 0.95), rgba(21, 101, 192, 0.95));
  backdrop-filter: blur(20px);
  color: white;
  border: 1px solid rgba(11, 61, 145, 0.5);
  padding: 1rem 1.5rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  z-index: 90;
  box-shadow: 0 10px 40px rgba(11, 61, 145, 0.4), 0 0 20px rgba(11, 61, 145, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.5px;
  
  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .trigger-text {
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: white;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -4px;
    right: -4px;
    width: 12px;
    height: 12px;
    background: #4ade80;
    border-radius: 50%;
    border: 2px solid rgba(10, 10, 20, 0.95);
    animation: pulse-notification 2s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 15px 50px rgba(11, 61, 145, 0.6), 0 0 30px rgba(11, 61, 145, 0.3);
    
    svg {
      transform: rotate(15deg) scale(1.1);
    }

    .trigger-text::after {
      width: 100%;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }
}

@keyframes pulse-notification {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}

// MODAL DE CONTEXTO
.context-modal {
  position: fixed;
  top: 100px;
  right: 20px;
  width: 380px;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  overflow-x: hidden;
  background: linear-gradient(135deg, rgba(11, 61, 145, 0.15), rgba(10, 10, 20, 0.98));
  backdrop-filter: blur(30px);
  border-radius: 20px;
  border: 1px solid rgba(11, 61, 145, 0.4);
  padding: 0;
  z-index: 100;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7), 0 0 1px rgba(11, 61, 145, 0.5);
  animation: slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  // Custom scrollbar
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(11, 61, 145, 0.5);
    border-radius: 10px;

    &:hover {
      background: rgba(11, 61, 145, 0.7);
    }
  }

  .close-modal-btn {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: $text-primary;
    font-size: 1.5rem;
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 10;
    line-height: 1;

    &:hover {
      background: rgba(252, 61, 33, 0.2);
      border-color: rgba(252, 61, 33, 0.5);
      transform: rotate(90deg);
    }
  }

  // Header section
  .modal-header {
    padding: 2rem 2rem 1.5rem 2rem;
    background: linear-gradient(180deg, rgba(11, 61, 145, 0.1), transparent);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
  }

  .modal-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, rgba(11, 61, 145, 0.8), rgba(21, 101, 192, 0.8));
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    margin-bottom: 1.25rem;
    box-shadow: 0 4px 15px rgba(11, 61, 145, 0.3);

    &::before {
      content: '';
      width: 6px;
      height: 6px;
      background: #4ade80;
      border-radius: 50%;
      animation: pulse-glow 2s ease-in-out infinite;
    }
  }

  h4 {
    margin: 0 0 0.75rem 0;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    font-size: 0.7rem;
    letter-spacing: 2px;
    font-weight: 700;
  }

  h3 {
    margin: 0;
    color: $text-primary;
    font-size: 1.3rem;
    line-height: 1.4;
    font-weight: 700;
    padding-right: 2.5rem;
  }

  // Content section
  .modal-content-section {
    padding: 1.5rem 2rem 2rem 2rem;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.75);
    margin: 0 0 1.75rem 0;
  }

  .modal-stats {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 14px;
    padding: 1.5rem;
    margin-bottom: 1.75rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    
    &:not(:last-child) {
      margin-bottom: 1.25rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .stat-icon {
      font-size: 1.75rem;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(11, 61, 145, 0.3), rgba(11, 61, 145, 0.15));
      border-radius: 12px;
      border: 1px solid rgba(11, 61, 145, 0.3);
      flex-shrink: 0;
    }

    .stat-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      min-width: 0;
    }

    .stat-label {
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.5);
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 700;
    }

    .stat-value {
      font-size: 1.15rem;
      color: $text-primary;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
  }

  .more-info-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 86%;
    background: linear-gradient(135deg, $nasa-blue, #1565C0);
    color: white;
    padding: 1.1rem 1.5rem;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 20px rgba(11, 61, 145, 0.3);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(11, 61, 145, 0.5);
      background: linear-gradient(135deg, #1565C0, #0B3D91);

      &::before {
        left: 100%;
      }
    }

    svg {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover svg {
      transform: translateX(4px);
    }
  }
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 8px #4ade80;
  }
  50% {
    opacity: 0.6;
    box-shadow: 0 0 4px #4ade80;
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// HEADER
.header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem 0;
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  .header-badge {
    display: inline-block;
    background: linear-gradient(135deg, rgba($nasa-red, 0.2), rgba($nasa-blue, 0.2));
    border: 1px solid rgba($nasa-blue, 0.3);
    color: $text-secondary;
    padding: 0.5rem 1.5rem;
    border-radius: 24px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(10px);
  }

  h1 {
    margin: 0 0 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .title-main {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, $text-primary, rgba($nasa-blue, 1));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -1px;
    }

    .title-sub {
      font-size: 1.5rem;
      font-weight: 400;
      color: $text-secondary;
      letter-spacing: 3px;
      text-transform: uppercase;
    }
  }

  .header-description {
    max-width: 700px;
    margin: 0 auto;
    font-size: 1.05rem;
    line-height: 1.7;
    color: $text-secondary;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// CONTROLES
.controls-container {
  margin-bottom: 3rem;
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
}

.controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  background: $card-bg;
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid $border-color;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      font-size: 0.85rem;
      color: $text-secondary;
      text-transform: uppercase;
      letter-spacing: 1px;

      svg {
        opacity: 0.7;
      }
    }

    select,
    .date-display-button {
      width: 100%;
      background: rgba(0, 0, 0, 0.4);
      color: $text-primary;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 1rem 1.25rem;
      border-radius: 12px;
      font-family: inherit;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.5);
        border-color: rgba($nasa-blue, 0.5);
      }

      &:focus {
        outline: none;
        border-color: $nasa-blue;
        box-shadow: 0 0 0 3px rgba($nasa-blue, 0.2);
      }
    }

    .date-display-button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;

      svg {
        opacity: 0.5;
        transition: transform 0.3s;
      }

      &:hover svg {
        transform: translateY(2px);
      }
    }
  }
}

.results-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(11, 61, 145, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(11, 61, 145, 0.2);

  .results-count {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;

    .count-number {
      font-size: 1.5rem;
      font-weight: 700;
      color: $nasa-blue;
    }

    .count-label {
      font-size: 0.9rem;
      color: $text-secondary;
    }
  }

  .results-meta {
    font-size: 0.9rem;
    color: $text-tertiary;
  }
}

// MENSAJES DE FEEDBACK
.feedback-message {
  text-align: center;
  padding: 4rem 2rem;
  background: $card-bg;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid $border-color;
  animation: fadeIn 0.5s;

  &.loading {
    .loading-animation {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 1.5rem;

      .rover-icon {
        font-size: 4rem;
        animation: float 3s ease-in-out infinite;
      }

      .loading-dots {
        display: flex;
        gap: 0.5rem;

        span {
          width: 10px;
          height: 10px;
          background: $nasa-blue;
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;

          &:nth-child(2) {
            animation-delay: 0.2s;
          }

          &:nth-child(3) {
            animation-delay: 0.4s;
          }
        }
      }
    }

    p {
      font-size: 1.1rem;
      color: $text-secondary;
    }
  }

  &.error {
    border-color: rgba($nasa-red, 0.3);

    .error-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    p {
      color: $nasa-red;
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }

    .retry-button {
      background: linear-gradient(135deg, $nasa-red, #D32F2F);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba($nasa-red, 0.4);
      }
    }
  }

  &.empty {
    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      color: $text-secondary;
      margin-bottom: 2rem;
    }

    .reset-button {
      background: linear-gradient(135deg, $nasa-blue, #1565C0);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba($nasa-blue, 0.4);
      }
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

// GRID DE FOTOS
.content-section {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.photo-card {
  background: $card-bg;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid $border-color;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInScale 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(11, 61, 145, 0.3);
    border-color: rgba($nasa-blue, 0.5);

    .photo-wrapper img {
      transform: scale(1.1);
    }

    .photo-overlay {
      opacity: 1;
    }
  }

  .photo-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(11, 61, 145, 0.1), rgba(0, 0, 0, 0.5));
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .photo-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
      opacity: 0;
      transition: opacity 0.4s;
      display: flex;
      align-items: flex-end;
      padding: 1.5rem;

      .overlay-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .camera-badge {
          background: rgba($nasa-blue, 0.9);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        .view-full-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          backdrop-filter: blur(10px);

          &:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(90deg);
          }
        }
      }
    }
  }

  .photo-info {
    padding: 1.25rem;

    .info-row {
      &:not(:last-child) {
        margin-bottom: 1rem;
      }

      .info-label {
        display: block;
        color: $text-tertiary;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 600;
        margin-bottom: 0.35rem;
      }

      .info-value {
        display: block;
        color: $text-primary;
        font-weight: 600;
        font-size: 0.9rem;
      }
    }
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

// PAGINACIÓN
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;

  .pagination-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: $card-bg;
    backdrop-filter: blur(20px);
    color: $text-primary;
    border: 1px solid $border-color;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover:not(:disabled) {
      background: rgba($nasa-blue, 0.2);
      border-color: $nasa-blue;
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      transform: none;
    }

    svg {
      transition: transform 0.3s;
    }

    &.pagination-prev:hover:not(:disabled) svg {
      transform: translateX(-4px);
    }

    &.pagination-next:hover:not(:disabled) svg {
      transform: translateX(4px);
    }
  }

  .pagination-numbers {
    display: flex;
    gap: 0.5rem;
  }

  .page-number {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $card-bg;
    backdrop-filter: blur(20px);
    color: $text-primary;
    border: 1px solid $border-color;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      background: rgba($nasa-blue, 0.2);
      border-color: $nasa-blue;
      transform: translateY(-2px);
    }

    &.active {
      background: linear-gradient(135deg, $nasa-blue, #1565C0);
      border-color: $nasa-blue;
      box-shadow: 0 5px 20px rgba($nasa-blue, 0.4);
    }
  }
}

// RESPONSIVE
@media (max-width: 1024px) {
  .context-modal {
    top: 80px;
    right: 1rem;
    left: 1rem;
    width: auto;
    max-height: calc(100vh - 100px);
  }
}

@media (max-width: 768px) {
  .rover-photos-view {
    padding: 1rem;
  }

  .mission-info-trigger {
    bottom: 1.5rem;
    right: 1.5rem;
    padding: 0.85rem 1.25rem;
    font-size: 0.9rem;
    
    .trigger-text {
      display: none;
    }

    svg {
      width: 22px;
      height: 22px;
    }

    &::before {
      top: -3px;
      right: -3px;
      width: 10px;
      height: 10px;
    }
  }

  .context-modal {
    top: 60px;
    right: 0.75rem;
    left: 0.75rem;
    max-height: calc(100vh - 80px);
  }

  .header {
    margin-bottom: 2rem;

    h1 .title-main {
      font-size: 2rem;
    }

    h1 .title-sub {
      font-size: 1rem;
    }
  }

  .controls {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  .results-info {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .photo-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 0.5rem;

    .pagination-btn span {
      display: none;
    }
  }
}

// LIGHTBOX
.lightbox-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.3s ease-out;
  overflow-y: auto;
}

.lightbox-close {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 3001;

  &:hover {
    background: rgba($nasa-red, 0.3);
    border-color: $nasa-red;
    transform: rotate(90deg);
  }
}

.lightbox-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1400px;
  width: 100%;
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.lightbox-image-container {
  background: rgba(20, 20, 30, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.8);

  img {
    width: 100%;
    height: auto;
    display: block;
    max-height: 70vh;
    object-fit: contain;
  }
}

.lightbox-info {
  background: $card-bg;
  backdrop-filter: blur(30px);
  border: 1px solid rgba($nasa-blue, 0.3);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);

  .info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .camera-name {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.25rem;
      font-weight: 700;
      color: $text-primary;

      svg {
        color: $nasa-blue;
      }
    }

    .photo-id {
      font-size: 0.9rem;
      color: $text-tertiary;
      font-weight: 600;
      font-family: 'Courier New', monospace;
    }
  }

  .info-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .detail-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem 1.25rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);

    svg {
      color: $nasa-blue;
      flex-shrink: 0;
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .detail-label {
      font-size: 0.8rem;
      color: $text-tertiary;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }

    .detail-value {
      font-size: 1rem;
      color: $text-primary;
      font-weight: 700;
    }
  }
}

// RESPONSIVE
@media (max-width: 1024px) {
  .context-modal {
    top: 80px;
    right: 1rem;
    left: 1rem;
    width: auto;
    max-height: calc(100vh - 100px);
  }
}

@media (max-width: 768px) {
  .rover-photos-view {
    padding: 1rem;
  }

  .mission-info-trigger {
    bottom: 1.5rem;
    right: 1.5rem;
    padding: 0.85rem 1.25rem;
    font-size: 0.9rem;
    
    .trigger-text {
      display: none;
    }

    svg {
      width: 22px;
      height: 22px;
    }

    &::before {
      top: -3px;
      right: -3px;
      width: 10px;
      height: 10px;
    }
  }

  .context-modal {
    top: 60px;
    right: 0.75rem;
    left: 0.75rem;
    max-height: calc(100vh - 80px);
  }

  .header {
    margin-bottom: 2rem;

    h1 .title-main {
      font-size: 2rem;
    }

    h1 .title-sub {
      font-size: 1rem;
    }
  }

  .controls {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  .results-info {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .photo-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 0.5rem;

    .pagination-btn span {
      display: none;
    }
  }

  // Lightbox responsive
  .lightbox-backdrop {
    padding: 1rem;
  }

  .lightbox-close {
    top: 1rem;
    right: 1rem;
    width: 48px;
    height: 48px;
  }

  .lightbox-content {
    gap: 1.5rem;
  }

  .lightbox-image-container img {
    max-height: 50vh;
  }

  .lightbox-info {
    padding: 1.5rem;

    .info-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;

      .camera-name {
        font-size: 1.1rem;
      }
    }

    .info-details {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .detail-item {
      padding: 0.85rem 1rem;
    }
  }
}
</style>