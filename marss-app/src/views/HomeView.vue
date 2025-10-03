<template>
  <div>
    <Header />
    <Redirecciones />
    <Fila2 />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Redirecciones from '../components/Redirecciones.vue'
import Fila2 from '../components/Fila2.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Redirecciones,
    Fila2,
    Footer
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>