<template>
   <div class="navbar">
      <ul class="app-nav-list pl-0">
         <li class="app-nav-item" v-for="(menuItem , key) in menus" :key="key">
				<a  @click="changeOneRoute(menuItem.path)" >{{$t(menuItem.name)}}</a>
				<template v-if="menuItem.type === 'sub_menu'">
					<ul  class="sub-menu" v-if="menuItem.children && menuItem.children.length > 0">
						<li v-for="(subMenuItem , subMenuKey) in menuItem.children" :key="subMenuKey">
							<a @click="changeOneRoute(subMenuItem.path)"  :class="[ subMenuItem.type === 'sub_menu' ? 'menu-item-has-children':'']">{{subMenuItem.name}}</a>
							<ul class="sub-menu" v-if="subMenuItem.children_menus">
								<li  v-for="(childrenItem , childrenKey) in subMenuItem.children_menus" :key="childrenKey">
									<a @click="changeOneRoute(childrenItem.path)"  >{{childrenItem.name}}</a>
								</li>
							</ul>
						</li>
					</ul>
				</template>
				<template ref="dataplz"  v-if="menuItem.type === 'mega_menu'">
					<ul class="sub-menu mega">
						<li v-for="(megaitem,megaitemkey) in menuItem.children" :key="megaitemkey">
                     <a class="department" @click="changedepRoute(megaitemkey)">{{megaitemkey}}</a>
							<ul class="sub-menu">
								<li v-for="(submega,submegakey) in megaitem" :key="submegakey">
									<a  @click="changeRoute(megaitemkey,submega.name)">{{submega.name}}</a>
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
   methods: {
      changeRoute(megaitemkey, submega) {
         console.log(megaitemkey,submega)
         this.$router.push(`/${this.$i18n.locale}/products/${megaitemkey}/${submega}`)
      },
      changedepRoute(megaitemkey) {
         console.log(megaitemkey)
         this.$router.push(`/${this.$i18n.locale}/products/${megaitemkey}`)
      },
      changeOneRoute(oneLink){
         console.log(oneLink)
         if (oneLink !== 'categoriesiii' && oneLink !== 'servicesTitle') {
            this.$router.push(`/${this.$i18n.locale}/${oneLink}`)
         }
      }
   },
data () {
return {
menus:  [
	{
   path: `home`,
    name: "message.home",
	icon: "home",
	type: "sub_menu",
	},
	 {
      path:`products`,
      name: "message.shop",
      icon: "pages",
      // type: "sub_menu",
	},
   {
      path:'categoriesiii',
      name:"message.categories",
      icon: 'party_mode',
      type: 'mega_menu',
      children: {}
   },
   {
      path:"servicesTitle",
      name: "message.services",
      icon: "pages",
      type: "sub_menu",
      children: [
         {
            name: 'byoroshye',
            children_menus:null,
            path: 'byoroshye'
         },
         {
            name: 'byizewe',
            children_menus:null,
            path: 'services'
         },
         {
            name: 'byiza',
            children_menus:null,
            path: 'byiza'
         }
      ]
   },
   {
      path:`rental`,
      name: "message.rental",
      icon: "pages",
      type: "sub_menu",
   },
   {
      name: "message.about",
      children_menus:null,
      path: `about`
   },
   {
      path: `contact`,
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
			this.resCat = await categories.getCategories()
         this.resDept = await departments.getDepartment()
			var obj = []
         var arr = {}
         if (this.selectedLocale.name === 'French') {
            this.resDept.data.data.forEach(dep =>{
			    this.resCat.data.data.forEach(el => {
					if (dep._id === el.department) {
					obj.push({
							path: `${el.name.en}`,
							children_menus:null,
                            name: `${el.name.fr}`
						})
					}
            });
            arr[dep.name.fr] = {...obj}
            for (let i = 0; i < obj.length; i++) {
               delete obj[i]
            }
         })
         } else if(this.selectedLocale.name === 'English'){
           this.resDept.data.data.forEach(dep =>{
			    this.resCat.data.data.forEach(el => {
					if (dep._id === el.department) {
					obj.push({
							path: `${el.name.en}`,
							children_menus:null,
                            name: `${el.name.en}`
						})
					}
            });
            arr[dep.name.en] = {...obj}
            for (let i = 0; i < obj.length; i++) {
               delete obj[i]
            }
         }) 
         }
         else if(this.selectedLocale.name === 'Swahili'){
           this.resDept.data.data.forEach(dep =>{
			    this.resCat.data.data.forEach(el => {
					if (dep._id === el.department) {
					obj.push({
							path: `${el.name.sw}`,
							children_menus:null,
                            name: `${el.name.sw}`
						})
					}
            });
            arr[dep.name.sw] = {...obj}
            for (let i = 0; i < obj.length; i++) {
               delete obj[i]
            }
         }) 
         }
         else if(this.selectedLocale.name === 'Kinyarwanda'){
           this.resDept.data.data.forEach(dep =>{
			    this.resCat.data.data.forEach(el => {
					if (dep._id === el.department) {
					obj.push({
							path: `${el.name.en}`,
							children_menus:null,
                            name: `${el.name.kiny}`
						})
					}
            });
            arr[dep.name.kiny] = {...obj}
            for (let i = 0; i < obj.length; i++) {
               delete obj[i]
            }
         })
         }
         this.menus[2].children = arr
		} catch (err) {
			console.log(err.message)
		}
   },
   watch:{
      
   }
}
</script>

