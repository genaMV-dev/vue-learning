<script setup>
import image from '../assets/images/home-page-image.webp'
</script>

<template>
  <div class="container">
    <div>
      <h1>shop<span class="accent">IK</span> — твій розумний шопінг щодня.</h1>
      <p>
        Ласкаво просимо! Ми віримо, що покупки — це маленьке свято. Тому робимо
        все, щоб ви знаходили саме те, що шукаєте. Насолоджуйтесь вибором!
      </p>
      <RouterLink class="btnProducts" :to="{ name: 'products' }"
        >ЗАКУПИТИСЬ В НАС</RouterLink
      >
    </div>

    <img :src="image" alt="SHOPPING" />
  </div>
</template>

<style scoped>
.container {
  padding: 32px 160px;
  display: flex;
}

h1 {
  font-size: 48px;
  font-weight: 700;
  color: var(--text);
  margin-top: 280px;
  margin-bottom: 24px;
  max-width: 720px;
}

p {
  font-size: 32px;
  font-weight: 500;
  color: var(--text);
  max-width: 440px;
  margin-bottom: 48px;
}

.accent {
  color: #ff7300;
  font-weight: 800;
  font-size: 64px;
}

.btnProducts {
  padding: 16px 95px;
  border: 2px solid var(--header);
  font-size: 24px;
  font-weight: 700;
  border-radius: 8px;
  color: var(--header);
  transition:
    color 0.3s ease,
    border-color 0.3s ease;
}

.btnProducts:hover {
  color: var(--hover);
  border: 2px solid var(--hover);
}

img {
  margin-top: 190px;
}
</style>
