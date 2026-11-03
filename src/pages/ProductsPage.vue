<script setup>
import { useRoute } from 'vue-router'
import { products } from '../data/products.js'

const route = useRoute()
</script>

<template>
  <div class="container">
    <div class="catalog-query">
      <RouterLink
        class="query-link"
        :to="{ name: 'products', query: { category: 'phones' } }"
      >
        Відкрити каталог телефонів
      </RouterLink>
      <p v-if="route.query.category" class="query-value">
        Query-параметр category: {{ route.query.category }}
      </p>
    </div>

    <ul>
      <li :key="product.id" v-for="product in products">
        <h2>{{ product.title }}</h2>
        <p>{{ product.price }} грн</p>

        <RouterLink :to="'/products/' + product.id">ДЕТАЛЬНІШЕ</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  width: min(100%, 1600px);
  margin: 0 auto;
  padding: 48px clamp(24px, 8vw, 160px);
  padding-top: 180px;
}

ul {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px;
  padding: 0;
}

.catalog-query {
  margin-bottom: 28px;
}

.query-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  padding: 10px 18px;
  border: 2px solid var(--header);
  border-radius: 8px;
  background: var(--header);
  color: var(--link-color);
  font-weight: 700;
  transition:
    transform 0.3s ease,
    color 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.query-link:hover,
.query-link:focus-visible {
  transform: translateY(-2px);
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
}

.query-link:focus-visible {
  outline: 2px solid var(--header);
  outline-offset: 3px;
}

.query-value {
  margin-top: 12px;
  color: var(--text);
  font-size: 16px;
  font-weight: 600;
}

li {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  padding: 28px;
  border: 2px solid var(--header);
  border-radius: 12px;
  background: var(--link-color);
  color: var(--text);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

li:hover {
  transform: translateY(-5px);
  border-color: var(--hover);
  box-shadow: 0 12px 28px var(--header);
}

h2 {
  margin-bottom: 14px;
  color: var(--text);
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
}

li p {
  margin-bottom: 24px;
  color: var(--header);
  font-size: 20px;
  font-weight: 600;
}

li a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  margin-top: auto;
  padding: 10px 18px;
  border: 2px solid var(--header);
  border-radius: 8px;
  background: var(--header);
  color: var(--link-color);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  transition:
    transform 0.3s ease,
    color 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

li a:hover,
li a:focus-visible {
  transform: translateY(-2px);
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
  box-shadow: 0 6px 16px var(--header);
}

li a:focus-visible {
  outline: 2px solid var(--header);
  outline-offset: 3px;
}
</style>
