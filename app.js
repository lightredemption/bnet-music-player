var app = angular.module('bnet-music-player', [`ngAudio`, `720kb.background`]);
app.filter('secondsToDateTime', [function() {
  return function(seconds) {
    return new Date(1970, 0, 1).setSeconds(seconds);
  };
}])
app.controller(`BaseController`, [`$scope`, `ngAudio`, `$http`, `$interval`,
  ($scope, ngAudio, $http, $interval) => {

    $scope.nowPlaying = true;
    $scope.playImg = `public/img/Pause.png`;

    $http.get(`music.json`)
    .then((res) => {
      $scope.music = res.data;
      $scope.current = $scope.music[0];
      $scope.position = 0;
      $scope.load();
    });

    $scope.load = () => {
      $scope.song = ngAudio.load($scope.current.url);
      $scope.song.play();
    };

    $scope.backgroundUrl = `public/img/sc.jpg`;

    $scope.play = () => {
      if ($scope.nowPlaying) {
        $scope.song.pause();
        $scope.playImg = `public/img/Play.png`;
      } else {
        $scope.song.play();
        $scope.playImg = `public/img/Pause.png`;
      }
      $scope.nowPlaying = !$scope.nowPlaying;
    };

    $scope.next = () => {
      $scope.song.stop();
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
      $scope.load();
    };

    $scope.prev = () => {
      $scope.song.stop();
      if ($scope.position === 0) {
        $scope.position = $scope.music.length - 1;
      } else {
        $scope.position = $scope.position-=1;
      }
      $scope.current = $scope.music[$scope.position];
      $scope.load();
    };

    $scope.togShuffle = () => {
      $scope.shuffle = !$scope.shuffle;
      $scope.repeat = false;
    };

    $scope.togRepeat = () => {
      $scope.repeat = !$scope.repeat;
      $scope.shuffle = false;
    };

    $interval(() => {
      if ($scope.song.remaining < 1) {
        $scope.next();
      }
    }, 500)

  }]);
