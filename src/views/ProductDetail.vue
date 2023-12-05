<template>
	<div class="emb-product-detail">
		<template selectedProduct>
			<emb-page-title :heading="selectedProduct.name"></emb-page-title>
			<div class="emb-productDetail-content white">
				<div class="product-detail section-gap">
					<v-container grid-list-xl py-0>
						<v-layout row wrap product-detail-row>
							<v-flex xs12 sm12 md6 lg6 xl6 text-center>
								<v-layout row wrap>
									<v-flex xs2 sm2 md2 lg2 xl2 product-gallery>
										<div class="detail-image-gallery d-inline-block mb-6 mx-2"
											v-for="(productItemImg,key) in image_gallery" :key="key"
											@mouseover="togglePreviewImage(productItemImg)">
											<a href="javascript:void(0)">
												<div class="t">
													<img :src="productItemImg" width="71" height="91"
														alt="product image">
												</div>
											</a>
										</div>
									</v-flex>
									<v-flex xs10 lg10 sm10 md10 xl10 product-detail-img>
										<div class="product-detail-thumb">
											<div class="image-wrapper emb-card">
												<a href="javascript:void(0)">
													<!-- <img class="detailImg" :src="selectedImage"  width="auto" height="auto" alt="product detail image"> -->
													<img class="detailImg" :src="selectedImage" id="maxProduct"
														alt="product detail image">
													<!-- <img  width="auto" height="auto" 
												src="/static/images/logo/p.jpg"
												id="maxProduct"
											> -->
												</a>
											</div>
										</div>
									</v-flex>
								</v-layout>
							</v-flex>
							<v-flex xs12 sm12 md6 lg6 xl5>
								<router-link :to="'/'+$i18n.locale+'/products'">{{$t("message.Backtoshop")}}</router-link>
								<h3>{{selectedProduct.name}}</h3>
								<!-- <a href="javascript:void(0)" class="color-inherit text-underline mb-4 d-inline-block" @click="showReviewPopup">ADD A REVIEW</a> -->
								<emb-review-popup ref="productReviewPopup"></emb-review-popup>
								<h4 class="accent--text">
									<emb-currency-sign></emb-currency-sign>{{(selectedProduct.price/currentValue).toFixed(2)}}
								</h4>

								<p>{{selectedProduct.descprition}}</p>
								<div v-if="AdditionalService.length" class="serviveListDive">
									<div class="font-weight-regular title">{{$t("message.Additionalservice")}}</div>
									<div v-for="service in AdditionalService" :key="service.name" class="serviceList">
										<v-btn id="servivePrice" @click="selectService(service)" :class="{accent:service.select}">
											<emb-currency-sign></emb-currency-sign>{{(service.price/currentValue).toFixed(2)}}
										</v-btn>
									 <div id="serviceName">{{service.name}}</div>
									</div>
								</div>

								<!-- <div class="bullet-points mb-4">
									<ul class="features pl-13">
										<li v-for="(Features,key) in selectedProduct.features" :key="key">
											{{Features}}
										</li>
									</ul>
								</div> -->

								<div class="mb-6">
									<a href="javascript:void(0)" class="color-inherit text-underline"
										@click="addItemToWishlist(selectedProduct)">
										{{$t("message.AddToWishList")}}
									</a>
								</div>
								<div class="mb-6 btn-wrap">
									<v-btn v-if="ifItemExistInCart(selectedProduct)" class="accent cpx-0" large
										to="/en/cart">
										{{$t("message.ViewCart")}}
									</v-btn>
									<v-btn v-else class="accent d-inline-block cpx-0" large
										@click="addProductToCart(selectedProduct)">
										{{$t("message.AddToCart")}}
									</v-btn>
								</div>
								<div>
									<span>{{$t("message.ShareNow")}}</span>
									<emb-social-share class="mx-2"></emb-social-share>
								</div>
							</v-flex>
						</v-layout>
					</v-container>
				</div>
				<div class="related-product section-gap bg-grey">
					<v-container grid-list-xl class="py-0">
						<div class="sec-title">
							<h2>{{$t("message.YouMightAlsoLike")}}</h2>
						</div>
						<div id="contt" class="product-listing tab-content">
							<v-layout row wrap mb-4>
								<template v-for="(product, index) in products">
									<v-flex v-if="index <= 3" :key="index">
										<div class="emb-card ">
											<div class="thumb-wrap">
												<router-link
													:to="'/'+$i18n.locale+'/products/'+title+'/'+product.category+'/'+product.objectID">
													<div class="product-image-placeholder">
														<img id="ddd" :src="product.image" alt="related product">
													</div>
												</router-link>
												<div class="wishlist-icon">
													<v-btn v-if="ifItemExistInWishlist(product)"
														@click="addItemToWishlist(product)" icon>
														<v-icon class="black--text">favorite</v-icon>
													</v-btn>
													<v-btn v-else @click="addItemToWishlist(product)" icon>
														<v-icon class="grey--text">favorite</v-icon>
													</v-btn>
												</div>
												<div class="add-to-cart">
													<v-btn v-if="ifItemExistInCart(product)" :to="'/'+$i18n.locale+'/cart'"
														class="primary" small icon>
														<v-icon medium>edit</v-icon>
													</v-btn>
													<v-btn v-else class="accent" small icon
														@click="addProductToCart(product)">
														<v-icon>shopping_cart</v-icon>
													</v-btn>
												</div>
											</div>
											<div class="emb-card-content px-6 py-4 white">
												<h5 class="text" v-text="product.name"></h5>
												<div class="emb-meta-info">
													<div class="layout align-center justify-space-between pa-4">
														<div class="inline-block">
															<h6 class="accent--text font-weight-medium">
																<emb-currency-sign></emb-currency-sign>
																{{(product.price/currentValue).toFixed(2)}}
															</h6>
														</div>
													</div>
												</div>
											</div>
										</div>
									</v-flex>
								</template>
							</v-layout>
						</div>
						<div class="text-center">
							<v-btn :to="'/'+$i18n.locale+`/products/`+title" class="white">{{$t("message.ShowAll")}}</v-btn>
						</div>
					</v-container>
				</div>
			</div>
		</template>
	</div>
</template>
<style scoped>
	/* @media screen and (min-width: 500px) { */
	/* .title{

	} */
	.serviveListDive{
		margin-bottom: 20px;
	}
	#servivePrice{
		margin-left: 10px;
		margin-right: 10px;
	}
	.serviceList{
		display: flex;
		/* width: 30px; */
		margin-top: 10px;
	}
	.thumb-wrap {
		height: 380px;
		width: 300px;
	}

	.thumb-wrap .product-image-placeholder {
		height: 380px;
		overflow: hidden;
	}

	.font-weight-medium {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 260px;
	}
</style>
<script>
	import {
		mapGetters
	} from "vuex";
	import product from "Api/products";
	import departments from "Api/department";
	import currency from "Api/currency";
	export default {
		data() {
			return {
				title: "",
				id: "",
				selectedProduct: {},
				image_gallery: null,
				selectedImage: '',
				products: [],
				AdditionalService:[],
				currentValue:1,
			}
		},
		computed: {
			...mapGetters(["cart", "wishlist","selectedLocale","selectedCurrency", "linksformbackend"]),
		},
		async mounted() {
			this.getParametre()
		},
		watch: {
			"$route"(to) {
				this.title = to.params.title;
				this.id = to.params.id;
				this.getParametre(this.title, this.id);
			},
		},
		methods: {
			/* for routing matching **/
			selectService(service){
				if (!service.select) {
					service.select= true
					this.selectedProduct.price=this.selectedProduct.price+service.price
				// console.log(service.select)
				}else{
					this.selectedProduct.price=this.selectedProduct.price-service.price
					service.select= false
				// console.log(service.select)
				}
			},
			async getParametre() {
				try {
					this.id = this.$route.params.id;
					this.title = this.$route.params.title;
					const res = await product.getOne(this.id)
					const ress= await currency.getcurrency()
					console.log(res)
					ress.data.data.forEach(el => {
					   if (this.selectedCurrency.symbol === el.symbol) {
						  this.currentValue= el.currentValue
					  }
					});
					this.image_gallery = [
							this.linksformbackend + res.data.data.pictures.pic1,
							this.linksformbackend + res.data.data.pictures.pic2,
							this.linksformbackend + res.data.data.pictures.pic3,
							this.linksformbackend + res.data.data.pictures.pic4,
						],
						this.selectedImage = this.linksformbackend + res.data.data.pictures.pic1
					this.selectedProduct.price = res.data.data.price
					this.selectedProduct.objectID= res.data.data._id
					if (this.selectedLocale.name === "French") {
						this.selectedProduct.name = res.data.data.name.fr
					    this.selectedProduct.descprition = res.data.data.description.fr
					}else{
						this.selectedProduct.name = res.data.data.name.en
					    this.selectedProduct.descprition = res.data.data.description.en
					}
					res.data.data.additionalServices.forEach(el =>{
						this.AdditionalService.push({
							select: false,
							name:el.name,
							price: el.price
						})
					})
					this.selectedProduct.tags = ['Black Men Summer']
					const rescategoies = await departments.getDepartmentall()
					if (this.selectedLocale.name === 'French') {
						rescategoies.data.data.forEach(el => {
						el.categories.forEach(recat => {
							if (el.name.fr === this.title) {
								console.log(recat.products)
								recat.products.forEach(pro => {
									this.products.push({
										objectID: pro._id,
										price: pro.price,
										name: pro.name.fr,
										image: this.linksformbackend + pro.pictures.pic1,
										category: recat.name.fr
									})
								})

							}
						})

					});
				}else if (this.selectedLocale.name === 'English'){
					rescategoies.data.data.forEach(el => {
						el.categories.forEach(recat => {
							if (el.name.en === this.title) {
								console.log(recat.products)
								recat.products.forEach(pro => {
									this.products.push({
										objectID: pro._id,
										price: pro.price,
										name: pro.name.en,
										image: this.linksformbackend + pro.pictures.pic1,
										category: recat.name.en
									})
								})

							}
						})

					});
				} else if (this.selectedLocale.name === 'Swahili') {
						rescategoies.data.data.forEach(el => {
						el.categories.forEach(recat => {
							if (el.name.fr === this.title) {
								console.log(recat.products)
								recat.products.forEach(pro => {
									this.products.push({
										objectID: pro._id,
										price: pro.price,
										name: pro.name.sw,
										image: this.linksformbackend + pro.pictures.pic1,
										category: recat.name.sw
									})
								})

							}
						})

					});
				} else if (this.selectedLocale.name === 'Kinyarwanda') {
						rescategoies.data.data.forEach(el => {
						el.categories.forEach(recat => {
							if (el.name.fr === this.title) {
								console.log(recat.products)
								recat.products.forEach(pro => {
									this.products.push({
										objectID: pro._id,
										price: pro.price,
										name: pro.name.kiny,
										image: this.linksformbackend + pro.pictures.pic1,
										category: recat.name.kiny
									})
								})

							}
						})

					});
				}
					
				} catch (err) {
					console.log(err.message)
				}
			},
			/* for opening the popup **/
			showReviewPopup() {
				this.$refs.productReviewPopup.open();
			},
			/* for toggling image **/
			togglePreviewImage(image) {
				this.selectedImage = image;
			},
			/* for adding product in car	**/
			addProductToCart(item) {
				this.$snotify.success('Product adding to the cart', {
					closeOnClick: false,
					pauseOnHover: false,
					timeout: 1000,
					showProgressBar: false,
				});
				setTimeout(() => {
					this.$store.dispatch("addProductToCart", item);
				}, 50);
			},
			/* check weather the product exist in cart
			 * retun the boolean 
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
			/* to add a product in wishlist */
			addItemToWishlist(product) {
				if (this.ifItemExistInWishlist(product)) {
					this.$snotify.error('Product already exist in the wishlist', {
						showProgressBar: false,
					});
				} else {
					this.$snotify.success('Product adding to the wishlist', {
						closeOnClick: false,
						pauseOnHover: false,
						timeout: 1000,
						showProgressBar: false,
					});
					setTimeout(() => {
						this.$store.dispatch("addItemToWishlist", product);
					}, 2000);
				}
			},
			/* check weather the product exist in the wishlist
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
			},
		},
		// watch:{
		// 	this.$route.params
		// }
	}
</script>
