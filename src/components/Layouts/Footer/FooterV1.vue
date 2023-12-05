<template>
<div>
    <emb-subscribe>
			</emb-subscribe>
   <div class="footerV1-wrap section-gap">
		<v-container grid-list-xl py-0>
			<div class="footer-top">
				<v-layout row wrap>
					<v-flex xs12 sm12 md4 lg5 xl5>
						<div class="about-wrap">
							<h6 class="white--text mb-6">{{$t(title)}}</h6>
							<span class="white--text">{{$t(description)}}</span>
						</div>
					</v-flex>
					<v-flex xs12 sm3 md2 lg2 xl2>
						
					</v-flex>
					<v-flex xs6 sm3 md3 lg3 xl3>
						<h6 class="white--text mb-4">About</h6>
						<div class="abt-menu">
							<ul class="list-unstyled pl-0">
								<li v-for="(list,key) in about"
									:key="key">
									<router-link :to="'/'+$i18n.locale+list.path">{{$t(list.menuItem)}}</router-link>
								</li>
							</ul>
						</div>
					</v-flex>
					<v-flex xs6 sm3 md2 lg2 xl2>
						<div class="policy-menu">
							<h6 class="white--text mb-4">Social</h6>
							<ul class="list-unstyled pl-0">
								<li v-for="(list,key) in socialLinks"
									:key="key">
									<a :href="list.path">{{$t(list.menuItem)}}</a>
								</li>
							</ul>
						</div>
					</v-flex>
				</v-layout>
			</div>
			<hr>
			<div class="footer-bottom">
				<div class="footer-bottom-content px-3">
					<v-layout row wrap align-center justify-space-between>
						<v-flex xs12 sm12 md6 lg6 xl6 class="text-md-left text-center"> 
							
						</v-flex>
						<v-flex xs12 sm12 md6 lg6 xl6 py-3 px-2>
							<div class="text-md-right text-center">
								<span class="white--text">{{copyrightText}}</span>
							</div>
						</v-flex>
					</v-layout>
				</div>
			</div>
		</v-container>
	</div> 
</div>
	
</template>

<script>
import categories from "Api/categories";
import departments from "Api/department";
import AppConfig from "Constants/AppConfig";
import Subscribe from "Components/Widgets/Subscribe";
export default {
	// props:['title','description','img'],
	data () {
		return{
			about:[
				{
					menuItem:"message.about",
					path:"/en/about"
				},
				// {
				// 	menuItem:"message.termAndCondition",
				// 	path:"/term-condition"
				// },
				// {
				// 	menuItem:"message.privacyPolicy",
				// 	path:"/privacy-policy"
				// },
				// {
				// 	menuItem:"message.faq",
				// 	path:"/faq"
				// },
				{
					menuItem:"message.contactUs",
					path:"/en/contact"
				},
			],
			session:[
				{
					menuItem:"message.signIn",
					path:"/session/signin"
				},
				{
					menuItem:"message.register",
					path:'/session/signup',
				},
				// {
				// 	menuItem:"message.forgotPassword",
				// 	path:"/session/forgot-password",
				// },
				// {
				// 	menuItem:"message.thankYou",
				// 	path:"/session/thank-you"
				// }
			],
			categories:[
				// {
				// 	menuItem:"message.men",
				// 	path:"/products/men"
				// },
				// {
				// 	menuItem:"message.women",
				// 	path:"/products/women"
				// },
				// {
				// 	menuItem:"message.accessories",
				// 	path:"/products/accesories"
				// },
				// {
				// 	menuItem:"message.gadgets",
				// 	path:"/products/gadgets"
				// }
			],
			socialLinks:[
				{
					menuItem:"message.facebook",
					path:"https://www.facebook.com/"
				},
				{
					menuItem:"message.twitter",
					path:"https://twitter.com/"
				},
				{
					menuItem:"message.youtube",
					path:"https://www.youtube.com/"
				},
				// {
				// 	menuItem:"message.googlePlus",
				// 	path:"https://plus.google.com/discover"
				// },

			],
            copyrightText: AppConfig.copyrightText,
            title:"message.footeTittle",
            description:"message.footerDesc",
		}
    },
    components:{
		embSubscribe: Subscribe,
    },
    	async created () {
		try {
			this.resCat = await categories.getCategories()
         this.resDept = await departments.getDepartment()
			// var obj = []
			// var arr = {}
			// this.resDept.data.data.forEach(dep =>{
			//     this.resCat.data.data.forEach(el => {
			// 		if (dep._id === el.department) {
			// 		obj.push({
			// 				path: `${el.name.en}`,
			// 				children_menus:null,
            //                 name: `${el.name.en}`
			// 			})
			// 		}
            // });
            // arr[dep.name.en] = {...obj}
            // for (let i = 0; i < obj.length; i++) {
            //    delete obj[i]
            // }
            // console.log(dep.name.en)
        //  })
        //  this.categories = arr
			console.log(this.categories)
		} catch (err) {
			console.log(err.message)
		}
   },
}
</script>

