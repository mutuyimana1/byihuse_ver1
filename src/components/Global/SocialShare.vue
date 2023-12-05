<template>
   <div class="d-inline-block social-icons">
      <v-btn light icon class="primary">
         <v-icon light>fa-facebook</v-icon>
      </v-btn>
      <v-btn light icon class="primary">
         <v-icon light>fa-twitter</v-icon>
      </v-btn>
      <v-btn light icon class="primary">
         <v-icon light> fa-google-plus</v-icon>
      </v-btn>
      <v-btn light icon class="primary">
         <v-icon light>fa-instagram</v-icon>
      </v-btn>
      <ShareNetwork/>
      <ShareNetwork
    network="WhatsApp"
    url="https://byihuse.rw/#/en/products/Mechanics/Engine%20Oil/5f699eab9493c222c37c0548"
    title="Say "
    description="This week, "
    quote="The hot reload "
    hashtags="vuejs,vite"
  >
    <v-btn light icon class="primary">
         <v-icon light>fa-instagram</v-icon>
      </v-btn>
</ShareNetwork>
   </div>
</template>
<script>
export default {
   methods:{
      shareFb (){
         // const current = document.URL
         // console.log(current)
         // const yego = `https://wa.me/?text=${current}`
         // console.log(yego)
         // window.open(yego)
      }
   }
}
</script>