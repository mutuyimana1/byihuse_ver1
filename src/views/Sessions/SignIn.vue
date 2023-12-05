<template>
	<div class="emb-signIn-wrap section-gap">
		<div class="container py-0">
			<v-layout row wrap align-center justify-center>
				<v-flex sm12 md12 lg8 xl7>
					<v-layout row mx-sm-0 mx-3 wrap align-center justify-center>
						<!-- <v-flex sm6 md7 lg6 xl6 hidden-sm-and-down>
							<div class="form-img sign-in-image"></div>
						</v-flex> -->
						<v-flex sm10 md5 lg5 xl6>
							<div class="emb-card sign-in-form form-margin d-block white pa-6">
								<h4>{{$t("message.UserSignIn")}}</h4>
								<v-form>
									<v-text-field
										type="email"
										placeholder="Email*"
										:rules="emailRules"
										v-model="Email"
									>
									</v-text-field>
									<v-text-field
										type="password"
										placeholder="Password*"
										v-model="password"
									>
									</v-text-field>
									<div class="layout align-center justify-space-between">
										<v-checkbox
											v-model="checkbox"
											:label="$t(RememberMe)"
										></v-checkbox>
										<!-- <router-link to="/session/forgot-password" class=" text-lg-right">Forgot Password ?</router-link> -->
									</div>
									<v-btn class="accent mb-3 ma-0" large @click.stop.prevent="signin">
										{{$t("message.SignIn")}}
									</v-btn>
									<p>{{$t("message.DontHaveaccount")}} <router-link :to="'/'+$i18n.locale+'/session/signup'" class="accent--text">{{$t("message.Clickheretocreateone")}}</router-link></p>
								</v-form>
							</div>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
		</div>
   </div>
</template>
<script>
import auth from "Api/auth";
import axios from 'axios'
	export default{
		data(){
			return{
				checkbox: false,
				Email: '',
				password: '',
				RememberMe:"message.RememberMe",
				emailRules: [
					v => !!v || 'E-mail is required',
					v => /.+@.+/.test(v) || 'E-mail must be valid'
      		],
			}
		},
		methods: {
		async signin () {
			try {
				const res = await auth.signin({
					email: this.Email,
					password: this.password
					})
					const data = res.data
					console.log(data)
					const localData = {
						firstName: data.data.user.firstName,
						lastName: data.data.user.lastName,
						role: data.data.user.role,
						email: data.data.user.email,
						departments: data.data.user.assignedDepartments,
						now:data.data.token,
					}
					localStorage.setItem('data', JSON.stringify(localData))
					axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`
					localStorage.setItem('now', data.data.token)
					this.$snotify.success('SignIn process succesfully done',{
                    closeOnClick: false,
                    pauseOnHover: false,
                    timeout: 1000,
					showProgressBar:false,
					});
					// console.log(JSON.parse(localStorage.getItem('data')))
				// this.$router.push('');
				// location.reload(true)
				this.$store.state.user= true
				// console.log(`/${this.$i18n.locale}/account/profile`)
				this.$router.push(`/${this.$i18n.locale}/account/profile/`)
			} catch (err) {
			console.log(err)
			    this.$snotify.error('invaled Input',{
                    closeOnClick: false,
                    pauseOnHover: false,
                    timeout: 1000,
					showProgressBar:false,
				});
			}
		}
		}
	}
</script>	
