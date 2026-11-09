import api from '../lib/axios.js'

export const getProducts = async () => {
  const response = await api.get('/products')

  return response.data
}

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`)

  return response.data
}

export const getSmartphones = async () => {
  const response = await api.get(`/products/category/smartphones`)

  return response.data
}