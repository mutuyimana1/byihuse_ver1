import api from './index.js'

export default {
  async getRental () {
    const res = api().get('/api/rentals')
    return res
  },
  async getOne (id) {
    const res = api().get(`/api/rentals/${id}`)
    return res
  },
  async rentalOrder (data) {
    const res = api().post(`/api/rental-orders`, data)
    return res
  },
}
