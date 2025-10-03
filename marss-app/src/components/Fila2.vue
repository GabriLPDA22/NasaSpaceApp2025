<template>
  <section class="features">
    <h2 class="section-title">Fila 2</h2>
    <div class="features-grid">
      <div class="feature-item">
        <div class="feature-circle">🔭</div>
        <h4>Fran Rebollo</h4>
        <p>Programer y Quizz enjoyer</p>
      </div>
      <div class="feature-item">
        <div class="feature-circle">📡</div>
        <h4>Diego Rodriguez</h4>
        <p>Programer y diseñador</p>
      </div>
      <div class="feature-item">
        <div class="feature-circle">💫</div>
        <h4>Gabriel Saiz</h4>
        <p>Jefe de grupo y programer</p>
      </div>
      <div class="feature-item">
        <div class="feature-circle">🌍</div>
        <h4>Fran Villa</h4>
        <p>Programer y czador</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Fila2'
}
</script>

<style scoped>
.features {
  padding: 80px 40px;
  background: linear-gradient(180deg, #000000 0%, #0B3D91 100%);
}

.section-title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 60px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 50px;
  max-width: 1400px;
  margin: 0 auto;
}

.feature-item {
  text-align: center;
  color: white;
}

.feature-circle {
  width: 120px;
  height: 120px;
  margin: 0 auto 25px;
  background: linear-gradient(135deg, #FC3D21 0%, #c92e18 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(252, 61, 33, 0.3);
}

.feature-circle:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 10px 30px rgba(252, 61, 33, 0.6);
}

.feature-item h4 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.feature-item p {
  color: #cccccc;
  font-size: 1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
}
</style>