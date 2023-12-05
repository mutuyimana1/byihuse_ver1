<template>
   <div class="editInfo-wrap emb-card pa-4">
      <div class="">
         <h4>Edit Profile Information</h4>
         <v-form ref="form" v-model="valid" class="mb-2">
            <v-layout row wrap>
               <v-flex xs12 sm12 md12 lg6 xl6>
                  <v-layout row wrap>
                     <v-flex xs12 sm12 md12 lg12 xl12 py-1>
                        <v-text-field v-model="firstName" label="First Name" :rules="inputRules.basictextRules"></v-text-field>
                     </v-flex>
                     <v-flex xs12 sm12 md12 lg12 xl12 py-1>
                        <v-text-field label="Last Name" v-model="lastName" :rules="inputRules.basictextRules"></v-text-field>
                     </v-flex>
                     <!-- <v-flex xs12 sm12 md12 lg12 xl12 py-1>
								<v-radio-group v-model="gender">
									<v-radio label="Male" value="Male"></v-radio>
									<v-radio label="Female" value="Female"></v-radio>
                        </v-radio-group>
                     </v-flex> -->
                     <v-flex xs12 sm12 md12 lg12 xl12 py-1>
                        <v-menu
                           ref="menu"
                           :close-on-content-click="false"
                           v-model="menu"
                           :nudge-right="40"
                           transition="scale-transition"
                           offset-y
                           min-width="290px"
                        >
                        	<!-- <template v-slot:activator="{ on }">
                        		<v-text-field
											v-model="date"
											v-on="on"
											label="Birthday date"
											append-icon="event"
											readonly
											:rules="inputRules.basictextRules"
										></v-text-field>
                        	</template>	
                           <v-date-picker
                              ref="picker"
                              v-model="date"
                              min="1950-01-01"
                              @change="save"
                           ></v-date-picker> -->
                        </v-menu>
                     </v-flex>
                     <v-flex xs12 sm12 md12 lg12 xl12 py-1>
                        <v-text-field label="Email" v-model="email" :rules="emailRules"></v-text-field>
                     </v-flex>
                     <v-flex xs12 sm12 md12 lg12 xl12 py-1>
                        <v-select
									:items="Departments"
									label="Departments"
									v-model="assignedDepartments"
									dense
									></v-select>
                        <!-- <v-text-field label="Departments" v-model="Departments" :rules="inputRules.basictextRules"></v-text-field> -->
                     </v-flex>
                     <v-flex xs12 sm12 md12 lg12 xl12 py-1>
                        <v-text-field label="Location" :rules="inputRules.basictextRules"></v-text-field>
                     </v-flex>
                     <v-flex xs12 sm12 md12 lg12 xl12 py-1>
                        <v-text-field type="password" label="Older password" v-model="oldPassword" :rules="inputRules.basictextRules"></v-text-field>
                     </v-flex>
                     <v-flex xs12 sm12 md12 lg12 xl12 py-1>
                        <v-text-field type="password" label="new password" v-model="newPassword" :rules="inputRules.basictextRules"></v-text-field>
                     </v-flex>
                     <v-flex xs12 sm12 md12 lg12 xl12 pt-1 pb-0>
                        <v-btn class="accent mx-0 mb-4" @click.stop.prevent="update">Save</v-btn>
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
import department from "Api/department";
	export default{
   	data () {
      	return {
            firstName: '',
            lastName: '',
            email: '',
            Departments: [],
            assignedDepartments: '',
            assignedDepartmentsId: '',
            oldPassword: '',
            newPassword: '',
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
            // if(this.valid == true){
               
               // setTimeout(() => {
               //    this.$router.push({ path: '/account/profile' });
               // }, 50);
            
				// }
         },
         async update () {
           try {
               this.data.forEach(el => {
				   if (el.name.kiny === this.assignedDepartments) {
					   console.log(el._id)
					   this.assignedDepartmentsId = el._id
				   }
			   });
            const resName = await auth.updateName({
               firstName: this.firstName,
               lastName: this.lastName
            })
            const resEmail = await auth.updateEmail({
               email: this.email
            })
            const resPassword = await auth.updatePassword({
               oldPassword: this.oldPassword,
               newPassword: this.newPassword
            })
            const resDepartments = await auth.updateDepartments({
               departments: this.assignedDepartmentsId
            })
            console.log(resEmail, resPassword, resDepartments,resName)
            this.$snotify.success('Your account Information Updated succesfully',{
                  closeOnClick: false,
                  pauseOnHover: false,
                  timeout: 1000,
                  showProgressBar:false,
            });
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
				const res = await department.getDepartment()
				this.data = await res.data.data
				this.data.forEach(el => {
					this.Departments.push(el.name.kiny)
				});
			} catch (err) {
				console.log(err.message)
			}
		}
   }
</script>