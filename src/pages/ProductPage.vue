<script setup>
import { useRoute, useRouter } from 'vue-router'
import { products } from '../data/products.js'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const product = computed(() => {
  return products.find((p) => p.id === Number(route.params.id))
})
</script>

<template>
  <div class="product-page">
    <p class="not-found" v-if="!product">Товар не знайдено!</p>

    <div class="product-detail" v-else>
      <h1 class="product-title">{{ product.title }}</h1>
      <p class="product-price">{{ product.price }} грн</p>

      <button class="back-button" @click="router.push({ name: 'products' })">
        Назад до каталогу
      </button>
    </div>
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

.product-title {
  margin-bottom: 20px;
  color: var(--text);
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 700;
  line-height: 1.15;
}

.product-price {
  margin-bottom: 36px;
  color: var(--header);
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 600;
}

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

.back-button:hover,
.back-button:focus-visible {
  transform: translateY(-2px);
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
  box-shadow: 0 6px 16px var(--header);
}

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
