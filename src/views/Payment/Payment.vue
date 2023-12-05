<template>
	<div class="emb-contact-wrap">
		 <emb-page-title
			 heading="Payment"
			 subHeading="Please fill your phone number to pay"
		 >
		 </emb-page-title>
		 <div class="emb-contact-content">
		  <!-- <div class="Contact-page">
			 <div class="contact-map">
				<div></div>
					 <emb-google-map></emb-google-map>
			 </div>
			 </div> -->
			 <div class="contact-info-wrapper">
				 <v-container grid-list-xl py-0>
					 <div class="section-gap">
						 <v-layout row wrap>
							 <v-flex sm12 md12 lg7 xl7>
								 <div class="sec-title">
									 <h2>Fill phone to Pay</h2>
								 </div>
								 <v-form  ref="form" v-model="valid">
									 <v-text-field  v-model="telephoneNumber" type="text" :placeholder="label.telephoneNumber" :rules="inputRules.basictextRules"></v-text-field>
									 <v-text-field v-model="amount" type="text" :placeholder="label.amount" :rules="inputRules.basictextRules"></v-text-field>
									 
									 <v-btn :loading="loading" class="accent mx-0 mt-4" large @click.stop.prevent="getPayment">	Pay</v-btn>
								 </v-form>
							 </v-flex>
						 </v-layout>
					 </div>
				 </v-container>
			 </div>
		 </div>
	</div>
 </template>
 
 <script>
 import payment from "Api/payment";
 import { mapGetters } from "vuex";
 export default {
	 computed:{
		 ...mapGetters(["selectedLocale"])
	 },
   data() {
	 return {
	 loading: false,
	 telephoneNumber:'',
	   amount: '',
	   label:{},
	   inputRules: {
		 basictextRules: [v => !!v || "This field should not be empty"]
	   },
	 };
   },
   methods: {
	 async getPayment() {
		 this.loading=true
	   try {
		   const res = await payment.postPayment({
			telephoneNumber: this.telephoneNumber,
			amount: this.amount,
				})
		   console.log("this is payment ",res)
		   this.$snotify.success(`check your phone`,{
					 closeOnClick: false,
					 pauseOnHover: false,
					 timeout: 1000,
					 showProgressBar:false,
				 });
				 this.loading=false
	   } catch (err) {
		   console.log(err)
		 //   this.$snotify.error(`${err}`,{
		 //             closeOnClick: false,
		 //             pauseOnHover: false,
		 //             timeout: 1000,
		 // 			showProgressBar:false,
		 // 		});
		   this.loading=false
	   }
	 },
	 saveDetails() {
	   this.$refs.form.validate();
	 }
   },
   mounted(){
	   const data= JSON.parse(localStorage.getItem('data'))
	 // console.log(data)
	 if (data) {
	 this.telephoneNumber= data.telephoneNumber
	 this.amount= data.amount
	 }
	 if (this.selectedLocale.name === 'English') {
		 this.label={
			telephoneNumber : 'phone number',	
				 amount :'amount',
		 }
	 }else{
		 this.label={
			telephoneNumber : 'tel',	
			amount :'amount',
				 Subject :'Sujet*', 
				 address : 'Votre adresse',
				 message :'Laisser un message*',
				 email: 'Email*'
		 }
	 }
   }
 };
 </script>
 
 