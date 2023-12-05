//----------------| Ecommerce Module |------------------//
import { wishlist, cart } from "./data";
import api from "Api";
import wishlist from "Api/wishlist";
import router from "../../../router";
import moment from 'moment';

const state = {
      // cart: ,
      // wishlist: [],
      tax: 27.95,
      shipping: 12.95,
      invoiceData: {
            products: [],
            orderId: '',
            transactionId: '',
            orderedDate: '',
            delevieryDate: '',
      }
}

// getters
const getters = {
      cart: state => {
            return state.cart;
      },
      wishlist: state => {
            return state.wishlist;
      },
      tax: state => {
            return state.tax;
      },
      shipping: state => {
            return state.shipping;
      },
      invoiceData: state => {
            return state.invoiceData;
      },
      cartItem: state => {
            return state.cartItem;
      },
      indexOfItem: state => {
            return state.indexOfItem;
      }
}

// actions
const actions = {
      getWhishlist ({ commit }) {
            api()
            .get('/api/wishlists')
            .then(response =>{
            commit('init_whishlist', response.data)
      })
      },
      addProductToCart(context, payload) {
            context.commit('onAddProductToCart', payload);
      },
      onDeleteProductFromCart(context, payload) {
            context.commit("onDeleteProductFromCart", payload);
      },
      changeQuantityHandler(context, payload) {
            context.commit('onChangeQuantityHandler', payload);
      },
      addItemToWishlist(context, payload) {
            context.commit('onAddItemToWishlist', payload);
      },
      onDeleteProductFromWishlist(context, payload) {
            context.commit("onDeleteProductFromWishlist", payload);
      },
      onPrintFinalReceipt(context, payload) {
            context.commit("onPrintFinalReceipt", payload);
      },
      addAllWishlistItemToCart(context) {
            context.commit("addAllWishlistItemToCart");
      },
      makePayment(context, payload) {
            context.commit('makePayment', payload);
      }
}

// mutations
const mutations = {
      init_whishlist (state, payload) {
            state.wishlist = payload
      },
      onAddProductToCart(state, payload) {
            let newProduct = {
                  id: payload.objectID,
                  image: payload.image,
                  name: payload.name,
                  price: payload.price,
                  quantity: payload.quantity ? payload.quantity : 1,
                  total: payload.price
            }
            state.cart.push(newProduct);
      },
      /**
       * method for deleting product to cart
      */
      onDeleteProductFromCart(state, payload) {
            let index = state.cart.indexOf(payload);
            state.cart.splice(index, 1);
      },

      /**
       * method for adding item to wishlist
      */
      async onAddItemToWishlist(state, payload) {
            var newItem =  {
                  id: payload.objectID,
                  image: payload.image,
                  name: payload.name,
                  price: payload.price,
                  quantity: 1,
                  total: payload.price
            }
            state.wishlist.push(newItem);
            try {
                 const res = await wishlist.postwishlist(wishlist)
                 console.log(res)
            } catch (err) {
                  console.log(err.message)
            }
      },
      /**
       * method for deleting item from wishlist
      */
      onDeleteProductFromWishlist(state, payload) {
            let index = state.wishlist.indexOf(payload);
            state.wishlist.splice(index, 1);
      },

      /**
       * method for adding all wishlist item to cart
      */
      addAllWishlistItemToCart(state) {
            if (state.wishlist && state.wishlist.length > 0) {
                  for (const wishlistItem of state.wishlist) {
                        state.cart.push(wishlistItem);
                  }
            }
            state.wishlist = [];
      },
      /**
       * method to calcualte Order Id , transcation Id, ordered date , delivery date 
      */
      makePayment(state, products) {
            state.invoiceData.products = products;
            state.invoiceData.orderId = '312134645432132132',
                  state.invoiceData.transactionId = new Date().getTime() - 10000,
                  state.invoiceData.orderedDate = moment().format('MMMM DD, YYYY'),
                  state.invoiceData.deliveryDate = moment().add(5, 'days').format('MMMM DD, YYYY')
            state.cart = [];
            router.push('/checkout/final-receipt')
      }
}

export default {
      state,
      getters,
      actions,
      mutations
}
