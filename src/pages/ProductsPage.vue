<script setup>
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cartStore.js'
import { onMounted, ref } from 'vue'
import { getProducts } from '../services/productService.js'
import { useProductFilters } from '../composables/useProductFilters.js'

const route = useRoute()
const cartStore = useCartStore()

const products = ref([])
const isLoading = ref(false)
const error = ref(null)
const {
  searchQuery,
  selectedCategory,
  sortBy,
  filteredProducts,
  resetFilters,
} = useProductFilters(products)

const fetchProducts = async () => {
  try {
    isLoading.value = true
    error.value = null

    const response = await getProducts()
    products.value = response.products
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchProducts)
</script>

<template>
  <div class="container">
    <div class="catalog-query">
      <button
        class="allBtn"
        :class="{ active: selectedCategory === '' }"
        @click="selectedCategory = ''"
      >
        Всі товари
      </button>
      <button
        class="filterBtn"
        :class="{ active: selectedCategory === 'smartphones' }"
        @click="selectedCategory = 'smartphones'"
      >
        Відкрити каталог телефонів
      </button>
      <button
        class="filterBtn"
        :class="{ active: selectedCategory === 'laptops' }"
        @click="selectedCategory = 'laptops'"
      >
        Відкрити каталог ноутбуків
      </button>
      <button
        class="filterBtn"
        :class="{ active: selectedCategory === 'tablets' }"
        @click="selectedCategory = 'tablets'"
      >
        Відкрити каталог планшетів
      </button>
      <button
        class="filterBtn"
        :class="{ active: selectedCategory === 'beauty' }"
        @click="selectedCategory = 'beauty'"
      >
        Відкрити каталог краси
      </button>
      <button
        class="filterBtn"
        :class="{ active: selectedCategory === 'groceries' }"
        @click="selectedCategory = 'groceries'"
      >
        Відкрити каталог продуктів
      </button>
      <p v-if="route.query.category" class="query-value">
        Query-параметр category: {{ route.query.category }}
      </p>
    </div>

    <div class="product-controls">
      <input
        v-model="searchQuery"
        class="search-input"
        type="search"
        placeholder="Пошук за назвою"
      />
      <button class="clear-search" @click="resetFilters">Очистити фільтри</button>
      <select v-model="sortBy" class="sort-select" aria-label="Сортування за ціною">
        <option value="none">Без сортування</option>
        <option value="price-asc">Спочатку дешевші</option>
        <option value="price-desc">Спочатку дорожчі</option>
      </select>
    </div>

    <p v-if="isLoading">Завантаження...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="filteredProducts.length === 0">Товарів не знайдено</p>
    <ul v-else>
      <li :key="product.id" v-for="product in filteredProducts">
        <img :src="product.thumbnail" :alt="product.title" />
        <h2>{{ product.title }}</h2>
        <p>{{ product.price }} $</p>
        <p>Рейтинг: {{ product.rating }}</p>

        <RouterLink :to="'/products/' + product.id">ДЕТАЛЬНІШЕ</RouterLink>
        <p v-if="cartStore.isProductInCart(product.id)" class="in-cart-message">
          Товар вже у кошику
        </p>
        <button v-else @click="cartStore.addProduct(product)" class="cartBtn">
          ДОДАТИ ДО КОШИКА
        </button>
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
}

.filterBtn {
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

.allBtn {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  padding: 10px 18px;
  border: 2px solid var(--header);
  border-radius: 8px;
  background: transparent;
  color: var(--header);
  font-weight: 700;
  transition:
    transform 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}

.filterBtn:hover,
.filterBtn:focus-visible {
  transform: translateY(-2px);
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
}

.allBtn:hover,
.allBtn:focus-visible,
.allBtn.active {
  transform: translateY(-2px);
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
}

.filterBtn.active {
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
}

.filterBtn:focus-visible {
  outline: 2px solid var(--header);
  outline-offset: 3px;
}

.query-value {
  margin-top: 12px;
  color: var(--text);
  font-size: 16px;
  font-weight: 600;
}

.product-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.search-input,
.sort-select {
  min-height: 44px;
  padding: 10px 14px;
  border: 2px solid var(--header);
  border-radius: 8px;
  background: var(--link-color);
  color: var(--text);
}

.search-input {
  min-width: min(100%, 260px);
  flex: 1;
}

.search-input:focus,
.sort-select:focus {
  border-color: var(--hover);
  outline: 2px solid var(--hover);
  outline-offset: 2px;
}

.clear-search {
  min-height: 44px;
  padding: 10px 16px;
  border: 2px solid var(--header);
  border-radius: 8px;
  background: transparent;
  color: var(--header);
  font-weight: 700;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}

.clear-search:hover,
.clear-search:focus-visible {
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
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

.cartBtn {
  display: inline-flex;
  width: 100%;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  padding: 10px 14px;
  border: 2px solid var(--header);
  border-radius: 8px;
  background: var(--link-color);
  color: var(--header);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.03em;
  transition:
    transform 0.3s ease,
    color 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.cartBtn:hover,
.cartBtn:focus-visible {
  transform: translateY(-2px);
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
  box-shadow: 0 6px 16px var(--header);
}

.cartBtn:focus-visible {
  outline: 2px solid var(--header);
  outline-offset: 3px;
}

li .in-cart-message {
  margin: 12px 0 0;
  padding: 10px 12px;
  border: 2px solid var(--hover);
  border-radius: 8px;
  background: var(--hover);
  color: var(--header);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.4;
}
</style>
