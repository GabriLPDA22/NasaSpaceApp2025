<template>
  <div class="routes-view">
    <div class="stars-background">
      <div class="stars-layer stars-small"></div>
      <div class="stars-layer stars-medium"></div>
      <div class="stars-layer stars-large"></div>
    </div>

    <header class="header">
      <div class="header-badge">CARTOGRAFÍA MARCIANA</div>
      <h1>
        <span class="title-main">Rutas del Curiosity</span>
        <span class="title-sub">Travesía por el Planeta Rojo</span>
      </h1>
      <p class="header-description">
        Sigue el recorrido histórico del rover desde su aterrizaje en 2012 hasta sus objetivos 
        científicos más ambiciosos en el Monte Sharp. Cada ruta representa una fase crítica 
        de la misión de exploración.
      </p>
    </header>

    <div class="timeline-container" ref="timelineContainer">
      <div class="timeline-line">
        <div class="line-progress" :style="{ height: scrollProgress + '%' }"></div>
      </div>

      <div 
        v-for="(route, index) in routes" 
        :key="route.id" 
        class="route-item"
        :class="{ 
          'route-right': index % 2 !== 0,
          'is-visible': visibleRoutes.includes(index)
        }"
        ref="routeElements"
      >
        <div class="timeline-dot">
          <div class="dot-inner">
            <div class="dot-number">{{ index + 1 }}</div>
          </div>
          <div class="dot-pulse"></div>
          <div class="dot-rings"></div>
        </div>

        <div class="route-card" @click="viewRouteDetails(route)">
          <div class="route-image-container">
            <img :src="route.image" :alt="route.title" class="route-image" />
            <div class="image-overlay">
              <div class="route-badges">
                <div class="badge-primary">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M8 5V8L11 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  {{ route.sol }}
                </div>
                <div class="badge-secondary">{{ route.date }}</div>
              </div>
              <button class="expand-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 3H21V9M9 21H3V15M21 3L14 10M3 21L10 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="route-content">
            <h3 class="route-title">{{ route.title }}</h3>
            <p class="route-description">{{ route.description }}</p>
            
            <div class="route-meta">
              <div class="meta-item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L12 5L15 2M9 16L12 13L15 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M3 9H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 2"/>
                </svg>
                <span>Cartografía HiRISE</span>
              </div>
              <div class="meta-item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 3V9L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                <span>{{ route.date }}</span>
              </div>
            </div>

            <div class="view-details-btn">
              <span>Explorar Ruta</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 5L13 10L7 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="timeline-end">
        <div class="end-dot">
          <div class="end-inner">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        <div class="end-label">
          <h4>Misión Continúa</h4>
          <p>El rover Curiosity sigue explorando Marte, expandiendo nuestro conocimiento del Planeta Rojo</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import RutaRoja from '../images/RutaRoja.png';
import RutaAmarilla2 from '../images/RutaAmarilla2.png';
import RutaAmarilla from '../images/RutaAmarilla.png';

const routes = ref([
  {
    id: 1,
    title: 'Curiosity Mars Rover\'s Route from Landing to Base of Mount Sharp',
    description: 'Este mapa muestra la ruta recorrida por el rover Curiosity desde su lugar de aterrizaje en agosto de 2012 hasta el afloramiento "Pahrump Hills", que forma parte de la capa basal del Monte Sharp. La travesía cubre los recorridos completados hasta el sol 817.',
    image: RutaRoja,
    sol: 'Sol 817',
    date: '23 Nov 2014',
    url: 'https://www.nasa.gov/image-article/curiosity-mars-rovers-route-from-landing-base-of-mount-sharp/'
  },
  {
    id: 2,
    title: 'Curiosity\'s Traverse Map Through Sol 597',
    description: 'Este mapa muestra la ruta recorrida por el rover Curiosity de Marte de la NASA hasta el sol 597 de la misión del rover en Marte. El trayecto representa meses de exploración científica y navegación por terreno marciano desafiante.',
    image: RutaAmarilla2,
    sol: 'Sol 597',
    date: '11 Abr 2014',
    url: 'https://science.nasa.gov/resource/curiositys-traverse-map-through-sol-597/'
  },
  {
    id: 3,
    title: 'Curiosity Rover Planned Route',
    description: 'Este mosaico, tomado con la cámara HiRISE del orbitador Mars Reconnaissance de la NASA, muestra la ruta planificada del rover Curiosity desde "Pahrump Hills" en la base del Monte Sharp, a través de la "Formación Murray", hacia la cresta de hematita.',
    image: RutaAmarilla,
    sol: 'Ruta Planificada',
    date: '2015-2017',
    url: 'https://science.nasa.gov/resource/curiosity-rover-planned-route-2/'
  }
]);

const timelineContainer = ref(null);
const routeElements = ref([]);
const visibleRoutes = ref([]);
const scrollProgress = ref(0);
const routeProgress = ref([0, 0, 0]); // Progreso individual de cada ruta
const parallaxOffsets = ref([0, 0, 0]); // Offset de parallax para cada ruta

const handleScroll = () => {
  if (!timelineContainer.value) return;

  const rect = timelineContainer.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // Calcular el progreso de la línea del timeline
  const timelineStart = rect.top;
  const timelineHeight = rect.height;
  const activationPoint = windowHeight * 0.2; // La línea comienza cuando el timeline está a 20% de la pantalla
  
  if (timelineStart < activationPoint) {
    const scrolled = activationPoint - timelineStart;
    const totalScrollDistance = timelineHeight + activationPoint;
    const progress = Math.min(100, Math.max(0, (scrolled / totalScrollDistance) * 100));
    scrollProgress.value = progress;
  } else {
    scrollProgress.value = 0;
  }

  // Verificar cada ruta y calcular su progreso individual
  routeElements.value.forEach((el, index) => {
    if (!el) return;
    
    const dot = el.querySelector('.timeline-dot');
    if (!dot) return;

    const dotRect = dot.getBoundingClientRect();
    const dotTop = dotRect.top;
    const dotHeight = dotRect.height;
    
    // Calcular la distancia desde el inicio del timeline hasta este dot
    const dotDistanceFromTimelineStart = dotTop - rect.top;
    const dotPositionPercentage = (dotDistanceFromTimelineStart / timelineHeight) * 100;
    
    // La ruta se activa cuando la línea (scrollProgress) alcanza o supera la posición del dot
    if (scrollProgress.value >= dotPositionPercentage - 5) {
      if (!visibleRoutes.value.includes(index)) {
        visibleRoutes.value.push(index);
      }
      // Calcular progreso individual de aparición (0 a 100)
      const individualProgress = Math.min(100, ((scrollProgress.value - dotPositionPercentage + 5) / 10) * 100);
      routeProgress.value[index] = individualProgress;
    } else {
      // Asegurar que no esté visible si la línea no ha llegado
      const visibleIndex = visibleRoutes.value.indexOf(index);
      if (visibleIndex > -1) {
        visibleRoutes.value.splice(visibleIndex, 1);
      }
      routeProgress.value[index] = 0;
    }

    // Efecto Parallax - las imágenes se mueven según el scroll
    const cardRect = el.getBoundingClientRect();
    const cardCenter = cardRect.top + cardRect.height / 2;
    const distanceFromCenter = (windowHeight / 2) - cardCenter;
    const parallaxSpeed = 0.15; // Velocidad del parallax
    parallaxOffsets.value[index] = distanceFromCenter * parallaxSpeed;
  });
};

const viewRouteDetails = (route) => {
  if (route.url) {
    window.open(route.url, '_blank');
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  
  // Check inicial después de que el DOM esté listo
  setTimeout(() => {
    handleScroll();
  }, 200);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleScroll);
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

// FONDO ESPACIAL
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
.routes-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif;
  color: $text-primary;
  position: relative;
  min-height: 100vh;
}

// HEADER
.header {
  text-align: center;
  margin-bottom: 5rem;
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
      font-size: 3.5rem;
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
    max-width: 800px;
    margin: 0 auto;
    font-size: 1.1rem;
    line-height: 1.8;
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

// TIMELINE
.timeline-container {
  position: relative;
  padding: 3rem 0 5rem 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 100px;
  width: 3px;
  transform: translateX(-50%);
  background: rgba($nasa-blue, 0.2);
  overflow: hidden;

  .line-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to bottom, 
      $nasa-blue,
      #1565C0,
      rgba($nasa-blue, 0.8)
    );
    transition: height 0.3s ease-out;
    box-shadow: 0 0 20px rgba($nasa-blue, 0.5);
  }
}

// ROUTE ITEMS
.route-item {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 3rem;
  margin-bottom: 8rem;
  
  &:last-child {
    margin-bottom: 4rem;
  }

  // Cards OCULTAS por defecto
  .route-card {
    opacity: 0;
    visibility: hidden;
    transform: scale(0.8) translateY(100px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  // Cards VISIBLES cuando la línea las alcanza
  &.is-visible .route-card {
    opacity: 1;
    visibility: visible;
    transform: scale(1) translateY(0);
  }

  &.route-right {
    .route-card {
      grid-column: 3;
      transform: scale(0.8) translateY(100px) translateX(100px);
    }

    &.is-visible .route-card {
      transform: scale(1) translateY(0) translateX(0);
    }
  }

  &:not(.route-right) {
    .route-card {
      grid-column: 1;
      transform: scale(0.8) translateY(100px) translateX(-100px);
    }

    &.is-visible .route-card {
      transform: scale(1) translateY(0) translateX(0);
    }
  }
}

// Animaciones removidas - ahora controladas por is-visible
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100px) translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px) translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

// TIMELINE DOT
.timeline-dot {
  grid-column: 2;
  position: relative;
  width: 60px;
  height: 60px;
  align-self: start;
  margin-top: 3rem;
  z-index: 10;

  .dot-inner {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, $nasa-blue, #1565C0);
    border-radius: 50%;
    border: 4px solid rgba(10, 10, 20, 0.95);
    box-shadow: 
      0 0 0 8px rgba($nasa-blue, 0.2),
      0 10px 30px rgba($nasa-blue, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;

    .dot-number {
      font-size: 1.5rem;
      font-weight: 800;
      color: white;
    }
  }

  .dot-pulse {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: $nasa-blue;
    border-radius: 50%;
    animation: pulse-dot 2s ease-out infinite;
    z-index: 1;
  }

  .dot-rings {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: expanding-rings 3s ease-out infinite;
    z-index: 0;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 2px solid $nasa-blue;
      border-radius: 50%;
      animation: ring-expand 3s ease-out infinite;
    }

    &::before {
      width: 120%;
      height: 120%;
    }

    &::after {
      width: 150%;
      height: 150%;
      animation-delay: 1s;
    }
  }
}

@keyframes pulse-dot {
  0% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2);
  }
}

@keyframes ring-expand {
  0% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.8);
  }
}

// ROUTE CARD
.route-card {
  background: $card-bg;
  backdrop-filter: blur(20px);
  border: 1px solid $border-color;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, $nasa-blue, #1565C0, $nasa-red);
    opacity: 0;
    transition: opacity 0.4s;
  }

  // Hover solo se aplica cuando la card está visible
  .route-item.is-visible &:hover {
    transform: translateY(-12px) scale(1.02) !important;
    border-color: rgba($nasa-blue, 0.6);
    box-shadow: 0 25px 70px rgba(11, 61, 145, 0.5);

    &::before {
      opacity: 1;
    }

    .image-overlay {
      opacity: 1;
    }

    .expand-btn {
      opacity: 1;
      transform: translate(0, 0);
    }

    .view-details-btn {
      background: linear-gradient(135deg, $nasa-blue, #1565C0);
      transform: translateX(5px);
    }
  }
}

.route-image-container {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba($nasa-blue, 0.1), rgba(0, 0, 0, 0.5));

  .route-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-out;
    will-change: transform;
    // El parallax se aplica inline via :style
    // La escala está incluida en el style para el efecto parallax
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, 
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.4s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
  }

  .route-badges {
    display: flex;
    gap: 0.75rem;
    align-self: flex-start;
  }

  .badge-primary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba($nasa-blue, 0.9);
    backdrop-filter: blur(10px);
    padding: 0.6rem 1.2rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.95rem;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .badge-secondary {
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    padding: 0.6rem 1.2rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.9rem;
    color: $text-secondary;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .expand-btn {
    align-self: flex-end;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transform: translate(20px, 20px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translate(0, 0) rotate(90deg);
    }
  }
}

.route-content {
  padding: 2.5rem;

  .route-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: $text-primary;
    margin: 0 0 1.25rem 0;
    line-height: 1.3;
  }

  .route-description {
    font-size: 1.05rem;
    line-height: 1.7;
    color: $text-secondary;
    margin: 0 0 2rem 0;
  }

  .route-meta {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.95rem;
    color: $text-tertiary;
    font-weight: 600;

    svg {
      color: $nasa-blue;
      opacity: 0.8;
    }
  }

  .view-details-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba($nasa-blue, 0.2);
    border: 1px solid rgba($nasa-blue, 0.4);
    color: $text-primary;
    padding: 1rem 1.75rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    svg {
      transition: transform 0.3s;
    }
  }
}

// TIMELINE END
.timeline-end {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding-top: 2rem;

  .end-dot {
    position: relative;
    width: 80px;
    height: 80px;

    .end-inner {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, $nasa-blue, #1565C0);
      border-radius: 50%;
      border: 5px solid rgba(10, 10, 20, 0.95);
      box-shadow: 
        0 0 0 10px rgba($nasa-blue, 0.2),
        0 10px 40px rgba($nasa-blue, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: rotate-star 20s linear infinite;

      svg {
        color: white;
      }
    }
  }

  .end-label {
    text-align: center;
    max-width: 500px;

    h4 {
      font-size: 1.8rem;
      font-weight: 700;
      color: $nasa-blue;
      margin: 0 0 0.75rem 0;
    }

    p {
      font-size: 1.05rem;
      line-height: 1.6;
      color: $text-secondary;
      margin: 0;
    }
  }
}

@keyframes rotate-star {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// RESPONSIVE
@media (max-width: 1024px) {
  .timeline-line {
    left: 40px;
  }

  .route-item {
    grid-template-columns: auto 1fr;
    gap: 2rem;

    &.route-right .route-card {
      grid-column: 2;
      animation: slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    &:not(.route-right) .route-card {
      grid-column: 2;
      animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
  }

  .timeline-dot {
    grid-column: 1;
    width: 50px;
    height: 50px;

    .dot-number {
      font-size: 1.25rem;
    }
  }
}

@media (max-width: 768px) {
  .routes-view {
    padding: 1rem 1rem 3rem 1rem;
  }

  .header {
    margin-bottom: 3rem;

    h1 .title-main {
      font-size: 2.25rem;
    }

    h1 .title-sub {
      font-size: 1.1rem;
    }

    .header-description {
      font-size: 1rem;
    }
  }

  .timeline-line {
    left: 25px;
  }

  .route-item {
    gap: 1.5rem;
    margin-bottom: 5rem;
  }

  .timeline-dot {
    width: 40px;
    height: 40px;
    margin-top: 2rem;

    .dot-number {
      font-size: 1.1rem;
    }
  }

  .route-image-container {
    height: 300px;
  }

  .route-content {
    padding: 1.75rem;

    .route-title {
      font-size: 1.3rem;
    }

    .route-description {
      font-size: 1rem;
    }

    .route-meta {
      flex-direction: column;
      gap: 1rem;
    }

    .view-details-btn {
      width: 100%;
      justify-content: center;
    }
  }

  .timeline-end {
    .end-dot {
      width: 60px;
      height: 60px;
    }

    .end-label h4 {
      font-size: 1.4rem;
    }
  }
}
</style>