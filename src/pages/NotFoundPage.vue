<script setup></script>

<template>
  <div class="container">
    <h1>404</h1>
    <p>Сторінку не знайдено</p>
    <RouterLink to="/">ПОВЕРНУТИСЬ НА ГОЛОВНУ</RouterLink>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  min-height: 65vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 48px 24px;
  padding-top: 180px;
  color: var(--text);
  text-align: center;
}

h1 {
  color: var(--header);
  font-size: clamp(100px, 22vw, 220px);
  font-weight: 800;
  letter-spacing: -0.08em;
  line-height: 0.9;
  text-shadow: 6px 6px 0 var(--hover);
}

p {
  font-size: clamp(22px, 4vw, 32px);
  font-weight: 650;
}

a {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  padding: 12px 22px;
  border: 2px solid var(--header);
  border-radius: 8px;
  background: var(--header);
  color: var(--link-color);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    background-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;
}

a:hover,
a:focus-visible {
  transform: translateY(-3px);
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
  box-shadow: 0 8px 20px var(--header);
}

a:focus-visible {
  outline: 2px solid var(--header);
  outline-offset: 4px;
}
</style>
