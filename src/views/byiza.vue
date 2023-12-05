<template>
   <div class="emb-contact-wrap">
		<emb-page-title
			heading="Byiza"
			subHeading="Coming soon!"
		>
		</emb-page-title>
		<div class="emb-contact-content">
		</div>
   </div>
</template>

<script>
import contact from "Api/contact";

export default {
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
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
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
  }
};
</script>

