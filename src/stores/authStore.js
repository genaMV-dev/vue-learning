import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    accessToken: localStorage.getItem('accessToken') || null,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.accessToken),
  },

  actions: {
    setAuth(data) {
      this.user = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      }

      this.accessToken = data.accessToken

      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('accessToken', this.accessToken)
    },

    logout() {
      this.user = null
      this.accessToken = null

      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
    },
  },
})
