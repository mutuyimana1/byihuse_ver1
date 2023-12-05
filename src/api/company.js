import api from './index.js'

export default {
  async getCompany () {
    const res = api().get('/api/companies')
    // console.log(res)
    return res
  }
}
