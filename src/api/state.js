import httpClient from "@/services/http-client"

const ENDPOINT = '/api/v1/states'

/**
 * Get all states
 *
 * @param {*} params
 * @returns
 */
export const getAllStates = async (params) => {
  const response = await httpClient.get(ENDPOINT, { params })
  const responseData = await response.data
  return responseData
}

/**
 * Create a new state
 *
 * @returns JSON data
 */
export const createState = async (data) => {
  const response = await httpClient.post(ENDPOINT, data)
  const responseData = await response.data
  return responseData
}
