<template>
   <div class="emb-contact-wrap">
		<emb-page-title
			heading="message.Rental"
			subHeading="message.subHeadingRental"
		>
		</emb-page-title>
        <v-btn class="primary ml-1 toggleBtn" icon @click="darwer=!darwer">
                         <i class="material-icons">menu</i>
                     </v-btn>
        <div class="mainSerices">
         <div>
             <div id="idCard">
              <v-navigation-drawer
              id="idCard"
              dark
              class="primary"
              width="230"
              height="800"
              permanent>
    <v-list id="services">
        <div v-for="names in rentalNames" :key="names">
         <v-list-item id="servicesId" @click="viewServices(names.id)" link>
            {{names.name}}
        </v-list-item>
        <v-divider></v-divider>
        </div>
        
    </v-list>
    </v-navigation-drawer>
        </div>
        <div class ="forSmall">
            <v-navigation-drawer
            v-model="darwer"
            app
              dark
              width="230"
              height="1000"
               class="primary"
               id="thisOneTry"
              temporary>
    <v-list id="services">
        <div v-for="names in rentalNames" :key="names">
         <v-list-item id="servicesId" @click="viewServices(names.id)" link>
            {{names.name}}
        </v-list-item>
        <v-divider></v-divider>
        </div>
        
    </v-list>
    </v-navigation-drawer>
        </div>
             
        </div>
        <div class="asideServices">
        	<div class="day-deal-wrap white section-gap">
		<v-container grid-list-xl pb-0>
			<v-layout row wrap>
				<v-flex xs12 sm12 md6 lg6 xl6  deal-content>
					<div class="day-deal-content"> 
						<div class="mb-12">
							<h2 class="font-weight-regular mb-6">
								{{selectedServices.sectitle}}
							</h2>
							<h5 class="font-weight-regular">
								{{selectedServices.subtitle}}
							</h5>
							<!-- <p class="d-inline-block mr-1">
								<strike class="px-1"><emb-currency-sign class="font-color"></emb-currency-sign>42.46</strike>
							</p> -->
							<p>{{selectedServices.paragraph}}</p>
							
						</div>
						<v-layout row wrap cmx-0>
							<v-flex xs4 sm4 md4 lg4 xl4
								class="product-gallery" 
								v-for="(productImage,key) in selectedServices.productGallery"
								:key="key"
								@click="togglePreviewImage(productImage)"
							>
								<a href="javascript:void(0)">
									<v-img
										alt="deal of the day"
										class="emb-card"
										:src="productImage"
										aspect-ratio="0.8"
										max-width="217"
										max-height="217"
									/>
								</a>
							</v-flex>
						</v-layout>
					</div>
				</v-flex>
                
				<v-flex xs12 sm12 md6 lg5 xl6>
								<div class="sec-title">
									<h5>{{$t("message.Fillthisform")}}</h5>
								</div>
								<v-form  ref="form" v-model="valid">
                                    <div class="hourRental">
                                        <div class="input">
                                         <v-text-field v-model="rentalHour" id="input"  solo></v-text-field>   
                                         <!-- <input class="input font-weight-regular" type="text" v-model="rentalHour" value=""> -->
                                        </div>
                                        <div class="font-weight-regular rentalH ml-2">{{$t("message.RentingHour")}}</div>
                                    </div>
                                    <p class="accent--text d-inline-block sec-content">
								 {{$t("message.Startingatonly")}} <emb-currency-sign class="accent--text"></emb-currency-sign> {{((selectedServices.price/currentValue)*rentalHour).toFixed(2)}}
							</p>
									<v-text-field v-model="fristName" type="text" placeholder="First Name" :rules="inputRules.basictextRules"></v-text-field>
									<v-text-field v-model="lastName"	type="text"	placeholder="Last Name" :rules="inputRules.basictextRules"></v-text-field>
									<v-text-field v-model="email" type="email" placeholder="Email"></v-text-field>
									<v-text-field v-model="phoneNumber" 	type="number"	placeholder="Phone number" :rules="inputRules.basictextRules"></v-text-field>
                                    <v-text-field v-model="address" 	type="Address"	placeholder="Your address" :rules="inputRules.basictextRules"></v-text-field>
									<v-textarea v-model="details" rows="2" label="Please give us details of your situation" :rules="inputRules.basictextRules"></v-textarea>
									<v-btn :loading="loading" class="accent mx-0 mt-4" large @click.stop.prevent="AskForServices">{{$t("message.Submit")}}</v-btn>
								</v-form>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
    <div>

    </div>
        </div>
        </div>
   </div>
</template>
<style scoped>
.hourRental{
    /* width: 200px; */
    /* height: 50px; */
    display: flex;
    align-items: center;
}
.input{
    width: 100px;
    font-size: 20px;
}
#input{
text-align: end;
}
.rentalH{
    font-size: 20px;
    margin-bottom: 20px;
    
}
#services{
    position: relative;
    bottom: 10px;
}
.mainSerices{
    display: flex;
}
.asideServices{
    /* background: grey; */
    /* height: 400px; */
    width: 100%;
}
/* #idCard{
    height: 100%;
} */
#navig{
    background: #EEEEEE;
}
#servicesId{
    font-size: 17px;
}
@media screen and (max-width: 1279px){
    #idCard{
        display: none;
    }
    .forSmall{
        /* display: none; */
        position: relative;
        top: 100px;
    }
    .thisOneTry{
        position: relative;
        top: 100px;
    }
}
@media screen and (min-width: 1279px){
    .forSmall, .toggleBtn{
        display: none;
    }
}
</style>
<script>
import Rental from "Api/rental";
import { mapGetters } from "vuex";
import currency from "Api/currency"
export default {
  data() {
    return {
        loading: false,
        fristName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        details: '',
        address: '',
      darwer: null,
      valid: false,
      contactInfo: "",
      inputRules: {
        basictextRules: [v => !!v || "This field should not be empty"]
      },
      rentalNames: [],
      selectedServices: {
                id: '',
                sectitle: "",
                subtitle: "",
                paragraph: "",
                productGallery: {}
      },
          selectedPreviewImage:'',
          rentalHour:'1',
          symbol: false,
          currentValue:1
        //   price
    };
  },
  mounted() {
    this.getContactInfo();
    const data= JSON.parse(localStorage.getItem('data'))
    // console.log(data)
    if (data) {
    this.fristName= data.firstName
    this.lastName= data.lastName
    this.email=data.email 
    }
    
  },
  methods: {
      async AskForServices() {
          try {
              this.loading= true
            //   console.log(this.selectedServices)
           const orderRes = await Rental.rentalOrder({
            rentalId: this.selectedServices.id,
            firstName:this.fristName,
            lastName:this.lastName,
            email:this.email,
            phone: this.phoneNumber,
            address: this.address,
            details: this.details,
            agentCode:this.agentCode,
            estimatedHours:this.rentalHour
            })
            // console.log(orderRes)
            this.$snotify.success(`${orderRes.data.message}`,{
                    closeOnClick: false,
                    pauseOnHover: false,
                    timeout: 3000,
					showProgressBar:false,
                });
                this.loading=false
                // this.$router.push('/en/session/thank-you')
          } catch (err) {
              console.log(err.message)
              this.loading=false
          }
        //   console.log('hhelo')
        
      },
      togglePreviewImage(image) {
			this.selectedPreviewImage = image;
		},
    async getContactInfo() {
      try {
          const res = await Rental.getRental()
        //   console.log(res.data.data)
          const curRes= await currency.getcurrency()
          curRes.data.data.forEach(el=> {
           if (el.symbol === this.selectedCurrency.symbol) {
          this.symbol= true
          this.currentValue= el.currentValue
        }
      })
        //   this.servicesName.splice(0,1)
        if (this.selectedLocale === 'French') {
            res.data.data.forEach(el => {
            //   console.log(el)
              this.rentalNames.push({
                  name:el.name.fr,
                  id: el._id
              })
          });
            res.data.data.forEach(el => {
            //   console.log(el)
            if (this.rentalNames[0].id === el._id) {
              this.selectedServices= {
                    id: el._id,
                    sectitle: el.name.fr,
                    price:el.price,
                    paragraph:el.description.fr,
                    productGallery:{
                        pic1:this.linksformbackend+el.pictures.pic1,
                        pic2:this.linksformbackend+el.pictures.pic2,
                        pic3:this.linksformbackend+el.pictures.pic3,
                        // pic4:this.linksformbackend+el.pictures.pic4,
                    },
                },
                // this.price= el.
                this.selectedPreviewImage=this.linksformbackend+el.pictures.pic1

            }
          });
        } else{
            res.data.data.forEach(el => {
            //   console.log(el)
              res.data.data.forEach(el => {
            //   console.log(el)
              this.rentalNames.push({
                  name:el.name.en,
                  id: el._id
              })
          });
            if (this.rentalNames[0].id === el._id) {
              this.selectedServices= {
                    id: el._id,
                    sectitle: el.name.en,
                    price:el.price,
                    paragraph:el.description.en,
                    productGallery:{
                        pic1:this.linksformbackend+el.pictures.pic1,
                        pic2:this.linksformbackend+el.pictures.pic2,
                        pic3:this.linksformbackend+el.pictures.pic3,
                        // pic4:this.linksformbackend+el.pictures.pic4,
                    },
                },
                // this.price= el.
                this.selectedPreviewImage=this.linksformbackend+el.pictures.pic1

            }
          });
        }
        //   const resOneForMouted = await services.getOne(this.servicesName[0].id)
        //   console.log(resOneForMouted)
      } catch (err) {
          console.log(err.message)
      }
    },
    async viewServices(id) {
        try {
            // console.log(id)
            const resOne = await Rental.getRental()
            if (this.selectedLocale.name === "French") {
                resOne.data.data.forEach(el => {
                if (el._id === id) {
                  this.selectedServices= {
                    id: el._id,
                    sectitle: el.name.fr,
                    price:el.price,
                    paragraph:el.description.fr,
                    productGallery:{
                        pic1:this.linksformbackend+el.pictures.pic1,
                        pic2:this.linksformbackend+el.pictures.pic2,
                        pic3:this.linksformbackend+el.pictures.pic3,
                        // pic4:this.linksformbackend+el.pictures.pic4,
                    }
                }  
                // console.log(this.linksformbackend+el.pictures.pic1)
                this.selectedPreviewImage= this.selectedServices.productGallery.pic1
                }
                
            })
            } else{
                resOne.data.data.forEach(el => {
                if (el._id === id) {
                  this.selectedServices= {
                    id: el._id,
                    sectitle: el.name.en,
                    price:el.price,
                    paragraph:el.description.en,
                    productGallery:{
                        pic1:this.linksformbackend+el.pictures.pic1,
                        pic2:this.linksformbackend+el.pictures.pic2,
                        pic3:this.linksformbackend+el.pictures.pic3,
                        // pic4:this.linksformbackend+el.pictures.pic4,
                    }
                }  
                // console.log(this.linksformbackend+el.pictures.pic1)
                this.selectedPreviewImage= this.selectedServices.productGallery.pic1
                }
                
            })
            }
            if (window.innerWidth <= 1279 ) {
                this.darwer= false
            }
        } catch (err) {
            console.log(err.message)
        }
        
    },
    saveDetails() {
      this.$refs.form.validate();
    }
  },
  computed: {
      ...mapGetters(["linksformbackend","selectedLocale","selectedCurrency"])
  }
};
</script>

