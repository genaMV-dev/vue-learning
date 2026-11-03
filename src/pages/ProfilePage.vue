<script setup>
</script>

<template>
  <main class="profile-page">
    <header class="profile-header">
      <p class="profile-eyebrow">ОСОБИСТИЙ КАБІНЕТ</p>
      <h1>Мій профіль</h1>
      <p class="profile-description">
        Переглядайте інформацію свого облікового запису та стежте за покупками.
      </p>
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

.profile-description {
  max-width: 640px;
  color: var(--text);
  font-size: 18px;
  line-height: 1.7;
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
