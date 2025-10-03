<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h5>NASA 2025</h5>
        <p>Proyecto Espacial</p>
      </div>
      <div class="footer-section">
        <h5>Enlaces</h5>
        <a href="#">Contacto</a>
        <a href="#">Sobre nosotros</a>
        <a href="#">Privacidad</a>
      </div>
      <div class="footer-section">
        <p class="copyright">&copy; 2025 NASA2025. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: #000000;
  padding: 50px 40px 30px;
  border-top: 3px solid #0B3D91;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  color: white;
}

.footer-section h5 {
  color: #FC3D21;
  font-size: 1.2rem;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-section p {
  color: #cccccc;
  line-height: 1.8;
}

.footer-section a {
  display: block;
  color: #cccccc;
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #FC3D21;
}

.copyright {
  margin-top: 20px;
  font-size: 0.9rem;
}
</style>