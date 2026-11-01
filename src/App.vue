<script setup>
import { computed, ref } from 'vue'

const product = ref({
  title: 'iPhone 15 Pro',
  price: 45000,
  stock: 7,
  color: 'black',
})

const isFavorite = ref(false)
const isInCart = ref(false)
const isDark = ref(false)

const stockClass = computed(() => {
  if (product.value.stock <= 0) return 'out-of-stock'
  if (product.value.stock <= 5) return 'low-stock'

  return 'in-stock'
})
</script>

<template>
  <article class="product-panel" :class="[stockClass, { dark: isDark }]">
    <h1 class="product-title">{{ product.title }}</h1>
    <p class="product-price">{{ product.price }} грн</p>
    <div class="product-info stock-info">
      <p>В наявності: {{ product.stock }} шт.</p>
      <span class="stock-indicator" aria-hidden="true">
        <span
          class="stock-indicator__fill"
          :style="{
            width: `${Math.min(Math.max(product.stock, 0) * 10, 100)}%`,
          }"
        ></span>
      </span>
    </div>
    <p class="product-info">Колір: {{ product.color }}</p>
    <button
      class="product-button favorite-button favoriteBtn"
      :class="{ favorite: isFavorite }"
      @click="isFavorite = !isFavorite"
      :disabled="product.stock === 0"
    >
      {{ isFavorite ? '♥ В обраному' : '♡ Додати в обране' }}
    </button>

    <button
      class="product-button cart-button cartBtn"
      :class="{ inCart: isInCart }"
      @click="isInCart = !isInCart"
      :disabled="product.stock === 0"
    >
      {{ isInCart ? 'У кошику' : 'Додати в кошик' }}
    </button>

    <button class="product-button theme-button" @click="isDark = !isDark">
      {{ isDark ? 'Біла тема' : 'Чорна тема' }}
    </button>

    <div class="stock-controls">
      <button
        class="product-button stock-button"
        @click="product.stock = Math.max(0, product.stock - 1)"
      >
        Зменшити кількість товару.
      </button>
      <button class="product-button stock-button" @click="product.stock += 1">
        Збільшити кількість товару.
      </button>
    </div>
  </article>
</template>

<style scoped>
.product-panel {
  --accent: #ff8800;
  --accent-strong: #26800f;
  --surface: #fff;
  --surface-muted: #f5f7f3;
  --text: #20251f;
  --muted: #667064;
  --border: #e0e7dc;

  box-sizing: border-box;
  display: flex;
  width: min(100% - 32px, 560px);
  flex-direction: column;
  gap: 12px;
  margin: clamp(24px, 8vh, 80px) auto;
  padding: clamp(24px, 5vw, 40px);
  border: 1px solid var(--border);
  border-radius: 24px;
  background: var(--surface);
  color: var(--text);
  box-shadow: 0 20px 60px rgb(21 38 16 / 10%);
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  transition:
    background-color 200ms ease,
    color 200ms ease,
    border-color 200ms ease;
}

.product-panel.dark {
  --surface: #171a17;
  --surface-muted: #242a23;
  --text: #f4f6f1;
  --muted: #b0b9ab;
  --border: #353d33;

  background:
    radial-gradient(
      ellipse at 100% 0%,
      rgb(38 128 15 / 20%),
      transparent 22rem
    ),
    var(--surface);
  box-shadow: 0 24px 70px rgb(0 0 0 / 32%);
}

.product-title {
  margin: 0;
  font-size: clamp(28px, 5vw, 38px);
  font-weight: 800;
  letter-spacing: -0.04em;
}

.product-price {
  margin: 0;
  color: var(--accent-strong);
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.product-panel.dark .product-price {
  color: var(--accent);
}

.product-info {
  margin: 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--surface-muted);
  color: var(--muted);
  font-size: 15px;
}

.stock-info p {
  margin: 0 0 10px;
}

.stock-indicator {
  display: block;
  height: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: #dfe5dc;
}

.stock-indicator__fill {
  display: block;
  width: 0;
  height: 100%;
  border-radius: inherit;
  transition:
    width 240ms ease,
    background-color 240ms ease;
}

.product-panel.low-stock .stock-indicator__fill {
  background: #ffcc00;
}

.product-panel.in-stock .stock-indicator__fill {
  background: #26800f;
}

.product-button {
  min-height: 46px;
  padding: 11px 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface-muted);
  color: var(--text);
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  transition:
    transform 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease;
}

.product-button:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: 0 6px 16px rgb(38 128 15 / 12%);
}

.product-button:focus-visible {
  outline: 3px solid rgb(255 136 0 / 55%);
  outline-offset: 3px;
}

.favorite-button.favorite {
  border-color: #ff8800;
  background: #fff0df;
  color: #a64e00;
}

.product-panel.dark .favorite-button.favorite {
  background: #392816;
  color: #ffb25c;
}

.cart-button {
  border-color: var(--accent-strong);
  background: var(--accent-strong);
  color: #fff;
}

.cart-button:hover,
.cart-button.inCart {
  border-color: var(--accent);
  background: var(--accent);
  color: #17120b;
}

.theme-button {
  align-self: flex-start;
  border-color: transparent;
  background: transparent;
  color: var(--muted);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.stock-controls {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 4px;
}

.stock-button {
  min-height: 54px;
  font-size: 13px;
}

@media (max-width: 480px) {
  .product-panel {
    gap: 10px;
    padding: 24px 20px;
    border-radius: 18px;
  }

  .stock-controls {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .product-panel,
  .product-button,
  .stock-indicator__fill {
    transition: none;
  }
}
</style>
