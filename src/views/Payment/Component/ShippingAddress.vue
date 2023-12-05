<template>
	<div>
		<v-expansion-panel-header class="primary"><h4 class="mx-2 mb-0 white--text">{{$t("message.DeliveryAddress")}}</h4></v-expansion-panel-header>
		<v-expansion-panel-content>
			<v-card-text>
				<v-form ref="form" v-model="valid">
					<v-layout row wrap>
						<v-flex lg4 xl4 xs12 sm6 md6>
							<v-text-field v-model="userInfo.firstName" :rules="inputRules.basictextRules" :label="label.firstName" required></v-text-field>
						</v-flex>
						<v-flex lg4 xl4 xs12 sm6 md6>
							<v-text-field v-model="userInfo.lastName" :rules="inputRules.basictextRules" :label="label.lastName" required></v-text-field>
						</v-flex>
						<v-flex lg4 xl4 xs12 sm6 md6>
							<v-text-field v-model="userInfo.streetName" :rules="inputRules.basictextRules" :label="label.streetName" required ></v-text-field>
						</v-flex>
						<!-- <v-flex lg6 xl6 sm6 md6 xs12> -->
							<!-- <v-text-field v-model="userInfo.aptBuilding" :rules="inputRules.basictextRules" label="Apt Building Name*" required ></v-text-field> -->
						<!-- </v-flex> -->
						<!-- <v-flex lg6 xl6 sm6 md6 xs12> -->
							<!-- <v-text-field v-model="userInfo.zipCode" :rules="inputRules.basictextRules" label="Zip Code*" required></v-text-field> -->
						<!-- </v-flex> -->
						<v-flex lg6 xl6 md6 sm6 xs12>
							<v-text-field v-model="userInfo.cityState" :rules="inputRules.basictextRules" :label="label.cityState" required></v-text-field>
						</v-flex>
						<!-- <v-flex lg6 xl6 md6 sm6 xs12>
							<v-text-field v-model="userInfo.country" :rules="inputRules.basictextRules" label="Country*" required></v-text-field>
						</v-flex> -->
						<v-flex lg6 xl6 sm6 md6 xs12>
						<v-select class="mt-6"
									:items="countries"
									:label="label.country"
									v-model="userInfo.country"
									dense
									></v-select>
									</v-flex>
					</v-layout>
					<div class="contact-info d-block pt-4">
						<h4>{{$t("message.EnterContact")}}</h4>
						<v-layout row wrap>
							<v-flex lg6 xl6 md6 sm12>
								<v-text-field  v-model="userInfo.phone" :rules="inputRules.basictextRules" :label="label.phone" required></v-text-field>
							</v-flex>
							<v-flex lg6 xl6 md6 sm12>
								<v-text-field v-model="userInfo.email"   :label="label.email" >
								</v-text-field>
							</v-flex>
							
						</v-layout>
					</div>
					<div class="layout justify-start px-4 mt-6">
						<v-btn pl-0 ml-0 large @click="addUserDetails" class="accent">{{$t("message.ContinuePayment")}}</v-btn>
					</div>
				</v-form>
			</v-card-text>
		</v-expansion-panel-content>
	</div>	
</template>

<script>
import { mapGetters } from "vuex";
	export default {
		props: ["changeStepOneForm"],
	computed:{
		...mapGetters(["selectedLocale"])
	},
   	data () {
      	return {
			  countries: [
				  'Rwanda',
				  'Burundi',
				  'Uganda',
				  'Tanzaina',
				  'Kenya'
			  ],
			label:{
				firstName : '',	
                lastName :'',
                streetName :'',
                cityState :'', 
                country : 'Rwanda',
				phone :'',
				email: ''
			},
         	valid: false,
          	userInfo:{
                firstName : '',	
                lastName :'',
                streetName :'',
                cityState :'', 
                country : 'Rwanda',
				phone :'',
				email: ''
           },
				inputRules: {
					basictextRules: [v => !!v || 'This field should not be empty.'],
					emailRules: [
						v => !!v || "This field should not be empty.",
						v =>
						/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
						"E-mail must be valid"
					]
				},
         }
      },
      methods: {
         addUserDetails(){
				this.$refs.form.validate()
				if(this.valid == true){
					this.$emit('changeStepOneForm');
					this.$store.dispatch("addUserDetails", this.userInfo);
				}				
			}
	  },
	  mounted(){
		  const dataUser= JSON.parse(localStorage.getItem('data'))
		  if (dataUser) {
			  this.userInfo={
			  firstName : dataUser.firstName,	
                lastName :dataUser.lastName,
				email: dataUser.email,
				phone :'078',
				cityState :'', 
				streetName:'',
				country : 'Rwanda',
		    }
		  }
		  if (this.selectedLocale.name === 'English') {
			  this.label={
				firstName : 'First Name*',	
                lastName :'Last Name*',
                streetName :'Street  Number*',
                cityState :'City and place*', 
                country : 'Country',
				phone :'Mobile*',
				email: 'Email'
			  }
		  }else{
			  this.label={
				firstName : 'Prénom*',	
                lastName :'Nom de famille*',
                streetName :'Numéro de rue*',
                cityState :'Ville et lieu*', 
                country : 'Pays',
				phone :'Mobile*',
				email: 'Email'
			  }
		  }
		  
	  }
   }
</script>