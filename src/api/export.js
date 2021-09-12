import httpClient from "@/services/http-client"

const ENDPOINT = '/api/v1/exports'

/**
 * Export tasks
 *
 * @param Object params
 * @returns
 */
export const exportTasks = async params => {
  return await httpClient.get(`${ENDPOINT}/tasks`, { params, responseType: 'blob' })
}
