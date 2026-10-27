<script setup>
defineProps({
  id: Number,
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['buy'])
</script>

<template>
  <article class="product-card">
    <div class="product-card__icon" aria-hidden="true">📱</div>
    <h2 class="product-card__title">{{ title }}</h2>
    <p class="product-card__price">{{ price }} <span>$</span></p>

    <button class="product-card__button" type="button" @click="emit('buy', title)">
      Купити
    </button>
  </article>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 240px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(15 23 42 / 8%);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 32px rgb(15 23 42 / 14%);
}

.product-card__icon {
  display: grid;
  width: 64px;
  height: 64px;
  place-items: center;
  border-radius: 16px;
  background: #eff6ff;
  font-size: 32px;
}

.product-card__title {
  margin: 20px 0 8px;
  color: #172033;
  font-size: 20px;
  line-height: 1.3;
}

.product-card__price {
  margin: 0 0 24px;
  color: #172033;
  font-size: 24px;
  font-weight: 700;
}

.product-card__price span {
  color: #64748b;
  font-size: 16px;
  font-weight: 500;
}

.product-card__button {
  width: 100%;
  margin-top: auto;
  padding: 12px 16px;
  border: 0;
  border-radius: 10px;
  background: #2563eb;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
  transition: background-color 180ms ease;
}

.product-card__button:hover {
  background: #1d4ed8;
}

.product-card__button:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .product-card,
  .product-card__button {
    transition: none;
  }
}
</style>


