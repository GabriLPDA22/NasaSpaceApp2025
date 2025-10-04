<script setup>
import { ref, computed, onMounted } from 'vue';

// --- ESTRUCTURA DE NIVELES ---
// ¡Aquí puedes configurar los niveles y cambiar las imágenes fácilmente!
// Asegúrate de que las imágenes estén en tu carpeta `public/images/`.
const levels = ref([
  { level: 1, gridSize: 3, imageUrl: '/images/flor.png' },
  { level: 2, gridSize: 4, imageUrl: '/images/foto_2.png' }, // Cambia esto
  { level: 3, gridSize: 4, imageUrl: '/images/foto_3.png' }, // Cambia esto
  { level: 4, gridSize: 4, imageUrl: '/images/foto_4.png' }, // Cambia esto
  { level: 5, gridSize: 5, imageUrl: '/images/foto_5.png' }  // Cambia esto
]);

// --- ESTADO DEL JUEGO ---
const currentLevelIndex = ref(0);
const tiles = ref([]);
const allLevelsCompleted = ref(false);

// --- PROPIEDADES COMPUTADAS (Hacen que el juego sea dinámico) ---
const currentLevel = computed(() => levels.value[currentLevelIndex.value]);
const gridSize = computed(() => currentLevel.value.gridSize);
const imageUrl = computed(() => currentLevel.value.imageUrl);
const tileSize = computed(() => {
  if (gridSize.value === 5) return 80; // Piezas más pequeñas para el 5x5
  if (gridSize.value === 4) return 100; // Tamaño estándar para 4x4
  return 120; // Piezas más grandes para el 3x3
});

const isSolved = computed(() => {
  if (!tiles.value.length || tiles.value[tiles.value.length - 1] !== null) return false;
  for (let i = 0; i < tiles.value.length - 1; i++) {
    if (tiles.value[i] !== i + 1) return false;
  }
  return true;
});

// --- LÓGICA DEL JUEGO ---

function setupLevel(levelIndex) {
  currentLevelIndex.value = levelIndex;
  allLevelsCompleted.value = false;
  
  const size = gridSize.value;
  tiles.value = [...Array(size * size - 1).keys()].map(i => i + 1);
  tiles.value.push(null);
  
  shuffle();
}

function nextLevel() {
  if (currentLevelIndex.value < levels.value.length - 1) {
    setupLevel(currentLevelIndex.value + 1);
  } else {
    allLevelsCompleted.value = true;
  }
}

function moveTile(clickedIndex) {
  if (isSolved.value) return;

  const emptyIndex = tiles.value.indexOf(null);
  const size = gridSize.value;
  const [clickedRow, clickedCol] = [Math.floor(clickedIndex / size), clickedIndex % size];
  const [emptyRow, emptyCol] = [Math.floor(emptyIndex / size), emptyIndex % size];

  const isAdjacent = (Math.abs(clickedRow - emptyRow) + Math.abs(clickedCol - emptyCol)) === 1;

  if (isAdjacent) {
    [tiles.value[clickedIndex], tiles.value[emptyIndex]] = [tiles.value[emptyIndex], tiles.value[clickedIndex]];
  }
}

function shuffle() {
  let moves = gridSize.value * 100; // Más movimientos para puzzles más grandes
  for (let i = 0; i < moves; i++) {
    const emptyIndex = tiles.value.indexOf(null);
    const size = gridSize.value;
    const [emptyRow, emptyCol] = [Math.floor(emptyIndex / size), emptyIndex % size];
    
    const possibleMoves = [];
    if (emptyRow > 0) possibleMoves.push(emptyIndex - size);
    if (emptyRow < size - 1) possibleMoves.push(emptyIndex + size);
    if (emptyCol > 0) possibleMoves.push(emptyIndex - 1);
    if (emptyCol < size - 1) possibleMoves.push(emptyIndex + 1);

    const randomIndex = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    [tiles.value[randomIndex], tiles.value[emptyIndex]] = [tiles.value[emptyIndex], tiles.value[randomIndex]];
  }
}

function getTileStyle(tileValue) {
  if (tileValue === null) return {};
  
  const size = gridSize.value;
  const originalIndex = tileValue - 1;
  const col = originalIndex % size;
  const row = Math.floor(originalIndex / size);

  return {
    backgroundImage: `url(${imageUrl.value})`,
    backgroundSize: `${size * 100}%`,
    backgroundPosition: `${(col * 100) / (size - 1)}% ${(row * 100) / (size - 1)}%`,
    width: `${tileSize.value}px`,
    height: `${tileSize.value}px`,
  };
}

onMounted(() => {
  setupLevel(0); // Inicia el juego en el primer nivel
});
</script>

<template>
  <div class="puzzle-view">
    <div class="puzzle-container">
      <div class="header">
        <div class="header-badge">JUEGO INTERACTIVO</div>
        <h1 v-if="!allLevelsCompleted">Slide Puzzle - Nivel {{ currentLevel.level }}</h1>
        <h1 v-else>¡Juego Completado!</h1>
        <p v-if="!allLevelsCompleted" class="subtitle">Ordena las piezas para revelar la imagen.</p>
        <p v-else class="subtitle">¡Has superado todos los desafíos, gran trabajo!</p>
      </div>

      <div v-if="allLevelsCompleted" class="final-win-screen">
          <h3>🚀 ¡Todas las misiones completadas! 🚀</h3>
          <p>Has demostrado una gran habilidad como explorador.</p>
          <button @click="setupLevel(0)" class="shuffle-button">Jugar desde el principio</button>
      </div>
      
      <template v-else>
        <TransitionGroup 
          tag="div" 
          name="tile-slide" 
          class="puzzle-board"
          :style="{ 
            gridTemplateColumns: `repeat(${gridSize}, ${tileSize}px)`,
            width: `${gridSize * tileSize + (gridSize - 1) * 6 + 20}px` // Ancho dinámico
          }"
        >
          <div
            v-for="(tile, index) in tiles"
            :key="tile"
            class="puzzle-tile"
            :class="{ 'empty-tile': tile === null }"
            :style="getTileStyle(tile)"
            @click="moveTile(index)"
          >
          </div>
        </TransitionGroup>

        <div v-if="isSolved" class="win-message">
          <h3>¡Nivel {{ currentLevel.level }} Superado!</h3>
          <button @click="nextLevel" class="next-level-button">Siguiente Nivel</button>
        </div>
        
        <button v-else @click="shuffle" class="shuffle-button">Barajar de Nuevo</button>
      </template>

    </div>
  </div>
</template>

<style scoped>
.puzzle-view {
  width: 100%;
  min-height: calc(100vh - 80px);
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
}

.puzzle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: rgba(20, 20, 30, 0.85);
  backdrop-filter: blur(20px);
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.4);
}

.header {
  text-align: center;
  margin-bottom: 1rem;
}

.header-badge {
  display: inline-block;
  background: linear-gradient(135deg, rgba(252, 61, 33, 0.2), rgba(11, 61, 145, 0.2));
  border: 1px solid rgba(11, 61, 145, 0.3);
  color: rgba(255, 255, 255, 0.7);
  padding: 0.5rem 1.5rem;
  border-radius: 24px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #FFFFFF, #B0C4DE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header .subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 400px;
}

.puzzle-board {
  display: grid;
  gap: 6px;
  padding: 10px;
  border-radius: 8px;
  position: relative;
  background: linear-gradient(145deg, #2a2d34, #21252b);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.4);
  transition: all 0.3s ease-in-out;
}

.puzzle-tile {
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.puzzle-tile:hover:not(.empty-tile) {
  border-color: #4A90E2;
  transform: scale(1.05);
  z-index: 10;
}

.empty-tile {
  cursor: default;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.4) !important;
  border: none !important;
  background-color: rgba(11, 61, 145, 0.2) !important;
  background-image:
    linear-gradient(rgba(74, 144, 226, 0.2) 1px, transparent 1px),
    linear-gradient(to right, rgba(74, 144, 226, 0.2) 1px, transparent 1px);
  background-size: 25px 25px;
}

.tile-slide-move {
  transition: transform 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}

.win-message {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, rgba(11, 61, 145, 0.3), rgba(21, 101, 192, 0.2));
  border: 1px solid #0B3D91;
  color: #FFFFFF;
  border-radius: 12px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 0 20px rgba(11, 61, 145, 0.5);
}

.win-message h3 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
}

.next-level-button {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: #16a34a;
  color: #FFFFFF;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-level-button:hover {
  background-color: #15803d;
  transform: scale(1.05);
}

.final-win-screen {
  text-align: center;
}

.final-win-screen h3 {
  font-size: 2rem;
  color: #4ade80;
}

.shuffle-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 2rem;
  border: 1px solid #FC3D21;
  border-radius: 12px;
  background: transparent;
  color: #FC3D21;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.shuffle-button:hover {
  background-color: #FC3D21;
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(252, 61, 33, 0.4);
}

@media (max-width: 600px) {
  .header h1 {
    font-size: 1.8rem;
  }
  .puzzle-container {
    padding: 1.5rem;
  }
  .puzzle-board {
    transform: scale(0.8); /* Hacemos el tablero más pequeño en pantallas pequeñas */
  }
}
</style>