<script setup>
import { computed, ref } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')
const age = ref(null)
const studyMode = ref('online')
const skills = ref([])
const acceptTerms = ref(false)
const isSubmitted = ref(false)

const isFormValid = computed(() => {
  return (
    username.value.trim().length >= 2 &&
    email.value.trim().length > 0 &&
    password.value.length >= 8 &&
    age.value >= 16 &&
    age.value <= 100 &&
    skills.value.length > 0 &&
    acceptTerms.value === true
  )
})

function handleSubmit() {
  isSubmitted.value = true

  if (!isFormValid.value) return

  console.log(
    `Ім'я: ${username.value},
    Пошта: ${email.value},
    Вік: ${age.value},
    Спосіб навчання: ${studyMode.value},
    Навички: ${skills.value.join(', ')}`
  )

  username.value = ''
  email.value = ''
  password.value = ''
  age.value = null
  studyMode.value = 'online'
  skills.value = []
  acceptTerms.value = false
  isSubmitted.value = false
}
</script>

<template>
  <form class="registration-form" @submit.prevent="handleSubmit">
    <p class="form-error" v-if="isSubmitted && username.trim().length < 2">
      Ім'я повинно містити 2 або більше символа
    </p>
    <label class="field-label" for="username">Ім'я</label>
    <input
      v-model.trim="username"
      type="text"
      placeholder="Олексій"
      id="username"
    />

    <p class="form-error" v-if="isSubmitted && email.trim().length === 0">
      Пошта не може бути порожньою
    </p>
    <label class="field-label" for="email">Пошта</label>
    <input
      v-model.trim="email"
      type="email"
      placeholder="olexiy@gmail.com"
      id="email"
    />

    <p class="form-error" v-if="isSubmitted && password.length < 8">
      Пароль повинен містити 8 або більше символів
    </p>
    <label class="field-label" for="password">Пароль</label>
    <input
      v-model="password"
      type="password"
      placeholder="Пароль"
      id="password"
    />

    <p class="form-error" v-if="isSubmitted && (age < 16 || age > 100)">
      Вік повинен бути від 16 до 100 років
    </p>
    <label class="field-label" for="age">Вік</label>
    <input v-model.number="age" type="number" placeholder="18" id="age" />

    <label class="field-label" for="study-mode">Спосіб навчання</label>
    <select v-model="studyMode" name="study-mode" id="study-mode">
      <option value="online">Онлайн</option>
      <option value="offline">Офлайн</option>
    </select>

    <p class="form-error" v-if="isSubmitted && skills.length === 0">
      Оберіть хоча б одну навичку
    </p>
    <label class="field-label" for="">Навички</label>
    <div class="checkbox-group">
      <label class="checkbox-option" for="html">
        <input v-model="skills" type="checkbox" value="HTML" id="html" />
        <span>HTML</span>
      </label>
      <label class="checkbox-option" for="css">
        <input v-model="skills" type="checkbox" value="CSS" id="css" />
        <span>CSS</span>
      </label>
      <label class="checkbox-option" for="js">
        <input v-model="skills" type="checkbox" value="JavaScript" id="js" />
        <span>JavaScript</span>
      </label>
    </div>

    <p class="form-error" v-if="isSubmitted && !acceptTerms">
      Ви повинні погодитися з умовами
    </p>
    <label class="checkbox-option terms-option" for="accept-terms">
      <input v-model="acceptTerms" type="checkbox" id="accept-terms" />
      <span>Згода з умовами</span>
    </label>

    <button class="submit-button" type="submit">Зареєструватися</button>
  </form>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
  background: #f4f4f5;
  color: #000;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

.registration-form {
  position: relative;
  display: grid;
  gap: 10px;
  width: min(100% - 32px, 560px);
  margin: clamp(24px, 7vh, 72px) auto;
  padding: clamp(24px, 5vw, 40px);
  overflow: hidden;
  border: 1px solid #e1e1e4;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 20px 60px rgb(0 0 0 / 9%);
}

.registration-form::before {
  position: absolute;
  inset: 0 0 auto;
  height: 7px;
  background: #ff8800;
  content: '';
}

.field-label {
  margin-top: 8px;
  color: #2b2b3a;
  font-size: 14px;
  font-weight: 700;
}

.registration-form input:not([type='checkbox']),
.registration-form select {
  width: 100%;
  min-height: 46px;
  padding: 11px 13px;
  border: 1px solid #d8d8dd;
  border-radius: 10px;
  background: #fafafa;
  color: #000;
  font: inherit;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    background-color 160ms ease;
}

.registration-form input:not([type='checkbox'])::placeholder {
  color: #96969d;
}

.registration-form input:not([type='checkbox']):focus,
.registration-form select:focus {
  border-color: #ff8800;
  outline: none;
  background: #fff;
  box-shadow: 0 0 0 4px rgb(255 136 0 / 16%);
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.checkbox-option {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 42px;
  padding: 9px 13px;
  border: 1px solid #e1e1e4;
  border-radius: 10px;
  background: #fafafa;
  color: #2b2b3a;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition:
    border-color 160ms ease,
    background-color 160ms ease;
}

.checkbox-option:has(input:checked) {
  border-color: #ff8800;
  background: #fff3e5;
}

.checkbox-option input {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: #ff8800;
}

.terms-option {
  justify-self: start;
  margin-top: 2px;
}

.form-error {
  margin: 4px 0 -4px;
  color: #b54708;
  font-size: 13px;
  font-weight: 600;
}

.submit-button {
  min-height: 50px;
  margin-top: 12px;
  padding: 12px 18px;
  border: 0;
  border-radius: 12px;
  background: #ff8800;
  color: #000;
  cursor: pointer;
  font: inherit;
  font-weight: 800;
  transition:
    transform 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease;
}

.submit-button:hover {
  transform: translateY(-2px);
  background: #e87900;
  box-shadow: 0 8px 18px rgb(255 136 0 / 25%);
}

.submit-button:focus-visible,
.checkbox-option:has(input:focus-visible) {
  outline: 3px solid rgb(255 136 0 / 50%);
  outline-offset: 3px;
}

a {
  color: inherit;
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}

@media (max-width: 480px) {
  .registration-form {
    gap: 8px;
    padding: 28px 20px;
    border-radius: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .registration-form input,
  .registration-form select,
  .checkbox-option,
  .submit-button {
    transition: none;
  }
}
</style>
