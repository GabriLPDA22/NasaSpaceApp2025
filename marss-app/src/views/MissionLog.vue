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

// CAMBIO: Lista de hitos ampliada a más de 20 eventos y ordenada por fecha.
const milestones = ref([
  {
    date: '2025-08-03',
    title: 'Perforación en "Marias Pass"',
    description: 'Curiosity perfora un objetivo rocoso con un alto contenido de sílice, un hallazgo que intriga a los científicos sobre el pasado acuoso de Marte.',
    camera: '',
    sol: 4620,
    distance: '42.2 km',
    link: 'https://science.nasa.gov/mission/msl-curiosity/news/nasas-curiosity-rover-drilling-at-high-silica-marias-pass/'
  },
  {
    date: '2025-04-15',
    title: 'Panorama de la Cresta Gediz Vallis',
    description: 'El rover ensambla un panorama de 360 grados que ofrece una vista sin precedentes de una cresta formada por antiguos canales de agua y deslizamientos de rocas.',
    camera: '',
    sol: 4512,
    distance: '41.8 km',
    link: 'https://science.nasa.gov/mission/msl-curiosity/nasas-curiosity-captures-stunning-panoramas-of-martian-ridge/'
  },
  {
    date: '2024-12-10',
    title: 'Observando Nubes Noctilucentes',
    description: 'Las cámaras de navegación capturan el movimiento de nubes iridiscentes y de gran altitud, que brillan después del atardecer marciano.',
    camera: '',
    sol: 4380,
    distance: '41.1 km',
    link: 'https://science.nasa.gov/mission/msl-curiosity/nasas-curiosity-rover-captures-shining-clouds-on-mars/'
  },
  {
    date: '2022-08-05',
    title: 'Una Década en Marte',
    description: 'El rover celebra su décimo aniversario en el Planeta Rojo, superando con creces su misión principal de dos años.',
    camera: 'CHEMCAM',
    sol: 3554,
    distance: '28.1 km',
    link: 'https://www.jpl.nasa.gov/news/nasas-curiosity-rover-marks-10-years-on-mars'
  },
  {
    date: '2022-03-23',
    title: 'Travesía por el "Greenheugh Pediment"',
    description: 'El rover completa una travesía desafiante por una ladera de arena y rocas afiladas para alcanzar una nueva región científica.',
    camera: 'NAVCAM',
    sol: 3415,
    distance: '27.6 km',
    link: 'https://mars.nasa.gov/news/9178/nasas-curiosity-captures-martian-views-while-crossing-a-sandy-slope/'
  },
  {
    date: '2022-02-24',
    title: 'La "Flor" de Diagenesis Marciana',
    description: 'MAHLI captura una imagen de una delicada formación mineral, apodada la "flor de Marte", que revela procesos químicos antiguos en las rocas.',
    camera: 'MAHLI',
    sol: 3397,
    distance: '27.5 km',
    link: 'https://science.nasa.gov/mission/msl-curiosity/nasas-curiosity-rover-spots-a-tiny-flower-on-mars/'
  },
  {
    date: '2021-03-18',
    title: 'El Viaje Más Largo en un Sol',
    description: 'Curiosity establece un nuevo récord de conducción, recorriendo 197.5 metros en un solo día marciano (sol).',
    camera: 'NAVCAM',
    sol: 3060,
    distance: '24.8 km',
    link: 'https://mars.nasa.gov/news/8892/nasas-curiosity-rover-drives-past-15-mile-mark/'
  },
  {
    date: '2019-04-06',
    title: 'Estudio de la "Unidad Arcillosa"',
    description: 'El rover llega a una región rica en minerales de arcilla, clave para entender el historial del agua en el cráter Gale.',
    camera: '',
    sol: 2373,
    distance: '21.0 km',
    link: 'https://mars.nasa.gov/news/8472/nasas-curiosity-mars-rover-drills-in-clay-bearing-unit/'
  },
  {
    date: '2018-06-07',
    title: 'Descubrimiento de Moléculas Orgánicas',
    description: 'La NASA anuncia el hallazgo de moléculas orgánicas complejas en rocas de 3.500 millones de años.',
    camera: 'CHEMCAM',
    sol: 2072,
    distance: '19.0 km',
    link: 'https://www.jpl.nasa.gov/news/nasas-curiosity-rover-finds-ancient-organics-in-martian-rocks'
  },
  {
    date: '2018-01-23',
    title: 'Perforación en "Vera Rubin Ridge"',
    description: 'El rover toma muestras de una cresta geológicamente intrigante, revelando la presencia de hematita y otros minerales formados en agua.',
    camera: 'MAHLI',
    sol: 1943,
    distance: '18.1 km',
    link: 'https://mars.nasa.gov/news/8277/curiosity-status-report-sol-1943-drilling-again/'
  },
  {
    date: '2015-08-30',
    title: 'Análisis Detallado de "Big Sky"',
    description: 'El rover utiliza su cámara de mano MAHLI para obtener imágenes microscópicas de la roca "Big Sky", revelando su textura y composición.',
    camera: '',
    sol: 1090,
    distance: '11.1 km',
    link: 'https://mars.nasa.gov/msl/multimedia/raw-images/?order=sol+desc%2Cinstrument_sort+asc%2Csample_type_sort+asc%2C+date_taken+desc&per_page=50&page=0&sol_from=1090&sol_to=1090&camera_instrument=MAHLI'
  },
  {
    date: '2014-12-16',
    title: 'Detección de Pulsos de Metano',
    description: 'Los instrumentos del rover detectan un aumento significativo y temporal en los niveles de metano, un gas que en la Tierra está ligado a procesos biológicos.',
    camera: '',
    sol: 835,
    distance: '9.2 km',
    link: 'https://www.jpl.nasa.gov/news/nasas-curiosity-rover-detects-methane-spike-in-martian-atmosphere'
  },
  {
    date: '2014-09-11',
    title: 'Llegada a la Base del Monte Sharp',
    description: 'Tras un largo viaje, el rover llega a su principal destino científico, la base del Aeolis Mons (Monte Sharp).',
    camera: '',
    sol: 746,
    distance: '9.0 km',
    link: 'https://www.jpl.nasa.gov/news/nasas-mars-rover-curiosity-arrives-at-martian-mountain'
  },
  {
    date: '2014-02-09',
    title: 'Cruce del "Dingo Gap"',
    description: 'Curiosity navega a través de un paso arenoso de un metro de altura flanqueado por dunas para continuar su camino hacia el Monte Sharp.',
    camera: 'NAVCAM',
    sol: 530,
    distance: '5.2 km',
    link: 'https://www.jpl.nasa.gov/images/nasas-curiosity-mars-rover-at-sandy-pass-of-dingo-gap'
  },
  {
    date: '2013-08-20',
    title: 'Observación de un Eclipse Solar',
    description: 'La Mastcam captura una espectacular secuencia de Fobos, la luna más grande de Marte, transitando por delante del Sol.',
    camera: 'MAST',
    sol: 381,
    distance: '1.2 km',
    link: 'https://science.nasa.gov/solar-system/planets/mars/phobos/nasas-curiosity-rover-sees-eclipse-by-martian-moon-phobos/'
  },
  {
    date: '2013-03-12',
    title: 'Evidencia de un Pasado Habitable',
    description: 'El análisis de la primera roca perforada revela la presencia de azufre, nitrógeno, hidrógeno, oxígeno, fósforo y carbono, ingredientes clave para la vida.',
    camera: 'CHEMCAM',
    sol: 215,
    distance: '0.8 km',
    link: 'https://www.jpl.nasa.gov/news/nasas-curiosity-finds-conditions-once-suited-for-ancient-life-on-mars'
  },
  {
    date: '2013-02-09',
    title: 'Primera Muestra de Perforación',
    description: 'Curiosity utiliza su taladro por primera vez para extraer una muestra de polvo de una roca llamada "John Klein".',
    camera: 'MAST',
    sol: 182,
    distance: '0.7 km',
    link: 'https://www.jpl.nasa.gov/news/nasas-curiosity-rover-drills-first-hole-into-martian-rock'
  },
  {
    date: '2012-10-31',
    title: 'Primer Selfie en Marte',
    description: 'Utilizando la cámara en su brazo robótico (MAHLI), el rover toma una serie de imágenes para componer su primer autorretrato en la superficie marciana.',
    camera: 'MAHLI',
    sol: 84,
    distance: '0.5 km',
    link: 'https://mars.nasa.gov/news/1381/nasas-curiosity-rover-takes-first-self-portrait/'
  },
  {
    date: '2012-09-27',
    title: 'Descubrimiento de un Antiguo Lecho Fluvial',
    description: 'Las imágenes de rocas revelan guijarros lisos y redondeados, evidencia concluyente de que un vigoroso arroyo fluyó en esa zona.',
    camera: 'MAST',
    sol: 50,
    distance: '0.4 km',
    link: 'https://www.jpl.nasa.gov/news/nasas-curiosity-rover-finds-old-streambed-on-mars'
  },
  {
    date: '2012-08-06',
    title: 'Aterrizaje en Marte (Amartizaje)',
    description: 'El rover Curiosity aterriza con éxito en el cráter Gale utilizando la compleja maniobra "Sky Crane".',
    camera: 'FHAZ',
    sol: 0,
    distance: '0 km',
    link: 'https://www.jpl.nasa.gov/news/nasas-curiosity-rover-lands-on-mars'
  },
]);

const goToPhotos = (milestone) => {
  const query = { 
    date: milestone.date,
    title: milestone.title,
    description: milestone.description,
    sol: milestone.sol,
    distance: milestone.distance,
    link: milestone.link
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