	// the app module
	var mainApp = angular.module('mainApp', ['ngRoute', 'ngResource']);

	// configured routes
	mainApp.config(function($routeProvider, $httpProvider) {
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
			.when('/hobbies', {
				templateUrl : 'pages/hobbies.html',
				controller  : 'hobbiesController'
			})

			// route for the post articles page
			.when('/blog', {
				templateUrl : 'pages/blog.html',
				controller  : 'blogController'
			})

			// route for the news holder page
			.when('/blog/:id', {
				templateUrl : 'pages/post.html',
				controller  : 'postsController'
			});

	});

	// create the controller and inject Angular's $scope
	mainApp.controller('mainController', function($scope) {
		$scope.$on('$routeChangeStart', function(scope){
			$scope.loading = '';
		});
		$scope.$on('$routeChangeSuccess', function(scope){
			$scope.title = 'Leo Schultz';
			$scope.slogan = 'Silicon Valley Generalist';
			$scope.next = 'work';
			$scope.previous = 'about';
			$scope.loading = 'hidden';
		});
	});

	mainApp.controller('aboutController', function($scope) {
		$scope.$on('$routeChangeStart', function(scope){
			$scope.loading = '';
		});
		$scope.$on('$routeChangeSuccess', function(scope){
			$scope.title = 'about me';
			$scope.color = 'gray';
			$scope.next = 'home';
			$scope.previous = 'blog';
			$scope.loading = 'hidden';
		});
	});

	// mainApp.controller('contactController', function($scope, $http) {
	// 	$scope.title = 'contact me';
	// 	$scope.color = 'gray';
	// 	$scope.result = 'hidden';
	//     $scope.resultMessage;
	//     $scope.formData; //formData is an object holding the name, email, subject, and message
	//     $scope.submitButtonDisabled = false;
	//     $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
	//     $scope.submit = function(contactform) {
	//         $scope.submitted = true;
	//         $scope.submitButtonDisabled = true;
	//         if (contactform.$valid) {
	//             $http({
	//                 method  : 'POST',
	//                 url     : 'contact-form.php',
	//                 data    : $.param($scope.formData),  //param method from jQuery
	//                 headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
	//             }).success(function(data){
	//                 console.log(data);
	//                 if (data.success) { //success comes from the return json object
	//                     $scope.submitButtonDisabled = true;
	//                     $scope.resultMessage = data.message;
	//                     $scope.result='bg-success';
	//                 } else {
	//                     $scope.submitButtonDisabled = false;
	//                     $scope.resultMessage = data.message;
	//                     $scope.result='bg-danger';
	//                 }
	//             });
	//         } else {
	//             $scope.submitButtonDisabled = false;
	//             $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
	//             $scope.result='bg-danger';
	//         }
	//     }
	// });

	mainApp.controller('workController', function($scope) {
		$scope.$on('$routeChangeStart', function(scope){
			$scope.loading = '';
		});
		$scope.$on('$routeChangeSuccess', function(scope){
			$scope.title = 'my work';
			$scope.color = 'gray';
			$scope.next = 'about';
			$scope.previous = 'home';
			$scope.loading = 'hidden';
		});
	});

	mainApp.controller('skillsController', function($scope) {
		$scope.$on('$routeChangeStart', function(scope){
			$scope.loading = '';
		});
		$scope.$on('$routeChangeSuccess', function(scope){
			$scope.title = 'my skills';
			$scope.color = 'gray';
			$scope.loading = 'hidden';
		});
	});

	mainApp.controller('hobbiesController', function($scope) {
		$scope.$on('$routeChangeStart', function(scope){
			$scope.loading = '';
		});
		$scope.$on('$routeChangeSuccess', function(scope){
			$scope.title = 'my hobbies';
			$scope.color = 'gray';
			$scope.loading = 'hidden';
		});
	});

	mainApp.controller('blogController',function($scope,$route,Blog){
		$scope.$on('$routeChangeStart', function(scope){
			$scope.loading = '';
		});
		$scope.$on('$routeChangeSuccess', function(scope){
	        $scope.title = 'my thoughts and life';
	        $scope.description = '';
		    $scope.posts = Blog.query();
		    $scope.loading = 'hidden';
		});
	});

	mainApp.controller('postsController', function($scope,$route,$routeParams,Blog) {
		$scope.$on('$routeChangeStart', function(scope){
			$scope.loading = '';
		});
		$scope.$on('$routeChangeSuccess', function(scope){
			$scope.posts = Blog.get({id:$routeParams.id});
			$scope.key = $routeParams.id;
			$scope.postURL = 'http://www.leoschultz.com/#/blog/' + $routeParams.id;
			console.log($scope.postURL);
		   	$scope.searchFilter = function (post) {
		    var keyword = new RegExp($scope.dataFilter, 'i');
		    	return !$scope.dataFilter || keyword.test(posts.title) || keyword.test(posts.author.displayName) || keyword.test(posts.labels) || keyword.test(posts.content);
			};
			$scope.loading = 'hidden';
		});
	});

	mainApp.factory('Blog',function($resource){
    	return $resource(
    		'https://www.googleapis.com/blogger/v3/blogs/2379160583999582935/posts/?&key=AIzaSyDD_M6lnUlByde6S7NGg0FFLDMER-aBv8Y',
    		{},
      		{query: { method: 'GET', isArray: false }}
    	);
	});

	mainApp.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

    mainApp.directive('dirDisqus', ['$window', function($window) {
        return {
            restrict: 'E',
            scope: {
                disqus_shortname: '@disqusShortname',
                disqus_identifier: '@disqusIdentifier',
                disqus_title: '@disqusTitle',
                disqus_url: '@disqusUrl',
                disqus_category_id: '@disqusCategoryId',
                disqus_disable_mobile: '@disqusDisableMobile',
                readyToBind: "@"
            },
            template: '<div id="disqus_thread"></div><a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>',
            link: function(scope) {

                // ensure that the disqus_identifier and disqus_url are both set, otherwise we will run in to identifier conflicts when using URLs with "#" in them
                // see http://help.disqus.com/customer/portal/articles/662547-why-are-the-same-comments-showing-up-on-multiple-pages-
                if (typeof scope.disqus_identifier === 'undefined' || typeof scope.disqus_url === 'undefined') {
                    throw "Please ensure that the `disqus-identifier` and `disqus-url` attributes are both set.";
                }

                scope.$watch("readyToBind", function(isReady) {

                    // If the directive has been called without the 'ready-to-bind' attribute, we
                    // set the default to "true" so that Disqus will be loaded straight away.
                    if ( !angular.isDefined( isReady ) ) {
                        isReady = "true";
                    }
                    if (scope.$eval(isReady)) {
                        // put the config variables into separate global vars so that the Disqus script can see them
                        $window.disqus_shortname = scope.disqus_shortname;
                        $window.disqus_identifier = scope.disqus_identifier;
                        $window.disqus_title = scope.disqus_title;
                        $window.disqus_url = scope.disqus_url;
                        $window.disqus_category_id = scope.disqus_category_id;
                        $window.disqus_disable_mobile = scope.disqus_disable_mobile;

                        // get the remote Disqus script and insert it into the DOM, but only if it not already loaded (as that will cause warnings)
                        if (!$window.DISQUS) {
                            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                            dsq.src = '//' + scope.disqus_shortname + '.disqus.com/embed.js';
                            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                        } else {
                            $window.DISQUS.reset({
                                reload: true,
                                config: function () {
                                    this.page.identifier = scope.disqus_identifier;
                                    this.page.url = scope.disqus_url;
                                    this.page.title = scope.disqus_title;
                                }
                            });
                        }
                    }
                });
            }
        };
    }]);