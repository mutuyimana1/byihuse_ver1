import api from './index.js'

export default {
  async addServicesOrders (data) {
    const res = api().post('/api/services-orders',data)
    // console.log(res)
    return res
  }
}
