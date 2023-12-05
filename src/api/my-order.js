import api from './index.js'

export default {
  async myRentalOrder () {
    const res = api().get(`/api/rental-orders/my-orders`)
    return res
  },
  async myProductsOrder () {
    const res = api().get(`/api/orders/my-orders`)
    return res
  },
}
