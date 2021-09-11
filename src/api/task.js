import httpClient from "@/services/http-client"

const ENDPOINT = '/api/v1/tasks'

/**
 * Get all the tasks
 *
 * @param Object params
 * @returns JSON data
 */
export const getAllTask = async (params) => {
  const response = await httpClient.get(ENDPOINT, { params })
  const responseData = await response.data
  return responseData
}

/**
 * Create new task
 *
 * @param Object data
 * @returns
 */
 export const postTask = async (data) => {
  return await httpClient.post(ENDPOINT, data)
}


/**
 * Get specific task
 *
 * @param string uuid
 * @param Object params
 * @returns
 */
export const getTask = async (uuid, params) => {
  const response = await httpClient.get(`${ENDPOINT}/${uuid}`, { params })
  const responseData = await response.data
  return responseData
}

/**
 * Update the tasks order
 *
 * @param Array data
 * @returns
 */
export const reOrderTasks = async (data) => {
  const response = await httpClient.patch(ENDPOINT, data)
  const responseData = await response.data
  return responseData
}

/**
 * Restore specific task
 *
 * @param Object data
 * @returns
 */
export const restoreTask = async (data) => {
  const response = await httpClient.post(`${ENDPOINT}/restore`, data)
  const responseData = await response.data
  return responseData
}

/**
 * Delete specific task
 *
 * @param string uuid
 * @returns
 */
export const deleteTask = async (uuid) => {
  const response = await httpClient.delete(`${ENDPOINT}/${uuid}`)
  const responseStatus = await response.status
  return responseStatus === 204
}
