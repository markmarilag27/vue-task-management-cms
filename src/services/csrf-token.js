import Cookies from 'js-cookie'
import { getCsrfToken } from '@/api/auth'

const checkCSRFToken = () => {
  const csrfToken = Cookies.get('XSRF-TOKEN')

  if (typeof csrfToken === 'undefined') {
    getCsrfToken()
  }
}

export default checkCSRFToken
