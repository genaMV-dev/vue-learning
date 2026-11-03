<script setup>
import { useCartStore } from '../stores/cartStore.js'
import { BsTrashFill } from '@kalimahapps/vue-icons'

const cartStore = useCartStore()
</script>

<template>
  <div class="container">
    <h1 class="page-title">Кошик</h1>

    <p v-if="cartStore.products.length === 0" class="empty-cart">Кошик порожній</p>

    <div v-else class="cart-content">
      <ul class="cart-list">
        <li class="cart-item" :key="cartProduct.id" v-for="cartProduct in cartStore.products">
          <h2 class="product-title">{{ cartProduct.title }}</h2>
          <p class="product-price">Ціна: {{ cartProduct.price }}</p>
          <p class="quantity-control">
            <button class="quantity-button" @click="cartStore.decreaseQuantity(cartProduct.id)">
              -
            </button>
            {{ cartProduct.quantity }}
            <button class="quantity-button" @click="cartStore.addProduct(cartProduct)">+</button>
          </p>

          <button class="remove-button" @click="cartStore.removeProduct(cartProduct.id)"><BsTrashFill /></button>
        </li>
      </ul>

      <button class="clear-cart-button" @click="cartStore.clearCart">ОЧИСТИТИ КОШИК</button>
      <p class="cart-summary">Загальна сума: {{ cartStore.totalPrice }}</p>
      <p class="cart-summary">Кількість товарів: {{ cartStore.totalQuantity }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: min(100% - 48px, 1200px);
  margin: 0 auto;
  padding: 180px 0 64px;
  color: var(--text);
}

.page-title {
  margin-bottom: 32px;
  color: var(--header);
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 800;
  letter-spacing: -0.04em;
}

.empty-cart {
  padding: 36px;
  border: 2px dashed var(--header);
  border-radius: 12px;
  color: var(--text);
  font-size: 20px;
  text-align: center;
}

.cart-list {
  display: grid;
  gap: 16px;
  margin-bottom: 28px;
}

.cart-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 14px 24px;
  padding: 22px 24px;
  border: 2px solid var(--header);
  border-radius: 12px;
  background: var(--link-color);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.cart-item:hover {
  transform: translateY(-3px);
  border-color: var(--hover);
  box-shadow: 0 10px 24px color-mix(in srgb, var(--header) 20%, transparent);
}

.product-title {
  color: var(--text);
  font-size: 20px;
  font-weight: 700;
}

.product-price {
  color: var(--header);
  font-size: 16px;
  font-weight: 650;
}

.quantity-control {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--text);
  font-size: 17px;
  font-weight: 700;
}

.quantity-button,
.remove-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--header);
  border-radius: 8px;
  background: var(--header);
  color: var(--link-color);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}

.quantity-button {
  width: 36px;
  height: 36px;
  font-size: 20px;
  font-weight: 700;
}

.remove-button {
  width: 42px;
  height: 42px;
  font-size: 18px;
}

.quantity-button:hover,
.remove-button:hover {
  transform: translateY(-2px);
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
}

.clear-cart-button {
  min-height: 46px;
  margin: 0 0 20px;
  padding: 12px 18px;
  border: 2px solid var(--header);
  border-radius: 8px;
  background: var(--header);
  color: var(--link-color);
  font-size: 14px;
  font-weight: 700;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    background-color 0.25s ease,
    color 0.25s ease;
}

.clear-cart-button:hover {
  transform: translateY(-2px);
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
}

.cart-summary {
  margin-top: 10px;
  color: var(--text);
  font-size: 17px;
  font-weight: 600;
}

.cart-summary:first-of-type {
  color: var(--header);
  font-size: 22px;
  font-weight: 800;
}

.quantity-button:focus-visible,
.remove-button:focus-visible,
.clear-cart-button:focus-visible {
  outline: 2px solid var(--hover);
  outline-offset: 3px;
}

@media (max-width: 700px) {
  .cart-item {
    grid-template-columns: 1fr auto;
    padding: 18px;
  }

  .product-price {
    grid-column: 1;
  }

  .quantity-control {
    grid-column: 1;
  }

  .remove-button {
    grid-column: 2;
    grid-row: 1 / span 3;
  }
}
</style>
