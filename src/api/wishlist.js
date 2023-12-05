import api from './index.js'
export default {
    async postwishlist (data) {
      const res = api().post('/api/wishlists', data)
      // console.log(res)
      return res
    }
  }