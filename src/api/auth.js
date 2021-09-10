import httpClient from "@/services/http-client"

const ENDPOINT = '/api/v1/auth/login'

/**
 * Get sanctum csrf cookie
 *
 * @returns data
 */
export const getCsrfToken = async () => {
  const response = await httpClient.get('/sanctum/csrf-cookie')
  const data = await response.data
  return data
}

/**
 * Login to the backend
 *
 * @param {*} credentials
 */
export const postLogin = async (credentials) => {
  const response = await httpClient.post(ENDPOINT, credentials)
  const data = await response.data
  return data
}
