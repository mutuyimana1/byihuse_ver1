<template>
  <div class="feature-product-wrap section-gap title-gap">
    <div class="containevr">
      <div id="contt" class="tab-content">
        <div v-for="(cateogary,subindex) in produ" :key="subindex" class="tab-item">
          <div class="emb-card">
            <div class="thumb-wrap">
              <router-link :to="'/'+$i18n.locale+'/products/'+cateogary.department+'/'+cateogary.category+'/'+cateogary.objectID">
                <div class="product-image-placeholder">
                  <img alt="feature product image" :src="cateogary.image">
                </div>
              </router-link>
              <div class="wishlist-icon">
                <v-btn v-if="ifItemExistInWishlist(cateogary)" @click="addItemToWishlist(cateogary)" icon>
                  <v-icon class="black--text">favorite</v-icon>
                </v-btn>
                <v-btn v-else @click="addItemToWishlist(cateogary)" icon>
                  <v-icon class="grey--text">favorite</v-icon>
                </v-btn>
              </div>
              <div class="add-to-cart">
                <v-btn v-if="ifItemExistInCart(cateogary,cart)" to="/en/cart" class="accent" icon absolute bottom>
                  <v-icon>remove_red_eye</v-icon>
                </v-btn>
                <v-btn v-else @click="addProductToCart(cateogary)" class="accent" icon>
                  <v-icon>shopping_cart</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="emb-card-content pa-4">
              <h5 class="font-weight-medium" v-text="cateogary.name"></h5>
              <div class="emb-meta-info layout align-center my-1">
                <div class="inline-block">
                  <h6 class="accent--text font-weight-medium">
                    <emb-currency-sign></emb-currency-sign>{{(cateogary.price/currentValue).toFixed(2)}}
                  </h6>
                </div>
                <div class="inline-block ">
  
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- </template>	 -->
      </div>
    </div>
    <div v-if="pageProductsLoaded">
            <h3 class="text-center">{{$t("message.Loading")}}...</h3>
            <!-- <v-btn block class="accent" to="/products">Shop</v-btn> -->
          </div>
    <div class="pagination text-center">
      <v-pagination v-if="produ.length" class="my-4" v-model="page" :length="length" :totalVisible="totalVisible"></v-pagination>
    </div>
  </div>
</template>
<style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    /* margin-left: 300px; */
  } 

  .thumb-wrap{
    height: 380px;
    width: 300px;
  }

  .thumb-wrap .product-image-placeholder{
    height: 380px;
    overflow: hidden;
  }
  @media screen and (max-width: 660px){
    #contt{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    }
    #contt .tab-item{
      margin-bottom: 20px;
    }
  }
  .font-weight-medium {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 260px;
  }

</style>
<script>
  import {mapGetters} from "vuex";
  import department from "Api/department";
  import currency from "Api/currency"
  export default {
    props: ["secTitle"],
    computed: {
      ...mapGetters(["rtlLayout", "cart", "wishlist","selectedLocale", "linksformbackend", "selectedCurrency"]),
    },
    components: {
      // Slick
    },
    data() {
      return {
        selectedTab: 0,
        activeTab: null,
        slickOptions: {
          autoplay: true,
          slidesToShow: 5,
          infinite: false,
          arrows: false,
          dots: true,
          rtl: this.rtlLayout,
          responsive: [{
              breakpoint: 1200,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                arrows: false,
                dots: false
              }
            }
          ]
        },
        products: [],
        page: 1,
        produ: [],
        length: 1,
        totalVisible: 7,
        symbol: false,
        currentValue:1,
        pageProductsLoaded: true
      };
    },
    methods: {
      /**
       * method for adding item to cart
       */
      addProductToCart(newItem) {
        this.$snotify.success("Product adding to the cart", {
          closeOnClick: false,
          pauseOnHover: false,
          timeout: 1000
        });
        setTimeout(() => {
          this.$store.dispatch("addProductToCart", newItem);
        }, 100);
      },
      /**
       * method for to change item
       */
      onTabChange(key) {
        this.selectedTab = key;
      },
      /**
       * method for checking if item exists in cart
       */
      ifItemExistInCart(result) {
        let exists = false;
        for (let item of this.cart) {
          if (item.id == result.objectID) {
            exists = true;
          }
        }
        return exists;
      },
      // this method is use to add a product in wishlist
      addItemToWishlist(item) {
        if (this.ifItemExistInWishlist(item)) {
          this.$snotify.error("Product already exist in the wishlist", {
            showProgressBar: false
          });
        } else {
          this.$snotify.success("Product adding to the wishlist", {
            closeOnClick: false,
            pauseOnHover: false,
            timeout: 1000,
            showProgressBar: false
          });
          setTimeout(() => {
            this.$store.dispatch("addItemToWishlist", item);
          }, 2000);
        }
      },
      /**
       * This Function Is use to check weather the product exist in the wishlist
       * Return boolean
       */
      ifItemExistInWishlist(result) {
        let exists = false;
        for (let item of this.wishlist) {
          if (item.id == result.objectID) {
            exists = true;
          }
        }
        return exists;
      }
    },
  async mounted () {
    try {
        const res= await department.getDepartmentall()
      const curRes= await currency.getcurrency()
      curRes.data.data.forEach(el=> {
        // console.log(el, this.selectedCurrency)
        if (el.symbol === this.selectedCurrency.symbol) {
          // console.log(el)
          this.symbol= true
          this.currentValue= el.currentValue
        }
      })
      if (this.selectedLocale.name === 'French') {
        res.data.data.forEach(el => {
        el.categories.forEach(pro =>{
          pro.products.forEach(prdata =>{
            this.products.push({
               objectID: prdata._id,
               type: el.name.fr,
               image:this.linksformbackend+prdata.pictures.pic1,
               price: prdata.price,
               name: prdata.name.fr,
               rate: 3,
               image_gallery: [
                  this.linksformbackend+prdata.pictures.pic1,
                  this.linksformbackend+prdata.pictures.pic2,
                  this.linksformbackend+prdata.pictures.pic3,
                  this.linksformbackend+prdata.pictures.pic4
               ],
               description: prdata.description.fr,
               category: pro.name.fr,
               department: el.name.fr,
               symbol: this.symbol,
             })
          })
        })
      });
      } else if(this.selectedLocale.name ==='English') {
        res.data.data.forEach(el => {
        el.categories.forEach(pro =>{
          pro.products.forEach(prdata =>{
            this.products.push({
               objectID: prdata._id,
               type: el.name.en,
               image:this.linksformbackend+prdata.pictures.pic1,
               price: prdata.price,
               name: prdata.name.en,
               rate: 3,
               image_gallery: [
                  this.linksformbackend+prdata.pictures.pic1,
                  this.linksformbackend+prdata.pictures.pic2,
                  this.linksformbackend+prdata.pictures.pic3,
                  this.linksformbackend+prdata.pictures.pic4
               ],
               description: prdata.description.en,
               category: pro.name.en,
               department: el.name.en,
               symbol: this.symbol,
             })
          })
        })
      });
    } else if(this.selectedLocale.name ==='Swahili') {
        res.data.data.forEach(el => {
        el.categories.forEach(pro =>{
          pro.products.forEach(prdata =>{
            this.products.push({
               objectID: prdata._id,
               type: el.name.sw,
               image:this.linksformbackend+prdata.pictures.pic1,
               price: prdata.price,
               name: prdata.name.sw,
               rate: 3,
               image_gallery: [
                  this.linksformbackend+prdata.pictures.pic1,
                  this.linksformbackend+prdata.pictures.pic2,
                  this.linksformbackend+prdata.pictures.pic3,
                  this.linksformbackend+prdata.pictures.pic4
               ],
               description: prdata.description.en,
               category: pro.name.sw,
               department: el.name.sw,
               symbol: this.symbol,
             })
          })
        })
      });
    }else if(this.selectedLocale.name ==='Kinyarwanda') {
        res.data.data.forEach(el => {
        el.categories.forEach(pro =>{
          pro.products.forEach(prdata =>{
            this.products.push({
               objectID: prdata._id,
               type: el.name.kiny,
               image:this.linksformbackend+prdata.pictures.pic1,
               price: prdata.price,
               name: prdata.name.kiny,
               rate: 3,
               image_gallery: [
                  this.linksformbackend+prdata.pictures.pic1,
                  this.linksformbackend+prdata.pictures.pic2,
                  this.linksformbackend+prdata.pictures.pic3,
                  this.linksformbackend+prdata.pictures.pic4
               ],
               description: prdata.description.en,
               category: pro.name.kiny,
               department: el.name.kiny,
               symbol: this.symbol,
             })
          })
        })
      });
    }
    this.produ= this.products.slice(0,20)
    this.length= Math.ceil(this.products.length/20)
    this.pageProductsLoaded= false
    } catch (err) {
      console.log(err)
    }
  },
  watch:{
    page: function () {
      window.scrollTo({
        top:0,
        left: 0,
        behavior: "smooth"
      })
      this.produ= []
      const trimeStart = (this.page-1) * 20
      const trimeEnd = trimeStart + 20
      this.produ = this.products.slice(trimeStart,trimeEnd)
    }
  }
}
</script>
