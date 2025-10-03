<template>
  <div>
    <Header />
    <Redirecciones />
    <Fila2 />
    <Footer />
  </div>
</template>

<script>
import Header from './Header.vue'
import Redirecciones from './Redirecciones.vue'
import Fila2 from './Fila2.vue'
import Footer from './Footer.vue'

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