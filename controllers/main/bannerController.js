angular.module('home.banner', [])

.controller('bannerController', function ($scope, $state, ezfbProvider) {
    // alert('banner Controller');
    $scope.doSearch = function () {
        $state.go("main.search", { "key": $scope.searchKeyword });
    };

})

