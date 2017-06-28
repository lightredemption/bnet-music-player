var app = angular.module('bnet-music-player', [`ngAudio`, `ngAnimate`]);
app.controller(`BaseController`, [`$scope`, `ngAudio`, `$http`, `$interval`,
  ($scope, ngAudio, $http, $interval) => {

    $scope.listShown = true;
    $scope.shuffle = false;
    $scope.repeat = false;
    $scope.baseURL = "http://classic.battle.net";

    $http.get(`music.json`)
    .then((res) => {
      $scope.music = res.data;
      $scope.current = $scope.music[0];
      $scope.position = 0;
      $scope.load();
    });

    $scope.load = () => {
      $scope.song = ngAudio.load($scope.baseURL + $scope.current.audioURL);
    }

    $scope.run = () => {
      setTimeout(() => {
        $scope.song.play();
      }, 500);
      
    };

    $scope.next = () => {
      if ($scope.shuffle) {
        let point = Math.floor(Math.random() * $scope.music.length);
        while (point === $scope.position) {
          point = Math.floor(Math.random() * $scope.music.length);
        }
        $scope.position = point;
      }
      if (!$scope.shuffle && !$scope.repeat) {
        if (($scope.position + 1) ===  $scope.music.length) {
          $scope.position = 0;
        } else {
          $scope.position = $scope.position+=1;
        }
      }

      $scope.current = $scope.music[$scope.position];
      
      if ($scope.song.paused) {
        $scope.song.stop();
        $scope.load();
      } else {
        $scope.song.stop();
        $scope.load();
        $scope.run();
      }
    };

    $scope.prev = () => {
      $scope.song.stop();
      if ($scope.song.progress < 0.1) {
        if ($scope.position === 0) {
          $scope.position = $scope.music.length - 1;
        } else {
          $scope.position = $scope.position-=1;
        }
        $scope.current = $scope.music[$scope.position];
      }

      if ($scope.song.paused) {
        $scope.song.stop();
        $scope.load();
      } else {
        $scope.song.stop();
        $scope.load();
        $scope.run();
      }
    };

    $scope.jump = (index) => {
      $scope.song.stop();
      $scope.position = index;
      $scope.current = $scope.music[$scope.position];
      $scope.load();
      $scope.run();
    }

    $scope.showList = () => {
      $scope.listShown = !$scope.listShown;
    };

    $scope.shuffleT = () => {
      $scope.shuffle = !$scope.shuffle;
      $scope.repeat = false;
    };

    $scope.repeatT = () => {
      $scope.repeat = !$scope.repeat;
      $scope.shuffle = false;
    };

    $interval(function () {
    if ($scope.song.remaining < 1) {
      $scope.next();
    }
    }, 200);

  }]);
