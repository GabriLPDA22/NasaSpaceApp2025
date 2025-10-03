<template>
  <section class="nav-cards">
    <div class="card" @click="navigateTo('fotos')">
      <div class="card-icon">📸</div>
      <h3 class="card-title">Fotos</h3>
      <p class="card-description">Descubre fotos increibles que toma Robbert en marte (realmente cree que es interesante)</p>
      <button class="card-button">Explorar</button>
    </div>
    
    <div class="card" @click="navigateTo('rutas')">
      <div class="card-icon">🚀</div>
      <h3 class="card-title">Rutas</h3>
      <p class="card-description">Descubre las trayectorias que toma Robbert para tomar sus fotos</p>
      <button class="card-button">Ver Rutas</button>
    </div>
    
    <div class="card" @click="navigateTo('nose')">
      <div class="card-icon">🌌</div>
      <h3 class="card-title">Información</h3>
      <p class="card-description">Conoce más sobre Robbert</p>
      <button class="card-button">Más Info</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Redirecciones',
  methods: {
    navigateTo(page) {
      console.log(`Navegando a: ${page}`);
      // this.$router.push(`/${page}`);
    }
  }
}
</script>

<style scoped>
.nav-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 80px 40px;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #000000;
}

.card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 40px 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.card:hover {
  transform: translateY(-10px);
  border-color: #0B3D91;
  box-shadow: 0 20px 40px rgba(11, 61, 145, 0.3);
}

.card-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.card-title {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #ffffff;
}

.card-description {
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 25px;
}

.card-button {
  padding: 10px 30px;
  background-color: #FC3D21;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-button:hover {
  background-color: #e63516;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .nav-cards {
    grid-template-columns: 1fr;
    padding: 40px 20px;
  }
}
</style>