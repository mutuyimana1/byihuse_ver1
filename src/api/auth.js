import api from './index.js'

export default {
  async signin (data) {
    const res= api().post('/api/auth/signin', data)
    return res
  },
  async signup (data) {
    const res= api().post('/api/auth/signup', data)
    console.log(res)
    return res
  },
  async updateName (data) {
    return api().put('/api/auth/name', data)
  },
  async updateEmail (data) {
    return api().put('/api/auth/email', data)
  },
  async updatePassword (data) {
    return api().put('/api/auth/password', data)
  },
  async updateDepartments (data) {
    return api().put('/api/auth/departments', data)
  }
}
