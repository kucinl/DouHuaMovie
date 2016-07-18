angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app', {
        url: '/app',
        views: {
          '': {
            template: '<ion-nav-view name="app"></ion-nav-view>',
            controller: 'appCtrl',
          }
        },
        abstract: true
      })
      .state('app.tabs', {
        url: '/tabs',
        views: {
          'app': {
            templateUrl: 'templates/tabs.html',
            controller: 'tabsCtrl',
          }
        },
        abstract: true
      })

      .state('app.tabs.home', {
        url: '/home',
        views: {
          'movie': {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
          }
        }
      })
      .state('app.tabs.cinema', {
        url: '/cinema',
        views: {
          'cinema': {
            templateUrl: 'templates/cinema.html',
            controller: 'cinemaCtrl'
          }
        }
      })

      .state('app.tabs.my', {
        cache: false,
        url: '/my',
        views: {
          'my': {
            templateUrl: 'templates/my.html',
            controller: 'myCtrl'
          }
        }
      })
      .state('app.tabs.order', {
        cache: false,
        url: '/order',
        views: {
          'my': {
            templateUrl: 'templates/order.html',
            controller: 'orderCtrl'
          }
        }
      })
      .state('app.tabs.order_info', {
        cache: false,
        url: '/order_info',
        views: {
          'my': {
            templateUrl: 'templates/order_info.html',
            controller: 'order_infoCtrl'
          }
        },
        params: {
          'oid': '',
        }
      })
      .state('app.tabs.movie_info', {
        cache: false,
        url: '/movie_info/:index',
        views: {
          'movie': {
            templateUrl: 'templates/movie_info.html',
            controller: 'movie_infoCtrl'
          }
        }
      })
      .state('app.tabs.movie_cinemas', {
        url: '/movie_cinemas/:mid',
        views: {
          'movie': {
            templateUrl: 'templates/movie_cinemas.html',
            controller: 'movie_cinemasCtrl'
          }
        }
      })
      .state('app.tabs.movie_cinemas3', {
        url: '/movie_cinemas3/:mid',
        views: {
          'my': {
            templateUrl: 'templates/movie_cinemas.html',
            controller: 'movie_cinemasCtrl'
          }
        }
      })
      .state('app.tabs.cinema_info1', {
        url: '/cinema_info1/:cid/:mid',
        views: {
          'movie': {
            templateUrl: 'templates/cinema_info.html',
            controller: 'cinema_infoCtrl'
          },
        }
      })
      .state('app.tabs.cinema_info2', {
        url: '/cinema_info2/:cid/:mid',
        views: {
          'cinema': {
            templateUrl: 'templates/cinema_info.html',
            controller: 'cinema_infoCtrl'
          },
        }
      })
      .state('app.tabs.cinema_info3', {
        url: '/cinema_info3/:cid/:mid',
        views: {
          'my': {
            templateUrl: 'templates/cinema_info.html',
            controller: 'cinema_infoCtrl'
          },
        }
      })
      .state('app.tabs.selectseat1', {
        url: '/selectseat1',
        views: {
          'movie': {
            templateUrl: 'templates/selectseat.html',
            controller: 'selectseatCtrl',
          }
        },
        params: {
          'cmsid': '',
          'date': '',
          'title': '选座购票',
          cinemaname: '',
          address: ''
        }
      })
      .state('app.tabs.selectseat2', {
        url: '/selectseat2',
        views: {
          'cinema': {
            templateUrl: 'templates/selectseat.html',
            controller: 'selectseatCtrl',
          }
        },
        params: {
          'cmsid': '',
          'date': '',
          'title': '选座购票',
          cinemaname: '',
          address: ''
        }
      })
      .state('app.tabs.selectseat3', {
        url: '/selectseat3',
        views: {
          'my': {
            templateUrl: 'templates/selectseat.html',
            controller: 'selectseatCtrl',
          }
        },
        params: {
          'cmsid': '',
          'date': '',
          'title': '选座购票',
          cinemaname: '',
          address: ''
        }
      })
      .state('app.tabs.comment', {
        url: '/comment',
        views: {
          'movie': {
            templateUrl: 'templates/comment.html',
            controller: 'commentCtrl'
          }
        },
        params: {
          'mid': '',
          'moviename': '',
        }
      })
      .state('app.tabs.my_comment', {
        cache: false,
        url: '/my_comment',
        views: {
          'my': {
            templateUrl: 'templates/my_comment.html',
            controller: 'myCommentCtrl'
          }
        }
      })
      .state('app.tabs.my_collect', {
        cache: false,
        url: '/my_collect',
        views: {
          'my': {
            templateUrl: 'templates/my_collect.html',
            controller: 'myCollectCtrl'
          }
        }
      })
      .state('app.tabs.setting', {
        cache: false,
        url: '/setting',
        views: {
          'my': {
            templateUrl: 'templates/setting.html',
            controller: 'settingCtrl'
          }
        }
      })
      .state('app.tabs.my_wallet', {
        cache: false,
        url: '/my_wallet',
        views: {
          'my': {
            templateUrl: 'templates/my_wallet.html',
            controller: 'myWallettCtrl'
          }
        }
      })
      .state('app.tabs.change_logpass', {
        url: '/change_logpass',
        views: {
          'my': {
            templateUrl: 'templates/change_logpass.html',
            controller: 'cLogpassCtrl'
          }
        }
      })
      .state('app.tabs.change_paypass', {
        url: '/change_paypass',
        views: {
          'my': {
            templateUrl: 'templates/change_paypass.html',
            controller: 'cPaypassCtrl'
          }
        }
      })
    $urlRouterProvider.otherwise('app/tabs/home')


  });
