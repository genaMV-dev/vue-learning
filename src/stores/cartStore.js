import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: [],
    isCartOpen: false,
  }),

  getters: {
    totalQuantity: (state) => {
      return state.products.reduce(
        (total, product) => total + product.quantity,
        0
      )
    },

    totalPrice: (state) => {
      return state.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      )
    },

    isProductInCart: (state) => {
      return (productId) => {
        return state.products.some((product) => product.id === productId)
      }
    },
  },

  actions: {
    addProduct(product) {
      const existingProduct = this.products.find(
        (item) => item.id === product.id
      )

      if (existingProduct) {
        existingProduct.quantity++
        return
      }

      this.products.push({
        ...product,
        quantity: 1,
      })
    },

    removeProduct(productId) {
      this.products = this.products.filter(
        (product) => product.id !== productId
      )
    },

    decreaseQuantity(productId) {
      const existingProduct = this.products.find(
        (item) => item.id === productId
      )

      if (!existingProduct) return

      if (existingProduct.quantity > 1) {
        existingProduct.quantity--
      } else {
        this.products = this.products.filter(
          (product) => product.id !== productId
        )
      }
    },

    clearCart() {
      this.products = []
    },

    toggleCart() {
      this.isCartOpen = !this.isCartOpen
    },
  },
})
