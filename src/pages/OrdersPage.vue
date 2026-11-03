<script setup>
const orders = [
  {
    id: 'ORD-1042',
    date: '28 жовтня 2026',
    products: 'iPhone 15 Pro',
    total: 45000,
    status: 'Доставлено',
  },
  {
    id: 'ORD-1038',
    date: '21 жовтня 2026',
    products: 'AirPods Pro, Apple Watch Series 9',
    total: 26000,
    status: 'У дорозі',
  },
  {
    id: 'ORD-1029',
    date: '12 жовтня 2026',
    products: 'MacBook Air M3',
    total: 55000,
    status: 'Обробляється',
  },
]
</script>

<template>
  <section class="orders">
    <h2 class="orders-title">Мої замовлення</h2>

    <ul class="orders-list">
      <li v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-heading">
          <h3>{{ order.id }}</h3>
          <span class="order-status">{{ order.status }}</span>
        </div>
        <p class="order-date">{{ order.date }}</p>
        <p class="order-products">{{ order.products }}</p>
        <p class="order-total">{{ order.total.toLocaleString('uk-UA') }} грн</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.orders-title {
  margin-bottom: 20px;
  color: var(--text);
  font-size: 26px;
  font-weight: 700;
}

.orders-list {
  display: grid;
  gap: 16px;
}

.order-card {
  padding: 22px 24px;
  border: 2px solid var(--header);
  border-radius: 12px;
  background: var(--link-color);
  color: var(--text);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.order-card:hover {
  transform: translateY(-3px);
  border-color: var(--hover);
  box-shadow: 0 10px 24px color-mix(in srgb, var(--header) 20%, transparent);
}

.order-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
}

.order-heading h3 {
  color: var(--header);
  font-size: 18px;
  font-weight: 750;
}

.order-status {
  padding: 6px 10px;
  border: 1px solid var(--header);
  border-radius: 999px;
  color: var(--header);
  font-size: 13px;
  font-weight: 650;
}

.order-date {
  margin-bottom: 8px;
  color: var(--text);
  font-size: 14px;
}

.order-products {
  margin-bottom: 14px;
  color: var(--text);
  line-height: 1.5;
}

.order-total {
  color: var(--header);
  font-size: 18px;
  font-weight: 750;
}

@media (max-width: 520px) {
  .order-card {
    padding: 18px;
  }

  .order-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
