var blog = (function(blog){
	'use strict'

	var data = blog.data = blog.data || {}
	var language = blog.language = blog.language || {}

	data.listMenu = ['Home', 'Category', 'About Me', 'Contact']

	return blog
})(blog || {});

Vue.component('list-menu', {
    template: '#listMenu',
    data: function() {
    	return { menus: blog.data.listMenu }
    }
})

Vue.component('header-component', {
  template: '#headerComponent',
  data: function() {
  	return {
  		menuMobileActive: false
  	}
  },
  methods: {
  	slideToggle: function(state) {
  		
  		if(state) {
  			this.menuMobileActive = false
  		} 
  		else {
  			this.menuMobileActive = true
  		}

  	}
  }
})

//pages
var homeComponent = Vue.component('home-component', {
  template: '#homeComponent'
})

var detailComponent = Vue.component('detail-component', {
  template: '#detailComponent'
})

Vue.component('pagination', {
	template: '#pagination'
})

Vue.component('list-article', {
	props: ['heading'],
	template: '#listArticle'
})

Vue.component('footer-component', {
	template: '#footerComponent'
})


const router = new VueRouter({
    base: '/home',
    /*mode: 'history',*/
    routes: [
        { path: '/', component: homeComponent, props: true },
        { path: '/home', component: homeComponent, props: true },
        { path: '/detail', component: detailComponent, props: true}
    ],
    scrollBehavior (to, from, savedPosition) {
        // return desired position
      alert('test')
    }
})

const app = new Vue({
	router,
	data: {

	},
	methods: {

	}
}).$mount('#app')
