<template>
	<div>
		<v-expansion-panel-header class="primary"><h4 class="mx-2 mb-0 white--text">{{$t("message.PaymentOptions")}}</h4></v-expansion-panel-header>
		<v-expansion-panel-content>
			<div>
				<v-tabs light slider-color="primary" v-model="activePayment">
					<v-tab class="text-capitalize">{{$t("message.MobileMoney")}}</v-tab>
					<v-tab class="text-capitalize">{{$t("message.PaywithCash")}}</v-tab>
					<v-tab class="text-capitalize">{{$t("message.Paywithdebit")}}</v-tab>
					<v-tab-item>
						<v-card flat>
							<v-card-text class="pa-0">
								<div class="header text-center bg-grey pt-12 pb-4">
									<div class="mb-6">
										<img  alt="discount" src="/static/images/card.png">
									</div>
									<h4 class="mb-12 font-weight-medium">{{$t("message.PayWithMobileMoney")}}</h4>
								</div>
								<v-form class="form-wrapper pt-6 text-center py-12" ref="form" v-model="valid">
									<div class="layout row wrap">
										<v-flex xs12 sm12 md12 lg8 xl8>
											<div class="layout row wrap">
												<!-- <v-btn class="sidebar-toggle mx-4" color="accent" dark @click="showOrder()" >Show Order Detail</v-btn> -->
												<v-flex xs12 sm6 md6 lg3 xl3>
													<v-text-field label="Mobile" v-model="userDetails.phone" placeholder="Mobile" outlined dense></v-text-field>
													<!-- <v-text-field class="mt-0 pt-0" :rules="inputRules.basictextRules" light label="Expiry Date(01/10)" required></v-text-field> -->
												</v-flex>
												<v-flex xs12 sm6 md6 lg3 xl3>
													<v-text-field label="Amount" v-model="userDetails.phone" placeholder="amount" outlined dense></v-text-field>
												</v-flex>
												<v-flex xs12 sm6 md6 lg3 xl3>
													<v-text-field label="ORG Id" v-model="userDetails.phone" placeholder="id" outlined dense></v-text-field>
												</v-flex>
												<v-flex xs12 sm6 md6 lg3 xl3>
													<v-text-field label="description" v-model="userDetails.phone" placeholder="description" outlined dense></v-text-field>
												</v-flex>
												<v-flex xs12 sm6 md6 lg3 xl3>
													<v-text-field label="acllback UI" v-model="userDetails.phone" placeholder="callback" outlined dense></v-text-field>
												</v-flex>
												<v-flex xs12 sm12 md12 lg12 xl12>
													<div class="text-xl-left text-sm-left">
														<v-btn :loading="loading" class="accent mr-3" @click="makePayment('MOMO')">{{$t("message.Submit")}}</v-btn>
														<v-btn @click="makeCleat">{{$t("message.Clear")}}</v-btn>
													</div>
												</v-flex>
											</div>
									</v-flex>
									<v-flex xs12 sm12 md12 lg3 xl2 hidden-md-and-down d-flex justify-center align-center card-visibility>
											<img src="/static/images/credit-card.png" slt="Credit card" width="128" height="128">
									</v-flex>
									</div>
								</v-form>
								
							</v-card-text>
						</v-card>
					</v-tab-item>
					<v-tab-item>
						<v-card flat>
							<v-card-text class="pa-0">
								<div class="header text-center bg-grey pt-12 pb-4">
									<div class="mb-6">
										<img alt="Bank" src="/static/images/online-shop.png">
									</div>
									<h4 class="mb-12 font-weight-medium">{{$t("message.PaywithCash")}}</h4>
								</div>
								<v-divider class="mt-12 mb-2"></v-divider>
								<div class="text-center">
									<!-- <v-btn class="sidebar-toggle mx-4" color="accent" dark @click="showOrder()" >Show Order Detail</v-btn> -->
									<v-btn class="sidebar-toggle mx-4"  color="accent" dark @click="makePayment('CASH')">{{$t("message.Submit")}}</v-btn>
									<v-btn @click="makeCleat">{{$t("message.Clear")}}</v-btn>
								</div>
							</v-card-text>
						</v-card>
					</v-tab-item>
					<v-tab-item>
						<v-card flat>
							<v-card-text class="pa-0">
								<div class="header text-center bg-grey pt-12 pb-4">
									<div class="mb-6">
										<img alt="Bank" src="/static/images/online-shop.png">
									</div>
									<h4 class="mb-12 font-weight-medium">{{$t("message.Paywithdebit")}}</h4>
								</div>
								<v-divider class="mt-12 mb-2"></v-divider>
								<div class="text-center">
									<!-- <v-btn class="sidebar-toggle mx-4" color="accent" dark @click="showOrder()" >Show Order Detail</v-btn> -->
									<v-btn class="sidebar-toggle mx-4"  color="accent" dark @click="makePayment('DEBT')">{{$t("message.Submit")}}</v-btn>
									<v-btn @click="makeCleat">{{$t("message.Clear")}}</v-btn>
								</div>
							</v-card-text>
						</v-card>
					</v-tab-item>
				</v-tabs>
			</div>
		</v-expansion-panel-content>
	</div>	
</template>

<script>
import order from "Api/order";
	import { mapGetters } from 'vuex';
   export default{
		computed: {
			...mapGetters(["stepOneFormValid","cart", "drawer", "userDetails", "totalPrice", "shipping"])
		},
      data () {
	   	return{
            activePayment: null,
				valid: false,
				inputRules: {
					basictextRules: [v => !!v || 'This field should not be empty.'],
				},
            val: '',
			bankListing:['Option1','Option2','Option3','Option4'],
			invoiceData: {
            products: [],
            firstName: '',
            lastname: '',
            email: '',
            streetNumber: '',
            city: '',
            country: '',
            agentCode: '',
            paymentsOption: '',
            MOMOPhoneNumber: '',
			totalAmmount: '',
			},
			code: 783729873429,
			total: 0,
			product: [],
			loading: false
         }
		},
		methods:{
			makeCleat() {
				location.reload()
			},
			/**
			 * This Function is to make Payment
			*/
			async makePayment(option){
				this.loading=true
				try {
				this.$refs.form.validate()
            if(this.valid){
			this.cart.forEach(el => {
				this.product.push({
					_id: el.id,
					quantity: el.quantity
				})
				this.total +=(el.total*el.quantity)
			});
			// console.log(this.total+ this.shipping)
			// console.log(this.shipping)
			this.invoiceData = {
				firstName: this.userDetails.firstName,
				lastName: this.userDetails.lastName,
				email: this.userDetails.email,
				streetNumber: this.userDetails.streetName,
				city: this.userDetails.cityState,
				country: this.userDetails.country,
				agentCode: this.code,
				paymentOption: option,
				phoneNumber: this.userDetails.phone,
				MoMoPhoneNumber: this.userDetails.phone,
				totalAmmount: this.total,
				products: this.product,
				delivery:this.shipping
			}
			console.log(this.invoiceData)
			const res = await order.makeOrder(this.invoiceData)
			if (option === 'CASH' || option === 'DEBT') {
				this.$router.push(`/${this.$i18n.locale}/session/thank-you`)
			}else {
				// console.log(res.data.data.payment.meta.authorization.redirect)
				// window.open(res.data.data.payment.meta.authorization.redirect)
				location.replace(res.data.data.payment.meta.authorization.redirect);
				// console.log(this.totalPrice)
				// console.log(res)
			}
			// console.log(res)
			
			// console.log(this.invoiceData)
			localStorage.removeItem('cart');
			// location.reload();
			this.loading=false
            }	
			} catch (err) {
				this.$snotify.error(`We are having issues! please try again soon`, {
					closeOnClick: false,
					pauseOnHover: false,
					timeout: 3000
					});
					console.log(err)
			}
			this.loading=false
			},
			showOrder () {
				// this.drawer = true
				this.$store.commit({
                type: 'showOrdervu',
                count: 'hsdjds'
			 })
			//  console.log()
			}
		},
   }
</script>