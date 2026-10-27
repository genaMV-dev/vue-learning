<script setup>
import { computed, ref } from 'vue'

const laptops = [
  {
    id: 1,
    title: 'MacBook Pro 14" M3',
    price: 1999,
    imageUrl: 'https://placehold.co/400x300/333/fff?text=MacBook+Pro',
  },
  {
    id: 2,
    title: 'Dell XPS 13 Plus',
    price: 1499,
    imageUrl: 'https://placehold.co/400x300/0078D7/fff?text=Dell+XPS',
  },
  {
    id: 3,
    title: 'Lenovo ThinkPad X1 Carbon',
    price: 1650,
    imageUrl: 'https://placehold.co/400x300/111/fff?text=Lenovo+ThinkPad',
  },
  {
    id: 4,
    title: 'ASUS ROG Zephyrus G14',
    price: 1599,
    imageUrl: 'https://placehold.co/400x300/d32f2f/fff?text=ASUS+ROG',
  },
  {
    id: 5,
    title: 'HP Spectre x360 14',
    price: 1399,
    imageUrl: 'https://placehold.co/400x300/5b21b6/fff?text=HP+Spectre',
  },
]

const isShowCatalog = ref(true)

function showToggler() {
  isShowCatalog.value = !isShowCatalog.value
}

const search = ref('')

const filteredLaptops = computed(() => {
  if (!search.value) return laptops

  const query = search.value.toLowerCase()

  return laptops.filter(laptop => 
    laptop.title.toLowerCase().includes(query)
  )
})
</script>

<template>
  <div v-if="isShowCatalog" class="container">
    <input v-model="search" placeholder="Шукати" />

    <ul v-if="filteredLaptops.length > 0" class="catalogList">
      <li v-for="laptop in filteredLaptops" :key="laptop.id">
        <img class="image" :src="laptop.imageUrl" :alt="laptop.title" />
        <h2>{{ laptop.title }}</h2>
        <p>{{ laptop.price }}</p>
      </li>
    </ul>
    <p v-if="filteredLaptops.length === 0">Товарів не знайдено</p>
  </div>

  <div class="buttons">
    <button class="unshow" v-if="isShowCatalog" @click="showToggler">Unshow</button>
    <button class="show" v-if="!isShowCatalog" @click="showToggler">Show</button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: min(100% - 32px, 1200px);
  margin: 40px auto;
}

input {
  display: block;
  width: min(100%, 420px);
  margin: 0 auto 32px;
  padding: 13px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: #fff;
  color: #0f172a;
  font: inherit;
  font-size: 16px;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: #2563eb;
    outline: none;
    box-shadow: 0 0 0 4px rgb(37 99 235 / 14%);
  }
}

.catalogList {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
  gap: 24px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    overflow: hidden;
    padding: 16px;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 4px 16px rgb(15 23 42 / 6%);
    transition:
      transform 180ms ease,
      box-shadow 180ms ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 28px rgb(15 23 42 / 12%);
    }
  }

  h2 {
    margin: 16px 0 8px;
    color: #172033;
    font-size: 18px;
    line-height: 1.4;
  }

  p {
    margin: 0;
    color: #2563eb;
    font-size: 20px;
    font-weight: 700;
  }
}

.image {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  background: #f1f5f9;
  object-fit: cover;
}

.container > p {
  margin: 32px 0;
  color: #64748b;
  font-size: 18px;
  text-align: center;
}

.buttons {
  display: flex;
  justify-content: center;
  margin: 24px 16px 40px;

  button {
    min-width: 120px;
    padding: 11px 20px;
    border: 0;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    font: inherit;
    font-weight: 600;
    transition:
      background-color 160ms ease,
      transform 160ms ease;

    &:hover {
      transform: translateY(-1px);
    }

    &:focus-visible {
      outline: 3px solid #93c5fd;
      outline-offset: 3px;
    }
  }
}

.unshow {
  background: #475569;

  &:hover {
    background: #334155;
  }
}

.show {
  background: #2563eb;

  &:hover {
    background: #1d4ed8;
  }
}

@media (prefers-reduced-motion: reduce) {
  .catalogList li,
  .buttons button {
    transition: none;
  }
}
</style>