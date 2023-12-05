import api from './index.js'

export default {
  async verifyPayments (data) {
    const res = api().post('/api/orders/payments/verify', data)
    // console.log(res)
    return res
  },
}
