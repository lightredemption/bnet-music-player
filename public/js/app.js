'use strict';

var app = angular.module('bnet-music-player', ['ngAudio']);
app.filter('secondsToDateTime', [function () {
  return function (seconds) {
    return new Date(1970, 0, 1).setSeconds(seconds);
  };
}]);
app.controller('BaseController', ['$scope', 'ngAudio', '$http', '$interval', function ($scope, ngAudio, $http, $interval) {

  $scope.nowPlaying = true;
  $scope.listShown = true;
  $scope.volumeImg = 'public/img/High Volume.png';

  $http.get('music.json').then(function (res) {
    $scope.music = res.data;
    $scope.current = $scope.music[0];
    $scope.position = 0;
    $scope.load();
  });

  $scope.load = function () {
    $scope.song = ngAudio.load($scope.current.url);
    $scope.song.play();
    $scope.nowPlaying = true;
  };

  $scope.ply = function () {
    if ($scope.nowPlaying) {
      $scope.song.pause();
    } else {
      $scope.song.play();
    }
    $scope.nowPlaying = !$scope.nowPlaying;
  };

  $scope.next = function () {
    $scope.song.stop();
    if ($scope.shuffle) {
      var point = Math.floor(Math.random() * $scope.music.length);
      while (point === $scope.position) {
        point = Math.floor(Math.random() * $scope.music.length);
      }
      $scope.position = point;
    }
    if (!$scope.shuffle && !$scope.repeat) {
      if ($scope.position + 1 === $scope.music.length) {
        $scope.position = 0;
      } else {
        $scope.position = $scope.position += 1;
      }
    }

    $scope.current = $scope.music[$scope.position];
    $scope.load();
  };

  $scope.prev = function () {
    $scope.song.stop();
    if ($scope.song.progress < 0.1) {
      if ($scope.position === 0) {
        $scope.position = $scope.music.length - 1;
      } else {
        $scope.position = $scope.position -= 1;
      }
      $scope.current = $scope.music[$scope.position];
    }

    $scope.load();
  };

  $scope.jump = function (index) {
    $scope.song.stop();
    $scope.position = index;
    $scope.current = $scope.music[$scope.position];
    $scope.load();
  };

  $scope.togList = function () {
    $scope.listShown = !$scope.listShown;
  };

  $scope.togShuffle = function () {
    $scope.shuffle = !$scope.shuffle;
    $scope.repeat = false;
  };

  $scope.togRepeat = function () {
    $scope.repeat = !$scope.repeat;
    $scope.shuffle = false;
  };

  $interval(function () {
    var volume = $scope.song.volume;
    if (volume > 0.66) {
      $scope.volumeImg = 'public/img/High Volume.png';
    }
    if (volume <= 0.66 && volume > 0.33) {
      $scope.volumeImg = 'public/img/Medium Volume.png';
    }
    if (volume <= 0.33 && volume > 0) {
      $scope.volumeImg = 'public/img/Low Volume.png';
    }
    if (volume === 0) {
      $scope.volumeImg = 'public/img/Mute.png';
    }
    if ($scope.song.remaining < 1) {
      $scope.next();
    }
  }, 200);
}]);