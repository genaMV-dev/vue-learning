<script setup>
</script>

<template>
  <main class="about-page">
    <section class="about-hero">
      <p class="eyebrow">ПРО МАГАЗИН</p>
      <h1>Покупки, які приносять <span>радість</span></h1>
      <p class="hero-description">
        shopIK — онлайн-магазин техніки для тих, хто цінує вдалий вибір,
        зрозумілий сервіс і приємний досвід покупок.
      </p>
    </section>

    <section class="about-content" aria-label="Інформація про магазин">
      <article class="about-card">
        <span class="card-number">01</span>
        <h2>Хто ми</h2>
        <p>
          Ми зібрали в одному місці техніку для роботи, навчання й відпочинку —
          від смартфонів і ноутбуків до аксесуарів.
        </p>
      </article>

      <article class="about-card">
        <span class="card-number">02</span>
        <h2>Наш підхід</h2>
        <p>
          Допомагаємо обирати без зайвої складності: зосереджуємося на товарах,
          які справді можуть стати у пригоді щодня.
        </p>
      </article>

      <article class="about-card">
        <span class="card-number">03</span>
        <h2>Наша мета</h2>
        <p>
          Зробити онлайн-шопінг простим і приємним, щоб потрібна річ знаходилася
          швидко, а кожна покупка була вдалою.
        </p>
      </article>
    </section>

    <section class="about-cta">
      <div>
        <h2>Знайди свою наступну покупку</h2>
        <p>Переглянь каталог і обери техніку для своїх щоденних задач.</p>
      </div>
      <RouterLink class="catalog-link" :to="{ name: 'products' }">
        Перейти до каталогу
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  --about-surface: color-mix(in srgb, var(--link-color) 45%, white);

  width: min(100% - 48px, 1200px);
  margin: 0 auto;
  padding: clamp(48px, 8vw, 96px) 0;
  padding-top: 180px;
  color: var(--text);
}

.about-hero {
  max-width: 780px;
  margin: 0 auto 56px;
  text-align: center;
}

.eyebrow {
  margin-bottom: 16px;
  color: var(--header);
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.18em;
}

.about-hero h1 {
  font-size: clamp(38px, 6vw, 68px);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.08;
}

.about-hero h1 span {
  color: var(--header);
  text-decoration: underline;
  text-decoration-color: var(--hover);
  text-decoration-thickness: 6px;
  text-underline-offset: 8px;
}

.hero-description {
  max-width: 660px;
  margin: 24px auto 0;
  color: var(--text);
  font-size: clamp(18px, 2.2vw, 22px);
  line-height: 1.7;
}

.about-content {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.about-card {
  padding: 30px;
  border: 2px solid var(--header);
  border-radius: 14px;
  background: var(--about-surface);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.about-card:hover {
  transform: translateY(-6px);
  border-color: var(--hover);
  box-shadow: 0 16px 32px color-mix(in srgb, var(--header) 24%, transparent);
}

.card-number {
  display: inline-block;
  margin-bottom: 22px;
  color: var(--header);
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.about-card h2,
.about-cta h2 {
  margin-bottom: 12px;
  color: var(--text);
  font-size: 24px;
  font-weight: 750;
}

.about-card p,
.about-cta p {
  color: var(--text);
  font-size: 16px;
  line-height: 1.7;
}

.about-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-top: 40px;
  padding: clamp(28px, 5vw, 48px);
  border-radius: 14px;
  background: var(--header);
  color: var(--link-color);
}

.about-cta h2,
.about-cta p {
  color: var(--link-color);
}

.about-cta p {
  max-width: 600px;
}

.catalog-link {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 12px 20px;
  border: 2px solid var(--link-color);
  border-radius: 8px;
  color: var(--link-color);
  font-weight: 700;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    background-color 0.3s ease,
    color 0.3s ease;
}

.catalog-link:hover,
.catalog-link:focus-visible {
  transform: translateY(-2px);
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
}

.catalog-link:focus-visible {
  outline: 2px solid var(--link-color);
  outline-offset: 4px;
}

@media (max-width: 760px) {
  .about-content {
    grid-template-columns: 1fr;
  }

  .about-cta {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
