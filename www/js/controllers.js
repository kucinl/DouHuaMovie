angular.module('app.controllers', [])
  .controller('appCtrl', function ($scope, $ionicModal, AlertPopup, $http, $cordovaCamera, $cordovaBarcodeScanner, $ionicNavBarDelegate, $ionicHistory, Auth) {
    $scope.user = {
      username: 'ye',
      name: '',
      token: '-1'
    };
    $scope.loginForm = {
      username: 'shuaigesuo',
      password: 'aa123456',
    };
    $scope.signForm = {
      username: 'lzslzs',
      name: '上哥',
      password: '123456l',
      passwordConfirm: '123456l',
      email: '961635991@qq.com',
      paypwd: '123456lzs',
      paypwdConfirm: '123456lzs',
      bankcardnum: '6228481552887309119',
      bankcardpaypwd: '123456',
      bankcardname: '林正上',
      bankcardsfz: '330382199504150067',
      bankcardtel: '15099385716'
    }
    $scope.img = {
      noLogin: 'img/no_login.jpg',
      defaultAvatar: 'img/logo.png'
    };
    $scope.selection = '登录';
    $ionicModal.fromTemplateUrl('templates/login-modal.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.loginModal = modal;
    });
    $scope.login = function () {
      Auth.login($scope.loginForm.username, $scope.loginForm.password).then(function (res) {
        if (res.headers('token') == '-1') {
          new AlertPopup('登录失败', '请确认您的账号和密码没有错误')
        } else {
          $scope.user.username = $scope.loginForm.username, $scope.user.name = res.data.obj.name;
          $scope.user.headimg = res.data.obj.headimg;
          $scope.user.token = res.headers('token');
          $scope.user.bankcard = res.data.obj.bankcard;
          $scope.loginModal.hide();
        }
      }, function (data) {
        new AlertPopup('登录失败', '请检查您的网络状况')
      })
    }
    $scope.signup = function () {
      Auth.register($scope.signForm).then(function (res) {
        var error = res.data.obj;
        if (res.data.result == "Invalid register info") { //不要用！==
          var errorMessages = '';
          for (var i in error) {
            errorMessages += i + ': ' + error[i] + '<br>';
          }
          new AlertPopup('注册失败', errorMessages);
        } else {
          Auth.login($scope.signForm.username, $scope.signForm.password).then(function (res) {
            if (res.headers('token') == '-1') {
              new AlertPopup('登录失败', '注册成功，但在登陆的时候出了错')
            } else {
              $scope.user.username = $scope.signForm.username,
                $scope.user.name = res.data.obj.name;
              $scope.user.headimg = res.data.obj.headimg;
              $scope.user.token = res.headers('token');
              $scope.loginModal.hide();
              new AlertPopup('注册成功', '恭喜您已经注册成功并顺利绑定银行卡！');
            }
          }, function (data) {
            new AlertPopup('登录失败', '注册成功，但在登陆的时候出了错')
          })
        }
      }, function (data) {
        new AlertPopup('注册失败', '服务器提了一个问题')
      })
    }
    $scope.scanner = function () {
      $cordovaBarcodeScanner
        .scan()
        .then(function (barcodeData) {

        }, function (error) {

        });

      $cordovaBarcodeScanner
        .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
        .then(function (success) {

        }, function (error) {
          // An error occurred
        });
    }
    $scope.goBack = function () {
      window.history.back();
    }
  })
  .controller('tabsCtrl', function ($scope, $rootScope, $state, $ionicTabsDelegate) {
    $ionicTabsDelegate.showBar(true);
    $rootScope.$on('$ionicView.beforeEnter', function () {
      var statename = $state.current.name;
      //tabs中存在的主页面不需要隐藏，hidetabs=false
      if (statename === 'app.tabs.home' || statename === 'app.tabs.cinema' || statename === 'app.tabs.my') {
        $ionicTabsDelegate.showBar(true);
      } else {
        $ionicTabsDelegate.showBar(false);
      }
    });
  })
  .controller('homeCtrl', function ($scope, $ionicLoading, AlertPopup, $http, Movie) {
    $scope.hv = {
      showError: false
    }
    $ionicLoading.show({
      scope: $scope,
      template: '<ion-spinner icon="bubbles"></ion-spinner>',
    }).then(function () {
      Movie.getMovies().then(function (res) {
        var movies = res.data.obj;
        Movie.setMovies(movies);
        $scope.hv.mmess = movies;
        $scope.hv.showError = false;
        $ionicLoading.hide();
      }, function () {
        $scope.hv.showError = true;
        $ionicLoading.hide();
      })
    });
    $scope.hv = {
      mmess: [],
      ads: [{
        src: 'img/ad/1.jpg'
      }, {
        src: 'img/ad/3.jpg'
      }, {
        src: 'img/ad/4.jpg'
      }]
    };
    $scope.doRefresh = function () {
      Movie.getMovies().then(function (res) {
        var movies = res.data.obj;
        Movie.setMovies(movies);
        $scope.hv.mmess = movies;
        $scope.hv.showError = false;
        $scope.$broadcast('scroll.refreshComplete');
      }, function () {
        $scope.hv.showError = true;
        $scope.$broadcast('scroll.refreshComplete');
      })
    };
    $scope.reTry = function () {
      $ionicLoading.show({
        scope: $scope,
        template: '<ion-spinner icon="bubbles"></ion-spinner>',
      }).then(function () {
        Movie.getMovies().then(function (res) {
          var movies = res.data.obj;
          Movie.setMovies(movies);
          $scope.hv.mmess = movies;
          $scope.hv.showError = false;
          $ionicLoading.hide();
        }, function () {
          $scope.hv.showError = true;
          $ionicLoading.hide();
        })
      })
    };
  })

.controller('cinemaCtrl', function ($scope, $http, $ionicLoading, Cinema, AlertPopup) {

    $ionicLoading.show({
      scope: $scope,
      template: '<ion-spinner icon="bubbles"></ion-spinner>',
    }).then(function () {
      Cinema.getCinemas().then(function (res) {
        var cinemas = res.data.obj;
        if (cinemas !== null) {
          $scope.cv.showError = false;
          $scope.cv.cinemas = cinemas;
          Cinema.addCinemas(cinemas);
          $ionicLoading.hide();
        } else {
          //     $scope.cv.showError = false;
          $ionicLoading.hide();
        }
      }, function (res) {
        $scope.cv.showError = true;
        $ionicLoading.hide();
      })
    });
    $scope.cv = {
      ads: [{
        src: 'img/ad/5.jpg'
      }, {
        src: 'img/ad/6.jpg'
      }, {
        src: 'img/ad/7.jpg'
      }],
      cinemas: []
    }
    $scope.doRefresh = function () {
      Cinema.getCinemas().then(function (res) {
        var cinemas = res.data.obj;
        //     Movie.setMovies(movies);
        Cinema.addCinemas(cinemas);
        $scope.cv.cinemas = cinemas;
        $scope.cv.showError = false;
        $scope.$broadcast('scroll.refreshComplete');
      }, function () {
        $scope.cv.showError = true;
        $scope.$broadcast('scroll.refreshComplete');
      })
    };
    $scope.reTry = function () {
      $ionicLoading.show({
        scope: $scope,
        template: '<ion-spinner icon="bubbles"></ion-spinner>',
      }).then(function () {
        Cinema.getCinemas().then(function (res) {
          var cinemas = res.data.obj;
          if (cinemas !== null) {
            $scope.cv.showError = false;
            $ionicLoading.hide();
            Cinema.addCinemas(cinemas);
            $scope.cv.cinemas = cinemas;
          } else {
            //     $scope.hv.showError = false;
            $scope.cv.showError = false;
            $ionicLoading.hide();
          }
        }, function (res) {
          $scope.cv.showError = true;
          $ionicLoading.hide();
        })
      })
    };
  })
  .controller('movie_cinemasCtrl', function ($scope, $http, $state,$stateParams, $ionicLoading, Cinema, Movie, AlertPopup) {
    $scope.mid = $stateParams.mid;
    $scope.movie = Movie.getMovieByMid($scope.mid);
    $scope.title = $scope.movie.moviename;
    $ionicLoading.show({
      scope: $scope,
      template: '<ion-spinner icon="bubbles"></ion-spinner>',
    }).then(function () {
      Movie.getCinemasOfMovie($scope.mid).then(function (res) {
        var cinemas = res.data.obj;
        if (cinemas !== null) {
          $scope.mcv.showError = false;
          $scope.mcv.cinemas = cinemas;
          Cinema.addCinemas(cinemas);
          $ionicLoading.hide();
        } else {
          //     $scope.cv.showError = false;
          $ionicLoading.hide();
        }
      }, function (res) {
        $scope.mcv.showError = true;
        $ionicLoading.hide();
      })
    });
    $scope.mcv = {
      ads: [{
        src: 'img/ad/5.jpg'
      }, {
        src: 'img/ad/6.jpg'
      }, {
        src: 'img/ad/7.jpg'
      }],
      cinemas: []
    }
    $scope.doRefresh = function () {
      Cinema.getCinemas().then(function (res) {
        var cinemas = res.data.obj;
        Cinema.addCinemas(cinemas);
        $scope.mcv.cinemas = cinemas;
        $scope.mcv.showError = false;
        $scope.$broadcast('scroll.refreshComplete');
      }, function () {
        $scope.mcv.showError = true;
        $scope.$broadcast('scroll.refreshComplete');
      })
    };
    $scope.reTry = function () {
      $ionicLoading.show({
        scope: $scope,
        template: '<ion-spinner icon="bubbles"></ion-spinner>',
      }).then(function () {
        Cinema.getCinemas().then(function (res) {
          var cinemas = res.data.obj;
          if (cinemas !== null) {
            $scope.mcv.showError = false;
            $ionicLoading.hide();
            Cinema.addCinemas(cinemas);
            $scope.mcv.cinemas = cinemas;
          } else {
            //     $scope.hv.showError = false;
            $scope.mcv.showError = false;
            $ionicLoading.hide();
          }
        }, function (res) {
          $scope.mcv.showError = true;
          $ionicLoading.hide();
        })
      })
    };
    $scope.gotoCinemaInfo = function(cid,mid){
      var params = {
        'cid':cid,
        'mid':mid
      }
      if ($state.current.name == "app.tabs.movie_cinemas") {
        $state.go('app.tabs.cinema_info1', params);
      } else{
        $state.go('app.tabs.cinema_info3', params);
      }
    }
  })
  .controller('myCtrl', function ($scope, $state, AlertPopup) {
    $scope.gotoCollect = function () {
      if ($scope.user.token == '-1') {
        $scope.loginModal.show()
      } else {
        $state.go('app.tabs.my_collect');
      }
    }
    $scope.gotoComment = function () {
      if ($scope.user.token == '-1') {
        $scope.loginModal.show()
      } else {
        $state.go('app.tabs.my_comment');
      }
    }
    $scope.gotoOrder = function () {
      if ($scope.user.token == '-1') {
        $scope.loginModal.show()
      } else {
        $state.go('app.tabs.order');
      }
    }
    $scope.gotoWallet = function () {
      if ($scope.user.token == '-1') {
        $scope.loginModal.show()
      } else {
        $state.go('app.tabs.my_wallet');
      }
    }
    $scope.gotoSetting = function () {
      if ($scope.user.token == '-1') {
        $scope.loginModal.show()
      } else {
        $state.go('app.tabs.setting');
      }
    }
    $scope.gotoUndo = function () {
      new AlertPopup('十分抱歉', '此功能尚未开放');
    }
  })
  .controller('orderCtrl', function ($scope, $state, Order) {
    Order.getOrders($scope.user.token).then(function (res) {
      console.log(res.data)
      $scope.orders = res.data.obj;
    });
    $scope.gotoOrderInfo = function (oid) {
      $state.go('app.tabs.order_info', {
        oid: oid
      });
    }
  })
  .controller('order_infoCtrl', function ($scope, $state, Order) {
    console.log($state.params.oid)
    Order.getOrder($state.params.oid, $scope.user.token).then(function (res) {
      console.log(res.data)
      $scope.order = res.data.obj;
    });
  })
  .controller('movie_infoCtrl', function ($scope,$state, $stateParams, AlertPopup, Movie, Collection) {
    var index = $stateParams.index;
    $scope.mv = {
      mmes: {
        img: 'img/movie/Enders_Game.jpg',
        moviename: 'Enders_Game',
        intro: '游戏接好啊但是客服哈开始的发呆思考互打法上飞机啦数据分类考试的肌肤善良的风景阿拉山口减肥啦是肯德基;粉啦空间划分来稻盛和夫看见阿里回复阿卡看到手机话费卡和弗兰克精神焕发镂空设计的手动封口机哈萨克分',
        mbroad: '今天128家影院放映12312场',
        rating: '8.8',
        actor: {
          role: '导演',
          name: 'sss',
          img: 'img/movie/阿沙巴特菲尔.jpg',
          intro: ''
        }
      },
      comments: []
    }
    $scope.mv.mmes = Movie.getMovieByIndex(index);
    $scope.mv.mmes.aimgs = $scope.mv.mmes.aimg.split(';');
    Movie.getMovie($scope.mv.mmes.mid).then(function (res) {
      $scope.mv.comments = res.data.obj.comments;
      console.log($scope.mv.comments)
    })
    $scope.gotoAddComment = function(mid,moviename){
      $state.go('app.tabs.comment',{mid:mid,moviename:moviename})
    }
    $scope.collect = function () {
      Collection.addCollection($scope.user.token, $scope.mv.mmes.mid).then(function (res) {
        if (res.data.result == "Invalid token") {
          //  new AlertPopup('收藏失败','您还没有登陆');
          $scope.loginModal.show();
        } else {
          if (res.data.obj == "Already have") {
            new AlertPopup('收藏失败', '您已收藏此电影');
          } else if (res.data.obj == "Success") {
            new AlertPopup('收藏成功', '恭喜！', 'button-balanced');
          } else {
            new AlertPopup('收藏失败', '未知错误');
          }
        }
      })
    }

  })
  .controller('cinema_infoCtrl', function ($scope, $stateParams, $state, $timeout, $ionicScrollDelegate, $ionicSlideBoxDelegate, Cinema, Movie) {
    var cid = $stateParams.cid;
    var mid = $stateParams.mid;
    $scope.cinema = Cinema.getCinemaByCid(cid);
    Cinema.getMoviesOfCinema($stateParams.cid).then(function (res) {
      var movies = res.data.obj;
      $scope.movies = movies;
      $ionicSlideBoxDelegate.update();
      if (movies) {
        if (mid != '-1') {
          $scope.movie_index = Movie.getIndexByMid(mid);
        } else {
          $scope.movie_index = parseInt(movies.length / 2);
        }
        Movie.getSessionsOfMovie($scope.movies[$scope.movie_index].mid,$stateParams.cid).then(function (res) {
          $scope.sessionList = res.data.obj;
          var today = Date.now();
          $scope.dates.push(today); //$filter('date')(today, 'MM月dd号')
          $scope.dates.push(today + 86400000);
          $scope.dates.push(today + 86400000 * 2);
        })
      }
    })
    $scope.dates = [];
    $scope.ch = 0;

    $scope.civ = {
      movie: "img/ad/6.jpg",
    }
    $scope.scrollDate = function (k) {
      $scope.ch = k;
      $ionicScrollDelegate.$getByHandle('dateScroll').scrollTo(120 * (k - 1), 0, true);
    }
    $scope.changeIndex = function (index) {
      $scope.movie_index = index;
      Movie.getSessionsOfMovie($scope.movies[$scope.movie_index].mid, $stateParams.cid).then(function (res) {
        $scope.sessionList = res.data.obj;
      })
    }
    $scope.goFront = function () {
      if ($scope.movie_index > 0) {
        $ionicSlideBoxDelegate.previous()
        $scope.movie_index--;
        Movie.getSessionsOfMovie($scope.movies[$scope.movie_index].mid, $stateParams.cid).then(function (res) {
          $scope.sessionList = res.data.obj;
         
        })
      }
    }
    $scope.goBehind = function () {
      if ($scope.movie_index < $scope.movies.length) {
        $ionicSlideBoxDelegate.next()
        $scope.movie_index++;
        Movie.getSessionsOfMovie($scope.movies[$scope.movie_index].mid, $stateParams.cid).then(function (res) {
          $scope.sessionList = res.data.obj;
         
        })
      }
    }
    $scope.goToSeat = function (cmsid) {
      console.log($scope.dates)
      console.log($scope.ch, $scope.dates[$scope.ch])
      console.log($state.current.name)
      var params = {
        cmsid: cmsid,
        date: $scope.dates[$scope.ch],
        title: $scope.movies[$scope.movie_index].moviename,
        cinemaname:$scope.cinema.cinemaname,
        address:$scope.cinema.address
      };
      if ($state.current.name == "app.tabs.cinema_info1") {
        $state.go('app.tabs.selectseat1', params);
      } else if($state.current.name == "app.tabs.cinema_info2"){
        $state.go('app.tabs.selectseat2', params);
      }else{
        $state.go('app.tabs.selectseat3', params);
      }
    }
  })

.controller('selectseatCtrl', function ($scope, $stateParams, $ionicPopup, $filter, $timeout, Movie, AlertPopup) {

    $scope.cmsid = $stateParams.cmsid;
    $scope.date = $filter('date')($stateParams.date, 'yyyy-MM-dd');
    $scope.cinemaname = $stateParams.cinemaname;
    $scope.address = $stateParams.address;
    $scope.title = $stateParams.title;

    $scope.rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    $scope.cols = [1, 2, 3, 4, 5, 6, 7, 8];
  $scope.chart = {
    available: 'img/seat_available.png',
    reserved: 'img/seat_reserved.png',
    selected: 'img/seat_selected.png'
  }
    // Set reserved and selected
    var reserved = [];
    var selected = [];
    Movie.getSeatsOfMovie($scope.cmsid, $scope.date).then(function (res) {
      reserved = res.data.obj;
    },function(res){
      new AlertPopup('失败','网络错误，请稍后再尝试')
    });
  $scope.doRefresh = function () {
    Movie.getSeatsOfMovie($scope.cmsid, $scope.date).then(function (res) {
      reserved = res.data.obj;
      $scope.$broadcast('scroll.refreshComplete');
    },function(res){
      $scope.$broadcast('scroll.refreshComplete');
      new AlertPopup('失败','网络错误，请稍后再尝试')
    });
  };
      // seat onClick
    $scope.seatClicked = function (seatPos) {
      console.log("Selected Seat: " + seatPos);
      var index = selected.indexOf(seatPos);
      if (index != -1) {
        // seat already selected, remove
        selected.splice(index, 1)
      } else {
        // new seat, push
        selected.push(seatPos);
      }
    }

    // get seat status
    $scope.getStatus = function (seatPos) {
      if (reserved.indexOf(seatPos) > -1) {
        return 'reserved';
      } else if (selected.indexOf(seatPos) > -1) {
        return 'selected';
      }
    }

    // clear selected
    $scope.clearSelected = function () {
      selected = [];
    }

    // show selected
    $scope.showSelected = function () {
      if (selected.length > 0) {
        alert("Selected Seats: \n" + selected);
      } else {
        alert("No seats selected!");
      }
    }
    $scope.showPay = function () {
      $ionicPopup.prompt({
        title: '输入您的支付密码',
        subTitle: '支付前务必确认场次和座位',
        inputType: 'password',
        okText: '确定',
        cancelText: '取消',
        okType: 'button-assertive'
      }).then(function (res) {
        if (res != undefined) {
          $scope.pay(res);
        }
      });
    };
    $scope.pay = function (paypwd) {
      if (selected.length > 0) {
        var order = {
          "seats": selected,
          "cmsid": $scope.cmsid,
          "date": $scope.date, //需要yyyy-mm-dd格式
          "paypwd": paypwd
        };
        console.log(order)
        Movie.payForOrder($scope.user.token, order).then(function (res) {
          var result = res.data.result;
          switch (result) {
            case "Success":
              new AlertPopup('购票成功', '可在“我的”->“我的订单”->“订单详情”中中查看二维码或序列号', 'button-balanced')
              break;
            case "Invalid token":
              // new AlertPopup('购票失败','您的登录已失效');
              $scope.loginModal.show();
              break;
            case "No Seat":
              new AlertPopup('购票失败', '此位置已被其他客户购买');
              break;
            case "Wrong Paypassword":
              new AlertPopup('购票失败', '支付密码错误');
              break;
            case "No Money":
              new AlertPopup('购票失败', '您的余额不足');
              break;
            default:
              new AlertPopup('购票失败', '未知错误');
          }
        }, function (res) {
          new AlertPopup('购票失败', '请检查网络');
        })
      } else {
        new AlertPopup('购票失败', '请选择座位');
      }
    }
  })
  .controller('commentCtrl', function ($scope, $state, AlertPopup, Comment) {
    $scope.moviename = $state.params.moviename;
    $scope.score = 8;
    $scope.ratingsObject = {
      iconOn: 'ion-ios-star', //Optional
      iconOff: 'ion-ios-star-outline', //Optional
      iconOnColor: 'rgb(255, 201, 0)', //Optional
      iconOffColor: 'rgb(255, 201, 0)', //Optional
      rating: 4, //Optional
      minRating: 1, //Optional
      readOnly: true, //Optional
      callback: function (rating) { //Mandatory
        $scope.ratingsCallback(rating);
      }
    };
    $scope.data = {
      content: "这部电影不错！很赞"
    }
    $scope.addComment = function () {
      Comment.addComment($scope.user.token, $state.params.mid, $scope.data.content, $scope.score).then(function (res) {
        if (res.data.result == 'Invalid token') {
          //  new AlertPopup('评论失败','您尚未登录')
          $scope.loginModal.show();
        } else if (res.data.result == 'Input error') {
          new AlertPopup('评论失败', '评论内容不能为空')
        } else {
          if (res.data.obj == 'Success') {
           $scope.goBack();
          } else {
            new AlertPopup('评论失败', '不允许重复评论')
          }
        }
      });
    }
    $scope.ratingsCallback = function (rating) {
      $scope.score = rating * 2;
      console.log('Selected rating is : ', rating);
    };

  })

.controller('myCommentCtrl', function ($scope, $state, AlertPopup, Comment, Movie) {
    Comment.getComments($scope.user.token).then(function (res) {
      if (res.data.result == "Invalid token") {
        // new AlertPopup('获取失败','您还没有登录或登录已失效');
        $scope.loginModal.show();
      } else {
        var comments = res.data.obj;
        for (var i in comments) {
          comments[i].movie = Movie.getMovieByMid(comments[i].mid);
        }
        $scope.comments = comments;
      }
    });
  $scope.deleteComment = function(commentid){
    Comment.deleteComment($scope.user.token,commentid).then(function(res){
      $state.reload();
    },function(res){
      new AlertPopup('删除失败','服务器提了一个问题')
    })
  }
  })
  .controller('myCollectCtrl', function ($scope, $state, AlertPopup, Collection, Movie) {
    $scope.collections = [];
    Collection.getCollections($scope.user.token).then(function (res) {
      if (res.data.result == "Invalid token") {
        //  new AlertPopup('获取失败','您还没有登录或登录已失效');
        $scope.loginModal.show();
      } else {
        var collects = res.data.obj;
        for (var i in collects) {
          collects[i].movie = Movie.getMovieByMid(collects[i].mid);
        }
        $scope.collections = collects;
      }
    })
    $scope.deleteCollect = function(mid){
      Collection.deleteCollection($scope.user.token,mid).then(function(res){
        $state.reload();
      },function(res){
        new AlertPopup('删除失败','服务器提了一个问题')
      })
    }
  })
  .controller('myWallettCtrl', function ($scope) {
    $scope.data = {
      bankIco: 'img/bank.jpg'
    }
  })
  .controller('settingCtrl', function ($scope, $state, AlertPopup, Auth) {
    $scope.gotoUndo = function () {
      new AlertPopup('十分抱歉', '此功能尚未开放')
    };
    $scope.logout = function () {
      Auth.logout($scope.user.token).then(function (res) {
        $scope.user.token = '-1';
        $scope.goBack();
      })
    }
  })
  .controller('cLogpassCtrl', function ($scope, Auth, AlertPopup) {
    $scope.cll = {
      oldpwd:'',
      newpwd:'',
      newpwdConfirm:''
    }
    $scope.changePwd = function () {
      console.log('1')
      Auth.pwdChange($scope.user.token, $scope.cll.oldpwd, $scope.cll.newpwd, $scope.cll.newpwdConfirm).then(function (res) {
        console.log(res)
        if (res.data.result == 'Invalid token') {
          new AlertPopup('修改失败', '您的登录已过期')
          $scope.loginModal.show();
        } else if (res.data.obj.newpwd == 'Success') {
          new AlertPopup('修改成功', '恭喜！', 'button-balanced')
        } else {
          var error = res.data.obj;

          var errorMessages = '';
          for (var i in error) {
            errorMessages += i + ': ' + error[i] + '<br>';
          }
          new AlertPopup('修改失败', errorMessages);

        }
      })
    }
  })
  .controller('cPaypassCtrl', function ($scope, Auth, AlertPopup) {
    $scope.cpl ={
      oldpwd:'',
      newpwd:'',
      newpwdConfirm:''
    }
    $scope.changePwd = function () {
      console.log('2')
      Auth.payPwdChange($scope.user.token, $scope.cpl.oldpwd, $scope.cpl.newpwd, $scope.cpl.newpwdConfirm).then(function (res) {
        console.log(res)
        if (res.data.result == 'Invalid token') {
          new AlertPopup('修改失败', '您的登录已过期')
          $scope.loginModal.show();
        } else if (res.data.obj.newpwd == 'Success') {
          new AlertPopup('修改成功', '恭喜！', 'button-balanced')
        } else {
          var error = res.data.obj;

          var errorMessages = '';
          for (var i in error) {
            errorMessages += i + ': ' + error[i] + '<br>';
          }
          new AlertPopup('修改失败', errorMessages);

        }
      })
    }
  })
