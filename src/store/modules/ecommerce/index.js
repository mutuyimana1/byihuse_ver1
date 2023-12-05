//----------------| Ecommerce Module |------------------//
import { wishlist, cart } from "./data";
// import router from "../../../router";
// import moment from 'moment';

const state = {
      cart,
      wishlist,
      tax: 0,
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
            totalAmmount: ''
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
      // addProductLocal(context, dart) {
      //       context.commit("onaddProductLocal", dart)
      // },
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
      }
      // makePayment(context, payload, ) {
      //       context.commit('makePayment', payload);
      // }
}

// mutations
const mutations = {
      onaddProductLocal(state,dart){
            // console.log(dart, 'heeeo')
            state.cart = dart
            // console.log(state.cart)
      },
      onAddProductToCart(state,payload) {
            localStorage.removeItem('cart');
            let newProduct = {
                  id: payload.objectID,
                  image: payload.image,
                  name: payload.name,
                  price: payload.price,
                  quantity: payload.quantity ? payload.quantity : 1,
                  total: payload.price,
                  symbol: payload.symbol
            }
            state.cart.push(newProduct);
            localStorage.setItem('cart', JSON.stringify(state.cart))
            console.log(state.cart)
      },
      onAddProductToC(state, payload) {
            console.log(payload.dart)
            payload.dart.forEach(el => {
              state.cart.push({
                  id: el.id,
                  image: el.image,
                  name: el.name,
                  price: el.price,
                  quantity: el.quantity ? el.quantity : 1,
                  total: el.price,
                  symbol:el.symbol
              })
              console.log(state.cart)
            });
            
      },
      onAddItemToWish(state, payload) {
            payload.wishlist.forEach(el => {
                  state.wishlist.push({
                        id: el.objectID,
                        image: el.image,
                        name: el.name,
                        price: el.price,
                        quantity: 1,
                        total: el.price 
                  })
            }),
            console.log(state.wishlist)
            // let newItem = {
            //       id: payload.objectID,
            //       image: payload.image,
            //       name: payload.name,
            //       price: payload.price,
            //       quantity: 1,
            //       total: payload.price
            // }
            // state.wishlist.push(newItem);
      },
      /**
       * method for deleting product to cart
      */
      onDeleteProductFromCart(state, payload) {
            localStorage.removeItem('cart');
            let index = state.cart.indexOf(payload);
            state.cart.splice(index, 1);
            // const cat = JSON.parse(localStorage.getItem('cart'))
            localStorage.setItem('cart', JSON.stringify(state.cart))

      },

      /**
       * method for adding item to wishlist
      */
      onAddItemToWishlist(state, payload) {
            localStorage.removeItem('wishlist');
            let newItem = {
                  id: payload.objectID,
                  image: payload.image,
                  name: payload.name,
                  price: payload.price,
                  quantity: 1,
                  total: payload.price
            }
            state.wishlist.push(newItem);

            localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
      },
      /**
       * method for deleting item from wishlist
      */
      onDeleteProductFromWishlist(state, payload) {
            localStorage.removeItem('wishlist');
            let index = state.wishlist.indexOf(payload);
            state.wishlist.splice(index, 1);
            localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
      },

      /**
       * method for adding all wishlist item to cart
      */
      addAllWishlistItemToCart(state) {
            localStorage.removeItem('wishlist');
            localStorage.removeItem('cart');
            if (state.wishlist && state.wishlist.length > 0) {
                  for (const wishlistItem of state.wishlist) {
                        state.cart.push(wishlistItem);
                  }
            }
            state.wishlist = [];
            localStorage.setItem('cart', JSON.stringify(state.cart))
            localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
      },
      /**
       * method to calcualte Order Id , transcation Id, ordered date , delivery date 
      */
      makePayment(state, products) {
            state.invoiceData.products = products;
            // console.log(userDetails,products)
            // console.log(state.invoiceData.products)
            // state.invoiceData.orderId = '312134645432132132',
            //       state.invoiceData.transactionId = new Date().getTime() - 10000,
            //       state.invoiceData.orderedDate = moment().format('MMMM DD, YYYY'),
            //       state.invoiceData.deliveryDate = moment().add(5, 'days').format('MMMM DD, YYYY')
            // state.cart = [];
            // router.push('/checkout/final-receipt')
      }
}

export default {
      state,
      getters,
      actions,
      mutations
}
