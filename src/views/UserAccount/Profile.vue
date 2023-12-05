<template>
   <div class="profile-wrapper emb-card pa-4">
      <h4>{{$t("message.ProfileInformation")}}</h4>
      <div class="pt-4">
         <div class="proflie-field mb-4" v-for="(info,key) in profileData" :key="key">
            <label>{{info.key}} :</label>
            <span>{{info.value}}</span>
         </div>
         <!-- <router-link :to="{name: 'EditProfileInfo', query: {type: 'info'}}" > <v-btn class="accent mx-0">Edit</v-btn> </router-link> -->
      </div>
   </div>
</template>

<script>
export default {
   data(){
      return{
         profileData:[
            {
               key:"First Name",
               value:"",
            },
            {
               key:"Last Name",
               value:""
            },
            {
               key:"E-mail",
               value:""
            },
            // {
            //    key:"Location",
            //    value:""
            // },
            // {
            //    key:"Role",
            //    value:""
            // },
            // {
            //    key:"Departments",
            //    value:""
            // }
            
         ]
      }
   },
   created () {
		const data =JSON.parse(localStorage.getItem('data'))
		// console.log(data)
      this.profileData[0].value= data.firstName
      this.profileData[1].value = data.lastName
      this.profileData[2].value = data.email
      this.profileData[4].value = data.role
      this.profileData[5].value = data.Departments
	}
}
</script>