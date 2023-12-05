import api from './index.js'

export default {
  async postPayment (data) {
    const res = api().post('https://opay-api.oltranz.com/opay/paymentrequest',
    {
        "telephoneNumber" : `${data.telephoneNumber}`,
        "amount" : data.amount,
        "organizationId" : "2de2d7ea-fc88-453e-b817-c5cfa82b1763",
        "description" : "Payment for Printing services",
        "callbackUrl" : "http://myonlineprints.com/payments/callback"
      }
      
    )
    // console.log(res)
    return res
  }
}