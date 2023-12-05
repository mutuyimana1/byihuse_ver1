<template>
   <div class="emb-contact-wrap">
		<emb-page-title
			heading="message.ContactUs"
			subHeading="message.subHeadingContactUs"
		>
		</emb-page-title>
		<div class="emb-contact-content">
         <!-- <div class="Contact-page">
            <div class="contact-map">
					<emb-google-map></emb-google-map>
            </div>
			</div> -->
			<div class="contact-info-wrapper">
				<v-container grid-list-xl py-0>
					<div class="section-gap">
						<v-layout row wrap>
							<v-flex sm12 md12 lg5 xl5>
								<div class="sec-title">
									<h2 class="v-layout justify-start align-center">{{$t("message.ContactInfo")}}</h2>
									<h5 class="font-italic mb-6">{{$t("message.Salesteam")}}</h5> 
								</div>
								<!-- {{contactInfo.info}} -->
								<div class="mb-6">
									<h3>{{$t("message.Call")}}</h3>
									<a href="tel:+250784481653" class="color-inherit">
										+250 784 481 653</a>
								</div>
								<div class="mb-6">
									<h3>{{$t("message.Mail")}}</h3>
									<a href="mailto:info@byihuse.rw" class="color-inherit">info@byihuse.rw</a>
								</div>
								<div class="mb-6">
									<h3>{{$t("message.Address")}}</h3>
									<p>KN2 ave opposite MIC building</p>
								</div>
							</v-flex>
							<v-flex sm12 md12 lg7 xl7>
								<div class="sec-title">
									<h2>{{$t("message.WritetoUs")}}</h2>
								</div>
								<v-form  ref="form" v-model="valid">
									<v-text-field v-model="fristName" type="text" :placeholder="label.firstName" :rules="inputRules.basictextRules"></v-text-field>
									<v-text-field v-model="lastName"	type="text"	:placeholder="label.lastName" :rules="inputRules.basictextRules"></v-text-field>
									<v-text-field v-model="email" type="email" :placeholder="label.email"></v-text-field>
									<v-text-field v-model="subject"	type="text"	:placeholder="label.Subject" :rules="inputRules.basictextRules"></v-text-field>
									<v-textarea v-model="message" rows="2" :label="label.message" :rules="inputRules.basictextRules"></v-textarea>
									<v-btn :loading="loading" class="accent mx-0 mt-4" large @click.stop.prevent="getContactInfo">	{{$t("message.SendMessage")}}</v-btn>
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
import contact from "Api/contact";
import { mapGetters } from "vuex";
export default {
	computed:{
		...mapGetters(["selectedLocale"])
	},
  data() {
    return {
	loading: false,
	  fristName:'',
	  lastName: '',
	  email: '',
	  subject: '',
	  message: '',
      valid: false,
	  contactInfo: "",
	  label:{},
      inputRules: {
        basictextRules: [v => !!v || "This field should not be empty"]
	  },
    };
  },
  methods: {
    async getContactInfo() {
		this.loading=true
      try {
		  const res = await contact.postMessage({
			   firstName: this.fristName,
			   lastName: this.lastName,
			   email:this.email,
			   subject: this.subject,
			   message: this.message
			   })
		//   console.log()
		  this.$snotify.success(`${res.data.message}`,{
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
    this.fristName= data.firstName
    this.lastName= data.lastName
    this.email=data.email 
    }
	if (this.selectedLocale.name === 'English') {
		this.label={
				firstName : 'First Name*',	
                lastName :'Last Name*',
                Subject :'Subject', 
                address : 'address',
				message :'Leave a Message*',
				email: 'Email*'
		}
	}else{
		this.label={
				firstName : 'Prénom*',	
                lastName :'Nom de famille*',
                Subject :'Sujet*', 
                address : 'Votre adresse',
				message :'Laisser un message*',
				email: 'Email*'
		}
	}
  }
};
</script>

