module.exports = {
	router: {
		// linkActiveClass:'active',
		extendRoutes(routes, resolve) {
			routes.splice(0);
			routes.push({
				path: '/',
				component: resolve(__dirname, 'pages/layout'),
				children: [
					{
						path: '',
						name: 'home',
						component:resolve(__dirname,'pages/home')
					},
					{
						path: '/login',
						name: 'login',
						component:resolve(__dirname,'pages/login')
					},
					{
						path: '/register',
						name: 'register',
						component:resolve(__dirname,'pages/login')
					},
					{
						path: '/profile/:username',
						name: 'profile',
						component:resolve(__dirname,'pages/profile')
					},
					{
						path: '/setting',
						name: 'setting',
						component:resolve(__dirname,'pages/setting')
					},
					{
						path: '/editor/:slug?',
						name: 'editor',
						component:resolve(__dirname,'pages/editor')
					},
					{
						path: '/article/:slug',
						name: 'article',
						component:resolve(__dirname,'pages/article')
					},
				]
			})
		}
	},

	server: {
    host: '0.0.0.0',
    port: 80
	},
	plugins: [
		'./plugins/request.js',
		'./plugins/date.js',
	]
}