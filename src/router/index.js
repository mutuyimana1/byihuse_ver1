import Vue from 'vue'
import Router from 'vue-router'

import userRoutes from './user';
const NotFound = () => import('Views/NotFound.vue');

Vue.use(Router)

export default new Router({
	// mode: 'history',
	routes: [
		{
			path:'/',
			// component:
			redirect: '/en/home'
		},
		{
			path:'/:lang',
			component: {
				render(c){return c('router-view')}
			},
			children:[
			userRoutes,
		    { 
			path: '*',
			component: NotFound, 
			name:'NotFound'
		    },
			
	]
	}
		
	]
})

