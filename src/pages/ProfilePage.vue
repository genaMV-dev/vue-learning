<script setup>
import { useAuthStore } from '../stores/authStore.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()

  router.push({ name: 'login' })
}
</script>

<template>
  <main class="profile-page">
    <header class="profile-header">
      <p class="profile-eyebrow">ОСОБИСТИЙ КАБІНЕТ</p>
      <h1>Мій профіль</h1>
      <h2 class="profile-username">{{ authStore.user.username }}</h2>
      <p class="profile-name">{{ authStore.user.firstName }}</p>
      <p class="profile-name">{{ authStore.user.lastName }}</p>
      <p class="profile-detail">{{ authStore.user.email }}</p>
      <p class="profile-id">ID: {{ authStore.user.id }}</p>
      <p class="profile-description">
        Переглядайте інформацію свого облікового запису та стежте за покупками.
      </p>
      <button class="logout-button" @click="handleLogout">Вийти</button>
    </header>

    <nav class="profile-navigation" aria-label="Розділи профілю">
      <RouterLink class="profile-link" to="/profile/orders">
        Мої замовлення
      </RouterLink>
    </nav>

    <section class="profile-content" aria-label="Вміст розділу профілю">
      <RouterView />
    </section>
  </main>
</template>

<style scoped>
.profile-page {
  width: min(100% - 48px, 1200px);
  margin: 0 auto;
  padding: clamp(48px, 8vw, 96px) 0;
  color: var(--text);
  padding-top: 180px;
}

.profile-header {
  margin-bottom: 36px;
}

.profile-eyebrow {
  margin-bottom: 12px;
  color: var(--header);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.profile-header h1 {
  margin-bottom: 12px;
  color: var(--text);
  font-size: clamp(36px, 6vw, 56px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
}

.profile-username {
  display: inline-block;
  margin: 8px 0 12px;
  color: var(--header);
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 750;
}

.profile-name {
  display: inline-block;
  margin: 0 8px 12px 0;
  padding: 8px 12px;
  border: 1px solid var(--header);
  border-radius: 8px;
  background: var(--link-color);
  color: var(--text);
  font-size: 16px;
  font-weight: 650;
  margin-left: 12px;
}

.profile-detail {
  margin-bottom: 8px;
  color: var(--text);
  font-size: 17px;
  font-weight: 600;
}

.profile-id {
  display: inline-block;
  margin-bottom: 16px;
  padding: 6px 10px;
  border: 1px solid var(--header);
  border-radius: 999px;
  background: var(--link-color);
  color: var(--header);
  font-size: 13px;
  font-weight: 700;
}

.profile-description {
  max-width: 640px;
  color: var(--text);
  font-size: 18px;
  line-height: 1.7;
}

.logout-button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  padding: 10px 20px;
  border: 2px solid var(--header);
  border-radius: 8px;
  background: var(--link-color);
  color: var(--header);
  font-weight: 700;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    background-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;
}

.logout-button:hover,
.logout-button:focus-visible {
  transform: translateY(-2px);
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
  box-shadow: 0 6px 16px var(--header);
}

.logout-button:focus-visible {
  outline: 2px solid var(--header);
  outline-offset: 3px;
}

.profile-navigation {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--header);
}

.profile-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 10px 18px;
  border: 2px solid var(--header);
  border-radius: 8px;
  background: var(--header);
  color: var(--link-color);
  font-weight: 700;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    background-color 0.3s ease,
    color 0.3s ease;
}

.profile-link:hover,
.profile-link:focus-visible,
.profile-link.router-link-active {
  transform: translateY(-2px);
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
}

.profile-link:focus-visible {
  outline: 2px solid var(--header);
  outline-offset: 3px;
}

.profile-content {
  min-height: 120px;
}
</style>
