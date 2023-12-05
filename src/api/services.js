import api from './index.js'

export default {
  async getServices () {
    const res = api().get('/api/services')
    // console.log(res)
    return res
  },
  async getOne (id) {
    const res = api().get(`/api/services/${id}`)
    // console.log(id)
    return res
  },
}
