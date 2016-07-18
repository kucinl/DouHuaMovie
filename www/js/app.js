// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ngCordova', 'ionic-ratings','tabSlideBox','app.controllers', 'app.routes', 'app.services', 'app.directives'])
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.views.transition('ios');
    $ionicConfigProvider.spinner.icon('bubbles');
 //   $compileProvider.aHrefSanitizationWhitelist(/^\s*(geo|mailto|tel|maps):/);
  })
.run(function($ionicPlatform,$cordovaBadge) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
   // $cordovaPlugin.someFunction().then(success, error);
    if(navigator && navigator.splashscreen) {
      navigator.splashscreen.hide();
    }
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $cordovaBadge.get().then(function(badge) {
      console.log(badge)
    }, function(err) {
      // You do not have permission.
    });
    $cordovaBadge.set(3).then(function() {
      console.log('badge ok')
    }, function(err) {
      console.log('badge no')
      // You do not have permission.
    });
  });
})
