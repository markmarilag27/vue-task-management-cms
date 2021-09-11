import Cookies from 'js-cookie'
import { getCsrfToken } from '@/api/auth'

const AUTH_USER_TOKEN = 'AUTH-USER-TOKEN'
const XSRF_TOKEN = 'XSRF-TOKEN'

// validate auth user token
export const validateAuthUserToken = () => {
  // auth user and access_token payload
  const baseState = {
    access_token: null,
    user: null
  }
  // get the AUTH-USER-TOKEN
  const cookieData = Cookies.get(AUTH_USER_TOKEN)
  // check if cookie data is undefined
  const isUndefined = typeof cookieData === 'undefined'
  // check if cookie data is string
  const authUserToken = typeof cookieData === 'string' ? JSON.parse(cookieData) : cookieData
  // if the authUserToken is undefined return the baseState object
  return isUndefined ? baseState : authUserToken
}

// validate XSRF-TOKEN does exist on the browser
export const validateXsrfToken = () => {
  // get the xsrf-token first
  const xsrfToken = Cookies.get(XSRF_TOKEN)

  // if csrfToken is undefined make a request
  if (typeof xsrfToken === 'undefined') {
    getCsrfToken()
  }
}

// set cookie
export const setAuthUserToken = payload => (Cookies.set(AUTH_USER_TOKEN, JSON.stringify(payload)))

// remove cookie
export const removeAuthUserToken = () => (Cookies.remove(AUTH_USER_TOKEN))
