<template>
	<div>
		<v-menu transition="scale-transition" offset-overflow nudge-bottom="20" nudge-right="20" min-width="200"
			max-width="200" class="userblock-dropdown" light>
			<template  v-slot:activator="{ on }">
				<v-btn fab small v-on="on">
					<img src="/static/images/logo/face.png" width="40" height="40" class="v-btn--round">
				</v-btn>
			</template>
			<v-list class="user-dropdown-list">
				<div  v-if="user">
				 <v-list-item  v-for="(userLink, key) in userLinks" :key="key">
					<router-link :to="'/'+$i18n.locale+userLink.path" >
					    <v-icon class="mr-2">{{userLink.icon}}</v-icon>
					    <span>{{$t(userLink.title)}}</span>
					</router-link>
				 </v-list-item>
				</div>
				
				<v-list-item  @click="changePage('/session/signin')">
					<v-icon class="mr-2">power_settings_new</v-icon>
					<span v-if="!user">{{$t("message.LogIn")}}</span><span v-if="user">{{$t("message.LogOut")}}</span>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>
<style  scoped>
@media screen  and (max-width: 409px){
   .userblock-dropdown img{
      height: 20px;
   }
}
</style>
<script>
import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters(["user"])
		},
		// props: ['data'],
		methods: {
			changePage(page) {
				localStorage.clear()
				this.$router.push(`/${this.$i18n.locale}${page}`)
				// location.replace(page)
				// location.reload(false)
				if (this.user) {
					this.$store.state.user= false
					// console.log('hel')
				}
			}
		
		},
		data () {
			return {
			userLinks: [
				{
					icon:'account_circle',
					title: 'message.UserProfile',
					path:"/account/profile"
				},
			],
			data: ''
			}
		},
		mounted () {
		this.data =JSON.parse(localStorage.getItem('data'))
		// console.log(data)
		if (this.data) {
			this.$store.state.user = true
		console.log('hhe')
		}
		// this.data = true
		// console.log(this.firstName)
	},
	}
</script>