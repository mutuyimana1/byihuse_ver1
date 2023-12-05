<template>
	<div class="home-banner-wrap"> 
		<slick id="bbb" ref="carousel" :options="slickOptions">
			<div v-for="(sliderItem,key) in data"
				:key="key">
				<div id="banner" class="banner-slide">
					<router-link :to="'/'+$i18n.locale+'/products'+sliderItem.routeSubTitle">
					<img id="banner" :src="sliderItem.image" alt="slide-item" width="1123" height="660">
					</router-link>
				</div>
			</div>
		</slick>
	</div>
</template>
<style  scoped>
/* #bbb{
	height: 430px;
} */

</style>
<script>
import Slick from "vue-slick";
export default {
	props: ['data'],
	components: { Slick },
	data() {
    return {
      slickOptions: {
			rtl: this.rtlLayout,
			slidesToShow: 1,
			infinite: true,
			swipe: true,
			autoplay: true,
			dots:false,
			arrows: false,
			pauseOnHover:true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
					arrows: false,
            }
          },
        ]
      }
    };
  }
}
</script>

