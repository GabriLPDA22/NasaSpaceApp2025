<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">NASA 2025</h1>
      <p class="hero-subtitle">Explorando el universo, expandiendo el conocimiento</p>
      <button class="cta-button">Descubre Más</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.hero {
  position: relative;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0B3D91 0%, #000000 100%);
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(2px 2px at 20% 30%, white, transparent),
    radial-gradient(2px 2px at 60% 70%, white, transparent),
    radial-gradient(1px 1px at 50% 50%, white, transparent),
    radial-gradient(1px 1px at 80% 10%, white, transparent),
    radial-gradient(2px 2px at 90% 60%, white, transparent),
    radial-gradient(1px 1px at 33% 50%, white, transparent),
    radial-gradient(1px 1px at 70% 40%, white, transparent);
  background-size: 200% 200%;
  background-position: 0% 0%;
  opacity: 0.4;
  animation: stars 200s linear infinite;
}

@keyframes stars {
  from { background-position: 0% 0%; }
  to { background-position: -200% 200%; }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 20px;
  color: white;
}

.hero-title {
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: fadeInUp 1s ease;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 40px;
  opacity: 0.9;
  animation: fadeInUp 1s ease 0.2s backwards;
}

.cta-button {
  padding: 15px 40px;
  background-color: #FC3D21;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: fadeInUp 1s ease 0.4s backwards;
}

.cta-button:hover {
  background-color: #e63516;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(252, 61, 33, 0.4);
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

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
}
</style>