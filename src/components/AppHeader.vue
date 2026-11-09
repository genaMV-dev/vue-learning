<script setup>
import { AnOutlinedShoppingCart } from '@kalimahapps/vue-icons'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cartStore.js'

const cartStore = useCartStore()
const { totalQuantity } = storeToRefs(cartStore)
</script>

<template>
  <header>
    <div>
      <RouterLink class="logo" to="/"
        >shop<span class="accent">IK</span></RouterLink
      >
    </div>

    <nav>
      <RouterLink to="/products">Каталог</RouterLink>
      <RouterLink to="/about">Про нас</RouterLink>
      <RouterLink to="/profile">Профіль</RouterLink>

      <RouterLink to="/cart"
        ><AnOutlinedShoppingCart />
        <span class="cart-count">{{ totalQuantity }}</span>
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  padding: 32px 64px;
  background-color: var(--header);
  color: var(--link-color);
  display: flex;
  gap: 520px;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
}

nav {
  font-size: 24px;
  font-weight: 500;
  display: flex;
  gap: 140px;
}

nav a {
  transition: color 0.3s ease;
}

nav a:hover {
  color: var(--hover);
}

nav a.router-link-active {
  color: var(--hover);
  text-decoration: underline;
}

.logo {
  font-size: 32px;
  font-weight: 600;
}

.accent {
  color: #ff7300;
  font-weight: 800;
  font-size: 36px;
}

.cart-count {
  display: inline-flex;
  min-width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  padding: 0 7px;
  border-radius: 999px;
  background: var(--hover);
  color: var(--header);
  font-size: 14px;
  font-weight: 800;
  line-height: 1;
}
</style>
