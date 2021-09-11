import httpClient from "@/services/http-client"

const ENDPOINT = '/api/v1/auth'

// get csrf token
export const getCsrfToken = async () => {
  const response = await httpClient.get('/sanctum/csrf-cookie')
  const data = await response.data
  return data
}

// send the login credentials
export const postLogin = async (credentials) => {
  const response = await httpClient.post(`${ENDPOINT}/login`, credentials)
  const data = await response.data
  return data
}

// get the authenticated user data
export const getAuthUserData = async () => {
  const response = await httpClient.get(`${ENDPOINT}/me`)
  const data = await response.data
  return data
}
