import api from './index.js'

export default {
  async postMessage (data) {
    const res = api().post('/api/messages',data)
    return res
  }
}