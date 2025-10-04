<template>
  <nav class="main-nav">
    <router-link to="/">📷 Explorador</router-link>
    <router-link to="/log">🚀 Bitácora</router-link>
    <router-link to="/routes">🗺️ Rutas</router-link>
  </nav>
</template>

<style lang="scss" scoped>
.main-nav {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem;
  background-color: #1E1E1E;
  border-bottom: 1px solid #333;
  margin-bottom: 1rem;

  a {
    color: #E0E0E0;
    text-decoration: none;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: background-color 0.3s;

    &.router-link-exact-active {
      background-color: #0B3D91;
      color: white;
    }

    &:hover:not(.router-link-exact-active) {
        background-color: #333;
    }
  }
}
</style>