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
  image: String,
})

const emit = defineEmits(['basket'])
</script>

<template>
  <article class="product-card">
    <div class="product-card__image-wrap">
      <img class="product-card__image" :src="image" alt="" />
    </div>
    <h1 class="product-card__title">{{ title }}</h1>
    <p class="product-card__price">{{ price }}<span>$</span></p>

    <button class="product-card__button" @click="emit('basket', id)">
      Додати в кошик
    </button>
  </article>
</template>

<style scoped>
.product-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #e9eaf0;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 8px 26px rgb(32 36 58 / 6%);
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.product-card:hover {
  transform: translateY(-5px);
  border-color: rgb(46 196 182 / 60%);
  box-shadow: 0 18px 38px rgb(32 36 58 / 12%);
}

.product-card__image-wrap {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border-radius: 14px;
  background: #f0f3f8;
}

.product-card__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 250ms ease;
}

.product-card:hover .product-card__image {
  transform: scale(1.045);
}

.product-card__title {
  margin: 18px 0 8px;
  color: #20243a;
  font-size: 18px;
  font-weight: 750;
  line-height: 1.35;
}

.product-card__price {
  margin: 0 0 20px;
  color: #ff1245;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.product-card__price span {
  margin-left: 4px;
  font-size: 15px;
  font-weight: 650;
}

.product-card__button {
  width: 100%;
  margin-top: auto;
  padding: 12px 14px;
  border: 0;
  border-radius: 11px;
  background: #2ec4b6;
  color: #103c3a;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 750;
  transition: background-color 160ms ease, color 160ms ease, transform 160ms ease;
}

.product-card__button:hover {
  transform: translateY(-1px);
  background: #ff1245;
  color: #fff;
}

.product-card__button:focus-visible {
  outline: 3px solid rgb(255 18 69 / 35%);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .product-card,
  .product-card__image,
  .product-card__button {
    transition: none;
  }
}
</style>
