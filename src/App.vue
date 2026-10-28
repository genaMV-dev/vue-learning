<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import ProductCard from './components/ProductCard.vue'

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

const search = ref('')

watch(search, (newValue, oldValue) => {
  console.log('Було:', oldValue)
  console.log('Стало:', newValue)
})

const selectedCategories = ref([])
const sortOrder = ref('none')
const productsInBasket = ref([])

watchEffect(() => {
  console.log(`Кошик - ${productsInBasket.value.length}`)
})

const filteredProducts = computed(() => {
  const result = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const matchesCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.includes(product.category)

    return matchesSearch && matchesCategory
  })

  if (sortOrder.value === 'asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortOrder.value === 'desc') {
    result.sort((a, b) => b.price - a.price)
  }

  return result
})

function handleBasket(productId) {
  const product = products.find((item) => item.id === productId)

  if (!product) {
    alert('Товар не знайдено')
    return
  }

  const alreadyInBasket = productsInBasket.value.some(
    (item) => item.id === productId
  )

  if (alreadyInBasket) {
    alert(`${product.title} вже є у вас в кошику`)
    return
  }

  productsInBasket.value.push(product)
  alert(`${product.title} додано до кошику`)
}
</script>

<template>
  <main class="shop">
    <section class="shop__toolbar">
      <div class="sort-controls">
        <button
          class="sort-button"
          @click="sortOrder = 'desc'"
          :class="{ active: sortOrder === 'desc' }"
        >
          За спаданням
        </button>
        <button
          class="sort-button"
          @click="sortOrder = 'asc'"
          :class="{ active: sortOrder === 'asc' }"
        >
          За зростанням
        </button>
      </div>

      <input
        v-model="search"
        class="search-input"
        type="text"
        id="searchId"
        name="search"
      />

      <div class="toolbar__bottom">
        <div class="category-filters">
          <label class="filter-chip" for="phone">
            <input
              v-model="selectedCategories"
              type="checkbox"
              id="phone"
              value="phone"
            />
            Phones
          </label>

          <label class="filter-chip" for="laptop">
            <input
              v-model="selectedCategories"
              type="checkbox"
              id="laptop"
              value="laptop"
            />
            Laptops
          </label>

          <label class="filter-chip" for="accessory">
            <input
              v-model="selectedCategories"
              type="checkbox"
              id="accessory"
              value="accessory"
            />
            Accessories
          </label>
        </div>
        <p class="basket-count">Кошик - {{ productsInBasket.length }}</p>
      </div>
    </section>

    <section class="product-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :id="product.id"
        :title="product.title"
        :price="product.price"
        :image="product.image"
        @basket="handleBasket"
      />
    </section>
  </main>
</template>

<style scoped>
.shop {
  --color-accent: #ff1245;
  --color-secondary: #2ec4b6;
  --color-ink: #20243a;

  min-height: 100vh;
  padding: clamp(24px, 5vw, 64px);
  background:
    radial-gradient(
      ellipse at 90% 0%,
      rgb(46 196 182 / 12%),
      transparent 32rem
    ),
    #f7f8fc;
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

.basket-count {
  flex: 0 0 auto;
  margin: 0;
  padding: 12px 18px;
  border: 1px solid rgb(46 196 182 / 30%);
  border-radius: 999px;
  background: #e7fbf8;
  color: #147c73;
  font-size: 14px;
  font-weight: 700;
}

.shop__toolbar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1240px;
  margin: 0 auto 28px;
  padding: 20px;
  border: 1px solid #e8eaf1;
  border-radius: 20px;
  background: rgb(255 255 255 / 90%);
  box-shadow: 0 12px 36px rgb(32 36 58 / 5%);
}

.search-input {
  box-sizing: border-box;
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e1e4ed;
  border-radius: 12px;
  background: #fafbfe;
  color: var(--color-ink);
  font: inherit;
  outline: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.search-input:focus {
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 4px rgb(46 196 182 / 16%);
}

.toolbar__bottom,
.category-filters,
.sort-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.toolbar__bottom {
  justify-content: space-between;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 13px;
  border: 1px solid #e8eaf1;
  border-radius: 999px;
  background: #fff;
  color: #555b70;
  cursor: pointer;
  font-size: 13px;
  font-weight: 650;
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    color 160ms ease;
}

.filter-chip:has(input:checked) {
  border-color: rgb(46 196 182 / 55%);
  background: #e7fbf8;
  color: #147c73;
}

.filter-chip input {
  accent-color: var(--color-secondary);
}

.sort-button {
  padding: 10px 14px;
  border: 1px solid #e1e4ed;
  border-radius: 10px;
  background: #fff;
  color: #555b70;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    color 160ms ease;
}

.sort-button:hover,
.sort-button.active {
  border-color: var(--color-accent);
  background: var(--color-accent);
  color: #fff;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  align-items: stretch;
  gap: 22px;
  max-width: 1240px;
  margin: 0 auto;
}

.shop :deep(button:focus-visible),
.filter-chip:has(input:focus-visible) {
  outline: 3px solid rgb(46 196 182 / 55%);
  outline-offset: 3px;
}

@media (max-width: 640px) {
  .shop {
    padding: 24px 16px;
  }

  .shop__toolbar {
    padding: 14px;
  }

  .toolbar__bottom {
    align-items: flex-start;
    flex-direction: column;
  }

  .sort-controls {
    width: 100%;
  }

  .sort-button {
    flex: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .search-input,
  .filter-chip,
  .sort-button {
    transition: none;
  }
}
</style>
