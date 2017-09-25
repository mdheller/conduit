/* The UserService pulls the information for the current user*/
angular.module('conduit.services').factory('UserService', function($http, $window) { 
	
	var query = $window.location.search.substring(1);
	var params = JSON.parse('{"' + decodeURI(query)
									.replace(/"/g, '\\"')
									.replace(/&/g, '","')
									.replace(/=/g, '":"')
							+ '"}');

	var user = $http.get('/userInfo?code=' + params.code).then(function(response) {
			return response.data;
	});
	
    var getUser = function() {
	    return user;
	};
	
	return {
		getUser: getUser
	};
});