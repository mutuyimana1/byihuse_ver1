import api from './index.js'

export default {
  async getCategories () {
    const res = api().get('/api/categories')
    return res
  }
}
