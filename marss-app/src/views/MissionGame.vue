<script setup>
import { ref, computed, onMounted } from 'vue';

// --- CONFIGURACIÓN DEL PUZZLE ---
const gridSize = 4;
const imageUrl = ref('/images/flor.png');

// --- ESTADO DEL JUEGO ---
const tiles = ref([]);

// --- LÓGICA DEL JUEGO ---

const isSolved = computed(() => {
  if (!tiles.value.length || tiles.value[tiles.value.length - 1] !== null) return false;
  for (let i = 0; i < tiles.value.length - 1; i++) {
    if (tiles.value[i] !== i + 1) return false;
  }
  return true;
});

function moveTile(clickedIndex) {
  if (isSolved.value) return;

  const emptyIndex = tiles.value.indexOf(null);
  const [clickedRow, clickedCol] = [Math.floor(clickedIndex / gridSize), clickedIndex % gridSize];
  const [emptyRow, emptyCol] = [Math.floor(emptyIndex / gridSize), emptyIndex % gridSize];

  const isAdjacent = (Math.abs(clickedRow - emptyRow) + Math.abs(clickedCol - emptyCol)) === 1;

  if (isAdjacent) {
    [tiles.value[clickedIndex], tiles.value[emptyIndex]] = [tiles.value[emptyIndex], tiles.value[clickedIndex]];
  }
}

function shuffle() {
  tiles.value = [...Array(gridSize * gridSize - 1).keys()].map(i => i + 1);
  tiles.value.push(null);
  
  let moves = 300;
  for (let i = 0; i < moves; i++) {
    const emptyIndex = tiles.value.indexOf(null);
    const [emptyRow, emptyCol] = [Math.floor(emptyIndex / gridSize), emptyIndex % gridSize];
    
    const possibleMoves = [];
    if (emptyRow > 0) possibleMoves.push(emptyIndex - gridSize);
    if (emptyRow < gridSize - 1) possibleMoves.push(emptyIndex + gridSize);
    if (emptyCol > 0) possibleMoves.push(emptyIndex - 1);
    if (emptyCol < gridSize - 1) possibleMoves.push(emptyIndex + 1);

    const randomIndex = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    [tiles.value[randomIndex], tiles.value[emptyIndex]] = [tiles.value[emptyIndex], tiles.value[randomIndex]];
  }
}

function getTileStyle(tileValue) {
  if (tileValue === null) return {};
  
  const originalIndex = tileValue - 1;
  const col = originalIndex % gridSize;
  const row = Math.floor(originalIndex / gridSize);

  return {
    backgroundImage: `url(${imageUrl.value})`,
    backgroundSize: `${gridSize * 100}%`,
    backgroundPosition: `${(col * 100) / (gridSize - 1)}% ${(row * 100) / (gridSize - 1)}%`,
  };
}

onMounted(() => {
  shuffle();
});
</script>

<template>
  <div class="puzzle-view">
    <div class="puzzle-container">
      <div class="header">
        <div class="header-badge">JUEGO INTERACTIVO</div>
        <h1>Slide Puzzle Marciano</h1>
        <p class="subtitle">Ordena las piezas para revelar la insignia de la misión.</p>
      </div>

      <TransitionGroup tag="div" name="tile-slide" class="puzzle-board">
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
        <h3>🚀 ¡Insignia Reconstruida!</h3>
      </div>
      
      <button @click="shuffle" class="shuffle-button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
        </svg>
        <span>Barajar de Nuevo</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal de la vista */
.puzzle-view {
  width: 100%;
  min-height: calc(100vh - 80px); /* Resta la altura aproximada de tu navbar */
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
}

/* Contenedor del puzzle */
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

/* Cabecera */
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

/* Tablero del puzzle - ESTILO MODIFICADO */
.puzzle-board {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  gap: 6px;
  padding: 10px;
  border-radius: 8px;
  position: relative;
  /* Fondo nuevo para el tablero */
  background: linear-gradient(145deg, #2a2d34, #21252b);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.4);
}

/* Piezas del puzzle */
.puzzle-tile {
  width: 100px;
  height: 100px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.4);
  border: 1px solid transparent;
}

.puzzle-tile:hover:not(.empty-tile) {
  border-color: #4A90E2;
  transform: scale(1.05);
  z-index: 10;
}

/* Casilla vacía - ESTILO MODIFICADO */
.empty-tile {
  cursor: default;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.4) !important;
  border: none !important;
  /* Fondo de cuadrícula para la casilla vacía */
  background-color: rgba(11, 61, 145, 0.2) !important;
  background-image:
    linear-gradient(rgba(74, 144, 226, 0.2) 1px, transparent 1px),
    linear-gradient(to right, rgba(74, 144, 226, 0.2) 1px, transparent 1px);
  background-size: 25px 25px;
}

.tile-slide-move {
  transition: transform 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}

/* Mensaje de victoria */
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
  margin: 0;
  font-size: 1.2rem;
}

/* Botón de barajar */
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

/* Responsive */
@media (max-width: 600px) {
  .puzzle-board {
    grid-template-columns: repeat(4, 75px);
  }
  .puzzle-tile {
    width: 75px;
    height: 75px;
  }
  .header h1 {
    font-size: 2rem;
  }
  .puzzle-container {
    padding: 1.5rem;
  }
}
</style>