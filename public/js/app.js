var blog = (function(blog){
	'use strict'

	var data = blog.data = blog.data || {}
	var language = blog.language = blog.language || {}

  data.listMenu = [
    {text: 'Home', path: '/home'},
    {text: 'Category', path: '/category'},
    {text: 'About Me', path: '/aboutme'},
    {text: 'Contact', path: '/contact'}
  ]
	return blog
})(blog || {});

Vue.component('list-menu', {
    props: ['state'],
    template: '#listMenu',
    data: function() {
    	return { menus: blog.data.listMenu }
    },
    methods: {
        tickToggle: function(state) {
          this.$emit('slidetoggle', state)
        }
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
  template: '#homeComponent',
  data: function() {

    return {
      latestNews: []
    }
  },
  created: function() {
    this.$http.get('/get_latest_article_by_limit/5').then(function (response) {
      this.latestNews = response.data;
    }, function (error) {
        // handle error
    })
    .catch( function(error) { 
      console.error(error); 
    });

  },
  methods: {
    dateToMdY: function(date) {
      var datetime = new Date(date);
      var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];

      var day = datetime.getDate();
      var monthIndex = datetime.getMonth();
      var year = datetime.getFullYear();

      return  monthNames[monthIndex] + ' ' + day + ', ' + year;
    }
  }
})

var detailComponent = Vue.component('detail-component', {
  template: '#detailComponent',
  data: function() {
    return {
      id_article: null,
      article: []
    }
  },
  created: function() {
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function() {
      this.id_article = this.$route.params.id
      this.$http.get('/get_article_by_id/' + this.id_article).then(function (response) {
        this.article = response.data
      }, function (error) {
          // handle error
      })
      .catch( function(error) { 
        console.error(error); 
      });
    },
    dateToMdY: function(date) {
      var datetime = new Date(date);
      var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];

      var day = datetime.getDate();
      var monthIndex = datetime.getMonth();
      var year = datetime.getFullYear();

      return  monthNames[monthIndex] + ' ' + day + ', ' + year;
    }
  }
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
    mode: 'history',
    routes: [
        { path: '/', component: homeComponent, props: true },
        { path: '/home', component: homeComponent, props: true },
        { path: '/detail/:id', component: detailComponent, props: true}
    ],
    scrollBehavior (to, from, savedPosition) {
        // return desired position
      window.scrollTo(0,0)
    }
})

const vm = new Vue({
	router,
	data: {
    loading: false,
    post: null,
    error: null
	},
	methods: {
    fetchData: function() {
      this.error = this.post = null
      this.loading = true
    }
	},
  created: function() {
    this.fetchData()
  }
}).$mount('#app')
