<template>
   <div class="emb-cart-wrap emb-card">
      <emb-page-title
         heading="message.cartHeading"
         subHeading="message.subHeadingCart"
         >
      </emb-page-title>
      <div class="cart-content section-gap">
         <v-container grid-list-xl py-0>
            <div  v-if="cart == ''" class="text-center">
               <div class="text-center">
                  <div class="mb-6">
                     <img  alt="cart-empty" height="128" src="/static/images/empty-cart.png" width="128">
                  </div>
                  <h4>{{$t("message.YourShoppingBagisempty")}}</h4>
                  <router-link class="primary--text" :to="'/'+$i18n.locale+'/products/'">{{$t("message.GotoShopping")}}</router-link>
               </div>
            </div>
            <div v-else class="cart-shop-list">
               <div class="emb-card mb-12 pa-6 white">
						<div v-for="(item, index) in cart" :key="index">
							<v-row class="cart-item-wrap">
								<v-col cols="12" sm="12" md="2" class="d-inline-flex align-center justify-center">
									<img :src="item.image" alt='cart-item' width="100">
								</v-col>
								<v-col cols="12" sm="6" md="4" class="d-inline-flex align-center justify-center">
									<div class="text-center">
										<h5 class="mb-1">{{item.name}}</h5>
									</div>
								</v-col>
								<v-col cols="6" sm="3" md="2" class="d-inline-flex align-center justify-center">
									<v-text-field class="d-inline-block" type="number" v-model="item.quantity" min="1" max="10"
										placeholder="Quantity">
									</v-text-field>
								</v-col>
								<v-col cols="6" sm="3" md="2" class="d-inline-flex align-center justify-center">
									<h4 class="mb-0">
									<emb-currency-sign></emb-currency-sign>{{(item.quantity)*(item.price/currentValue).toFixed(2)}}
									</h4>
								</v-col>
								<v-col cols="2" sm="2" md="2" class="res-float-icon d-inline-flex align-center justify-md-center justify-end">
									<a class="accent--text remove-cart" @click="deleteProductFromCart(item)" href="javascript:void(0)">
										<i class="material-icons font-weight-bold">close</i>
									</a>
								</v-col>
							</v-row>
						</div>
               </div>
               <v-layout align-center justify-end>
                  <vue-snotify></vue-snotify>
                  <v-flex xs12 sm12 md5 lg5 xl5 py-0>
                     <div class="layout align-center justify-space-between subtotal">
                        <p>{{$t("message.Subtotal")}}</p>
                        <span>
                           <emb-currency-sign></emb-currency-sign>
                           {{(itemTotal/currentValue).toFixed(2)}}
                        </span>
                     </div>
                     <div class="layout align-center justify-space-between subtotal">
                        <p>{{$t("message.Delivery")}}</p>
                        <span>
                           <emb-currency-sign></emb-currency-sign>
                           {{(shipping/currentValue).toFixed(2)}}
                        </span>
                     </div>
                     <div class="layout align-center justify-space-between subtotal">
                        <p>{{$t("message.Tax")}}</p>
                        <span>
                           <emb-currency-sign></emb-currency-sign>
                           {{(tax/currentValue).toFixed(2)}}
                        </span>
                     </div>
                     <v-divider class="my-3"></v-divider>
                     <div class="layout align-center justify-space-between subtotal layout-gap">
                        <h4>{{$t("message.Total")}}</h4>
                        <h4>
                           <emb-currency-sign></emb-currency-sign>
                           {{(getTotalPrice/currentValue).toFixed(2)}}
                        </h4>
                     </div>
                     <div class="layout justify-end subtotal">
                        <v-btn large class="accent mr-0" :to="'/'+$i18n.locale+'/checkout/payment'">
                           {{$t("message.Checkout")}}
                        </v-btn>
                     </div>
                  </v-flex>
               </v-layout>
               <emb-delete-confirmation
                  ref="deleteConfirmationDialog"
                  message="message.deleteCartProduct"
                  @onConfirm="onDeleteProductFromCart"
                  >
               </emb-delete-confirmation>
            </div>
         </v-container>
      </div>
   </div>
</template>
<script>
import { mapGetters } from "vuex";
import currency from "Api/currency";
export default {
  data() {
    return {
      selectDeletedProduct: null,
      total: null,
      headers: [
        {
          text: "Product",
          align: "left",
          sortable: false,
          value: "image"
        },
        { text: "Product Name", value: "name" },
        { text: "Product Quantity", value: "quantity" },
        { text: "Product Total", value: "total" },
        { text: "Remove", value: "remove" }
      ],
      currentValue:1
    };
  },
  computed: {
    ...mapGetters(["cart","selectedCurrency","tax", "shipping"]),

    itemTotal() {
      let productTotal = null;
      if (this.cart.length > 0) {
        for (const item of this.cart) {
          productTotal += item.price * item.quantity;
        }
        return productTotal.toFixed(2);
      } else {
        return productTotal.toFixed(2);
      }
    },
    getTotalPrice() {
      let totalPrice = this.tax + this.shipping;
      if (this.cart.length > 0) {
        for (const item of this.cart) {
          totalPrice += item.price * item.quantity;
        }
        return totalPrice.toFixed(2);
      } else {
        return totalPrice.toFixed(2);
      }
    }
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
    deleteProductFromCart(product) {
      this.$refs.deleteConfirmationDialog.openDialog();
      this.selectDeletedProduct = product;
      // console.log('shsajk', product)
    },
    onDeleteProductFromCart() {
      this.$refs.deleteConfirmationDialog.close();
      this.$snotify.error("Product Removing from cart", {
        closeOnClick: false,
        pauseOnHover: false,
        timeout: 1000
      });
      this.$store.dispatch(
        "onDeleteProductFromCart",
        this.selectDeletedProduct
      );
    }
  },
  watch: {
     getTotalPrice: function() {
        this.$stote.state.totalPrice = this.getTotalPrice
     }
  }
};
</script>

