'use strict';

angular.module(config.app.name, ["ngRoute",   'ngCookies', 'Rootscope'])

.config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider) {
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	$httpProvider.defaults.headers.common = {};
	$httpProvider.defaults.headers.post = {};
	$httpProvider.defaults.headers.put = {};
	$httpProvider.defaults.headers.patch = {};
	$routeProvider
	.when('/', {
		templateUrl: 'views/login.html'
	})
	.when('/feed', {
		controller: 'feedController', 
		templateUrl: 'views/feed.html',
		reloadOnSearch: false
	})
	.when('/events', {
		controller: 'eventsController',
		templateUrl: 'views/events.html',
		reloadOnSearch: false
	})
	.when('/add-group', {
		templateUrl: 'views/add-group.html'
	})
	.when('/add-post', {
		controller: "addPostController",
		templateUrl: 'views/add-post.html',
		reloadOnSearch: false
	})
	.when('/add-poll', {
		templateUrl: 'views/add-poll.html'
	})
	.when('/add-event', {
		templateUrl: 'views/add-event.html'
	})
	.when('/profile', {
		templateUrl: 'views/profile.html',
		reloadOnSearch: false
	})
	.when('/photos', {
		templateUrl: 'views/photos.html'
	})
	.when('/people', {
		templateUrl: 'views/people.html'
	})
	.when('/notifications', {
		templateUrl: 'views/all-notifications.html'
	})
	.otherwise({redirectTo: '/'});
}]);
