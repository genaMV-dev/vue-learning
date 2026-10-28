<script setup>
import { ref } from 'vue'
import ProductSearch from './components/ProductSearch.vue'
const products = [
  {
    id: 1,
    title: 'iPhone 15',
    price: 600,
    category: 'phone',
    image: 'https://placehold.co/400x400/333/fff?text=iPhone+15',
  },
  {
    id: 2,
    title: 'Samsung Galaxy S24',
    price: 800,
    category: 'phone',
    image: 'https://placehold.co/400x400/0078D7/fff?text=Galaxy+S24',
  },
  {
    id: 3,
    title: 'MacBook Air M3',
    price: 1200,
    category: 'laptop',
    image: 'https://placehold.co/400x300/333/fff?text=MacBook+Air',
  },
  {
    id: 4,
    title: 'Lenovo ThinkPad',
    price: 950,
    category: 'laptop',
    image: 'https://placehold.co/400x300/111/fff?text=ThinkPad',
  },
  {
    id: 5,
    title: 'AirPods Pro',
    price: 250,
    category: 'accessory',
    image: 'https://placehold.co/400x300/fff/333?text=AirPods+Pro',
  },
]

const isShowSearch = ref(false)

function showSearch() {
  isShowSearch.value = !isShowSearch.value
}
</script>

<template>
  <div>
    <button class="search-toggle" @click="showSearch">
      Показати / приховати пошук
    </button>

    <ProductSearch v-if="isShowSearch" :products="products" />
  </div>
</template>

<style>
.search-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 24px;
  padding: 12px 20px;
  border: 2px solid #2b2b3a;
  border-radius: 12px;
  background: #2b2b3a;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  transition:
    transform 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease;
}

.search-toggle:hover {
  transform: translateY(-2px);
  border-color: #ff9c9c;
  background: #ff9c9c;
  color: #2b2b3a;
  box-shadow: 0 8px 20px rgb(43 43 58 / 16%);
}

.search-toggle:focus-visible {
  outline: 3px solid #ff9c9c;
  outline-offset: 4px;
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
