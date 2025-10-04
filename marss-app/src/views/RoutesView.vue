<template>
  <div class="routes-view">
    <header class="header">
      <h1>🗺️ Rutas del Rover Curiosity</h1>
      <p>Explora el recorrido histórico del rover por la superficie marciana.</p>
    </header>

    <div class="routes-container">
      <div 
        v-for="route in routes" 
        :key="route.id" 
        class="route-card"
        @click="viewRouteDetails(route)"
      >
        <div class="route-image">
          <img :src="route.image" :alt="route.title" />
          <div class="route-badge">
            <span class="badge-sol">{{ route.sol }}</span>
            <span class="badge-date">{{ route.date }}</span>
          </div>
        </div>
        <div class="route-content">
          <h3>{{ route.title }}</h3>
          <p>{{ route.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Import images so the bundler (Vite) processes them correctly
import RutaRoja from '../images/RutaRoja.png';
import RutaAmarilla2 from '../images/RutaAmarilla2.png';
import RutaAmarilla from '../images/RutaAmarilla.png';

const router = useRouter();

const routes = ref([
  {
    id: 1,
    title: 'Curiosity Mars Rover’s Route from Landing to Base of Mount Sharp',
    description: 'Este mapa muestra la ruta recorrida por el rover Curiosity desde su lugar de aterrizaje en agosto de 2012 hasta el afloramiento "Pahrump Hills", que forma parte de la capa basal del Monte Sharp. La travesía cubre los recorridos completados hasta el sol 817 (23 de noviembre de 2014).',
    image: RutaRoja,
    sol: 'Sol 817',
    date: 'Nov 23, 2014'
  },
  {
    id: 2,
    title: 'Curiosity’s Traverse Map Through Sol 597',
    description: 'Este mapa muestra la ruta recorrida por el rover Curiosity de Marte de la NASA hasta el sol 597 de la misión del rover en Marte (11 de abril de 2014).',
    image: RutaAmarilla2,
    sol: 'Sol 597',
    date: 'Abr 11, 2014'
  },
  {
    id: 3,
    title: 'Curiosity Rover Planned Route',
    description: 'Este mosaico, tomado con la cámara HiRISE del orbitador Mars Reconnaissance de la NASA, muestra la ruta planificada (en amarillo) del rover Curiosity desde "Pahrump Hills" en la base del Monte Sharp, a través de la "Formación Murray", y hacia el sur hasta la cresta de hematita más arriba en el flanco del Monte Sharp.',
    image: RutaAmarilla,
    sol: 'Ruta Planificada',
    date: '2015-2017'
  }
]);

const viewRouteDetails = (route) => {
  console.log('Viewing route:', route.title);
};
</script>

<style lang="scss" scoped>
$nasa-blue: #0B3D91;
$nasa-red: #FC3D21;
$light-text: #E0E0E0;
$card-bg: #1E1E1E;
$border-color: #333;

.routes-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  color: $light-text;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 2rem;
    color: white;
    margin-bottom: 0.75rem;
    font-weight: 700;
  }

  p {
    font-size: 1.1rem;
    color: darken($light-text, 15%);
    max-width: 700px;
    margin: 0 auto;
  }
}

.routes-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.route-card {
  background: linear-gradient(145deg, lighten($card-bg, 2%), $card-bg);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid $border-color;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba($nasa-blue, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(11, 61, 145, 0.4);
    border-color: $nasa-blue;

    &::before {
      opacity: 1;
    }

    .route-image img {
      transform: scale(1.08);
    }

    .route-badge {
      background-color: $nasa-blue;
    }
  }
}

.route-image {
  width: 100%;
  height: 350px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(to bottom, #1a1a1a, #0a0a0a);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .route-badge {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background-color: rgba($card-bg, 0.95);
    backdrop-filter: blur(10px);
    padding: 0.75rem 1.25rem;
    border-radius: 12px;
    border: 1px solid rgba($nasa-blue, 0.3);
    transition: all 0.3s;
    
    .badge-sol {
      display: block;
      font-weight: 700;
      font-size: 1rem;
      color: white;
      margin-bottom: 0.25rem;
    }

    .badge-date {
      display: block;
      font-size: 0.85rem;
      color: darken($light-text, 20%);
    }
  }
}

.route-content {
  padding: 2rem;
  background-color: $card-bg;

  h3 {
    margin: 0 0 1.25rem 0;
    font-size: 1.5rem;
    color: white;
    font-weight: 600;
    line-height: 1.3;
  }

  p {
    margin: 0;
    line-height: 1.7;
    color: darken($light-text, 10%);
    font-size: 1rem;
  }
}

@media (min-width: 768px) {
  .header h1 {
    font-size: 2.75rem;
  }

  .routes-container {
    gap: 2.5rem;
  }

  .route-image {
    height: 400px;
  }
}

@media (min-width: 1024px) {
  .routes-view {
    padding: 2.5rem;
  }

  .header {
    margin-bottom: 4rem;
  }

  .route-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    
    &:nth-child(even) {
      .route-image {
        order: 2;
      }
    }
  }

  .route-image {
    height: 100%;
    min-height: 450px;
  }

  .route-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem;

    h3 {
      font-size: 1.75rem;
      margin-bottom: 1.5rem;
    }

    p {
      font-size: 1.05rem;
    }
  }
}
</style>