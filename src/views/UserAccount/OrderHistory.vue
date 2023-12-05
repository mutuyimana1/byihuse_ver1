<template>
   <div class="order-history-wrap emb-card pa-4">
      <h4 class="mb-4">{{$t("message.OrderHistory")}}</h4>
      <v-data-table
       v-if="selectedLocale.name === 'English'" 
         :headers="headers"
			:items="tableData"
         :items-per-page="tableData.length"
			hide-default-footer
      >
         <template v-slot:item.action="{ item }">
				<v-btn @click="selectedOrder(item)" icon href="javascript:void(0)"><v-icon class="accent--text">remove_red_eye</v-icon></v-btn>
            <!-- <div class="openLogs"> -->
                        <v-btn @click="openLogs(item.logs)" small elevation="0" tile class="primary">{{$t('message.TrackOrder')}}</v-btn>
            <!-- </div> -->
			</template>
      </v-data-table>
      <v-data-table
          v-if="selectedLocale.name === 'French'"
         :headers="headersfr"
			:items="tableData"
         :items-per-page="tableData.length"
			hide-default-footer
      >
         <template v-slot:item.action="{ item }">
				<v-btn @click="selectedOrder(item)" icon href="javascript:void(0)"><v-icon class="accent--text">remove_red_eye</v-icon></v-btn>
            <!-- <div class="openLogs"> -->
                        <v-btn @click="openLogs(item.logs)"  small elevation="0" tile class="primary">{{$t('message.TrackOrder')}}</v-btn>
            <!-- </div> -->
			</template>
      </v-data-table>
      <v-dialog v-model="editDialog" max-width="685px" class="pa-2">
			<v-card class="emb-FinalReceipt-wrap">
				<v-card-text class="pa-4 mb-3">
					<v-flex xs12>
						<div class="text-center bg-grey px-4 py-6">
							<h4>{{$t("message.Orderdetails")}}</h4>
							<!-- <h5 class="mb-6">Payment is successfully processsed and your order is on the way </h5> -->
							<!-- <h6 class="mb-6">Invoice ID:{{_id}}</h6>
							<img src="/static/images/checked.png" width="64" height="64" alt="Success"> -->
						</div>
						<div class="mt-12 mx-4">
							<v-layout row wrap mb-10 mx-0 mt-0>
								<v-flex xs12 sm6 md6 lg6 xl6 text-left pa-0 >
									<!-- <h6>Summary</h6> -->
									<!-- <p class="mb-1">Order ID : 2563883628932</p> -->
									<!-- <p class="mb-1">Order Date :{{selectProduts.date}}</p>
									<p class="mb-1">Order Total :{{selectProduts.total}}</p> -->
								</v-flex>
								<v-flex xs12 sm8 md8 lg8 xl8 text-left pa-0>
									<h6>{{$t("message.DeliverTo")}}</h6>
									<p class="mb-1">{{fristName}} {{lastName}}</p>
									<p class="mb-1">{{city}}, {{street}}</p>
									<p class="mb-1">{{phone}}</p>
								</v-flex>
							</v-layout>
							<!-- <div class="py-6 text-center bg-grey">
								<h4>Products ordered</h4>
								<h3>December 31, 2019</h3>
							</div> -->
							<h4 class="pt-12 mb-7 text-sm-left text-center">You ordered:</h4>
							<div  id="producr">
								<div id="tittle">
								<div><h6> {{$t("message.ProductImage")}}</h6></div>
								<div><h6>{{$t("message.ProductName")}}</h6></div>
								<div><h6>{{$t("message.Quantity")}}</h6></div>
								<div><h6>{{$t("message.Price")}}</h6></div>
								</div>
								<div v-for="product in selectProduts" :key="product" id="products">
									<div><img width="100" :src="product.pictures" alt=""></div>
									<p class="font-weight-bold">{{product.name}}</p>
									<div><p>{{product.quantity}}</p></div>
									<div><emb-currency-sign></emb-currency-sign>{{(product.price/currentValue).toFixed(2)}}</div>
								</div>
							</div>
							
							<v-divider class="my-6"></v-divider>
							<div class="pt-6">
								<div class="layout align-center justify-space-between ma-0">
									<p>{{$t("message.Subtotal")}}</p>
									<span><emb-currency-sign></emb-currency-sign>{{(total/currentValue).toFixed(2)}}</span>
								</div>
								<div class="layout align-center justify-space-between ma-0">
									<p>{{$t("message.Delivery")}}</p>
									<span><emb-currency-sign></emb-currency-sign>0</span>
								</div>
								<div class="layout align-center justify-space-between ma-0">
									<p>{{$t("message.Tax")}}</p>
									<span><emb-currency-sign></emb-currency-sign>0</span>
								</div>
								<v-divider class="my-4"></v-divider>
								<div class="layout align-center justify-space-between ma-0">
									<h4>{{$t("message.Total")}}</h4>
									<h4><emb-currency-sign></emb-currency-sign>{{(total/currentValue).toFixed(2)}}</h4>
								</div>
								<!-- <v-divider class="my-4"></v-divider> -->
							</div>
						</div>
					</v-flex>
               <div class="selectedPayemnt">
                   <v-btn @click="editDialog= false" class="mr-5 primary">{{$t("Close")}}</v-btn>
                   <v-btn @click="payymentmethods()" class="accent">{{$t("message.payment")}}</v-btn>
            </div>
				</v-card-text>
            
			</v-card>
		</v-dialog>
      <v-dialog max-width="800" v-model="open">
		<v-card class="py-6 px-2 ">
         <v-data-table 
         v-if="selectedLocale.name === 'English'" 
         :headers="logHeader"
			:items="logs"
         :items-per-page="tableData.length"
			hide-default-footer
      >
      </v-data-table>
      <v-data-table 
      v-if="selectedLocale.name === 'French'" 
         :headers="logHeaderfr"
			:items="logs"
         :items-per-page="tableData.length"
			hide-default-footer
      >
      </v-data-table>
			<v-card-actions class="layout justify-center">
				<v-btn color="accent mx-2" @click="open = false">{{$t("Close")}}</v-btn>
				<!-- <v-btn color="accent" @click="RWF emit('onConfirm')">Yes</v-btn> -->
			</v-card-actions>
		</v-card>
	</v-dialog>
         <v-dialog max-width="800" v-model="paymentway">
		<v-card class="py-6 px-2 ">
         <v-data-table 
         v-if="selectedLocale.name === 'English'" 
         :headers="payment"
			:items="paymentArray"
         :items-per-page="tableData.length"
			hide-default-footer
      >
      </v-data-table>
      <v-data-table 
      v-if="selectedLocale.name === 'French'" 
         :headers="paymentfr"
			:items="paymentArray"
         :items-per-page="tableData.length"
			hide-default-footer
      >
      </v-data-table>
			<v-card-actions class="layout justify-center">
				<v-btn color="primary mx-2" @click="paymentway = false">{{$t("Close")}}</v-btn>
				<!-- <v-btn color="accent" @click="RWF emit('onConfirm')">Yes</v-btn> -->
			</v-card-actions>
		</v-card>
	</v-dialog>
   </div>
</template>

<script>
import myOrder from "Api/my-order.js";
import moment from "moment"
import currency from "Api/currency";
import { mapGetters } from "vuex";
export default {
   data(){
      return{
         headers: [
            {
               text: 'Time',
               value: 'date'
            },
            {
               text: 'Total amount',
               value: 'totalAmountExpected'
            },
            {
               text: 'Total amount Paid',
               value: 'totalAmountPaid'
            },
            { 
               text: 'delivery', 
               value: 'delivery' 
            },
            {
                text: 'Status', 
                value: 'status' 
            },
            { 
               text: 'Action', 
               value: 'action' 
            }
         ],
         headersfr: [
            {
               text: 'Temps',
               value: 'date'
            },
            {
               text: 'Montant total',
               value: 'totalAmountExpected'
            },
            {
               text: 'Montant total payé',
               value: 'totalAmountPaid'
            },
            { 
               text: 'livraison', 
               value: 'delivery' 
            },
            { text: 'statut', value: 'status' },
            { text: 'action', value: 'action' }
         ],
          logHeader: [
            {
               text: 'Time',
               value: 'time'
            },
            {
               text: 'Action',
               value: 'action'
            },
            {
               text: 'Comment',
               value: 'comment'
            },
            {
               text: 'Name',
               value: 'name'
            },
         ],
         logHeaderfr: [
            {
               text: 'Temps',
               value: 'time'
            },
            {
               text: 'Commentaire',
               value: 'comment'
            }
            ,
            {
               text: 'Action',
               value: 'action'
            },
            {
               text: 'Nom',
               value: 'name'
            },
         ],
         payment: [
            {
               text: 'Time',
               value: 'time'
            },
            {
               text: 'Method',
               value: 'method'
            }
            ,
            {
               text: 'Amount',
               value: 'amount'
            },
         ],
         paymentfr: [
            {
               text: 'Temps',
               value: 'time'
            },
            {
               text: 'méthode',
               value: 'method'
            }
            ,
            {
               text: 'montant',
               value: 'amount'
            },
         ],
         tableData: [],
         editDialog: false,
         selectProduts:[],
         selectedProBef:[],
         product:[],
         fristName: '',
         lastName: '',
         city: '',
         street: '',
         total:0,
         open:false,
         logs:[],
         currentValue:1,
         paymentway:false,
         paymentArray:[],
         paymentLogs:[],
         realProduct:[]
      }
   },
   methods: {
      openLogs(logs){
         this.logs=[]
         console.log(logs)
         logs.forEach(el =>{
         const dat = moment(el.createdAt)
			const time = moment(el.createdAt)
			const tt = time.format('LT')
			const da = dat.format('L');
         const date = tt + '' + ' '+ da
         this.logs.push({
            time: date,
            action:el.action,
            comment:el.comment,
            name: el.name
         })
         })
         this.open= true
      },
      payymentmethods(){
         console.log(this.paymentLogs)
         this.paymentArray=[]
         this.paymentLogs.forEach(el =>{
            const dat = moment(el.time)
			const time = moment(el.time)
			const tt = time.format('LT')
			const da = dat.format('L');
         const date = tt + '' + ' '+ da
         this.paymentArray.push({
            time: date,
            amount:el.amount,
            method:el.method
         })
      })
         
         this.paymentway= true
      },
      selectedOrder(selected){
         console.log(selected)
         this.paymentLogs= selected.paymentLogs
         this.logs=selected.logs
         this.fristName=selected.firstName,
         this.lastName=selected.lastName,
         this.city=selected.address,
         this.street=selected.details
         this.selectProduts=[]
         this.total=0
         if (this.selectedLocale === "French") {
            selected.product.forEach(el=>{
            // console.log(el.pictures.pic1)
            this.selectProduts.push({
               pictures: 'http://localhost:4000/'+el.pictures.pic1,
               price:el.price,
               name: el.name.fr,
               logs: selected.logs
            })
            this.total= this.total+el.price
           })
         }else{
            selected.product.forEach(el=>{
            // console.log(el.pictures.pic1)
            this.selectProduts.push({
               pictures: 'http://localhost:4000/'+el.pictures.pic1,
               price:el.price,
               name: el.name.en,
               logs: selected.logs,
               quantity:el.quantity
            })
            this.total=this.total+el.price
           })
         }
         this.editDialog= true
         console.log(this.selectProduts)
      }
   },
   async created(){
      try {
         const resRental= await myOrder.myRentalOrder()
          const resProduct= await myOrder.myProductsOrder()
          console.log(resRental)
          console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",resProduct)
          const curRes= await currency.getcurrency()
          curRes.data.data.forEach(el=> {
            if (el.symbol === this.selectedCurrency.symbol) {
               this.symbol= true
               this.currentValue= el.currentValue
               }
         })
          resRental.data.data.forEach(el => {
             console.log(el)
         const dat = moment(el.createdAt)
			const time = moment(el.createdAt)
			const tt = time.format('LT')
			const da = dat.format('L');
         const date = tt + '' + ' '+ da
         
            //  if (el.logs.length) {
               //  console.log(el)
                this.product[0]= el.rental
                this.tableData.push({
               date: date,
               firstName: el.firstName,
               lastName: el.lastName,
               logs: el.logs,
               totalAmountPaid: el.totalAmountPaid,
               totalAmountExpected:el.totalAmountExpected,
               paymentLogs: el.paymentLogs,
               status: el.status.status,
               product:this.product
                })
            //  console.log(el)
            //  console.log(el)
            //  }
            //  console
          })
           resProduct.data.data.forEach(el => {
             console.log(el)
            this.realProduct=[]
             const datee = moment(el.createdAt)
			    const timee = moment(el.createdAt)
			    const ttt = timee.format('LT')
			    const daa = datee.format('L');
             const dateee = ttt + '' + ' '+ daa
             el.products.forEach(element => {
                this.realProduct.push({
                   pictures:element._id.pictures,
                   price:element._id.price,
                   name:element._id.name,
                   logs:element.logs,
                   quantity:element.quantity
                })
             });
            // if (el.logs.length) {
               this.tableData.push({
               date:dateee,
               MoMoPhoneNumber:el.MoMoPhoneNumber,
               agentCode: el.agentCode,
               cancelReason: el.cancelReason,
               city: el.city,
               email:el.email,
               firstName:el.firstName,
               lastName:el.lastName,
               logs:el.logs,
               status:el.status.status,
               details:el.streetNumber,
               totalAmountExpected: el.totalAmmount,
               totalAmountPaid: el.totalAmountPaid,
               delivery: el.delivery,
               product:this.realProduct,
               paymentLogs:el.paymentLogs
             })
            // }
             
          });
      } catch (err) {
         console.log(err.response.message)
      }
   },
   computed:{
      ...mapGetters(["selectedCurrency", "selectedLocale"])
   }
}
</script>
<style  scoped>
#products{
	display: flex;
	justify-content: space-between;
	/* text-align: center; */
	align-items: center;
	margin-top: 10px;
}
#tittle{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.openLogs{
   display: flex;
   justify-content: center;
}
/* #producr{
	display: flex;
	justify-content: space-between;
} */
.selectedPayemnt{
   display: flex;
   justify-content: center;
}
</style>
