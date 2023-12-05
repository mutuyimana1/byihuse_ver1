
<template>
	<div class="emb-detailOffer-wrap">
		<div class="offer-list">
			<v-layout row wrap>
				<v-flex xs12 sm12 md12 lg4 xl4>
					<router-link :to="'/'+$i18n.locale+'/byoroshye'">
						<div class="overlay-wrap">
							<a href="javascript:void(0)">
								<img alt="Sale Call In Action" class="w-100" src="/static/images/byoroshye.jpg" width="640" height="430">
							</a>
							<div class="overlay-content primary-rgba">
								<div>
									<h2>Byoroshye</h2>
									<h6 class="font-weight-regular">Dry cleaning services with pickup and drop off</h6>
								</div>
							</div>
					  </div>
					</router-link>
				</v-flex>
				<v-flex xs12 sm12 md12 lg4 xl4>
					<router-link :to="'/'+$i18n.locale+'/byiza'">
						<div class="overlay-wrap">
								<a href="javascript:void(0)">
									<img alt="Sale Call In Action" class="w-100" src="/static/images/byiza-1.jpg" width="640" height="430">
								</a>
								<div class="overlay-content black-rgba">
									<div>
										<h2 class="">Byiza</h2>
										<h6>Through FINVIA Group we are going to build 100 houses for our clients</h6>
									</div>
									
								</div>
						  </div>
					</router-link>
				</v-flex>
				<v-flex xs12 sm12 md12 lg4 xl4>
					<router-link :to="'/'+$i18n.locale+'/services'">
						<div class="overlay-wrap">
								<a href="javascript:void(0)">
									<img alt="Sale Call In Action" class="w-100" src="/static/images/byizewe.jpg" width="640" height="430">
								</a>
								<div class="overlay-content pink-rgba">
									<div>
										<h2>Byizewe</h2>
										<h6>We provide proffesional and trusted technicians</h6>
									</div>
								</div>
						  </div>
					</router-link>
				</v-flex>
			</v-layout>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return{
			sale: "message.sale",
			women: "message.Womencollection",
			discountNumber: "message.discountNumber",
			arrivalTitle: "message.arrivalTitle",
			flat: "message.flat",
			discount:"message.discount",
			Mencollection:"message.Mencollection",
			off: "message.off"
		}
	}
}
</script>
