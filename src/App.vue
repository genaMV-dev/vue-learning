<script setup>
import ProductsCatalog from './components/ProductsCatalog.vue';
</script>

<template>
  <div class="phones-list">
    <ProductsCatalog 
    />
  </div>
</template>

<style>
.phones-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 24px;
}

a {
  color: inherit;
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}
</style>
