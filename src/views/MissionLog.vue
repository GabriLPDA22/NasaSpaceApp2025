<template>
  <div class="mission-log-view">
    <!-- Fondo espacial con estrellas -->
    <div class="stars-background">
      <div class="stars-layer stars-small"></div>
      <div class="stars-layer stars-medium"></div>
      <div class="stars-layer stars-large"></div>
    </div>

    <header class="header">
      <div class="header-badge">ARCHIVO DE MISIÓN</div>
      <h1>
        <span class="title-main">Bitácora del Curiosity</span>
        <span class="title-sub">Cronología de Descubrimientos</span>
      </h1>
      <p class="header-description">
        Explora los momentos más significativos del viaje del rover Curiosity
        por Marte.
      </p>
    </header>

    <!-- Filtros y Stats -->
    <div class="controls-section">
      <div class="mission-stats">
        <div class="stat-box">
          <div class="stat-value">{{ filteredMilestones.length }}</div>
          <div class="stat-label">
            Hitos
            {{ selectedYear !== "all" ? "en " + selectedYear : "Totales" }}
          </div>
        </div>
        <div class="stat-box">
          <div class="stat-value">{{ yearsActive }}</div>
          <div class="stat-label">Años Activo</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">42.2 km</div>
          <div class="stat-label">Distancia Total</div>
        </div>
      </div>

      <div class="year-filters">
        <button
          v-for="year in availableYears"
          :key="year"
          @click="selectedYear = year"
          class="year-filter-btn"
          :class="{ active: selectedYear === year }"
        >
          {{ year === "all" ? "Todos" : year }}
        </button>
      </div>
    </div>

    <!-- Grid de Milestones -->
    <div class="milestones-grid">
      <div
        v-for="(milestone, index) in filteredMilestones"
        :key="milestone.date"
        class="milestone-card"
        :style="{ animationDelay: `${index * 0.05}s` }"
        @click="goToPhotos(milestone)"
      >
        <div class="card-glow"></div>

        <div class="card-header">
          <div class="date-info">
            <div class="date-main">{{ formatDateShort(milestone.date) }}</div>
            <div class="sol-badge" v-if="milestone.sol">
              Sol {{ milestone.sol }}
            </div>
          </div>
          <div class="year-tag">{{ getYear(milestone.date) }}</div>
        </div>

        <h3 class="milestone-title">{{ milestone.title }}</h3>

        <p class="milestone-description">
          {{ truncateText(milestone.description, 120) }}
        </p>

        <div class="card-footer">
          <div class="metadata">
            <span class="metadata-item" v-if="milestone.distance">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 8H14"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-dasharray="2 2"
                />
              </svg>
              {{ milestone.distance }}
            </span>
            <span class="metadata-item" v-if="milestone.camera">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="3"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
              {{ milestone.camera }}
            </span>
          </div>

          <div class="view-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 6L13 10L7 14V6Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredMilestones.length === 0" class="empty-state">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle
          cx="32"
          cy="32"
          r="30"
          stroke="currentColor"
          stroke-width="2"
          opacity="0.3"
        />
        <path
          d="M32 20V32M32 44H32.02"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
      <h3>No hay hitos para este año</h3>
      <p>Selecciona otro año para ver más descubrimientos</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const selectedYear = ref("all");

const milestones = ref([
  {
    date: "2025-08-03",
    title: 'Perforación en "Marias Pass"',
    description:
      "Curiosity perfora un objetivo rocoso con un alto contenido de sílice, un hallazgo que intriga a los científicos sobre el pasado acuoso de Marte.",
    camera: "",
    sol: 4620,
    distance: "42.2 km",
    link: "https://science.nasa.gov/mission/msl-curiosity/news/nasas-curiosity-rover-drilling-at-high-silica-marias-pass/",
  },
  {
    date: "2025-04-15",
    title: "Panorama de la Cresta Gediz Vallis",
    description:
      "El rover ensambla un panorama de 360 grados que ofrece una vista sin precedentes de una cresta formada por antiguos canales de agua y deslizamientos de rocas.",
    camera: "",
    sol: 4512,
    distance: "41.8 km",
    link: "https://science.nasa.gov/mission/msl-curiosity/nasas-curiosity-captures-stunning-panoramas-of-martian-ridge/",
  },
  {
    date: "2024-12-10",
    title: "Observando Nubes Noctilucentes",
    description:
      "Las cámaras de navegación capturan el movimiento de nubes iridiscentes y de gran altitud, que brillan después del atardecer marciano.",
    camera: "",
    sol: 4380,
    distance: "41.1 km",
    link: "https://science.nasa.gov/mission/msl-curiosity/nasas-curiosity-rover-captures-shining-clouds-on-mars/",
  },
  {
    date: "2022-08-05",
    title: "Una Década en Marte",
    description:
      "El rover celebra su décimo aniversario en el Planeta Rojo, superando con creces su misión principal de dos años.",
    camera: "CHEMCAM",
    sol: 3554,
    distance: "28.1 km",
    link: "https://www.jpl.nasa.gov/news/nasas-curiosity-rover-marks-10-years-on-mars",
  },
  {
    date: "2022-03-23",
    title: 'Travesía por el "Greenheugh Pediment"',
    description:
      "El rover completa una travesía desafiante por una ladera de arena y rocas afiladas para alcanzar una nueva región científica.",
    camera: "NAVCAM",
    sol: 3415,
    distance: "27.6 km",
    link: "https://mars.nasa.gov/news/9178/nasas-curiosity-captures-martian-views-while-crossing-a-sandy-slope/",
  },
  {
    date: "2022-02-24",
    title: 'La "Flor" de Diagenesis Marciana',
    description:
      'MAHLI captura una imagen de una delicada formación mineral, apodada la "flor de Marte", que revela procesos químicos antiguos en las rocas.',
    camera: "MAHLI",
    sol: 3397,
    distance: "27.5 km",
    link: "https://science.nasa.gov/mission/msl-curiosity/nasas-curiosity-rover-spots-a-tiny-flower-on-mars/",
  },
  {
    date: "2021-03-18",
    title: "El Viaje Más Largo en un Sol",
    description:
      "Curiosity establece un nuevo récord de conducción, recorriendo 197.5 metros en un solo día marciano (sol).",
    camera: "NAVCAM",
    sol: 3060,
    distance: "24.8 km",
    link: "https://mars.nasa.gov/news/8892/nasas-curiosity-rover-drives-past-15-mile-mark/",
  },
  {
    date: "2019-04-06",
    title: 'Estudio de la "Unidad Arcillosa"',
    description:
      "El rover llega a una región rica en minerales de arcilla, clave para entender el historial del agua en el cráter Gale.",
    camera: "",
    sol: 2373,
    distance: "21.0 km",
    link: "https://mars.nasa.gov/news/8472/nasas-curiosity-mars-rover-drills-in-clay-bearing-unit/",
  },
  {
    date: "2018-06-07",
    title: "Descubrimiento de Moléculas Orgánicas",
    description:
      "La NASA anuncia el hallazgo de moléculas orgánicas complejas en rocas de 3.500 millones de años.",
    camera: "CHEMCAM",
    sol: 2072,
    distance: "19.0 km",
    link: "https://www.jpl.nasa.gov/news/nasas-curiosity-rover-finds-ancient-organics-in-martian-rocks",
  },
  {
    date: "2018-01-23",
    title: 'Perforación en "Vera Rubin Ridge"',
    description:
      "El rover toma muestras de una cresta geológicamente intrigante, revelando la presencia de hematita y otros minerales formados en agua.",
    camera: "MAHLI",
    sol: 1943,
    distance: "18.1 km",
    link: "https://mars.nasa.gov/news/8277/curiosity-status-report-sol-1943-drilling-again/",
  },
  {
    date: "2015-08-30",
    title: 'Análisis Detallado de "Big Sky"',
    description:
      'El rover utiliza su cámara de mano MAHLI para obtener imágenes microscópicas de la roca "Big Sky", revelando su textura y composición.',
    camera: "",
    sol: 1090,
    distance: "11.1 km",
    link: "https://mars.nasa.gov/msl/multimedia/raw-images/?order=sol+desc%2Cinstrument_sort+asc%2Csample_type_sort+asc%2C+date_taken+desc&per_page=50&page=0&sol_from=1090&sol_to=1090&camera_instrument=MAHLI",
  },
  {
    date: "2014-12-16",
    title: "Detección de Pulsos de Metano",
    description:
      "Los instrumentos del rover detectan un aumento significativo y temporal en los niveles de metano, un gas que en la Tierra está ligado a procesos biológicos.",
    camera: "",
    sol: 835,
    distance: "9.2 km",
    link: "https://www.jpl.nasa.gov/news/nasas-curiosity-rover-detects-methane-spike-in-martian-atmosphere",
  },
  {
    date: "2014-09-11",
    title: "Llegada a la Base del Monte Sharp",
    description:
      "Tras un largo viaje, el rover llega a su principal destino científico, la base del Aeolis Mons (Monte Sharp).",
    camera: "",
    sol: 746,
    distance: "9.0 km",
    link: "https://www.jpl.nasa.gov/news/nasas-mars-rover-curiosity-arrives-at-martian-mountain",
  },
  {
    date: "2014-02-09",
    title: 'Cruce del "Dingo Gap"',
    description:
      "Curiosity navega a través de un paso arenoso de un metro de altura flanqueado por dunas para continuar su camino hacia el Monte Sharp.",
    camera: "NAVCAM",
    sol: 530,
    distance: "5.2 km",
    link: "https://www.jpl.nasa.gov/images/nasas-curiosity-mars-rover-at-sandy-pass-of-dingo-gap",
  },
  {
    date: "2013-08-20",
    title: "Observación de un Eclipse Solar",
    description:
      "La Mastcam captura una espectacular secuencia de Fobos, la luna más grande de Marte, transitando por delante del Sol.",
    camera: "MAST",
    sol: 381,
    distance: "1.2 km",
    link: "https://science.nasa.gov/solar-system/planets/mars/phobos/nasas-curiosity-rover-sees-eclipse-by-martian-moon-phobos/",
  },
  {
    date: "2013-03-12",
    title: "Evidencia de un Pasado Habitable",
    description:
      "El análisis de la primera roca perforada revela la presencia de azufre, nitrógeno, hidrógeno, oxígeno, fósforo y carbono, ingredientes clave para la vida.",
    camera: "CHEMCAM",
    sol: 215,
    distance: "0.8 km",
    link: "https://www.jpl.nasa.gov/news/nasas-curiosity-finds-conditions-once-suited-for-ancient-life-on-mars",
  },
  {
    date: "2013-02-09",
    title: "Primera Muestra de Perforación",
    description:
      'Curiosity utiliza su taladro por primera vez para extraer una muestra de polvo de una roca llamada "John Klein".',
    camera: "MAST",
    sol: 182,
    distance: "0.7 km",
    link: "https://www.jpl.nasa.gov/news/nasas-curiosity-rover-drills-first-hole-into-martian-rock",
  },
  {
    date: "2012-10-31",
    title: "Primer Selfie en Marte",
    description:
      "Utilizando la cámara en su brazo robótico (MAHLI), el rover toma una serie de imágenes para componer su primer autorretrato en la superficie marciana.",
    camera: "MAHLI",
    sol: 84,
    distance: "0.5 km",
    link: "https://mars.nasa.gov/news/1381/nasas-curiosity-rover-takes-first-self-portrait/",
  },
  {
    date: "2012-09-27",
    title: "Descubrimiento de un Antiguo Lecho Fluvial",
    description:
      "Las imágenes de rocas revelan guijarros lisos y redondeados, evidencia concluyente de que un vigoroso arroyo fluyó en esa zona.",
    camera: "MAST",
    sol: 50,
    distance: "0.4 km",
    link: "https://www.jpl.nasa.gov/news/nasas-curiosity-rover-finds-old-streambed-on-mars",
  },
  {
    date: "2012-08-06",
    title: "Aterrizaje en Marte (Amartizaje)",
    description:
      'El rover Curiosity aterriza con éxito en el cráter Gale utilizando la compleja maniobra "Sky Crane".',
    camera: "FHAZ",
    sol: 0,
    distance: "0 km",
    link: "https://www.jpl.nasa.gov/news/nasas-curiosity-rover-lands-on-mars",
  },
]);

const availableYears = computed(() => {
  const years = [...new Set(milestones.value.map((m) => getYear(m.date)))].sort(
    (a, b) => b - a
  );
  return ["all", ...years];
});

const filteredMilestones = computed(() => {
  if (selectedYear.value === "all") {
    return milestones.value;
  }
  return milestones.value.filter((m) => getYear(m.date) === selectedYear.value);
});

const yearsActive = computed(() => {
  const startDate = new Date("2012-08-06");
  const today = new Date();
  return Math.floor((today - startDate) / (365.25 * 24 * 60 * 60 * 1000));
});

const getYear = (dateString) => {
  return new Date(dateString + "T00:00:00").getFullYear().toString();
};

const formatDateShort = (dateString) => {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });
};

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const goToPhotos = (milestone) => {
  const query = {
    date: milestone.date,
    title: milestone.title,
    description: milestone.description,
    sol: milestone.sol,
    distance: milestone.distance,
    link: milestone.link,
  };
  if (milestone.camera) {
    query.camera = milestone.camera;
  }
  router.push({ path: "/", query: query });
};
</script>

<style lang="scss" scoped>
$nasa-blue: #0b3d91;
$nasa-red: #fc3d21;
$space-black: #000000;
$card-bg: rgba(20, 20, 30, 0.85);
$border-color: rgba(255, 255, 255, 0.1);
$text-primary: #ffffff;
$text-secondary: rgba(255, 255, 255, 0.7);
$text-tertiary: rgba(255, 255, 255, 0.5);

// FONDO ESPACIAL
.stars-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  z-index: -1;
}

.stars-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: repeat;
}

.stars-small {
  background-image: radial-gradient(2px 2px at 20px 30px, white, transparent),
    radial-gradient(2px 2px at 60px 70px, white, transparent),
    radial-gradient(1px 1px at 50px 50px, white, transparent),
    radial-gradient(1px 1px at 130px 80px, white, transparent),
    radial-gradient(2px 2px at 90px 10px, white, transparent);
  background-size: 200px 200px;
  animation: twinkle 3s ease-in-out infinite;
}

.stars-medium {
  background-image: radial-gradient(
      3px 3px at 100px 150px,
      rgba(255, 255, 255, 0.8),
      transparent
    ),
    radial-gradient(
      2px 2px at 180px 80px,
      rgba(255, 255, 255, 0.8),
      transparent
    );
  background-size: 300px 300px;
  animation: twinkle 4s ease-in-out infinite 1s;
}

.stars-large {
  background-image: radial-gradient(
      4px 4px at 250px 100px,
      rgba(255, 255, 255, 0.6),
      transparent
    ),
    radial-gradient(
      3px 3px at 350px 200px,
      rgba(255, 255, 255, 0.6),
      transparent
    );
  background-size: 400px 400px;
  animation: twinkle 5s ease-in-out infinite 2s;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

// CONTENEDOR PRINCIPAL
.mission-log-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter",
    sans-serif;
  color: $text-primary;
  position: relative;
  min-height: 100vh;
}

// HEADER
.header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0 1rem 0;
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  .header-badge {
    display: inline-block;
    background: linear-gradient(
      135deg,
      rgba($nasa-red, 0.2),
      rgba($nasa-blue, 0.2)
    );
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
    margin: 0 0 1rem 0;
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

// CONTROLES Y STATS
.controls-section {
  margin-bottom: 3rem;
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
}

.mission-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto 2rem auto;

  .stat-box {
    background: $card-bg;
    backdrop-filter: blur(20px);
    border: 1px solid $border-color;
    border-radius: 16px;
    padding: 1.5rem 1rem;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: translateY(-3px);
      border-color: rgba($nasa-blue, 0.5);
      box-shadow: 0 10px 30px rgba(11, 61, 145, 0.3);
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 800;
      color: $nasa-blue;
      margin-bottom: 0.4rem;
    }

    .stat-label {
      font-size: 0.8rem;
      color: $text-tertiary;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }
  }
}

.year-filters {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  max-width: 900px;
  margin: 0 auto;
}

.year-filter-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $text-secondary;
  padding: 0.65rem 1.25rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.5px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba($nasa-blue, 0.4);
    transform: translateY(-2px);
  }

  &.active {
    background: linear-gradient(135deg, $nasa-blue, #1565c0);
    border-color: $nasa-blue;
    color: white;
    box-shadow: 0 5px 20px rgba($nasa-blue, 0.4);
  }
}

// GRID DE MILESTONES
.milestones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

.milestone-card {
  position: relative;
  background: $card-bg;
  backdrop-filter: blur(20px);
  border: 1px solid $border-color;
  border-radius: 16px;
  padding: 1.75rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  opacity: 0;
  animation: fadeInScale 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  .card-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba($nasa-blue, 0.15) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, $nasa-blue, #1565c0);
    opacity: 0;
    transition: opacity 0.4s;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba($nasa-blue, 0.6);
    box-shadow: 0 15px 50px rgba(11, 61, 145, 0.4);

    .card-glow {
      opacity: 1;
    }

    &::before {
      opacity: 1;
    }

    .view-icon {
      transform: translateX(4px);
      color: $nasa-blue;
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.25rem;
    gap: 1rem;
  }

  .date-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .date-main {
    font-size: 0.9rem;
    color: $text-secondary;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .sol-badge {
    display: inline-block;
    background: linear-gradient(
      135deg,
      rgba($nasa-blue, 0.2),
      rgba($nasa-blue, 0.15)
    );
    border: 1px solid rgba($nasa-blue, 0.3);
    padding: 0.3rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    color: $nasa-blue;
    font-weight: 700;
    letter-spacing: 0.3px;
  }

  .year-tag {
    background: rgba(0, 0, 0, 0.4);
    padding: 0.4rem 0.8rem;
    border-radius: 10px;
    font-size: 0.85rem;
    color: $text-tertiary;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .milestone-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: $text-primary;
    margin: 0 0 1rem 0;
    line-height: 1.3;
    min-height: 2.6em;
  }

  .milestone-description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: $text-secondary;
    margin: 0 0 1.5rem 0;
    min-height: 4.8em;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .metadata {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .metadata-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    color: $text-tertiary;
    font-weight: 600;

    svg {
      opacity: 0.6;
    }
  }

  .view-icon {
    color: $text-tertiary;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// EMPTY STATE
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: $card-bg;
  backdrop-filter: blur(20px);
  border: 1px solid $border-color;
  border-radius: 16px;
  margin: 2rem auto;
  max-width: 500px;

  svg {
    color: $text-tertiary;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
    color: $text-primary;
    margin: 0 0 0.75rem 0;
  }

  p {
    color: $text-secondary;
    margin: 0;
    font-size: 1rem;
  }
}

// RESPONSIVE
@media (max-width: 768px) {
  .mission-log-view {
    padding: 1rem 1rem 3rem 1rem;
  }

  .header {
    margin-bottom: 2rem;

    h1 .title-main {
      font-size: 2rem;
    }

    h1 .title-sub {
      font-size: 1rem;
    }

    .header-description {
      font-size: 1rem;
    }
  }

  .mission-stats {
    grid-template-columns: 1fr;
    gap: 1rem;

    .stat-box {
      padding: 1.25rem 1rem;

      .stat-value {
        font-size: 1.75rem;
      }
    }
  }

  .year-filters {
    gap: 0.5rem;
  }

  .year-filter-btn {
    padding: 0.55rem 1rem;
    font-size: 0.85rem;
  }

  .milestones-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .milestone-card {
    .milestone-title {
      font-size: 1.15rem;
      min-height: auto;
    }

    .milestone-description {
      min-height: auto;
    }
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .milestones-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
