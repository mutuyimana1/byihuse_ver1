<template>
   <div>
      <div class="search-box">
        <v-btn  class="d-inline-block" fab dark v-if="isHidden"	color="accent" @click="search, isHidden = false">
            <v-icon>search</v-icon>
         </v-btn>
      </div>
      <div  class="search-form"  v-if="!isHidden">
        <div class="form">
          <input v-on:keyup.enter="search"  v-model="keyword" type="text" placeholder="Search Here">
            <v-btn class="close-btn white" @click="isHidden = !isHidden">
              <v-icon>close</v-icon>
            </v-btn>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      data (){
         return{
            isHidden: true,
            keyword: ''
         }
      },
      methods: {
         search(){
         this.isHidden=true
         event.preventDefault();
         const hel= this.keyword.trim() !== ''
         console.log(hel)
         if (hel) {
             if (this.$route.params.keyword) {
            // localStorage.removeItem('current')
            location.assign(`/#/${this.$i18n.locale}/search/${this.keyword}`)
            // const current = `/search/${this.keyword}`
            // localStorage.setItem('current', current)
            window.location.reload(false);
           }else{
            // localStorage.removeItem('current')
            location.assign(`/#/en/search/${this.keyword}`)
            // const current = `/search/${this.keyword}`
            // localStorage.setItem('current', current)
          } 
         }
          
         
         //   this.$router.push(`/en/search/${this.keyword}`)
         //   
      }
      },
   created(){
      this.keyword = this.$route.params.keyword
   }
   }
</script>
