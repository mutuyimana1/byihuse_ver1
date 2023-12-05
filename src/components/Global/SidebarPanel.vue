<template>
	<div class="sidebar-panel">
		<v-layout justify-end mt-0>
			<v-btn
				class="sidebar-toggle mx-4"
				color="accent"
				dark
				@click.stop="drawer = !drawer"
			>
				{{$t("message.ShowOrderDetail")}}:<emb-currency-sign></emb-currency-sign>{{(getTotalPrice/currentValue).toFixed(2)}}
			</v-btn>
		</v-layout>
		 <v-navigation-drawer fixed width="340" right v-model="drawer" temporary>
			<div class="side-cart-head accent pa-8 text-center">
				<v-icon class="white--text mb-4">
					shopping_cart
				</v-icon>
				<h5 class="white--text">{{$t("message.Youhave")}} {{cart.length}} {{$t("message.itemscart")}}</h5>
			</div>
			<div class="cart-content">
				<div v-if="cart == ''" class="text-xl-center">
					<v-icon size="26" class="px-2">
						shopping_cart
					</v-icon>
					<h3>{{$t("message.NoItemFound")}}</h3>
					<v-btn class="accent" :to="'/'+$i18n.locale+'/products'">{{$t("message.GotoShopping")}}</v-btn>
				</div>
				<div v-else class="cart-shop-list">
					<div class="cart-item p-sm-4 p-3" v-for="(cart, index) in cart" :key="index">
							<v-layout row wrap  align-center ma-0>
								<v-flex xs3 sm3 md3 lg3 xl3 pa-0>
									<img :src="cart.image" width="80" height="77">
								</v-flex>
								<v-flex xs7 sm7 md7 lg7 xl7 cart-product-name pa-0>
									<h6 class="mb-1 word-wrap-break">{{cart.name}}</h6>
									<p class="mb-0">{{cart.quantity}}</p>
									<p class="mb-0 font-weight-bold"><emb-currency-sign></emb-currency-sign>{{(cart.price/currentValue).toFixed(2)}}</p>
									</v-flex>
								<v-flex xs2 sm2 md2 lg2 xl2 btn-action text-right pa-0>
										<v-btn :ripple="false" class="ma-0" icon @click="deleteProductFromCart(cart)">
											<v-icon>remove_shopping_cart</v-icon>
										</v-btn>
										<v-btn :ripple="false" class="ma-0" icon :to="'/'+$i18n.locale+'/cart'" >
											<v-icon>edit</v-icon>
										</v-btn>
									</v-flex>
								</v-layout>
					</div>
					<div class="pt-6 px-4">
						<div class="layout align-center justify-space-between ma-0">
							<p>{{$t("message.Subtotal")}}</p>
							<span><emb-currency-sign></emb-currency-sign>{{(itemTotal/currentValue).toFixed(2)}}</span>
						</div>
						<div class="layout align-center justify-space-between ma-0">
							<p>{{$t("message.Delivery")}}</p>
							<span><emb-currency-sign></emb-currency-sign>{{(shipping/currentValue).toFixed(2)}}</span>
						</div>
						<div class="layout align-center justify-space-between ma-0">
							<p>{{$t("message.Tax")}}</p>
							<span><emb-currency-sign></emb-currency-sign>{{(tax/currentValue).toFixed(2)}}</span>
						</div>
						<v-divider class="my-4"></v-divider>
						<div class="layout align-center justify-space-between ma-0">
							<h4>{{$t("message.Total")}}</h4>
							<h4><emb-currency-sign></emb-currency-sign>{{(getTotalPrice/currentValue).toFixed(2)}}</h4>
						</div>
						<v-divider class="my-4"></v-divider>
					</div>
					<emb-delete-confirmation
						ref="deleteConfirmationDialog"
						message="Are you sure you want to delete this product?"
						@onConfirm="onDeleteProductFromCart"
					>
					</emb-delete-confirmation>
				</div>
			</div>
		</v-navigation-drawer> 
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import currency from "Api/currency";
   export default {
      data(){
         return{
				selectDeletedProduct: null,
				total:null,
				drawer: null,
				items: [
					{ title: 'Home', icon: 'dashboard' },
					{ title: 'About', icon: 'question_answer' }
				],
				currentValue:1,
         }
		},
		computed: {
			...mapGetters(["cart", "tax","selectedCurrency","shipping"]),
			/**
			 * method for calculatig total of  item 
			*/
			// drawer () {
			// 	return this.$store.state.drawer
			// },
			itemTotal(){
			let productTotal = null
				if (this.cart.length > 0) {
					for (const item of this.cart) {
						productTotal += (item.total*item.quantity);
					}
					return productTotal.toFixed(2);
				} 
				else {
					return productTotal.toFixed(2);
				}
			},
			/**
			 * method for calculatig subtotal of  item 
			*/
			getTotalPrice(){
				let totalPrice = this.tax + this.shipping;
				if (this.cart.length > 0) {
					for (const item of this.cart) {
						totalPrice += (item.total*item.quantity);
					}
					return totalPrice.toFixed(2);
				} 
				else {
					return totalPrice.toFixed(2);
				}
			},
		},
		async mounted (){
			try {
				const res= await currency.getcurrency()
				res.data.data.forEach(el => {
					if (this.selectedCurrency.symbol === el.symbol) {
						this.currentValue= el.currentValue
					}
				});
				// console.log(res)
			} catch (err) {
				console.log(err.response.message)
			}
		},
		methods: {
		// 	changeRoute() {
		// 	localStorage.removeItem('current')
        //   this.$router.push(`/${this.$i18n.locale}/products/${megaitemkey}`)
        //  const current = `/products/${megaitemkey}`
        //  localStorage.setItem('current', current)
		// 	},
			/**
			 * method for deleting product from cart 
			*/
			deleteProductFromCart(product) {
				this.$refs.deleteConfirmationDialog.openDialog();
				this.selectDeletedProduct = product;
			},
			/**
			 * method to set cart and show notification after deletion of item
			*/
			onDeleteProductFromCart() {
				this.$refs.deleteConfirmationDialog.close();
				this.$snotify.error('Product Removing from cart',{
					closeOnClick: false,
					pauseOnHover: false,
					timeout: 1000,
				});
				this.$store.dispatch(
				"onDeleteProductFromCart",
				this.selectDeletedProduct
				);
			}
		}
   }
</script>


