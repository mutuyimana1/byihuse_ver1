<template>
	<div class="sidebar-menu">
		<emb-perfect-scrollbar class="scroll-area" :settings="settings">
			<v-list>
				<div class="close-btn-sidebar layout justify-end mx-4 pt-2">
					<a href="javascript:void(0)" @click="toggleMobileSidebar">
						<i class="material-icons close-icon black--text"> close</i>
					</a>
				</div>
				<template v-for="menu in menus">
					<template v-if="menu.children !== null">
						<v-list-group
							light
							:key="menu.title"
							no-action
							v-model="menu.active"
						>	
							<v-list-item class="px-0" slot="activator" @click="changedepRoute(menu.path)">
								<v-list-item-action class="mr-0">
									<v-icon>{{menu.icon}}</v-icon>
								</v-list-item-action>
								<v-list-item-title>
									{{ $t(menu.name) }}
								</v-list-item-title>
							</v-list-item>

							<template v-if="menu.type === 'sub_menu'">
                        <template v-for="subItem in menu.children" >
                           <v-list-item 
                              class="sub-menu-item"
                              
                              :key="subItem.title" 
                              v-if="subItem !== null"
                              :to="subItem.path"
                           >	
                              <template v-if="subItem.children_menus == null">
                                 <v-list-item-action class="mr-0">
                                    <v-icon>arrow_right_alt</v-icon>
                                 </v-list-item-action>
                                 <v-list-item-title class="sub-item">{{$t(subItem.name)}}</v-list-item-title>
                              </template>

                              <template v-else>
                                 <v-list-group
                                    class="submenu-child"
                                 no-action
                                 sub-group
                                 value="true"
                                 prepend-icon="mdi mdi-chevron-down"
                                 >
                                 <template v-slot:activator>
                                    <v-list-item-title><v-icon class="pr-2">arrow_right_alt</v-icon>{{$t(subItem.name)}}</v-list-item-title>
                                 </template>

                                 <v-list-item
                                    v-for="(item, i) in subItem.children_menus"
                                    :key="i"
                                    link
                                    :to="item.path"
                                 >
                                    <v-list-item-title class="sub-item"><v-icon class="pr-2">arrow_right_alt</v-icon>{{$t(item.name)}}</v-list-item-title>
                                 </v-list-item>
                                 </v-list-group>
                              </template>

                           </v-list-item>
                        </template>
							</template>
							<template v-else>
                        <template v-for="(subItem,subItemKey) in menu.children" >
                           <v-list-group
                              class="submenukey"
                              
                              :key="subItemKey" 
                              v-if="subItem !== null"
                              :to="subItem.path"
                              no-action
                              sub-group
                              prepend-icon="mdi mdi-chevron-down"
                              v-model="subGroup[subItemKey]"
                           >
                              <v-list-item slot="activator">
                                 <v-list-item-title class="megamenu-key pl-1"><v-icon class="pr-2">arrow_right_alt</v-icon>{{ $t(subItemKey) }}</v-list-item-title>
                              </v-list-item>
                              <v-list-item
                                 v-for="(megaChild,megaChildKey) in subItem"
                                 :key="megaChildKey"
                                 @click="changeRoute(subItemKey,megaChild.path)"
                                 class="mega-menu-item "
                              >
                                 <v-list-item-action class="mr-0 pl-1">
                                    <v-icon>arrow_right_alt</v-icon>
                                 </v-list-item-action>
                                 <v-list-item-title :value="true">{{$t(megaChild.name)}}</v-list-item-title>
                              </v-list-item>
                           </v-list-group>
                        </template>
							</template>
						</v-list-group>
					</template>

					<template v-else>
						<v-list-item :key="menu.title" @click="changedepRoute(menu.path)">
							<v-list-item-action class="mr-0">
								<v-icon>{{menu.icon}}</v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>
									{{ $t(menu.name) }}
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</template>
				</template>
			</v-list>
		</emb-perfect-scrollbar>
	</div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { mapGetters } from 'vuex';
import categories from "Api/categories";
import departments from "Api/department";
export default {
	components: {
		embPerfectScrollbar:VuePerfectScrollbar,
	},
	data() {
		return {
			subGroup: {
				'message.men':false,
				'message.women':false,
				'message.gadgets':false,
				'message.accessories':false,
			},
			settings: {
				maxScrollbarLength: 360
			},
menus:  [
	{
   path: 'home',
    name: "message.home",
	icon: "home",
   // type: "sub_menu",
   children: null
	},
	 {
      path:'products',
      name: "message.shop",
      icon: "pages",
      children: null
	},
   {
      path: 'categoriesiii',
      name:"message.categories",
      icon: 'party_mode',
      type: 'mega_menu',
      children: {}
   },
      {
      path:`categoriesiii`,
      name: "message.services",
      icon: "pages",
      type: "sub_menu",
      children: [
         {
            name: 'byoroshye',
            children_menus:null,
            path: `byoroshye`
         },
         {
            name: 'message.byizewe',
            children_menus:null,
            path: `services`
         },
         {
            name: 'Byiza',
            children_menus:null,
            path: `byiza`
         },
      ]
   },
         {
      path:`rental`,
      name: "message.rental",
      icon: "pages",
      children: null
	},
   {
    name: "message.about",
    path: "about",
    icon: 'perm_contact_calendar',
   children: null
},
   {
      path: 'contact',
      name:"message.contactUs",
      icon: 'perm_contact_calendar',
      children: null
   },
	],
	resCat: '',
	resDept: '',
		}
	},
	computed:{
		...mapGetters(["selectedLocale"]),
	},
	methods: {
		toggleMobileSidebar() {
			this.$store.dispatch('toggleSidebar', false);
		},
		scrollHanle(evt) {
			console.log(evt)
      },
      changeRoute(megaitemkey, submega) {
         this.$router.push(`/${this.$i18n.locale}/products/${megaitemkey}/${submega}`)
      },
      changedepRoute(megaitemkey) {
         if (megaitemkey !== 'categoriesiii') {
            this.$router.push(`/${this.$i18n.locale}/${megaitemkey}`)
         }
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
         }else if(this.selectedLocale.name === 'English'){
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
         if (this.selectedLocale.name === 'Swahili') {
            this.resDept.data.data.forEach(dep =>{
			    this.resCat.data.data.forEach(el => {
					if (dep._id === el.department) {
					obj.push({
							path: `${el.name.en}`,
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
         }else if (this.selectedLocale.name === 'Kinyarwanda'){
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
	}
}
</script>
<style  scoped>
.sidebar-menu{
   background:  #0D2947!important;
}
</style>