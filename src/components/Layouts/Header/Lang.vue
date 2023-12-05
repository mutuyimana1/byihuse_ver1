<template>
	<div class="lang-menu">
		<v-menu transition="scale-transition" :nudge-width="40">
			<template v-slot:activator="{ on }">
				<v-toolbar-title v-on="on">
					<a v-if="selectedLocale.name" href="javascript:void(0)" class="white--text font-weight-regular">{{selectedLocale.name}}</a>
					<a  v-if="!selectedLocale.name" href="javascript:void(0)" class="white--text font-weight-regular">{{specialLang}}</a>
					<!-- <span id="span">{{specialLang}}</span> -->
					<v-icon dark>arrow_drop_down</v-icon>
				</v-toolbar-title>
			</template>
			<v-list id="button" class="py-0">
				<v-list-item v-for="(language,key) in languages" :key="key" @click="changeLanguage(language)">
					<span id="span">{{language.name}}</span>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>
<style  scoped>
.lang-menu #span{
	font-size: 11px;
}
</style>
<script>
	import { mapGetters } from "vuex";

	export default {
		data() {
			return{
				langPage: '',
				specialLang: ''
			}
		},
		computed: {
			...mapGetters(["selectedLocale", "languages"])
		},
		methods: {
			    changeLanguage(language) {
				this.$i18n.locale = language.locale;
				this.$store.dispatch("changeLanguage", language);
				const rote = this.$route.path.split(`/`)
				let currentRoute = ''
				rote.forEach(el => {
					if (el !== 'en' &&  el !== 'kiny' && el !== 'fr' &&el !== 'kiny' && el !== 'swah' && el !== '') {
						currentRoute = currentRoute + '/' + el
					}
				});
				// console.log(rote, this.$route.path)
				this.langPage = language.lang
				location.assign(`/#/${this.$i18n.locale}${currentRoute}`)
				location.reload(true)
			}
		},
		mounted() {
			if (this.$route.params.lang === 'fr') {
				this.$store.dispatch("changeLanguage", {name: "French", locale: "fr"});
				this.$i18n.locale= 'fr'
			}else if (this.$route.params.lang=== 'en'){
				this.$store.dispatch("changeLanguage", {name: "English", locale: "en"});
				this.$i18n.locale= 'en'
			}else if (this.$route.params.lang==='kiny') {
				this.$store.dispatch("changeLanguage", {name: "Kinyarwanda", locale: "kiny"});
				this.$i18n.locale= 'kiny'
			} else if(this.$route.params.lang==='swah'){
				this.$store.dispatch("changeLanguage", {name: "Swahili", locale: "swah"});
				this.$i18n.locale= 'swah'
			}		
		}
	}
</script>