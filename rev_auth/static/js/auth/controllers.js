
app.controller('UserMenuController', function($scope, UserService) {
	
	$scope.user = {
		'name' : 'Russell B'
	}
	
	function updateUserMenu() {
		$scope.isLoggedIn = UserService.isLoggedIn();
	}
	
	$scope.$on('userStateChanged', updateUserMenu);
});

app.controller('LoginFormController', function($scope, UserService, NotifyService) {
	
	$scope.loading = false;
	$scope.user = {
	    _fields: {
	        username: {
	            field_type: 'TextField',
	            label: 'Username',
	            required: true,
	            minlength: 6,
	            placeholder: 'Username'
	        },
	        password: {
	            field_type: 'PasswordField',
	            label: 'Password',
	            required: true,
	            minlength: 6,
	            placeholder: 'Password'
	        }
	    }
	}
	
	$scope.doLogin = function() {
		if (!$scope.loginForm.$valid) {
			NotifyService.error('Please correct the highlighted fields', 'Login Error');
		}
		else {
			$scope.loading = true;
			UserService.doCredentialsLogin(
				$scope.user.email,
				$scope.user.password
			);
		}
	};
	
});

app.controller('LogoutController', function($scope, UserService) {
	UserService.doLogout();
});