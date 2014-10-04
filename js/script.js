	// the app module
	var mainApp = angular.module('mainApp', ['ngRoute']);

	// configured routes
	mainApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			})

			// route for the work page
			.when('/work', {
				templateUrl : 'pages/work.html',
				controller  : 'workController'
			})

			// route for the skills page
			.when('/skills', {
				templateUrl : 'pages/skills.html',
				controller  : 'skillsController'
			})

			// route for the experience page
			.when('/experience', {
				templateUrl : 'pages/experience.html',
				controller  : 'experienceController'
			})

			// route for the post articles page
			.when('/post', {
				templateUrl : 'pages/post.html',
				controller  : 'postController'
			})

			// route for the news holder page
			.when('/news', {
				templateUrl : 'pages/news.html',
				controller  : 'newsController'
			})

			// route for the news article page
			.when('/article-:postId', {
				templateUrl : 'pages/article.html',
				controller  : 'articleController'
			});

	});

	// create the controller and inject Angular's $scope
	mainApp.controller('mainController', function($scope) {
		// create a title to display in our view
		$scope.title = 'welcome';
		$scope.color = 'red';
	});

	mainApp.controller('aboutController', function($scope) {
		$scope.title = 'about me';
		$scope.color = 'gray';
	});

	mainApp.controller('contactController', function($scope, $http) {
		$scope.title = 'contact me';
		$scope.color = 'gray';
		$scope.result = 'hidden'
	    $scope.resultMessage;
	    $scope.formData; //formData is an object holding the name, email, subject, and message
	    $scope.submitButtonDisabled = false;
	    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
	    $scope.submit = function(contactform) {
	        $scope.submitted = true;
	        $scope.submitButtonDisabled = true;
	        if (contactform.$valid) {
	            $http({
	                method  : 'POST',
	                url     : 'contact-form.php',
	                data    : $.param($scope.formData),  //param method from jQuery
	                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
	            }).success(function(data){
	                console.log(data);
	                if (data.success) { //success comes from the return json object
	                    $scope.submitButtonDisabled = true;
	                    $scope.resultMessage = data.message;
	                    $scope.result='bg-success';
	                } else {
	                    $scope.submitButtonDisabled = false;
	                    $scope.resultMessage = data.message;
	                    $scope.result='bg-danger';
	                }
	            });
	        } else {
	            $scope.submitButtonDisabled = false;
	            $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
	            $scope.result='bg-danger';
	        }
	    }
	});

	mainApp.controller('workController', function($scope) {
		$scope.title = 'my work';
		$scope.color = 'gray';
	});

	mainApp.controller('skillsController', function($scope) {
		$scope.title = 'my skills';
		$scope.color = 'gray';
	});

	mainApp.controller('experienceController', function($scope) {
		$scope.title = 'my experiance';
		$scope.color = 'gray';
	});

	mainApp.controller('postController', function($scope) {
		$scope.title = 'my posts';
		$scope.color = 'gray';
		$scope.postForm = function(postData){
        var data = $scope.post;
        $http.post(url, data);        
    	}
	});

	mainApp.controller('newsController', function($scope, blogAPIget) {
		$scope.title = 'my thoughts and life';
		$scope.typeFilter = null;
		$scope.articleList = [];
		blogAPIget.getPosts().success(function (response){
			$scope.articleList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
		});
		// $scope.articleList = [
		// {Article: {id: 1,title: 'Why Millenials shouldn\'t accept corporate america',author: 'Leo Schultz',date: 'September 10th 2014', type: 'business'}},
		// {Article: {id: 2,title: '25 things I will never understand about feminism',author: 'Leo Schultz',date: 'September 14th 2011', type: 'culture'}},
		// {Article: {id: 3,title: 'What the popping of the mobile bubble with look like.',author: 'Leo Schultz',date: 'January 12th 2014', type: 'business'}},
		// {Article: {id: 4,title: 'My week mentoring GSBI social ventures',author: 'Leo Schultz',date: 'June 24th 2013', type: 'news'}},
		// {Article: {id: 5,title: 'Libertarian = American',author: 'Leo Schultz',date: 'April 2nd 2012', type: 'politics'}},
		// {Article: {id: 6,title: 'The line between confident and cocky',author: 'Leo Schultz',date: 'May 30th 2013', type: 'culture'}},
		// {Article: {id: 7,title: 'The role of material sciences in future technology',author: 'Leo Schultz',date: 'May 30th 2013', type: 'technology'}},
		// ];
	});

	mainApp.controller('articleController', function($scope, $routeParams) {
		$scope.title = 'example article';
		$scope.color = 'gray';
		$scope.post_id = $routeParams.postId;
	});

	mainApp.factory('blogAPIget', function($http){
	var blogAPI = {};
    blogAPI.getPosts = function() {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
      });
    }
    return blogAPI;
	});