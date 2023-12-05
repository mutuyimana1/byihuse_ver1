<template>
   <div class="navbar">
      <ul class="app-nav-list pl-0">
         <li class="app-nav-item" v-for="(menuItem , key) in menus" :key="key">
				<router-link  :to="menuItem.path">{{$t(menuItem.name)}}</router-link>
				<template v-if="menuItem.type === 'sub_menu'">
					<ul  class="sub-menu" v-if="menuItem.children && menuItem.children.length > 0">
						<li v-for="(subMenuItem , subMenuKey) in menuItem.children" :key="subMenuKey">
							<router-link :to="'/en'+subMenuItem.path" :class="[ subMenuItem.type === 'sub_menu' ? 'menu-item-has-children':'']">{{$t(subMenuItem.name)}}</router-link>
							<ul class="sub-menu" v-if="subMenuItem.children_menus">
								<li  v-for="(childrenItem , childrenKey) in subMenuItem.children_menus" :key="childrenKey">
									<router-link :to="childrenItem.path" >{{$t(childrenItem.name)}}</router-link>
								</li>
							</ul>
						</li>
					</ul>
				</template>
				<template v-if="menuItem.type === 'mega_menu'">
					<ul id="meunstar" class="sub-menu mega">
						<li v-for="(megaitem,megaitemkey) in menuItem.children" :key="megaitemkey">
							<a>{{megaitemkey}}</a>
							<ul class="sub-menu">
								<li v-for="(submega,submegakey) in megaitem" :key="submegakey">
									<router-link :to="submega.path">{{submega.name}}</router-link>
								</li>
								
							</ul>
						</li>
					</ul>
				</template>
         </li>
      </ul>
   </div>
</template>
<style >
#meunstar{
	display: flex;
	flex-wrap: wrap;
}
</style>
<script>
import categories from "Api/categories";
import departments from "Api/department";
import { mapGetters } from 'vuex';
export default {
   computed:{
		...mapGetters(["selectedLocale"]),
	},
data () {
return {
menus:  [
	{
   path: '/home',
    name: "message.home",
	icon: "home",
	type: "sub_menu",
	},
	 {
      path:'/products',
      name: "message.shop",
      icon: "pages",
      // type: "sub_menu",
	},
	{
      path: '/products/accessories',
      name:"message.accessories",
      icon: 'party_mode',
      children: null
   },
   {
	path: '',
     name:"message.categories",
     icon: 'party_mode',
     type: 'mega_menu',
     children:[]
   },
   {
      path: "",
      name: "message.pages",
      icon: "pages",
      type: "sub_menu",
      children: [
         {
            name: "message.about",
            children_menus:null,
            path: "/about"
         },
         {
            name: 'message.termAndCondition',
            children_menus:null,
            path: '/term-condition'
         },
         {
            name: 'message.privacyPolicy',
            children_menus:null,
            path: '/privacy-policy'
         },
         {
            name: 'message.blogDetail',
            children_menus:null,
            path: '/blog-detail/1'
         },
         {
            name: 'message.faq',
            children_menus:null,
            path: '/faq'
         },
      ]
   },
   {
      path: '/contact',
      name:"message.contactUs",
      icon: 'perm_contact_calendar',
      children: null
   },
	],
	resCat: '',
	resDept: '',
}
},
	async created () {
		try {
			// console.log(this.selectedLocale)
			this.resCat = await categories.getCategories()
			this.resDept = await departments.getDepartment()
			// console.log(res)
			var obj = []
			this.resDept.data.data.forEach(dep =>{
				// console.log(dep.name.en)
			    this.resCat.data.data.forEach(el => {
					if (dep._id === el.department) {
						var categoriesData = {
							path: `${el.name.en}`,
							// path: 'message',
							children_menus:null,
							// name: 'Shirt'
                            name: `${el.name.en}`
						}
					obj.push(categoriesData)
					this.menus[3].children.push(obj)
					}
				});
			})
			// this.menus[3].children.push(obj)
			console.log(this.menus[4].children)
		} catch (err) {
			console.log(err.message)
		}
	}
}
</script>

