<template>
	<div class="emb-subscribe-wrap section-gap">
		<v-container grid-list-xl py-0>
			<v-layout row wrap align-center justify-space-between >
				<v-flex xs12 sm12 md12 lg12 xl12>
					<div class="subscribe-content">
						<div>
							<h3 class="white--text">
								{{$t(heading)}}
							</h3>
						</div>
					</div>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	export default {
		// props:['heading','description'],
		data () {
			return{
				email: '',
				emailRules: [
					v => /.+@.+/.test(v) || 'E-mail must be valid'
				],
				heading:"message.heading",
				description:"message.description"
			}
		}
	}
</script>

