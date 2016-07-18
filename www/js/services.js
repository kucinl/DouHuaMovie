angular.module('app.services', [])
  .value('baseUrl','https://yc.thirdyear.xyz:8443')//https://yc.thirdyear.xyz:8443
  .factory('Movie', function($http,baseUrl) {
    var _movies = [];
   // var baseUrl = 'https://10.180.81.234'
    return {
      getMovies: function() {
        var req = {
          method: 'GET',
          url: baseUrl+'/movies',
          timeout:10000
        }
        return $http(req);
      },
      setMovies: function(movies){
        _movies = movies;
      },
      getMovieByIndex: function(index){
        return _movies[index];
      },
      getMovieByMid: function(mid){
        for(var i in _movies){
          if(_movies[i].mid == mid){
            return _movies[i];
          }
        }
        return null;
      },
      getIndexByMid: function(mid){
        for(var i in _movies){
          if(_movies[i].mid == mid){
            return i;
          }
        }
        return -1;
      },
      getMovie: function(mid){
        var req = {
          method: 'GET',
          url: baseUrl+'/movies/'+mid,
        }
        return $http(req);
      },
      getCinemasOfMovie: function(mid) {
        var req = {
          method: 'GET',
          url: baseUrl+'/movies/'+mid+'/cinemas',
          timeout:10000
        }
        return $http(req);
      },
      getSessionsOfMovie: function(mid,cid) {
        var req = {
          method: 'GET',
          url: baseUrl+'/movies/'+mid+'/cinemas/'+cid,
        }
        return $http(req);
      },
      getSeatsOfMovie:function(cmsid,date) {//得到的是已被购买的列表
        var req = {
          method: 'GET',
          url: baseUrl+'/cms/'+cmsid,
          headers:{
            'dd': date//'yyyy-mm-dd'
          }
        }
        return $http(req);
      },
      payForOrder: function(token,order) {
        var req = {
          method: 'POST',
          url: baseUrl+'/order',
          headers:{
            'token':token,
          },
          data :order,
          timeout:10000
        }
        return $http(req);
      },
    }
  })
  .factory('Cinema', function($http,baseUrl) {
    var _cinemas = [];
    return {
      getCinemas: function() {
        var req = {
          method: 'GET',
          url: baseUrl+'/cinemas',
          timeout:10000
        }
        return $http(req);
      },
      setCinemas: function(cinemas){
        _cinemas = cinemas;
      },
	  addCinemas: function(cinemas){
		for(var i in cinemas){
          if(_cinemas.indexOf(cinemas[i]) == -1){
            _cinemas.push(cinemas[i])
          }
        }
      },
      getCinemaByIndex: function(index){
        return _cinemas[index];
      },
      getCinemaByCid: function(cid){
        for(var i in _cinemas){
          if(_cinemas[i].cid == cid){
            return _cinemas[i];
          }
        }
        return null;
      },
      getMoviesOfCinema: function(cid) {
        var req = {
          method: 'GET',
          url: baseUrl+'/movies/cinemas/'+cid,
        }
        return $http(req);
      }
    }
  })
  .factory('Order', function($http,baseUrl) {
    var _orders = [];
    return {
      getOrders: function(token) {
        var req = {
          method: 'GET',
          url: baseUrl+'/myorders',
          headers:{
            'token':token,
          },
        }
        return $http(req);
      },
      setOrders: function(orders){
        _orders = orders;
      },
      getOrderByIndex: function(index){
        return _orders[index];
      },
      getOrder: function(oid,token) {
        var req = {
          method: 'GET',
          url: baseUrl+'/myorders/'+oid,
           headers:{
            'token':token,
          },
        }
        return $http(req);
      }
    }
  })
  .factory('Collection', function($http,baseUrl) {
    var _collections = [];
    return {
      getCollections: function(token) {
        var req = {
          method: 'GET',
          url: baseUrl+'/myfavorites',
          headers:{
            'token':token,
          },
        }
        return $http(req);
      },
      setCollections: function(collections){
        _collections = collections;
      },
      getCollectionByIndex: function(index){
        return _collections[index];
      },
      addCollection: function(token,mid) {
        var req = {
          method: 'POST',
          url: baseUrl+'/myfavorites',
          headers:{
            'token':token,
          },
          data:{
            'mid':mid
          }
        }
        return $http(req);
      },
      deleteCollection: function(token,mid) {
        var req = {
          method: 'GET',
          url: baseUrl+'/myfavorites/delete/'+mid,
          headers:{
            'token':token,
          }
        }
        return $http(req);
      }
    }
  })
  .factory('Comment', function($http,baseUrl) {
    var _comments = [];
    return {
      getComments: function(token) {
        var req = {
          method: 'GET',
          url: baseUrl+'/mycomments',
          headers:{
            'token':token,
          },
        }
        return $http(req);
      },
      setComments: function(comments){
        _comments = comments;
      },
      getCommentByIndex: function(index){
        return _comments[index];
      },
      addComment: function(token,mid,content,rating) {
        var req = {
          method: 'POST',
          url: baseUrl+'/mycomments',
          data:{
            'mid':mid,
            'content':content,
            'rating':rating
          },
          headers:{
            'token':token,
          },
        }
        return $http(req);
      },
      deleteComment: function(token,commentid) {
        var req = {
          method: 'GET',
          url: baseUrl+'/mycomments/delete/'+commentid,
          headers:{
            'token':token,
          }
        }
        return $http(req);
      }
    }
  })
  .factory('Auth', function($http,baseUrl) {
    return {
      login: function(account,pwd) {
        var req = {
          method: 'POST',
          url: baseUrl+'/login',
          data :{
            username:account,
            password:pwd
          }
        }
        return $http(req);
      },
      register: function(signupForm) {
        var req = {
          method: 'POST',
          url: baseUrl+'/register',
          data :signupForm
        }
        return $http(req);
      },
      checkLogin: function(token) {
        var req = {
          method: 'GET',
          url: baseUrl+'/token',
          headers : {
            token:token
          }
        }
        return $http(req);
      },
      logout: function(token) {
        var req = {
          method: 'GET',
          url: baseUrl+'/logout',
          headers : {
            token:token
          }
        }
        return $http(req);//json{ Result(“Success”, null) }..
      },
      pwdChange: function(token,oldpwd,newpwd,newpwdConfirm) {
        var req = {
          method: 'POST',
          url: baseUrl+'/password',
          data :{
            "oldpwd":oldpwd,
            "newpwd":newpwd,
            "newpwdConfirm":newpwdConfirm
          },
          headers : {
            token:token
          }
        }
        return $http(req);
      },
      payPwdChange: function(token,oldpwd,newpwd,newpwdConfirm) {
        var req = {
          method: 'POST',
          url: baseUrl+'/paypwd',
          data :{
            "oldpwd":oldpwd,
            "newpwd":newpwd,
            "newpwdConfirm":newpwdConfirm
          },
          headers : {
            token:token
          }
        }
        return $http(req);
      },
    }
  })
  .factory('AlertPopup', function ($ionicPopup) {
    return function (title, template,type) {
      var popup = $ionicPopup.alert({
        title: title || 'Uh oh!',
        template: template || 'Something went wrong!',
        okType: type || 'button-energized',
      });
      return popup;
    };
  })
.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);

