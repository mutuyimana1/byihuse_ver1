<template>
   <div>
      <div class="header-v3-wrap">
         <div  class="header-wrap">
            <div  class="top-header-wrap forSmalll">
               <div class="top-header">
                  <v-container grid-list-xl>
                     <v-layout  row wrap align-center justify-space-between pt-0 pb-0 ma-0 >
                        <v-flex  xs6 sm6 md6 lg9 xl9 pa-0 currency-lang-wrap header-v3-top-tools>
                           <span id="span" class="white--text">{{$t('message.wellcome')}}</span>
                           <emb-lang id="langCurrenncy"></emb-lang>
                           <emb-currency id="langCurrenncy"></emb-currency>
                        </v-flex>
                     	<v-flex xs6 sm6 md6 lg3 xl3 pa-0>
                           <div class="notifications header-v3-top-tools">
                              <emb-cart id="cartlist"></emb-cart>
                              <emb-wishlist id="cartlist"></emb-wishlist>
                              <emb-user-block id="user"></emb-user-block>
                           </div>
                        </v-flex>
                     </v-layout>
                  </v-container>
               </div>
            </div>
            <div  class="top-header-wra forlarge">
               <div class="top-header">
                  <v-container grid-list-xl>
                     <v-layout>
                        <v-flex id="flexx" xs6 sm6 md6 lg9 xl9 pa-0 currency-lang-wrap header-v3-top-tools>
                           <emb-lang id="langCurrenncy"></emb-lang>
                           <emb-currency id="langCurrenncy"></emb-currency>
                        </v-flex>
                     	<v-flex >
                           <div class="notifications header-v3-top-tools">
                              <emb-cart id="cartlist"></emb-cart>
                              <emb-wishlist id="cartlist"></emb-wishlist>
                              <emb-user-block id="user"></emb-user-block>
                           </div>
                        </v-flex>
                     </v-layout>
                  </v-container>
               </div>
            </div>
            <div class="middle-header">
               <v-container>
                  <v-layout row wrap justify-space-between align-center>
                     <v-flex xs12 sm12 md6 lg4 xl4>
                        <div class="site-logo d-inline-block">
                           <router-link :to="'/'+$i18n.locale+'/home'">
                              <img id="logo" alt="site-logo" height="34" src="/static/images/logo/logoo.png" width="224">
                           </router-link>
                        </div>
                     </v-flex>
                     <v-flex xs12 sm12 md6 lg7 xl5  search-v3-wrap>
                           <input v-on:keyup.enter="search"  v-model="keyword" type="text" placeholder="Search">
                           <v-btn @click="search"  icon>
                              <v-icon>search</v-icon>
                           </v-btn>
                     </v-flex>
                  </v-layout>
               </v-container>
            </div>
            <div class="bottom-header">
               <v-container>
                  <div class="bottom-header-inner">
                     <div class="menu-alignment">
                        <emb-menu></emb-menu>
                     </div>
                     <div class="layout align-left responsive-menu">
                        <v-btn icon dark @click="toggleMobileSidebar" class="toggle-btn">
									<i class="material-icons">menu</i>
                        </v-btn>
                     </div>
                     <emb-search></emb-search>
                  </div>
               </v-container>
            </div>
         </div>
      </div>
      <div id="fixedHeader">
         <!-- <emb-fixed-header></emb-fixed-header> -->
      </div>
   </div>
</template>
<style  scoped>
#addBackground{
   background: white;
}
#flexx{
   display: flex;
   text-align: center;
   position: relative;
   left: 10px;
   top: 30px;
}
.notifications{
   display: flex;
   justify-content: flex-end;
}
@media screen  and (max-width: 409px){
   .header-wrap .top-header-wrap{
      height: 2000px;
   }
   .forSmalll{
      display: none;
      /* position: absolute; */
      /* font-size: 13px; */
   }
   .notifications #cartlist{
      position: relative;
      top: 8px;
      /* height: 300px; */
   }
   #user{
      position: relative;
      top: 7px;
   }
   /* #cartlist{
      width: 12px;
   } */
   /* .cartSmall{
      display: flex;
      justify-content: flex-end;
      
   }
   .notifications #cartlist{
      font-size: 12px;
   } */
   
}
@media screen and (min-width: 992px){
   .forlarge{
      display: none;
   }
}
@media (min-width: 409px) and (max-width: 992px){
   .forlarge{
      display: none;
   }
   .top-header-wrap #span {
      display: none;
   }
   .notifications #cartlist{
      position: relative;
      top: 14px;
   }
   .notifications button{
      margin-left: 0px;
      width: 10px;
   }
   .notifications #user{
      position: relative;
      top: 12px;
   }
}
#logo{
   position: relative;
   bottom: 10px;
}
</style>
<script>
import Menu from './Menu';
import Lang from './Lang'
import Currency from './Currency'
import Cart from './Cart'
import Wishlist from './Wishlist'
import UserBlock from './UserBlock'
import Search from './Search'
// import AppConfig from "Constants/AppConfig";

export default {
	data (){
	   return{
         keyword: '',
			// appLogo: AppConfig.appLogo,
		}
	},
	components: {
		embMenu: Menu,
		embLang: Lang,
		embCurrency: Currency,
		embCart:Cart,
		embWishlist: Wishlist,
		embUserBlock:UserBlock,
		embSearch:Search,
	},
	mounted() {
		this.fixedHeader();
	},
	methods: {
		toggleMobileSidebar() {
			this.$store.dispatch("toggleSidebar", true);
		},
		fixedHeader(){
			var fixedHeader = document.getElementById("fixedHeader");
			window.onscroll = function() {
				if (window.pageYOffset > 160) {
					fixedHeader.style.opacity = "1";
					fixedHeader.style.visibility = "visible";
					fixedHeader.style.translate = "translateY(0)";
					fixedHeader.style.top =0
				} 
				else {
					fixedHeader.style.opacity = "0";
					fixedHeader.style.visibility = "hidden";
					fixedHeader.style.translate = "translateY(-200px)";
					fixedHeader.style.top = "0";
				}
			}
      },
      search(){
         this.isHidden=true
         event.preventDefault();
         const hel= this.keyword.trim() !== ''
         console.log(hel)
         if (hel) {
            if (this.$route.params.keyword) {
            // localStorage.removeItem('current')
            location.assign(`/#/${this.$i18n.locale}/search/${this.keyword}`)
            // const current = `/search/${this.keyword}`
            // localStorage.setItem('current', current)
            window.location.reload(false);
          }else{
            // localStorage.removeItem('current')
            location.assign(`/#/${this.$i18n.locale}/search/${this.keyword}`)
            // const current = `/search/${this.keyword}`
            // localStorage.setItem('current', current)
          }
         }
         
         //   this.$router.push(`/en/search/${this.keyword}`)
         //   
      }
   },
   created(){
      this.keyword = this.$route.params.keyword
   }
};
</script>