<template>
   <div class="editInfo-wrap emb-card pa-4">
      <div class="">
         <h4>{{$t("message.EditEmailInformation")}}</h4>
         <v-form ref="form" v-model="valid" class="mb-2">
            <v-layout row wrap>
               <v-flex xs12 sm12 md12 lg6 xl6>
                  <v-layout row wrap>
                     <v-flex xs12 sm12 md12 lg12 xl12 py-1>
                        <v-text-field label="Email" v-model="email" :rules="emailRules"></v-text-field>
                     </v-flex>
                     <v-flex xs12 sm12 md12 lg12 xl12 pt-1 pb-0>
                        <v-btn class="accent mx-0 mb-4" @click.stop.prevent="update">{{$t("message.Edit")}}</v-btn>
                     </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex xs12 sm12 md6 lg6 xl6 user-bg edit-profile hidden-md-and-down>
               </v-flex>
            </v-layout>
         </v-form>
      </div>
   </div>
</template>

<script>
import auth from 'Api/auth';
	export default{
   	data () {
      	return {
            email: '',
				val: '',
         	valid: false,
          	inputRules: {
               basictextRules: [v => !!v || 'This field should not be empty']
            },
				emailRules: [
               v => !!v || 'E-mail is required',
               v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
				gender: 'Male',
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false
         }
      },
      watch: {
         menu (val) {
         val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
         }
      },
      methods: {
        saveDetails(){
            this.$refs.form.validate()
            this.update()
         },
         async update () {
           try {
            const resEmail = await auth.updateEmail({
               email: this.email
            })
            localStorage.removeItem('data')
            const localData = {
						firstName: resEmail.data.data.user.firstName,
                        lastName: resEmail.data.data.user.lastName,
                        role: resEmail.data.data.user.role,
						email: resEmail.data.data.user.email,
                    }
            localStorage.setItem('data', JSON.stringify(localData))
            this.$snotify.success(`${resEmail.data.message}`,{
                  closeOnClick: false,
                  pauseOnHover: false,
                  timeout: 1000,
                  showProgressBar:false,
            });
            location.reload(false)
           } catch (err) {
              console.log(err.message)
           }
            // console.log()
         },
         save (date) {
            this.$refs.menu.save(date)
         }
      },
      async mounted () {
			try {
                const data =JSON.parse(localStorage.getItem('data'))
                this.email= data.email
			} catch (err) {
				console.log(err.message)
			}
		}
   }
</script>