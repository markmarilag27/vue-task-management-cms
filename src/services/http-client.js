import axios from 'axios'
import store from '@/store'
import router from '@/router'

const AUTH_USER_ENDPOINT = '/api/v1/auth/me'

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
httpClient.interceptors.request.use(
  (config) => {
    const accessToken = store.state.auth.access_token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401 && error.response.config.url === AUTH_USER_ENDPOINT) {
      store.commit('auth/RESET_AUTH_USER')
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  }
)

export default httpClient
