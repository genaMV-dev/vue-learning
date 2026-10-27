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
  padding: 24px;
  background-color: rgb(114, 114, 114);
  width: 400px;
  border-radius: 16px;
}

.image {
  max-width: 200px;
}

button {
  position: fixed;
  inset: 0;
  margin: auto;
  width: 150px;
  height: 50px;
  border: none;
  cursor: pointer;
}

.unshow{
  background-color: red;
  color: white;
}

.show{
  background-color: rgb(51, 255, 0);
}
</style>