<template>
  <div class="mission-log-view">
    <header class="header">
      <h1>🚀 Bitácora de Misión: Curiosity</h1>
      <p>Hitos y descubrimientos clave durante el viaje del rover por Marte. Haz clic en un evento para ver las fotos de ese día.</p>
    </header>

    <div class="milestones-container">
      <div 
        v-for="milestone in milestones" 
        :key="milestone.date" 
        class="milestone-card"
        @click="goToPhotos(milestone)"
      >
        <div class="milestone-date">{{ formatDate(milestone.date) }}</div>
        <div class="milestone-content">
          <h3>{{ milestone.title }}</h3>
          <p>{{ milestone.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const milestones = ref([
  // <-- CAMBIO: Nueva noticia añadida al principio
  {
    date: '2025-09-20',
    title: 'Rocas con Posibles Biofirmas',
    description: 'El instrumento MAHLI captura imágenes de alta resolución de texturas rocosas que podrían ser biofirmas, un indicio potencial de vida microbiana pasada en Marte.',
    camera: ''
  },
  {
    date: '2022-08-05',
    title: 'Una Década en Marte',
    description: 'El rover celebra su décimo aniversario en el Planeta Rojo, superando con creces su misión principal de dos años.',
    camera: 'NAVCAM'
  },
  {
    date: '2021-03-18',
    title: 'El Viaje Más Largo en un Sol',
    description: 'Curiosity establece un nuevo récord de conducción, recorriendo 197.5 metros en un solo día marciano (sol).',
    camera: 'NAVCAM'
  },
  {
    date: '2018-06-07',
    title: 'Descubrimiento de Moléculas Orgánicas',
    description: 'La NASA anuncia el hallazgo de moléculas orgánicas complejas en rocas de 3.500 millones de años.',
    camera: 'CHEMCAM'
  },
  {
    date: '2014-09-11',
    title: 'Llegada a la Base del Monte Sharp',
    description: 'Tras un largo viaje, el rover llega a su principal destino científico, la base del Aeolis Mons (Monte Sharp).',
    camera: ''
  },
  {
    date: '2013-02-09',
    title: 'Primera Muestra de Perforación',
    description: 'Curiosity utiliza su taladro por primera vez para extraer una muestra de polvo de una roca llamada "John Klein".',
    camera: 'MAST'
  },
  {
    date: '2012-08-06',
    title: 'Aterrizaje en Marte (Amartizaje)',
    description: 'El rover Curiosity aterriza con éxito en el cráter Gale utilizando la compleja maniobra "Sky Crane".',
    camera: 'FHAZ'
  },
]);

// <-- CAMBIO: La función ahora pasa el objeto 'milestone' entero
const goToPhotos = (milestone) => {
  const query = { 
    date: milestone.date,
    title: milestone.title,
    description: milestone.description
  };
  if (milestone.camera) {
    query.camera = milestone.camera;
  }
  router.push({ path: '/', query: query });
};

const formatDate = (dateString) => {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
};
</script>

<style lang="scss" scoped>
$nasa-blue: #0B3D91;
$light-text: #E0E0E0;
$card-bg: #1E1E1E;
$border-color: #333;

.mission-log-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
  color: $light-text;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  
  h1 {
    font-size: 1.8rem;
    color: white;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: darken($light-text, 20%);
    max-width: 600px;
    margin: auto;
  }
}

.milestone-card {
  display: flex;
  background-color: $card-bg;
  border-left: 5px solid $nasa-blue;
  margin-bottom: 1.5rem;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: lighten($card-bg, 5%);
    transform: translateX(5px);
  }

  .milestone-date {
    padding: 1.5rem;
    background-color: lighten($card-bg, 2%);
    font-weight: bold;
    text-align: center;
    min-width: 150px;
  }

  .milestone-content {
    padding: 1rem 1.5rem;
    
    h3 {
      margin-top: 0;
    }
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 1.5rem;
  }
  
  .milestone-card {
    flex-direction: column;
    
    .milestone-date {
      border-bottom: 1px solid $border-color;
    }
  }
}
</style>