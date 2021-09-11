import axios from 'axios'
import store from '@/store'

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
    return Promise.reject(error)
  }
)

export default httpClient
