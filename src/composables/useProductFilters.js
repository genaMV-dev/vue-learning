import { computed, ref } from 'vue'

export function useProductFilters(products) {
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const sortBy = ref('none')

  const filteredProducts = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()
    let result = products.value ?? []

    if (selectedCategory.value) {
      result = result.filter(
        (product) => product.category === selectedCategory.value
      )
    }

    if (query) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(query)
      )
    }

    if (sortBy.value === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy.value === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    return result
  })

  const resetFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = ''
    sortBy.value = 'none'
  }

  return {
    searchQuery,
    selectedCategory,
    sortBy,
    filteredProducts,
    resetFilters,
  }
}
