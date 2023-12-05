<template>
	<div class="emb-register-wrap section-gap">
		<div class="container py-0">
			<v-layout row wrap align-center justify-center>
				<v-flex sm12 md12 lg8 xl7>
					<v-layout row mx-sm-0 mx-3  wrap align-center justify-center>
						<!-- <v-flex sm6 md7 lg6 xl6 hidden-sm-and-down>
							<div class="form-img register-image"></div>
						</v-flex> -->
						<v-flex sm10 md5 lg6 xl6>
							<div class="emb-card sign-in-form form-margin d-block white pa-6">
								<h4>{{$t("message.EnterYourDetails")}}</h4>
								<v-form ref="form" v-model="valid">
									<v-text-field
										type="text"
										:placeholder="placeHolder.firstName"
										v-model="firstName"
										:rules="inputRules.basictextRules"
									>
									</v-text-field>
									<v-text-field
										type="text"
										v-model="lastName"
										:placeholder="placeHolder.lastName"
										:rules="inputRules.basictextRules"
									>
									</v-text-field>
									<v-text-field
										type="email"
										v-model="email"
										:placeholder="placeHolder.email"
										:rules="emailRules"
									>
									</v-text-field>
									<v-text-field
										type="password"
										:placeholder="placeHolder.password"
										v-model="password"
										:rules="inputRules.basictextRules"
									>
									</v-text-field>
									<v-text-field
										class="mb-4"
										type="password"
										:placeholder="placeHolder.makeitman"
										v-model="repassword"
										:rules="inputRules.basictextRules"
									>
									</v-text-field>
									<v-btn :loading="loading" class="accent mx-0 mb-4" large  @click.stop.prevent="saveDetails">
										{{$t("message.SignUp")}}
									</v-btn>
									<p>{{$t("message.Alreadyhaveaccount")}}<router-link :to="'/'+$i18n.locale+'/session/signin'" class="accent--text"> {{$t("message.SignIn")}}</router-link></p>
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
// import department from "Api/department";
import { mapGetters } from "vuex";
	export default{
	computed:{
		...mapGetters(["selectedLocale"])
	},
   	data () {
      	return {
			  Departments: [],
			  items: ['SUPER-ADMIN', 'DEPARTMENT-ADMIN', 'CASHIER', 'AGENT', 'CLIENT'],
			  firstName: '',
			  lastName: '',
			  email: '',
			  role: 'CLIENT',
			  password: '',
			  repassword: '',
			  loading:false,
			  data: '',
			  placeHolder:{},
			  confrim:'please  confrim password correct',
         	valid: false,
				emailRules: [
					v => !!v || 'E-mail is required',
					v => /.+@.+/.test(v) || 'E-mail must be valid'
      		],
          	inputRules: {
			   basictextRules: [v => !!v || 'This field should not be empty'],
            }
         }
      },
      methods: {
         saveDetails(){
			 this.loading= true
				this.$refs.form.validate();
				if(this.valid == true){
					if (this.repassword === this.password) {
						this.signup()
					}else{
					this.$snotify.error(this.confrim,{
                    closeOnClick: false,
                    pauseOnHover: false,
                    timeout: 3000,
					showProgressBar:false,
				});
			}
			}
			this.loading= false	
			},
		 async signup () {
           try {
			//    if (this.password === this.repassword) {
				const res = await auth.signup({
                   firstName: this.firstName,
                   lastName: this.lastName,
                    email: this.email,
                    role: this.role,
                    password: this.password
			})   
			console.log(res)
			this.$snotify.success(res.data.message,{
                    closeOnClick: false,
                    pauseOnHover: false,
                    timeout: 3000,
					showProgressBar:false,
			});
			this.$router.push('/'+this.$i18n.locale+'/session/signin');
			} catch (err) {
				this.$snotify.success(err.response.message,{
                    closeOnClick: false,
                    pauseOnHover: false,
                    timeout: 3000,
					showProgressBar:false,
			});
				// console.log(err.message)
				// console.log(res)
			}
		}
	},
	mounted () {
		if (this.selectedLocale.name === 'English') {
			  this.placeHolder={
				firstName : 'First Name*',	
                lastName :'Last Name*',
				email: 'Email*',
				password:'Password',
				makeitman:'confrim Password*'
			  }
		  }else{
			  this.confrim= 'Veuillez confirmer le mot de passe correct'
			  this.placeHolder={
				firstName : 'Prénom*',	
                lastName :'Nom de famille*',
				email: 'Email*',
				password:'Mot de passe*',
				makeitman:'Confrim mot de passe*'
			  }
		}
	}
	}
</script>
