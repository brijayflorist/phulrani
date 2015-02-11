angular.module('home.carousel', [])

.controller('carouselController', function ($scope, $state) {
   
    $scope.myimg = "/img/flower1.jpg";
    $scope.name = "ulhas";
    $scope.images = [{
        "path": "/img/flower1.jpg"
    }, {
        "path": "/img/flower1.jpg"
    }, {
        "path": "/img/flower1.jpg"
    }, {
        "path": "/img/flower1.jpg"
    }];


});
