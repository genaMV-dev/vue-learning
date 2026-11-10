<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'
import { loginUser } from '../services/authService.js'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')

const isLoading = ref(false)
const error = ref('')

const handleLogin = async () => {
  try {
    isLoading.value = true
    error.value = ''

    const userData = await loginUser({
      username: username.value,
      password: password.value,
    })

    authStore.setAuth(userData)

    router.push({ name: 'products' })
  } catch (err) {
    error.value = 'Неправильний логін або пароль' || err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form class="login-form" @submit.prevent="handleLogin">
    <input
      class="login-input"
      v-model.trim="username"
      type="text"
      placeholder="Username"
      required
    />

    <input
      class="login-input"
      v-model="password"
      type="password"
      placeholder="Password"
      required
    />

    <button class="login-button" type="submit" :disabled="isLoading">
      {{ isLoading ? 'Завантаження...' : 'Увійти' }}
    </button>

    <p class="login-error" v-if="error">{{ error }}</p>
  </form>
</template>

<style scoped>
.login-form {
  position: relative;
  display: grid;
  gap: 18px;
  width: min(100% - 40px, 460px);
  margin: 180px auto 64px;
  padding: 40px;
  overflow: hidden;
  border: 2px solid var(--header);
  border-radius: 14px;
  background: var(--link-color);
  box-shadow: 0 12px 28px var(--header);
}

.login-form::before {
  position: absolute;
  inset: 0 0 auto;
  height: 6px;
  background: var(--hover);
  content: '';
}

.login-input {
  width: 100%;
  min-height: 50px;
  padding: 12px 14px;
  border: 2px solid var(--header);
  border-radius: 8px;
  background: var(--link-color);
  color: var(--text);
  outline: none;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease;
}

.login-input::placeholder {
  color: var(--text);
  opacity: 0.7;
}

.login-input:focus {
  border-color: var(--hover);
  background: #fff;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hover) 28%, transparent);
}

.login-button {
  min-height: 50px;
  padding: 12px 18px;
  border: 2px solid var(--header);
  border-radius: 8px;
  background: var(--header);
  color: var(--link-color);
  font-weight: 700;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    background-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: var(--hover);
  background: var(--hover);
  color: var(--header);
  box-shadow: 0 6px 16px var(--header);
}

.login-button:focus-visible {
  outline: 2px solid var(--hover);
  outline-offset: 3px;
}

.login-button:disabled {
  cursor: wait;
  opacity: 0.65;
}

.login-error {
  padding: 12px 14px;
  border: 1px solid var(--header);
  border-left: 5px solid var(--hover);
  border-radius: 8px;
  background: var(--link-color);
  color: var(--text);
  line-height: 1.5;
}

@media (max-width: 520px) {
  .login-form {
    padding: 32px 22px;
  }
}
</style>
