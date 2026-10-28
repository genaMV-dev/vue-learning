<script setup>
import { computed, nextTick, onMounted, onUnmounted, onUpdated, ref } from 'vue'

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
})

const searchQuery = ref('')
const searchInput = ref(null)

onMounted(() => {
  searchInput.value.focus()

  console.log('onMounted')
})

onUpdated(() => {
  console.log('onUpdated')
})

onUnmounted(() => {
  console.log('onUnmounted')
})

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return props.products

  return props.products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
  )
})

async function clearSearch() {
  searchQuery.value = ''

  await nextTick()

  searchInput.value.focus()
}
</script>

<template>
  <div class="product-search">
    <div class="search-controls">
      <input
        v-model="searchQuery"
        ref="searchInput"
        type="text"
        id="search"
        class="search-input"
      />
      <button class="clear-button" @click="clearSearch">Очистити пошук</button>
    </div>

    <ul class="product-list">
      <li
        class="product-item"
        v-for="product in filteredProducts"
        :key="product.id"
      >
        <img class="product-image" :src="product.image" :alt="product.title" />
        <h2 class="product-title">{{ product.title }}</h2>
        <p class="product-price">{{ product.price }}$</p>
        <p class="product-category">{{ product.category }}</p>
      </li>
    </ul>

    <p class="product-count" v-if="filteredProducts.length > 0">
      Знайдено товарів: {{ filteredProducts.length }}
    </p>
    <p class="empty-state" v-if="filteredProducts.length === 0">
      Товарів не знайдено!
    </p>
  </div>
</template>

<style scoped>
.product-search {
  --color-accent: #ff9c9c;
  --color-ink: #2b2b3a;

  min-height: 100vh;
  padding: clamp(24px, 5vw, 64px);
  background:
    radial-gradient(
      ellipse at 90% 0%,
      rgb(255 156 156 / 24%),
      transparent 34rem
    ),
    #f7f6f8;
  color: var(--color-ink);
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

.search-controls {
  display: flex;
  gap: 12px;
  max-width: 760px;
  margin: 0 auto 32px;
  padding: 16px;
  border: 1px solid rgb(43 43 58 / 8%);
  border-radius: 20px;
  background: rgb(255 255 255 / 90%);
  box-shadow: 0 12px 32px rgb(43 43 58 / 7%);
}

.search-input {
  box-sizing: border-box;
  min-width: 0;
  flex: 1;
  padding: 13px 16px;
  border: 1px solid #e6e1e5;
  border-radius: 12px;
  background: #fff;
  color: var(--color-ink);
  font: inherit;
  outline: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.search-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 4px rgb(255 156 156 / 25%);
}

.clear-button {
  flex: 0 0 auto;
  padding: 12px 18px;
  border: 0;
  border-radius: 12px;
  background: var(--color-ink);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-weight: 650;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.clear-button:hover {
  transform: translateY(-1px);
  background: var(--color-accent);
  color: var(--color-ink);
}

.clear-button:focus-visible {
  outline: 3px solid rgb(255 156 156 / 65%);
  outline-offset: 3px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
  gap: 22px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

.product-item {
  display: flex;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  padding: 14px;
  border: 1px solid rgb(43 43 58 / 8%);
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 8px 26px rgb(43 43 58 / 6%);
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.product-item:hover {
  transform: translateY(-4px);
  border-color: rgb(255 156 156 / 80%);
  box-shadow: 0 16px 34px rgb(43 43 58 / 12%);
}

.product-image {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 14px;
  background: #f0eef2;
  object-fit: cover;
}

.product-title {
  margin: 16px 2px 8px;
  color: var(--color-ink);
  font-size: 18px;
  font-weight: 750;
  line-height: 1.4;
}

.product-price {
  margin: 0 2px 10px;
  color: #d95668;
  font-size: 22px;
  font-weight: 800;
}

.product-category {
  align-self: flex-start;
  margin: auto 2px 2px;
  padding: 6px 10px;
  border-radius: 999px;
  background: #fff0f0;
  color: #65464c;
  font-size: 12px;
  font-weight: 650;
  text-transform: capitalize;
}

.product-count {
  width: fit-content;
  margin: 24px auto 0;
  padding: 10px 16px;
  border: 1px solid rgb(255 156 156 / 65%);
  border-radius: 999px;
  background: #fff0f0;
  color: var(--color-ink);
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 4px 14px rgb(43 43 58 / 6%);
}

.empty-state {
  max-width: 760px;
  margin: 0 auto;
  padding: 28px;
  border: 1px dashed rgb(43 43 58 / 20%);
  border-radius: 16px;
  color: #696979;
  text-align: center;
}

@media (max-width: 540px) {
  .product-search {
    padding: 24px 16px;
  }

  .search-controls {
    flex-direction: column;
    padding: 12px;
  }

  .clear-button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .search-input,
  .clear-button,
  .product-item {
    transition: none;
  }
}
</style>
