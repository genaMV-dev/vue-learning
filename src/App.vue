<script setup>
import ProductCard from './components/ProductCard.vue'

function handleBuy(productTitle) {
  alert(`Ти вибрав: ${productTitle}`)
}

const phones = [
  {
    id: 1,
    title: 'Iphone 15',
    price: 600,
  },
  {
    id: 2,
    title: 'Samsung 4480',
    price: 500,
  },
  {
    id: 3,
    title: 'PhoneRandom 67',
    price: 1600,
  },
]
</script>

<template>
  <div class="phones-list">
    <ProductCard 
      v-for="phone in phones" 
      :key="phone.id"
      :id="phone.id" 
      :title="phone.title" 
      :price="phone.price" 
      @buy="handleBuy(phone.title)" 
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