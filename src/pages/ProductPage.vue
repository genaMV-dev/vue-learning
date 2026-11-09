<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useCartStore } from '../stores/cartStore.js'
import { getProductById } from '../services/productService.js'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref(null)
const isLoading = ref(false)
const error = ref(null)

const fetchProductById = async () => {
  try {
    isLoading.value = true
    error.value = null

    const id = route.params.id

    const data = await getProductById(id)

    product.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchProductById)
</script>

<template>
  <div class="product-page">
    <p v-if="isLoading">Завантаження...</p>
    <p class="not-found" v-else-if="error">{{ error }}</p>

    <div class="product-detail" v-else-if="product">
      <img
        class="product-image"
        :src="product.thumbnail"
        :alt="product.title"
      />
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">{{ product.price }} $</p>
      <p class="product-rating">Рейтинг: {{ product.rating }}</p>

      <p v-if="cartStore.isProductInCart(product.id)" class="in-cart-message">
        Товар вже у кошику
      </p>
      <button
        v-else
        class="add-cart-button"
        @click="cartStore.addProduct(product)"
      >
        Додати до кошика
      </button>

      <button class="back-button" @click="router.push({ name: 'products' })">
        Назад до каталогу
      </button>
    </div>

    <p class="not-found" v-else>Товар не знайдено!</p>
  </div>
</template>

<style scoped>
.product-page {
  width: min(100% - 48px, 1120px);
  margin: 0 auto;
  padding: 64px 0;
  color: var(--text);
  padding-top: 180px;
}

.product-detail,
.not-found {
  border: 2px solid var(--header);
  border-radius: 12px;
  background: var(--link-color);
  box-shadow: 0 12px 28px var(--header);
}

.product-detail {
  display: flex;
  min-height: 280px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(28px, 6vw, 64px);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.product-detail:hover {
  transform: translateY(-4px);
  border-color: var(--hover);
  box-shadow: 0 16px 36px var(--header);
}

.product-image {
  display: block;
  width: min(100%, 520px);
  max-height: 360px;
  align-self: center;
  margin-bottom: 32px;
  border: 2px solid var(--header);
  border-radius: 10px;
  background: var(--link-color);
  object-fit: cover;
}

.product-title {
  margin-bottom: 20px;
  color: var(--text);
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 700;
  line-height: 1.15;
}

.product-description {
  max-width: 760px;
  margin-bottom: 24px;
  color: var(--text);
  font-size: 17px;
  line-height: 1.7;
}

.product-price {
  margin-bottom: 16px;
  color: var(--header);
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 600;
}

.product-rating {
  margin-bottom: 24px;
  padding: 8px 12px;
  border: 1px solid var(--header);
  border-radius: 999px;
  background: var(--link-color);
  color: var(--header);
  font-size: 15px;
  font-weight: 700;
}

.in-cart-message {
  margin-bottom: 12px;
  padding: 12px 16px;
  border: 2px solid var(--hover);
  border-radius: 8px;
  background: var(--hover);
  color: var(--header);
  font-size: 15px;
  font-weight: 700;
}

.add-cart-button,
.back-button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  padding: 12px 22px;
  border: 2px solid var(--header);
  border-radius: 8px;
  background: var(--header);
  color: var(--link-color);
  font-size: 15px;
  font-weight: 700;
  transition:
    transform 0.3s ease,
    color 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.add-cart-button {
  margin-bottom: 12px;
  border: 2px solid var(--header);
  border-radius: 8px;
  background: var(--header);
  color: var(--link-color);
  font-size: 15px;
  font-weight: 700;
}

.add-cart-button:hover,
.add-cart-button:focus-visible,
.back-button:hover,
.back-button:focus-visible {
  transform: translateY(-2px);
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
  box-shadow: 0 6px 16px var(--header);
}

.add-cart-button:focus-visible,
.back-button:focus-visible {
  outline: 2px solid var(--header);
  outline-offset: 3px;
}

.not-found {
  padding: 32px;
  color: var(--text);
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}
</style>
