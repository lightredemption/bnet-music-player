var app = angular.module('bnet-music-player', [`ngAudio`]);
app.controller(`BaseController`, [`$scope`, `ngAudio`, `$http`, ($scope, ngAudio, $http) => {

  $scope.nowPlaying = false;

  $http.get(`music.json`)
  .then((res) => {
    $scope.music = res.data;
    $scope.current = $scope.music[0];
    $scope.load();
  });

  $scope.load = () => {
    $scope.song = ngAudio.load($scope.music[0].url);
    $scope.backgroundUrl = `public/img/wc3.jpg`;
  };

  $scope.backgroundUrl = `public/img/sc.jpg`;

  $scope.play = () => {
    if ($scope.nowPlaying) {
      $scope.song.pause();
    } else {
      $scope.song.play();
    }
    $scope.nowPlaying = !$scope.nowPlaying;
  };

}]);
